// Minimal GitHub REST client for the in-browser admin.
// Everything is stored in the repo itself: JSON files + uploaded media are
// written as ONE commit using the Git Data API (blobs → tree → commit → ref).

const API = "https://api.github.com";

function bytesToBase64(bytes) {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

async function toBase64(content) {
  if (typeof content === "string") return bytesToBase64(new TextEncoder().encode(content));
  if (content instanceof Uint8Array) return bytesToBase64(content);
  if (content instanceof Blob) return bytesToBase64(new Uint8Array(await content.arrayBuffer()));
  throw new Error("Unsupported file content");
}

const encodePath = (path) => path.split("/").map(encodeURIComponent).join("/");

export class GitHubClient {
  constructor({ token, owner, repo, branch }) {
    this.token = token;
    this.owner = owner;
    this.repo = repo;
    this.branch = branch;
  }

  get repoPath() {
    return `/repos/${encodeURIComponent(this.owner)}/${encodeURIComponent(this.repo)}`;
  }

  async request(path, { method = "GET", body, raw = false } = {}) {
    const headers = {
      Accept: raw ? "application/vnd.github.raw+json" : "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    if (body) headers["Content-Type"] = "application/json";

    const res = await fetch(API + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    if (!res.ok) {
      let message = res.statusText;
      try {
        message = (await res.json()).message || message;
      } catch (e) {
        /* not JSON */
      }
      const err = new Error(`GitHub ${res.status}: ${message}`);
      err.status = res.status;
      throw err;
    }
    if (res.status === 204) return null;
    return raw ? res.text() : res.json();
  }

  whoami() {
    return this.request("/user");
  }

  repoInfo() {
    return this.request(this.repoPath);
  }

  /** Read a JSON file from the target branch (fresh, not the bundled copy). */
  async readJson(path) {
    const text = await this.request(
      `${this.repoPath}/contents/${encodePath(path)}?ref=${encodeURIComponent(this.branch)}`,
      { raw: true }
    );
    return JSON.parse(text);
  }

  /**
   * Write/delete several files in a single commit on `this.branch`.
   * files:   [{ path, content: string | Uint8Array | Blob }]
   * deletes: ["public/content/certs/old.webp", ...]
   */
  async commit({ message, files = [], deletes = [] }) {
    const ref = await this.request(`${this.repoPath}/git/ref/heads/${encodePath(this.branch)}`);
    const parentSha = ref.object.sha;
    const parent = await this.request(`${this.repoPath}/git/commits/${parentSha}`);

    const tree = [];
    for (const f of files) {
      const blob = await this.request(`${this.repoPath}/git/blobs`, {
        method: "POST",
        body: { content: await toBase64(f.content), encoding: "base64" },
      });
      tree.push({ path: f.path, mode: "100644", type: "blob", sha: blob.sha });
    }
    const written = new Set(files.map((f) => f.path));
    for (const path of deletes) {
      if (!written.has(path)) tree.push({ path, mode: "100644", type: "blob", sha: null });
    }

    const newTree = await this.request(`${this.repoPath}/git/trees`, {
      method: "POST",
      body: { base_tree: parent.tree.sha, tree },
    });
    const newCommit = await this.request(`${this.repoPath}/git/commits`, {
      method: "POST",
      body: { message, tree: newTree.sha, parents: [parentSha] },
    });
    await this.request(`${this.repoPath}/git/refs/heads/${encodePath(this.branch)}`, {
      method: "PATCH",
      body: { sha: newCommit.sha },
    });
    return newCommit;
  }
}
