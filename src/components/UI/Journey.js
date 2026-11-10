import React, { useEffect, useRef } from "react";

// Wraps a list of `.st-chapter` sections and drives the scroll "journey":
// each chapter gets --p (0 → 1, how far you've scrolled through it) and
// `is-active` once it reaches the middle of the screen.
export function Journey({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const chapters = Array.from(root.querySelectorAll(".st-chapter"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.55;
      chapters.forEach((ch) => {
        const r = ch.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height)));
        ch.style.setProperty("--p", p.toFixed(3));
        ch.classList.toggle("is-active", r.top < mid);
        ch.classList.toggle("is-done", p >= 1);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`st-journey ${className}`} ref={ref}>
      {children}
    </div>
  );
}

// The milestone marker at the top of a chapter.
export function ChapterMark({ n, name, note, final = false }) {
  return (
    <div className={`st-chapter-mark${final ? " is-final" : ""}`}>
      <span className="st-node" aria-hidden="true">
        {final ? "✦" : ""}
      </span>
      <span className="st-chapter-num" aria-hidden="true">
        {n}
      </span>
      <span className="st-chapter-meta">
        <span className="st-chapter-kicker">chapter {n}</span>
        <b>{name}</b>
        {note && <i>{note}</i>}
      </span>
    </div>
  );
}

export default Journey;
