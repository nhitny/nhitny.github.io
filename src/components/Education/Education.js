import React from "react";
import { Container } from "react-bootstrap";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import PageShell from "../UI/PageShell";
import { Journey, ChapterMark } from "../UI/Journey";
import uitLogo from "../../Assets/Educations/uit-logo.png";
import sguLogo from "../../Assets/Educations/sgu-logo.png";
import certAIAnomaly from "../../Assets/Educations/Applications of AI for Anomaly Detection.pdf";
import certAIAgents from "../../Assets/Educations/AI Agents Fundamentals.png";
import certAttention from "../../Assets/Educations/Attention Mechanisms and Transformer Models Course.jpeg";
import certGeminiEducator from "../../Assets/Educations/Gemini Certified Educator.pdf";
import certGeminiFaculty from "../../Assets/Educations/Gemini Certified Faculty.pdf";
import certGeminiStudent from "../../Assets/Educations/Gemini Certified University Student.pdf";
import certGoogleEducator from "../../Assets/Educations/Google Certified Educator Level 1.pdf";
// lightweight pre-rendered previews (the link still opens the original file)
import pvAIAnomaly from "../../Assets/previews/Applications of AI for Anomaly Detection.webp";
import pvAIAgents from "../../Assets/previews/AI Agents Fundamentals.webp";
import pvAttention from "../../Assets/previews/Attention Mechanisms and Transformer Models Course.webp";
import pvGeminiEducator from "../../Assets/previews/Gemini Certified Educator.webp";
import pvGeminiFaculty from "../../Assets/previews/Gemini Certified Faculty.webp";
import pvGeminiStudent from "../../Assets/previews/Gemini Certified University Student.webp";
import pvGoogleEducator from "../../Assets/previews/Google Certified Educator Level 1.webp";
// the ID number printed on the original certificate is redacted in this image
import certGenAI from "../../Assets/previews/Generative AI Foundations.webp";

const DEGREES = [
  {
    logo: uitLogo,
    title: "Master of Computer Science",
    school: "University of Information Technology — VNU-HCM",
    time: "Dec 2024 – Present",
    current: true,
    website: "https://www.uit.edu.vn",
    points: [
      "Specialization in Natural Language Processing (NLP)",
      "Research orientation in language models and generative AI",
    ],
  },
  {
    logo: sguLogo,
    title: "Engineer in Information Technology (High-Quality Program)",
    school: "Saigon University",
    time: "2018 – 2023",
    website: "https://www.sgu.edu.vn/",
    points: [
      "Studied Data Structures, Algorithms, Software Engineering",
      "Completed projects in Web, Mobile and Backend Development",
    ],
  },
];

const CERTS = [
  { file: certGenAI, preview: certGenAI, title: "Generative AI Foundations", issuer: "Pearson · Certiport", isNew: true },
  { file: certAIAnomaly, preview: pvAIAnomaly, title: "Applications of AI for Anomaly Detection", issuer: "NVIDIA" },
  { file: certAIAgents, preview: pvAIAgents, title: "AI Agents Fundamentals", issuer: "Hugging Face" },
  { file: certAttention, preview: pvAttention, title: "Attention Mechanisms and Transformer Models", issuer: "Simplilearn" },
  { file: certGeminiEducator, preview: pvGeminiEducator, title: "Gemini Certified Educator", issuer: "Google for Education" },
  { file: certGeminiFaculty, preview: pvGeminiFaculty, title: "Gemini Certified Faculty", issuer: "Google for Education" },
  { file: certGeminiStudent, preview: pvGeminiStudent, title: "Gemini Certified University Student", issuer: "Google for Education" },
  { file: certGoogleEducator, preview: pvGoogleEducator, title: "Google Certified Educator Level 1", issuer: "Google for Education" },
];

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
            <article className="st-degree" key={d.title}>
              <div className="st-degree-logo">
                <img src={d.logo} alt={`${d.school} logo`} />
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
                  {d.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <a href={d.website} target="_blank" rel="noreferrer" className="st-link">
                  Visit website <FiArrowUpRight />
                </a>
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
            <a className="st-cert" href={c.file} target="_blank" rel="noreferrer" key={c.title}>
              <div className="st-cert-preview">
                <img src={c.preview} alt={`${c.title} certificate`} loading="lazy" decoding="async" />
              </div>
              <div className="st-cert-body">
                <span className="st-cert-issuer mono">
                  {c.issuer}
                  {c.isNew && <span className="st-new">2026</span>}
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
