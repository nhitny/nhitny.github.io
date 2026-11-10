import React from "react";
import { Container } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { FiArrowUpRight, FiFileText } from "react-icons/fi";
import {
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiOpencv,
  SiNextdotjs,
  SiReact,
  SiFirebase,
  SiNumpy,
  SiMysql,
  SiTensorflow,
  SiDocker,
} from "react-icons/si";
import { BsFileEarmarkMusic } from "react-icons/bs";
import PageShell from "../UI/PageShell";
import AwardCard from "../UI/AwardCard";
import { Journey, ChapterMark } from "../UI/Journey";

const FEATURED = {
  title: "DFAT",
  full: "Dual-stage Fusion of Acoustic and Text features for Speech Emotion Recognition",
  desc:
    "A novel approach that combines audio and text features in two fusion stages to recognise emotion in speech more accurately. Built with Python and PyTorch.",
  venue: "VLSP 2025",
  tech: [
    [SiPython, "Python"],
    [SiPytorch, "PyTorch"],
    [BsFileEarmarkMusic, "Audio"],
    [SiNumpy, "NumPy"],
  ],
  code: "https://github.com/nhitny/dfat",
  paper: "https://aclanthology.org/2025.vlsp-1.6/",
};

const PROJECTS = [
  {
    title: "Job & Course RecSys",
    desc:
      "A recommendation system that suggests relevant jobs and courses using data mining — analysing user behaviour and preferences.",
    tech: [
      [SiPython, "Python"],
      [SiScikitlearn, "scikit-learn"],
      [SiPandas, "Pandas"],
      [SiMysql, "MySQL"],
    ],
    code: "https://github.com/nhitny/Data-Mining-Job-Course-RecSys",
  },
  {
    title: "OCR & Image Retrieval",
    desc:
      "Indexes and retrieves images by the text inside them, using OCR with OpenCV and deep learning models for accurate extraction.",
    tech: [
      [SiPython, "Python"],
      [SiOpencv, "OpenCV"],
      [SiTensorflow, "TensorFlow"],
      [SiDocker, "Docker"],
    ],
    code: "https://github.com/nhitny/ocr-text-image-retrieval",
  },
  {
    title: "MoCL — NAACL 2024",
    desc:
      "Reproduction and experimental study of the MoCL paper (NAACL 2024), exploring contrastive learning frameworks for NLP tasks.",
    tech: [
      [SiPython, "Python"],
      [SiPytorch, "PyTorch"],
      [SiNumpy, "NumPy"],
    ],
    code: "https://github.com/nhitny/MoCL-NAACL2024-reproduction",
  },
  {
    title: "Personal Blog",
    desc:
      "My blogging platform for sharing notes on AI and engineering — a rich-text editor, comments, likes and math rendering.",
    tech: [
      [SiNextdotjs, "Next.js"],
      [SiReact, "React"],
      [SiFirebase, "Firebase"],
    ],
    code: "https://github.com/nhitny/nhitny-blogs",
    demo: "https://nhitny-blogs.vercel.app",
  },
];

function TechTags({ items }) {
  return (
    <div className="st-tags">
      {items.map(([Icon, name]) => (
        <span className="st-tag" key={name}>
          <Icon /> {name}
        </span>
      ))}
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
        <AwardCard />
        <article className="st-pub">
          <div className="st-pub-meta">
            <span className="st-badge">{FEATURED.venue}</span>
            <span className="st-badge rose">Published paper</span>
          </div>
          <h3>
            <b>{FEATURED.title}</b>: {FEATURED.full}
          </h3>
          <p className="st-body" style={{ maxWidth: "46rem" }}>
            {FEATURED.desc}
          </p>
          <TechTags items={FEATURED.tech} />
          <div className="st-cta" style={{ marginTop: 22 }}>
            <a href={FEATURED.paper} target="_blank" rel="noreferrer" className="st-btn primary">
              <FiFileText /> Paper
            </a>
            <a href={FEATURED.code} target="_blank" rel="noreferrer" className="st-btn ghost">
              <AiFillGithub /> Code
            </a>
          </div>
        </article>
      </Container>

      {/* ---------- ALL PROJECTS ---------- */}
      <Container className="st-section st-chapter st-chapter-last pt-0 st-reveal">
        <ChapterMark n="02" name="more projects" note="experiments & side quests" final />
        <div className="st-works st-works-2 mt-3">
          {PROJECTS.map((p, i) => (
            <article className="st-work" key={p.title}>
              <span className="idx">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <TechTags items={p.tech} />
              <div className="st-work-links">
                <a href={p.code} target="_blank" rel="noreferrer" className="st-link">
                  <AiFillGithub /> GitHub
                </a>
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
