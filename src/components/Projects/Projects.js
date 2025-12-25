import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// Import icons
import {
  SiPython, SiPytorch, SiScikitlearn, SiPandas,
  SiOpencv, SiNextdotjs, SiReact, SiNodedotjs,
  SiNumpy, SiMysql, SiTensorflow, SiDocker
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { BsFileEarmarkMusic } from "react-icons/bs";

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
              isBlog={false}
              title="DFAT"
              description="DFAT: Dual-stage Fusion of Acoustic and Text feature for Speech Emotion Recognition. Implemented a novel approach combining audio and text features to improve emotion recognition accuracy using Python and PyTorch. Published at VLSP 2025."
              technologies={
                <>
                  <SiPython title="Python" />
                  <SiPytorch title="PyTorch" />
                  <BsFileEarmarkMusic title="Audio Processing" />
                  <SiNumpy title="Numpy" />
                </>
              }
              ghLink="https://github.com/nhitny/dfat"
              paperLink="https://aclanthology.org/2025.vlsp-1.6/"
            />
          </Col>

          {/* Project 2: RecSys */}
          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Job & Course RecSys"
              description="A Recommendation System designed to suggest relevant jobs and courses utilizing Data Mining techniques. Built with Python, Scikit-learn, and Pandas to analyze user behavior and preferences."
              technologies={
                <>
                  <SiPython title="Python" />
                  <SiScikitlearn title="Scikit-learn" />
                  <SiPandas title="Pandas" />
                  <SiMysql title="MySQL" />
                </>
              }
              ghLink="https://github.com/nhitny/Data-Mining-Job-Course-RecSys"
            />
          </Col>

          {/* Project 3: OCR Retrieval */}
          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="OCR & Image Retrieval"
              description="An intelligent system for indexing and retrieving images based on textual content using Optical Character Recognition (OCR). Leverages OpenCV and Deep Learning models for accurate text extraction."
              technologies={
                <>
                  <SiPython title="Python" />
                  <SiOpencv title="OpenCV" />
                  <SiTensorflow title="TensorFlow" />
                  <SiDocker title="Docker" />
                </>
              }
              ghLink="https://github.com/nhitny/ocr-text-image-retrieval"
            />
          </Col>

          {/* Project 4: MoCL */}
          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="MoCL (NAACL 2024)"
              description="Reproduction and experimental study of the MoCL (Momentum Contrast Learning) paper presented at NAACL 2024. Explores contrastive learning frameworks for NLP tasks using PyTorch."
              technologies={
                <>
                  <SiPython title="Python" />
                  <SiPytorch title="PyTorch" />
                  <SiNumpy title="Numpy" />
                </>
              }
              ghLink="https://github.com/nhitny/MoCL-NAACL2024-reproduction"
            />
          </Col>

          {/* Project 5: Personal Blog */}
          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Personal Blog"
              description="My personal blogging platform built to share insights and experience. Developed with Next.js and React for a fast, responsive, and SEO-friendly user experience."
              technologies={
                <>
                  <SiNextdotjs title="Next.js" />
                  <SiReact title="React" />
                  <SiNodedotjs title="Node.js" />
                </>
              }
              ghLink="https://github.com/nhitny/nhitny-blogs"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
