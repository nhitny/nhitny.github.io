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
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
