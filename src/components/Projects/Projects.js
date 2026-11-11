import React from "react";
import { Container } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { FiArrowUpRight, FiFileText } from "react-icons/fi";
import PageShell from "../UI/PageShell";
import AwardList from "../UI/AwardCard";
import { Journey, ChapterMark } from "../UI/Journey";
import { techIcon } from "../../data/techIcons";
// content lives in src/data/projects.json and is edited from /admin
import ALL_PROJECTS from "../../data/projects.json";

const FEATURED = ALL_PROJECTS.filter((p) => p.featured);
const PROJECTS = ALL_PROJECTS.filter((p) => !p.featured);

function TechTags({ items = [] }) {
  return (
    <div className="st-tags">
      {items.map((name) => {
        const Icon = techIcon(name);
        return (
          <span className="st-tag" key={name}>
            {Icon && <Icon />} {name}
          </span>
        );
      })}
    </div>
  );
}

function Projects() {
  return (
    <PageShell
      label="~/projects"
      title="Things I've"
      accent="built."
      subtitle="Research code, experiments and side projects — mostly NLP, speech and retrieval."
    >
      <Journey>
      {/* ---------- FEATURED ---------- */}
      <Container className="st-section st-chapter pt-0 st-reveal">
        <ChapterMark n="01" name="highlights" note="the ones I'm proudest of" />
        <AwardList />
        {FEATURED.map((f) => (
          <article className="st-pub" key={f.id || f.title} style={{ marginBottom: 18 }}>
            <div className="st-pub-meta">
              {f.venue && <span className="st-badge">{f.venue}</span>}
              {f.paper && <span className="st-badge rose">Published paper</span>}
            </div>
            <h3>
              <b>{f.title}</b>
              {f.full && <>: {f.full}</>}
            </h3>
            <p className="st-body" style={{ maxWidth: "46rem" }}>
              {f.desc}
            </p>
            <TechTags items={f.tech} />
            <div className="st-cta" style={{ marginTop: 22 }}>
              {f.paper && (
                <a href={f.paper} target="_blank" rel="noreferrer" className="st-btn primary">
                  <FiFileText /> Paper
                </a>
              )}
              {f.code && (
                <a href={f.code} target="_blank" rel="noreferrer" className={`st-btn ${f.paper ? "ghost" : "primary"}`}>
                  <AiFillGithub /> Code
                </a>
              )}
              {f.demo && (
                <a href={f.demo} target="_blank" rel="noreferrer" className="st-btn ghost">
                  Live <FiArrowUpRight />
                </a>
              )}
            </div>
          </article>
        ))}
      </Container>

      {/* ---------- ALL PROJECTS ---------- */}
      <Container className="st-section st-chapter st-chapter-last pt-0 st-reveal">
        <ChapterMark n="02" name="more projects" note="experiments & side quests" final />
        <div className="st-works st-works-2 mt-3">
          {PROJECTS.map((p, i) => (
            <article className="st-work" key={p.id || p.title}>
              <span className="idx">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <TechTags items={p.tech} />
              <div className="st-work-links">
                {p.code && (
                  <a href={p.code} target="_blank" rel="noreferrer" className="st-link">
                    <AiFillGithub /> GitHub
                  </a>
                )}
                {p.paper && (
                  <a href={p.paper} target="_blank" rel="noreferrer" className="st-link">
                    <FiFileText /> Paper
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="st-link">
                    Live site <FiArrowUpRight />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
      </Journey>
    </PageShell>
  );
}

export default Projects;
