// Client-side media helpers for the admin: everything happens in the browser,
// so only the final (resized / redacted) files are committed to GitHub.

export function slugify(text) {
  return (
    String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "item"
  );
}

export function extOf(file) {
  const fromName = (file.name || "").split(".").pop().toLowerCase();
  if (fromName && fromName.length <= 5) return fromName;
  const map = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "application/pdf": "pdf" };
  return map[file.type] || "bin";
}

export function isPdf(file) {
  return file && (file.type === "application/pdf" || /\.pdf$/i.test(file.name || ""));
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Không đọc được ảnh"));
    img.src = src;
  });
}

/** Render the first page of a PDF to a canvas (uses the pdf.js worker in /public). */
async function pdfToCanvas(file, width = 1600) {
  const pdfjs = await import("pdfjs-dist/build/pdf");
  pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL || ""}/pdf.worker.min.js`;
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data }).promise;
  const page = await pdf.getPage(1);
  const base = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: width / base.width });
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
}

/**
 * Turn an uploaded image or PDF into a drawable source:
 * { el: HTMLImageElement | HTMLCanvasElement, width, height, url }
 */
export async function loadSource(file) {
  if (isPdf(file)) {
    const canvas = await pdfToCanvas(file);
    return { el: canvas, width: canvas.width, height: canvas.height, url: canvas.toDataURL("image/png") };
  }
  const url = URL.createObjectURL(file);
  const img = await loadImage(url);
  return { el: img, width: img.naturalWidth, height: img.naturalHeight, url };
}

/**
 * Export a source as WebP, scaled to at most `maxSize` px on its longest side,
 * with redaction boxes (normalised 0..1 coordinates) painted over.
 */
export function exportWebp(source, { maxSize = 1400, quality = 0.85, redactions = [], fill = "#ffffff" } = {}) {
  const scale = Math.min(1, maxSize / Math.max(source.width, source.height));
  const w = Math.max(1, Math.round(source.width * scale));
  const h = Math.max(1, Math.round(source.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source.el, 0, 0, w, h);
  ctx.fillStyle = fill;
  redactions.forEach((r) => ctx.fillRect(r.x * w, r.y * h, r.w * w, r.h * h));
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Không xuất được ảnh WebP"))), "image/webp", quality)
  );
}

/** "/content/certs/a.webp" → "public/content/certs/a.webp" (only for files we manage). */
export function repoPathFromPublic(url) {
  if (typeof url !== "string" || !url.startsWith("/content/")) return null;
  return `public${url}`;
}
