import React from "react";
import { useReveal, SoftBackground } from "../UI/PageShell";
import AwardList from "../UI/AwardCard";
import ALL_PROJECTS from "../../data/projects.json";
import { Journey, ChapterMark } from "../UI/Journey";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import homeLogo from "../../Assets/nhi_chibi.webp";
import Type from "./Type";
import AttentionHero from "./AttentionHero";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { FiArrowRight, FiArrowUpRight, FiFileText } from "react-icons/fi";
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiReact,
  SiNextdotjs,
  SiDocker,
  SiArduino,
  SiScratch,
} from "react-icons/si";

const PAPER_URL = (ALL_PROJECTS.find((p) => p.featured && p.paper) || {}).paper || "https://aclanthology.org/2025.vlsp-1.6/";

const TOOLBOX = [
  {
    group: "AI & NLP",
    items: [
      [SiPytorch, "PyTorch"],
      [null, "Transformers"],
      [null, "RAG pipelines"],
      [null, "LLM fine-tuning"],
      [SiTensorflow, "TensorFlow"],
    ],
  },
  {
    group: "Data & ML",
    items: [
      [SiPython, "Python"],
      [SiScikitlearn, "scikit-learn"],
      [SiPandas, "Pandas"],
      [SiNumpy, "NumPy"],
    ],
  },
  {
    group: "Build & Play",
    items: [
      [SiReact, "React"],
      [SiNextdotjs, "Next.js"],
      [SiDocker, "Docker"],
      [SiArduino, "Arduino"],
      [SiScratch, "Scratch"],
    ],
  },
];

const FEATURED = ALL_PROJECTS.find((p) => p.featured);

// first three non-featured projects from src/data/projects.json
const WORKS = ALL_PROJECTS.filter((p) => !p.featured)
  .slice(0, 3)
  .map((p) => ({ title: p.title, desc: p.desc, tags: (p.tech || []).slice(0, 3), href: p.code || p.demo || "#" }));

const SOCIALS = [
  [AiFillGithub, "GitHub", "https://github.com/nhitny"],
  [FaLinkedinIn, "LinkedIn", "https://www.linkedin.com/in/nhitny2802/"],
  [HiOutlineMail, "Email", "mailto:nhitny.vn@gmail.com"],
  [AiFillInstagram, "Instagram", "https://www.instagram.com/__yennhitn__/"],
];

function Home() {
  const ref = useReveal();

  return (
    <section className="st-home" ref={ref}>
      <SoftBackground />

      {/* ---------- HERO ---------- */}
      <Container className="st-hero">
        <Row className="align-items-center w-100 g-4 mx-0">
          <Col lg={7} className="order-2 order-lg-1 px-0 px-lg-2">
            <div className="st-kicker">
              <span className="st-pulse" />
              <Type />
            </div>

            <div className="st-title-row">
              <h1 className="st-title">
                Hi, I'm <em>Yến Nhi</em>
                <span className="st-spark" aria-hidden="true">✦</span>
              </h1>
              <div className="st-mini-avatar d-lg-none" aria-hidden="true">
                <img src={homeLogo} alt="" />
              </div>
            </div>

            <p className="st-lead">
              <b>AI Engineer</b> and Master's student in Computer Science at{" "}
              <b>UIT – VNUHCM</b>. I work on <b>NLP, RAG and Large Language Models</b> —
              systems that read, listen and understand people.
            </p>

            <AttentionHero />

            <div className="st-cta">
              <Link to="/project" className="st-btn primary">
                See my work <FiArrowRight />
              </Link>
              <a href={PAPER_URL} target="_blank" rel="noreferrer" className="st-btn ghost">
                <FiFileText /> Read my paper
              </a>
              <Link to="/resume" className="st-btn ghost">
                Résumé
              </Link>
            </div>
          </Col>

          <Col lg={5} className="order-1 order-lg-2 d-none d-lg-block">
            <div className="st-avatar">
              <div className="st-avatar-ring" />
              <div className="st-avatar-blob" />
              <img src={homeLogo} alt="Illustration of Yến Nhi" />
              <span className="st-chip c1"><i>●</i>LLMs</span>
              <span className="st-chip c2"><i>●</i>RAG</span>
              <span className="st-chip c3"><i>●</i>speech emotion</span>
              <span className="st-chip c4"><i>●</i>PyTorch</span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* ---------- FACTS ---------- */}
      <Container className="st-reveal">
        <div className="st-facts">
          <div className="st-fact">
            <div className="k">studying</div>
            <div className="v">M.Sc. Computer Science <em>@ UIT</em></div>
          </div>
          <div className="st-fact">
            <div className="k">published</div>
            <div className="v">DFAT <em>@ VLSP 2025</em></div>
          </div>
          <div className="st-fact">
            <div className="k">award</div>
            <div className="v">Top 3 <em>@ VLSP 2026</em></div>
          </div>
          <div className="st-fact">
            <div className="k">focus</div>
            <div className="v">NLP · RAG · <em>LLMs</em></div>
          </div>
        </div>
      </Container>

      <Journey>
      {/* ---------- ABOUT ---------- */}
      <Container className="st-section st-chapter st-reveal" id="about">
        <Row className="g-5">
          <Col lg={6}>
            <ChapterMark n="01" name="about me" note="where it all starts" />
            <h2 className="st-h2">
              Curious about how machines <em>understand</em> us.
            </h2>
            <p className="st-body">
              I research and build intelligent systems that process human language — from
              <b> speech emotion recognition</b> to <b>retrieval-augmented generation</b> and
              <b> LLM fine-tuning</b>. I care about turning research into solutions people can
              actually use.
            </p>
            <p className="st-body">
              Outside the lab I enjoy creative coding with Arduino and Scratch, mentoring
              juniors, and keeping up with what's new in AI.
            </p>
          </Col>
          <Col lg={6}>
            <div className="st-toolbox">
              {TOOLBOX.map(({ group, items }) => (
                <div className="st-tool-group" key={group}>
                  <h4>{group}</h4>
                  <div className="st-tags">
                    {items.map(([Icon, name]) => (
                      <span className="st-tag" key={name}>
                        {Icon && <Icon />}
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      {/* ---------- PUBLICATION ---------- */}
      <Container className="st-section st-chapter pt-0 st-reveal">
        <ChapterMark n="02" name="research & awards" note="milestones along the way" />
        <h2 className="st-h2">Featured <em>research</em></h2>
        <AwardList limit={1} />
        {FEATURED && (
          <article className="st-pub">
            <div className="st-pub-meta">
              {FEATURED.venue && <span className="st-badge">{FEATURED.venue}</span>}
              {(FEATURED.tech || []).slice(0, 2).map((t) => (
                <span className="st-badge rose" key={t}>{t}</span>
              ))}
              {FEATURED.paper && <span className="st-badge">Paper</span>}
            </div>
            <h3>
              <b>{FEATURED.title}</b>
              {FEATURED.full && <>: {FEATURED.full}</>}
            </h3>
            <div className="st-wave" aria-hidden="true">
              {Array.from({ length: 48 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    height: `${30 + Math.abs(Math.sin(i * 0.55)) * 70}%`,
                    animationDelay: `${(i % 12) * -0.13}s`,
                  }}
                />
              ))}
            </div>
            <p className="st-body" style={{ maxWidth: "46rem" }}>
              {FEATURED.desc}
            </p>
            <div className="st-cta" style={{ marginTop: 20 }}>
              {FEATURED.paper && (
                <a href={FEATURED.paper} target="_blank" rel="noreferrer" className="st-btn primary">
                  <FiFileText /> Paper
                </a>
              )}
              {FEATURED.code && (
                <a href={FEATURED.code} target="_blank" rel="noreferrer" className="st-btn ghost">
                  <AiFillGithub /> Code
                </a>
              )}
            </div>
          </article>
        )}
      </Container>

      {/* ---------- SELECTED WORK ---------- */}
      <Container className="st-section st-chapter pt-0 st-reveal">
        <ChapterMark n="03" name="selected work" note="things I've made" />
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-2">
          <div>
            <h2 className="st-h2 mb-0">Things I've <em>built</em></h2>
          </div>
          <Link to="/project" className="st-btn ghost">
            All projects <FiArrowRight />
          </Link>
        </div>
        <div className="st-works mt-4">
          {WORKS.map((w, i) => (
            <a className="st-work" href={w.href} target="_blank" rel="noreferrer" key={w.title}>
              <span className="idx">0{i + 1}</span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
              <div className="st-tags">
                {w.tags.map((t) => (
                  <span className="st-tag" key={t}>{t}</span>
                ))}
              </div>
              <span className="go">
                View on GitHub <FiArrowUpRight />
              </span>
            </a>
          ))}
        </div>
      </Container>

      {/* ---------- CONNECT ---------- */}
      <Container className="st-section st-chapter st-chapter-last pt-0 st-reveal">
        <ChapterMark n="04" name="say hi" note="the next chapter could be ours" final />
        <div className="st-connect">
          <h2 className="st-h2">
            Let's build something <em>kind</em> &amp; clever.
          </h2>
          <p className="st-body mx-auto" style={{ maxWidth: "32rem" }}>
            Open to research collaborations, AI engineering work and good conversations about
            language models.
          </p>
          <div className="st-socials">
            {SOCIALS.map(([Icon, label, href]) => (
              <a
                key={label}
                className="st-social"
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
              >
                <Icon /> {label}
              </a>
            ))}
          </div>
        </div>
      </Container>
      </Journey>
    </section>
  );
}

export default Home;
