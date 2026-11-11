import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import {
  FiArrowDown,
  FiArrowUp,
  FiCheckCircle,
  FiEdit2,
  FiExternalLink,
  FiGithub,
  FiKey,
  FiLogOut,
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { SoftBackground, useReveal } from "../components/UI/PageShell";
import { GitHubClient } from "./github";
import { COLLECTIONS } from "./collections";
import { exportWebp, extOf, isPdf, loadSource, repoPathFromPublic, slugify } from "./media";
import RedactCanvas from "./RedactCanvas";
import "./admin.css";

// bundled copies — shown read-only until you connect
import bundledCertificates from "../data/certificates.json";
import bundledAwards from "../data/awards.json";
import bundledProjects from "../data/projects.json";
import bundledDegrees from "../data/degrees.json";

const BUNDLED = {
  certificates: bundledCertificates,
  awards: bundledAwards,
  projects: bundledProjects,
  degrees: bundledDegrees,
};

const DEFAULTS = { owner: "nhitny", repo: "nhitny.github.io", branch: "master" };
const SETTINGS_KEY = "st-admin-settings";
const TOKEN_KEY = "st-admin-token";

// ---------- storage (wrapped: private windows may throw) ----------
const store = {
  get(area, key) {
    try {
      return window[area].getItem(key);
    } catch (e) {
      return null;
    }
  },
  set(area, key, value) {
    try {
      window[area].setItem(key, value);
    } catch (e) {
      /* ignore */
    }
  },
  remove(area, key) {
    try {
      window[area].removeItem(key);
    } catch (e) {
      /* ignore */
    }
  },
};

function loadSettings() {
  try {
    return { ...DEFAULTS, ...JSON.parse(store.get("localStorage", SETTINGS_KEY) || "{}") };
  } catch (e) {
    return DEFAULTS;
  }
}

// ---------- item <-> form draft ----------
function toDraft(collection, item = {}) {
  const d = {};
  collection.fields.forEach((f) => {
    const v = item[f.name];
    if (f.type === "list") d[f.name] = (v || []).join(", ");
    else if (f.type === "lines") d[f.name] = (v || []).join("\n");
    else if (f.type === "bool") d[f.name] = !!v;
    else if (f.type === "media" || f.type === "logo") d[f.name] = null;
    else d[f.name] = v || "";
  });
  return d;
}

function fromDraft(collection, draft, base = {}) {
  const item = { ...base };
  collection.fields.forEach((f) => {
    if (f.type === "media" || f.type === "logo") return;
    let v = draft[f.name];
    if (f.type === "list") v = String(v || "").split(",").map((s) => s.trim()).filter(Boolean);
    else if (f.type === "lines") v = String(v || "").split("\n").map((s) => s.trim()).filter(Boolean);
    else if (f.type === "bool") v = !!v;
    else v = String(v || "").trim();

    const empty = v === "" || v === false || (Array.isArray(v) && v.length === 0);
    if (empty) delete item[f.name];
    else item[f.name] = v;
  });
  return item;
}

function uniqueId(base, items, selfId) {
  const taken = new Set(items.map((i) => i.id).filter((id) => id && id !== selfId));
  let id = base;
  let n = 2;
  while (taken.has(id)) id = `${base}-${n++}`;
  return id;
}

const json = (data) => `${JSON.stringify(data, null, 2)}\n`;

// =====================================================================
function Admin() {
  const ref = useReveal();
  const [settings, setSettings] = useState(loadSettings);
  const [token, setToken] = useState(() => store.get("sessionStorage", TOKEN_KEY) || store.get("localStorage", TOKEN_KEY) || "");
  const [remember, setRemember] = useState(() => !!store.get("localStorage", TOKEN_KEY));
  const [client, setClient] = useState(null);
  const [me, setMe] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(BUNDLED);
  const [tab, setTab] = useState("certificates");
  const [editing, setEditing] = useState(null); // { index: number | -1, draft, media: {} }
  const [busy, setBusy] = useState("");
  const [lastCommit, setLastCommit] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const collection = COLLECTIONS.find((c) => c.key === tab);
  const items = data[tab] || [];

  // ---------- connect ----------
  const connect = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setConnecting(true);
    try {
      const gh = new GitHubClient({ token: token.trim(), ...settings });
      const user = await gh.whoami();
      const repo = await gh.repoInfo();
      if (repo.permissions && !repo.permissions.push) {
        throw new Error("Token này không có quyền ghi vào repo. Hãy cấp quyền Contents: Read and write.");
      }
      const loaded = {};
      for (const c of COLLECTIONS) {
        try {
          loaded[c.key] = await gh.readJson(c.path);
        } catch (err) {
          if (err.status === 404) {
            throw new Error(
              `Không thấy file ${c.path} trên nhánh "${settings.branch}". Có thể nhánh này chưa có code trang admin — hãy merge nhánh redesign-ui trước, hoặc chọn đúng nhánh.`
            );
          }
          throw err;
        }
      }
      store.set("localStorage", SETTINGS_KEY, JSON.stringify(settings));
      if (remember) {
        store.set("localStorage", TOKEN_KEY, token.trim());
        store.remove("sessionStorage", TOKEN_KEY);
      } else {
        store.set("sessionStorage", TOKEN_KEY, token.trim());
        store.remove("localStorage", TOKEN_KEY);
      }
      setClient(gh);
      setMe(user);
      setData(loaded);
    } catch (err) {
      setError(err.message);
      setClient(null);
    } finally {
      setConnecting(false);
    }
  };

  // auto-connect when a token is already stored
  useEffect(() => {
    if (token) connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    store.remove("sessionStorage", TOKEN_KEY);
    store.remove("localStorage", TOKEN_KEY);
    setToken("");
    setClient(null);
    setMe(null);
    setData(BUNDLED);
    setEditing(null);
  };

  // ---------- commit helper ----------
  const commit = async ({ message, nextItems, files = [], deletes = [], key = tab }) => {
    const path = COLLECTIONS.find((c) => c.key === key).path;
    const result = await client.commit({
      message,
      files: [...files, { path, content: json(nextItems) }],
      deletes,
    });
    setData((d) => ({ ...d, [key]: nextItems }));
    setLastCommit({ sha: result.sha, url: result.html_url, message });
    return result;
  };

  const run = async (label, fn) => {
    setError("");
    setBusy(label);
    try {
      await fn();
    } catch (err) {
      setError(
        err.status === 409 || err.status === 422
          ? `${err.message} — repo vừa có thay đổi khác. Bấm "Kết nối lại" để tải dữ liệu mới rồi thử lại.`
          : err.message
      );
    } finally {
      setBusy("");
    }
  };

  // ---------- list actions ----------
  const move = (index, dir) =>
    run("Đang sắp xếp…", async () => {
      const next = [...items];
      const [it] = next.splice(index, 1);
      next.splice(index + dir, 0, it);
      await commit({ message: `admin: reorder ${collection.key}`, nextItems: next });
    });

  const remove = (index) => {
    const it = items[index];
    const name = collection.summary(it).title || it.id;
    if (!window.confirm(`Xoá ${collection.noun} "${name}"? Thao tác này sẽ tạo một commit lên GitHub.`)) return;
    run("Đang xoá…", async () => {
      const next = items.filter((_, i) => i !== index);
      const stillUsed = new Set(next.flatMap((i) => [i.file, i.preview, i.logo]).filter(Boolean));
      const deletes = [it.file, it.preview, it.logo]
        .filter((u) => u && !stillUsed.has(u))
        .map(repoPathFromPublic)
        .filter(Boolean);
      await commit({ message: `admin: remove ${collection.noun} "${name}"`, nextItems: next, deletes: [...new Set(deletes)] });
    });
  };

  const openEditor = (index) => {
    setError("");
    setEditing({ index, draft: toDraft(collection, index >= 0 ? items[index] : {}), media: {} });
  };

  // ---------- save from editor ----------
  const save = (e) => {
    e.preventDefault();
    const { index, draft, media } = editing;
    const original = index >= 0 ? items[index] : null;

    for (const f of collection.fields) {
      if (!f.required) continue;
      if (f.type === "media") {
        if (!media[f.name]?.source && !original?.preview) return setError(`Vui lòng chọn ${f.label.toLowerCase()}.`);
      } else if (!String(draft[f.name] || "").trim()) {
        return setError(`Vui lòng điền "${f.label}".`);
      }
    }

    run("Đang lưu lên GitHub…", async () => {
      const item = fromDraft(collection, draft, original || {});
      const baseName = item.title || item.event || item.school || collection.key;
      item.id = original?.id || uniqueId(slugify(baseName), items, null);
      const files = [];
      const deletes = [];

      // certificate image / PDF
      const m = media.media;
      if (m?.source) {
        const previewRepo = `public/${collection.assetDir}/${item.id}.webp`;
        files.push({ path: previewRepo, content: await exportWebp(m.source, { maxSize: 1400, redactions: m.boxes || [] }) });
        item.preview = `/${collection.assetDir}/${item.id}.webp`;
        const keepOriginal = m.keepOriginal && !(m.boxes || []).length;
        if (keepOriginal) {
          const ext = extOf(m.file);
          const name = ext === "webp" ? `${item.id}-original.webp` : `${item.id}.${ext}`;
          files.push({ path: `public/${collection.assetDir}/${name}`, content: m.file });
          item.file = `/${collection.assetDir}/${name}`;
        } else {
          item.file = item.preview;
        }
        if ((m.boxes || []).length) item.note = "Sensitive details are redacted in this image";
        else delete item.note;
      }

      // degree logo
      const l = media.logo;
      if (l?.source) {
        files.push({ path: `public/${collection.assetDir}/${item.id}.webp`, content: await exportWebp(l.source, { maxSize: 320, quality: 0.9 }) });
        item.logo = `/${collection.assetDir}/${item.id}.webp`;
      }

      // remove files the item no longer points to
      if (original) {
        const now = new Set([item.file, item.preview, item.logo]);
        [original.file, original.preview, original.logo].forEach((u) => {
          const p = repoPathFromPublic(u);
          if (u && !now.has(u) && p && !files.some((f) => f.path === p)) deletes.push(p);
        });
      }

      const next = [...items];
      if (index >= 0) next[index] = item;
      else next.unshift(item); // newest first

      const verb = index >= 0 ? "update" : "add";
      await commit({ message: `admin: ${verb} ${collection.noun} "${baseName}"`, nextItems: next, files, deletes });
      setEditing(null);
    });
  };

  const actionsUrl = `https://github.com/${settings.owner}/${settings.repo}/actions`;

  return (
    <section className="st-home st-page adm" ref={ref}>
      <SoftBackground />
      <Container className="st-page-head">
        <span className="st-label">~/admin</span>
        <h1 className="st-page-title">
          Bảng <em>điều khiển.</em>
        </h1>
        <p className="st-body st-page-sub">
          Thêm chứng chỉ, thành tích, dự án và bằng cấp. Mọi thay đổi được commit thẳng vào repo GitHub của bạn — không
          lưu ở đâu khác — và trang sẽ tự cập nhật sau khi GitHub Actions build xong.
        </p>
      </Container>

      <Container className="st-section pt-0">
        {/* ---------- connection ---------- */}
        {!client ? (
          <form className="adm-card adm-connect" onSubmit={connect}>
            <div className="adm-card-head">
              <FiKey /> <b>Kết nối GitHub</b>
            </div>
            <div className="adm-grid3">
              <label>
                Chủ repo
                <input value={settings.owner} onChange={(e) => setSettings({ ...settings, owner: e.target.value })} />
              </label>
              <label>
                Repo
                <input value={settings.repo} onChange={(e) => setSettings({ ...settings, repo: e.target.value })} />
              </label>
              <label>
                Nhánh
                <input value={settings.branch} onChange={(e) => setSettings({ ...settings, branch: e.target.value })} />
              </label>
            </div>
            <label>
              GitHub token
              <input
                type="password"
                autoComplete="off"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="github_pat_…"
                required
              />
            </label>
            <label className="adm-check">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Ghi nhớ trên trình duyệt này (chỉ bật trên máy riêng của bạn)
            </label>
            <div className="adm-row">
              <button type="submit" className="st-btn primary" disabled={connecting || !token.trim()}>
                <FiGithub /> {connecting ? "Đang kết nối…" : "Kết nối"}
              </button>
              <button type="button" className="adm-linkbtn" onClick={() => setShowHelp((v) => !v)}>
                {showHelp ? "Ẩn hướng dẫn" : "Cách tạo token?"}
              </button>
            </div>
            {showHelp && (
              <ol className="adm-help">
                <li>
                  Mở{" "}
                  <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noreferrer">
                    GitHub → Fine-grained token mới <FiExternalLink />
                  </a>
                  .
                </li>
                <li>
                  <b>Repository access</b>: chọn <i>Only select repositories</i> → <code>{settings.repo}</code>.
                </li>
                <li>
                  <b>Permissions → Repository permissions → Contents</b>: <i>Read and write</i>. Không cần quyền nào khác.
                </li>
                <li>
                  <b>Expiration</b>: nên chọn 30–90 ngày. Bấm <i>Generate token</i>, copy và dán vào ô trên.
                </li>
                <li>Token chỉ nằm trong trình duyệt của bạn và chỉ được gửi tới api.github.com.</li>
              </ol>
            )}
          </form>
        ) : (
          <div className="adm-card adm-status">
            <div className="adm-me">
              {me?.avatar_url && <img src={me.avatar_url} alt="" />}
              <div>
                <b>@{me?.login}</b>
                <span className="mono">
                  {settings.owner}/{settings.repo} · nhánh {settings.branch} · <FiCheckCircle /> có quyền ghi
                </span>
              </div>
            </div>
            <div className="adm-row">
              <button type="button" className="st-btn ghost" onClick={() => connect()} disabled={!!busy || connecting}>
                {connecting ? "Đang tải…" : "Kết nối lại"}
              </button>
              <button type="button" className="st-btn ghost" onClick={logout}>
                <FiLogOut /> Đăng xuất
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="adm-alert" role="alert">
            {error}
            <button type="button" onClick={() => setError("")} aria-label="Đóng">
              <FiX />
            </button>
          </div>
        )}

        {lastCommit && (
          <div className="adm-alert ok" role="status">
            <span>
              <FiCheckCircle /> Đã lưu: <code>{lastCommit.message}</code>{" "}
              <a href={lastCommit.url} target="_blank" rel="noreferrer">
                commit {lastCommit.sha.slice(0, 7)}
              </a>
              . Trang sẽ cập nhật sau khoảng 1–2 phút —{" "}
              <a href={actionsUrl} target="_blank" rel="noreferrer">
                xem tiến trình build
              </a>
              .
            </span>
            <button type="button" onClick={() => setLastCommit(null)} aria-label="Đóng">
              <FiX />
            </button>
          </div>
        )}

        {/* ---------- tabs ---------- */}
        <div className="adm-tabs" role="tablist">
          {COLLECTIONS.map((c) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={tab === c.key}
              className={tab === c.key ? "is-active" : ""}
              onClick={() => {
                setTab(c.key);
                setEditing(null);
              }}
            >
              {c.label} <span>{(data[c.key] || []).length}</span>
            </button>
          ))}
        </div>

        {/* ---------- editor ---------- */}
        {editing ? (
          <Editor
            collection={collection}
            editing={editing}
            setEditing={setEditing}
            original={editing.index >= 0 ? items[editing.index] : null}
            onSubmit={save}
            busy={busy}
          />
        ) : (
          <div className="adm-list">
            <div className="adm-list-head">
              <p className="mono">
                {items.length} {collection.noun}
                {!client && " · chế độ xem — kết nối GitHub để chỉnh sửa"}
              </p>
              <button type="button" className="st-btn primary" disabled={!client || !!busy} onClick={() => openEditor(-1)}>
                <FiPlus /> Thêm {collection.noun}
              </button>
            </div>

            {items.map((it, i) => {
              const s = collection.summary(it);
              return (
                <div className="adm-item" key={it.id || i}>
                  <div className="adm-thumb">
                    {s.thumb ? <img src={s.thumb} alt="" loading="lazy" /> : <span>{(s.title || "?").charAt(0)}</span>}
                  </div>
                  <div className="adm-item-text">
                    <b>{s.title}</b>
                    {s.sub && <span>{s.sub}</span>}
                  </div>
                  <div className="adm-item-actions">
                    <button type="button" title="Lên" disabled={!client || !!busy || i === 0} onClick={() => move(i, -1)}>
                      <FiArrowUp />
                    </button>
                    <button type="button" title="Xuống" disabled={!client || !!busy || i === items.length - 1} onClick={() => move(i, 1)}>
                      <FiArrowDown />
                    </button>
                    <button type="button" title="Sửa" disabled={!client || !!busy} onClick={() => openEditor(i)}>
                      <FiEdit2 />
                    </button>
                    <button type="button" title="Xoá" className="danger" disabled={!client || !!busy} onClick={() => remove(i)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {busy && (
          <div className="adm-busy" role="status">
            <span className="adm-spin" /> {busy}
          </div>
        )}
      </Container>
    </section>
  );
}

// =====================================================================
function Editor({ collection, editing, setEditing, original, onSubmit, busy }) {
  const { draft, media } = editing;
  const setField = (name, value) => setEditing((e) => ({ ...e, draft: { ...e.draft, [name]: value } }));
  const setMedia = (name, value) =>
    setEditing((e) => ({ ...e, media: { ...e.media, [name]: value ? { ...(e.media[name] || {}), ...value } : null } }));

  return (
    <form className="adm-card adm-editor" onSubmit={onSubmit}>
      <div className="adm-card-head">
        {original ? <FiEdit2 /> : <FiPlus />}
        <b>
          {original ? "Sửa" : "Thêm"} {collection.noun}
        </b>
        <button type="button" className="adm-close" onClick={() => setEditing(null)} aria-label="Đóng">
          <FiX />
        </button>
      </div>

      {collection.fields.map((f) => {
        const id = `f-${f.name}`;
        const label = (
          <span>
            {f.label}
            {f.required && <span className="adm-req">*</span>}
          </span>
        );
        if (f.type === "bool") {
          return (
            <label key={f.name} className="adm-check">
              <input type="checkbox" checked={!!draft[f.name]} onChange={(e) => setField(f.name, e.target.checked)} />
              {f.label}
            </label>
          );
        }
        if (f.type === "media" || f.type === "logo") {
          return (
            <MediaField
              key={f.name}
              field={f}
              label={label}
              value={media[f.name]}
              current={f.type === "logo" ? original?.logo : original?.preview}
              onChange={(v) => setMedia(f.name, v)}
              allowPdf={f.type === "media"}
              redact={f.type === "media"}
            />
          );
        }
        const common = {
          id,
          value: draft[f.name] || "",
          placeholder: f.placeholder || "",
          onChange: (e) => setField(f.name, e.target.value),
        };
        return (
          <label key={f.name} htmlFor={id}>
            {label}
            {f.type === "textarea" || f.type === "lines" ? (
              <textarea rows={f.type === "lines" ? 4 : 3} {...common} />
            ) : (
              <input type={f.type === "date" ? "date" : f.type === "url" ? "url" : "text"} {...common} />
            )}
          </label>
        );
      })}

      <div className="adm-row adm-editor-foot">
        <button type="submit" className="st-btn primary" disabled={!!busy}>
          <FiUploadCloud /> {busy ? "Đang lưu…" : "Lưu & đăng lên GitHub"}
        </button>
        <button type="button" className="st-btn ghost" onClick={() => setEditing(null)} disabled={!!busy}>
          Huỷ
        </button>
      </div>
    </form>
  );
}

function MediaField({ field, label, value, current, onChange, allowPdf, redact }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const pick = async (file) => {
    if (!file) return;
    setErr("");
    if (file.size > 15 * 1024 * 1024) return setErr("File lớn hơn 15 MB, hãy chọn file nhỏ hơn.");
    if (!allowPdf && isPdf(file)) return setErr("Logo cần là file ảnh.");
    setLoading(true);
    try {
      const source = await loadSource(file);
      onChange({ file, source, boxes: [], keepOriginal: true });
    } catch (e) {
      setErr(e.message || "Không đọc được file.");
    } finally {
      setLoading(false);
    }
  };

  const boxes = value?.boxes || [];
  const preview = useMemo(() => value?.source?.url, [value]);

  return (
    <div className="adm-media">
      <span className="adm-label">{label}</span>
      <label className="adm-drop">
        <input
          type="file"
          accept={allowPdf ? "image/*,application/pdf" : "image/*"}
          onChange={(e) => pick(e.target.files && e.target.files[0])}
        />
        <FiUploadCloud />
        <span>
          {loading ? "Đang xử lý…" : value?.file ? value.file.name : current ? "Chọn file khác để thay thế" : "Chọn ảnh" + (allowPdf ? " hoặc PDF" : "")}
        </span>
      </label>
      {err && <p className="adm-err">{err}</p>}

      {preview ? (
        redact ? (
          <>
            <RedactCanvas src={preview} boxes={boxes} onChange={(b) => onChange({ boxes: b })} />
            <label className="adm-check">
              <input
                type="checkbox"
                checked={!!value.keepOriginal && boxes.length === 0}
                disabled={boxes.length > 0}
                onChange={(e) => onChange({ keepOriginal: e.target.checked })}
              />
              Đăng kèm file gốc ({value.file?.name})
              {boxes.length > 0 && <em> — đã tắt vì file gốc vẫn chứa phần bạn vừa che</em>}
            </label>
          </>
        ) : (
          <img className="adm-logo-preview" src={preview} alt="Xem trước" />
        )
      ) : current ? (
        <img className={redact ? "adm-current" : "adm-logo-preview"} src={current} alt="Ảnh hiện tại" />
      ) : null}
      {field.type === "media" && (
        <p className="adm-hint">Ảnh sẽ được nén sang WebP (tối đa 1400px). PDF sẽ được chuyển trang đầu thành ảnh xem trước.</p>
      )}
    </div>
  );
}

export default Admin;
