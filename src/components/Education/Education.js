import React from "react";
import { Container } from "react-bootstrap";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import PageShell from "../UI/PageShell";
import { Journey, ChapterMark } from "../UI/Journey";
// content lives in src/data/*.json and is edited from /admin
import DEGREES from "../../data/degrees.json";
import CERTS from "../../data/certificates.json";

const isRecent = (date) => {
  if (!date) return false;
  const d = new Date(date);
  return !Number.isNaN(d.getTime()) && Date.now() - d.getTime() < 1000 * 60 * 60 * 24 * 365;
};

function Education() {
  return (
    <PageShell
      label="~/education"
      title="Learning, "
      accent="always."
      subtitle="Degrees I've earned, the programme I'm pursuing now, and certifications along the way."
    >
      <Journey>
      {/* ---------- DEGREES ---------- */}
      <Container className="st-section st-chapter pt-0 st-reveal">
        <ChapterMark n="01" name="degrees" note="the foundations" />
        <div className="st-timeline">
          {DEGREES.map((d) => (
            <article className="st-degree" key={d.id || d.title}>
              <div className="st-degree-logo">
                {d.logo ? <img src={d.logo} alt={`${d.school} logo`} /> : <span className="st-degree-initial">{(d.school || "?").charAt(0)}</span>}
              </div>
              <div className="st-degree-body">
                <div className="st-degree-top">
                  <span className={`st-badge${d.current ? "" : " rose"}`}>
                    {d.current && <span className="st-live" />}
                    {d.time}
                  </span>
                </div>
                <h3>{d.title}</h3>
                <p className="st-degree-school">{d.school}</p>
                <ul className="st-points">
                  {(d.points || []).map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {d.website && (
                  <a href={d.website} target="_blank" rel="noreferrer" className="st-link">
                    Visit website <FiArrowUpRight />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>

      {/* ---------- CERTIFICATIONS ---------- */}
      <Container className="st-section st-chapter st-chapter-last pt-0 st-reveal">
        <ChapterMark n="02" name="certifications" note="always learning something new" final />
        <h2 className="st-h2">
          Things I've <em>certified</em>
        </h2>
        <div className="st-certs">
          {CERTS.map((c) => (
            <a className="st-cert" href={c.file || c.preview} target="_blank" rel="noreferrer" key={c.id || c.title}>
              <div className="st-cert-preview">
                <img src={c.preview} alt={`${c.title} certificate`} loading="lazy" decoding="async" />
              </div>
              <div className="st-cert-body">
                <span className="st-cert-issuer mono">
                  {c.issuer}
                  {isRecent(c.date) && <span className="st-new">new</span>}
                </span>
                <h3>{c.title}</h3>
                <span className="go">
                  View certificate <FiExternalLink />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
      </Journey>
    </PageShell>
  );
}

export default Education;
