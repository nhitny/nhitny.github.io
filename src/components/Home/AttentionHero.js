import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

// A tiny, hand-tuned "self-attention" demo.
// Hover / focus a word to see which other words it attends to.
const TOKENS = ["I", "teach", "machines", "to", "read,", "listen", "&", "understand", "people."];

// query index -> [key index, weight]
const ATTENTION = {
  0: [[1, 0.62], [2, 0.31], [7, 0.18]],
  1: [[2, 0.88], [0, 0.46], [4, 0.34]],
  2: [[1, 0.81], [7, 0.66], [4, 0.48], [5, 0.44]],
  3: [[4, 0.52], [1, 0.27]],
  4: [[2, 0.71], [5, 0.58], [7, 0.42]],
  5: [[2, 0.69], [4, 0.6], [8, 0.35]],
  6: [[4, 0.47], [5, 0.45]],
  7: [[8, 0.94], [2, 0.63], [5, 0.38], [4, 0.36]],
  8: [[7, 0.91], [2, 0.49], [1, 0.27]],
};

// order used when nobody is interacting
const AUTOPLAY = [2, 7, 8, 1, 4, 5];

function AttentionHero() {
  const wrapRef = useRef(null);
  const tokRefs = useRef([]);
  const [active, setActive] = useState(AUTOPLAY[0]);
  const [paused, setPaused] = useState(false);
  const [arcs, setArcs] = useState([]);

  // autoplay through interesting words
  useEffect(() => {
    if (paused) return undefined;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    let i = Math.max(0, AUTOPLAY.indexOf(active));
    const id = setInterval(() => {
      i = (i + 1) % AUTOPLAY.length;
      setActive(AUTOPLAY[i]);
    }, 2600);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const q = tokRefs.current[active];
    if (!wrap || !q) return;
    const base = wrap.getBoundingClientRect();
    const qr = q.getBoundingClientRect();
    const sx = qr.left + qr.width / 2 - base.left;
    const sy = qr.top - base.top;

    const next = (ATTENTION[active] || []).map(([k, w]) => {
      const el = tokRefs.current[k];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const ex = r.left + r.width / 2 - base.left;
      const ey = r.top - base.top;
      const lift = Math.min(78, 26 + Math.abs(ex - sx) * 0.22);
      const cy = Math.min(sy, ey) - lift;
      return {
        key: k,
        w,
        d: `M ${sx} ${sy} C ${sx} ${cy}, ${ex} ${cy}, ${ex} ${ey}`,
      };
    });
    setArcs(next.filter(Boolean));
  }, [active]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    // fonts can shift layout after first paint
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const weightOf = (i) => {
    const hit = (ATTENTION[active] || []).find(([k]) => k === i);
    return hit ? hit[1] : 0;
  };

  return (
    <div
      className="st-attn"
      ref={wrapRef}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="st-attn-head">
        <span>
          <span className="st-head-tag">self_attention</span>(query=&quot;{TOKENS[active].replace(/[,.]/g, "")}&quot;)
        </span>
        <span>head 1 / 1</span>
      </div>

      <svg aria-hidden="true">
        <defs>
          <linearGradient id="st-attn-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" style={{ stopColor: "var(--st-accent)" }} />
            <stop offset="100%" style={{ stopColor: "var(--st-accent-2)" }} />
          </linearGradient>
        </defs>
        <g key={active}>
          {arcs.map((a) => (
            <path
              key={a.key}
              d={a.d}
              strokeWidth={1 + a.w * 3}
              opacity={0.3 + a.w * 0.7}
            />
          ))}
        </g>
      </svg>

      <p className="st-sentence" aria-label={TOKENS.join(" ")}>
        {TOKENS.map((t, i) => {
          const w = weightOf(i);
          const isQuery = i === active;
          return (
            <span
              key={t + i}
              ref={(el) => (tokRefs.current[i] = el)}
              className={`st-tok${isQuery ? " is-query" : ""}${w > 0 ? " is-key" : ""}`}
              style={{ "--w": w }}
              tabIndex={0}
              onMouseEnter={() => {
                setPaused(true);
                setActive(i);
              }}
              onFocus={() => {
                setPaused(true);
                setActive(i);
              }}
              onBlur={() => setPaused(false)}
            >
              {t}
              {w > 0 && <span className="st-w">{w.toFixed(2)}</span>}
            </span>
          );
        })}
      </p>

      <div className="st-attn-foot">↳ hover a word — this is how a Transformer decides what to pay attention to.</div>
    </div>
  );
}

export default AttentionHero;
