import React, { useRef, useState } from "react";

// Shows a preview and lets you drag boxes over sensitive parts (ID numbers…).
// Boxes are stored as normalised {x, y, w, h} in 0..1 and painted white on export.
function RedactCanvas({ src, boxes, onChange }) {
  const wrapRef = useRef(null);
  const [draft, setDraft] = useState(null);

  const point = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
      y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
    };
  };

  const onDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = point(e);
    setDraft({ x0: p.x, y0: p.y, x1: p.x, y1: p.y });
  };
  const onMove = (e) => {
    if (!draft) return;
    const p = point(e);
    setDraft((d) => ({ ...d, x1: p.x, y1: p.y }));
  };
  const onUp = () => {
    if (!draft) return;
    const box = {
      x: Math.min(draft.x0, draft.x1),
      y: Math.min(draft.y0, draft.y1),
      w: Math.abs(draft.x1 - draft.x0),
      h: Math.abs(draft.y1 - draft.y0),
    };
    setDraft(null);
    if (box.w > 0.01 && box.h > 0.008) onChange([...boxes, box]);
  };

  const live = draft && {
    x: Math.min(draft.x0, draft.x1),
    y: Math.min(draft.y0, draft.y1),
    w: Math.abs(draft.x1 - draft.x0),
    h: Math.abs(draft.y1 - draft.y0),
  };

  return (
    <div className="adm-redact">
      <div
        className="adm-redact-stage"
        ref={wrapRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={() => setDraft(null)}
      >
        <img src={src} alt="Xem trước" draggable={false} />
        {boxes.map((b, i) => (
          <span
            key={i}
            className="adm-box"
            style={{ left: `${b.x * 100}%`, top: `${b.y * 100}%`, width: `${b.w * 100}%`, height: `${b.h * 100}%` }}
          >
            <button
              type="button"
              className="adm-box-x"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => onChange(boxes.filter((_, j) => j !== i))}
              aria-label="Bỏ vùng che này"
            >
              ×
            </button>
          </span>
        ))}
        {live && (
          <span
            className="adm-box is-draft"
            style={{ left: `${live.x * 100}%`, top: `${live.y * 100}%`, width: `${live.w * 100}%`, height: `${live.h * 100}%` }}
          />
        )}
      </div>
      <p className="adm-hint">
        Kéo chuột (hoặc ngón tay) trên ảnh để <b>che</b> thông tin nhạy cảm như số CCCD, số điện thoại. Vùng che sẽ
        được tô trắng trước khi tải lên.
        {boxes.length > 0 && (
          <>
            {" "}
            <button type="button" className="adm-linkbtn" onClick={() => onChange([])}>
              Xoá hết vùng che
            </button>
          </>
        )}
      </p>
    </div>
  );
}

export default RedactCanvas;
