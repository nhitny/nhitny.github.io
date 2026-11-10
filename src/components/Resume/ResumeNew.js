import React from "react";
import { Container } from "react-bootstrap";
import { FiDownload, FiMail } from "react-icons/fi";
import PageShell from "../UI/PageShell";
import pdf from "../../Assets/CV_Nhitny.pdf";
// Pages pre-rendered from CV_Nhitny.pdf so the page loads instantly.
// If you update the PDF, re-render these two images too.
import cvPage1 from "../../Assets/previews/CV_Nhitny-p1.webp";
import cvPage2 from "../../Assets/previews/CV_Nhitny-p2.webp";

const PAGES = [cvPage1, cvPage2];

function ResumeNew() {
  return (
    <PageShell
      label="~/resume"
      title="My"
      accent="résumé."
      subtitle="The short version of my story — education, research and teaching."
    >
      <Container className="st-section pt-0">
        <div className="st-cta st-resume-cta">
          <a href={pdf} target="_blank" rel="noreferrer" className="st-btn primary">
            <FiDownload /> Download CV
          </a>
          <a href="mailto:nhitny.vn@gmail.com" className="st-btn ghost">
            <FiMail /> Contact me
          </a>
        </div>

        <div className="st-paper">
          {PAGES.map((src, i) => (
            <a key={src} href={pdf} target="_blank" rel="noreferrer" className="st-paper-page">
              <img
                src={src}
                alt={`Résumé of Truong Nguyen Yen Nhi — page ${i + 1}`}
                width="1600"
                height="2070"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </a>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}

export default ResumeNew;
