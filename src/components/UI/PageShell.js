import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";

// Fade `.st-reveal` children in as they scroll into view.
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const els = root.querySelectorAll(".st-reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

// Soft dotted background + floating blobs shared by every page.
export function SoftBackground() {
  return (
    <div className="st-bg" aria-hidden="true">
      <span className="st-blob b1" />
      <span className="st-blob b2" />
      <span className="st-blob b3" />
    </div>
  );
}

// Page wrapper for inner pages: background, header and content.
function PageShell({ label, title, accent, subtitle, children }) {
  const ref = useReveal();
  return (
    <section className="st-home st-page" ref={ref}>
      <SoftBackground />
      <Container className="st-page-head">
        <span className="st-label">{label}</span>
        <h1 className="st-page-title">
          {title} {accent && <em>{accent}</em>}
        </h1>
        {subtitle && <p className="st-body st-page-sub">{subtitle}</p>}
      </Container>
      {children}
    </section>
  );
}

export default PageShell;
