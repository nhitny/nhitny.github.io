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
                  <SiPython style={{ color: "#3776AB" }} title="Python" />
                  <SiPytorch style={{ color: "#EE4C2C" }} title="PyTorch" />
                  <BsFileEarmarkMusic style={{ color: "#1DB954" }} title="Audio Processing" />
                  <SiNumpy style={{ color: "#4DABCF" }} title="Numpy" />
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
                  <SiPython style={{ color: "#3776AB" }} title="Python" />
                  <SiScikitlearn style={{ color: "#F7931E" }} title="Scikit-learn" />
                  <SiPandas style={{ color: "#E70488" }} title="Pandas" />
                  <SiMysql style={{ color: "#00758F" }} title="MySQL" />
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
                  <SiPython style={{ color: "#3776AB" }} title="Python" />
                  <SiOpencv style={{ color: "#5C3EE8" }} title="OpenCV" />
                  <SiTensorflow style={{ color: "#FF6F00" }} title="TensorFlow" />
                  <SiDocker style={{ color: "#2496ED" }} title="Docker" />
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
                  <SiPython style={{ color: "#3776AB" }} title="Python" />
                  <SiPytorch style={{ color: "#EE4C2C" }} title="PyTorch" />
                  <SiNumpy style={{ color: "#4DABCF" }} title="Numpy" />
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
                  <SiNextdotjs style={{ color: "#000000" }} title="Next.js" />
                  <SiReact style={{ color: "#61DAFB" }} title="React" />
                  <SiNodedotjs style={{ color: "#339933" }} title="Node.js" />
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
