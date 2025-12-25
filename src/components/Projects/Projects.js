import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {/* Project 1: DFAT (Paper) */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="DFAT"
              description="DFAT: Dual-stage Fusion of Acoustic and Text feature for Speech Emotion Recognition. Implemented a novel approach combining audio and text features to improve emotion recognition accuracy. Published at the 11th International Workshop on Vietnamese Language and Speech Processing (VLSP 2025)."
              ghLink="https://github.com/nhitny/dfat"
              paperLink="https://aclanthology.org/2025.vlsp-1.6/"
            />
          </Col>

          {/* Project 2: RecSys */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Job & Course RecSys"
              description="A Recommendation System designed to suggest relevant jobs and courses to users based on their profiles and preferences. Utilizes Data Mining techniques to analyze user behavior and enhance career development opportunities."
              ghLink="https://github.com/nhitny/Data-Mining-Job-Course-RecSys"
            />
          </Col>

          {/* Project 3: OCR Retrieval */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="OCR & Image Retrieval"
              description="An intelligent system for indexing and retrieving images based on textual content. Integrates Optical Character Recognition (OCR) to extract text from images, enabling efficient search and information retrieval capabilities."
              ghLink="https://github.com/nhitny/ocr-text-image-retrieval"
            />
          </Col>

          {/* Project 4: MoCL */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="MoCL (NAACL 2024)"
              description="Reproduction and experimental study of the MoCL (Momentum Contrast Learning) paper presented at NAACL 2024. Explores contrastive learning frameworks for improving representation learning in NLP tasks."
              ghLink="https://github.com/nhitny/MoCL-NAACL2024-reproduction"
            />
          </Col>

          {/* Project 5: Personal Blog */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Personal Blog"
              description="My personal blogging platform built to share insights, tutorials, and experiences in technology and AI. Features a clean interface, markdown support, and optimized performance for readers."
              ghLink="https://github.com/nhitny/nhitny-blogs"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
