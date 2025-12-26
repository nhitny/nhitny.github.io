import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/nhi_chibi.svg";
// import homeLogo from "../../Assets/home-main-nhitny.svg";
import Particle from "../Particle";

import Type from "./Type";
import { HiOutlineMail } from "react-icons/hi";
// import myImg from "../../Assets/avatar-women.svg";
// import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home({ darkMode }) {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        {/* <Particle /> */}
        <Particle darkMode={darkMode} />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name tech-font tech-glow">
                I'M
                <strong className="main-name"> YEN NHI</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <div className="terminal-window">
                  <div className="terminal-header">
                    <div className="terminal-btn red"></div>
                    <div className="terminal-btn yellow"></div>
                    <div className="terminal-btn green"></div>
                    <div className="terminal-title">nhitny@portfolio: ~</div>
                  </div>
                  <div className="terminal-body tech-font">
                    <span style={{ color: '#a855f7', marginRight: '10px' }}>➜</span>
                    <span style={{ color: '#27c93f', marginRight: '10px' }}>~</span>
                    <Type />
                  </div>
                </div>
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <div className="avatar-wrapper" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* Oval Background Effect */}
                <div className="oval-background"></div>

                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid tech-avatar"
                  style={{ maxHeight: "450px", position: "relative", zIndex: 1 }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid className="home-about-section" id="about">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} className="home-about-description">
              <h1 style={{ fontSize: "2.6em", textAlign: "center" }}>
                LET ME <span className="purple"> INTRODUCE </span> MYSELF
              </h1>
              <p className="home-about-body" style={{ textAlign: "justify" }}>
                I am an <b className="purple">AI Engineer</b> specializing in <b className="purple">NLP, RAG, and Large Language Models (LLMs)</b>.
                <br />
                Currently, I am pursuing my <b className="purple">Master's degree in Computer Science</b> at the <b className="purple">University of Information Technology (UIT) - VNUHCM</b>.
                <br />
                <br />
                My technical journey covers a diverse range of technologies:
                <br />
                <i>
                  🔸 <b className="purple">AI & Data Science: </b> Python, PyTorch, RAG pipelines, and LLM fine-tuning.
                  <br />
                  🔸 <b className="purple">Machine Learning: </b> Building and deploying ML models for NLP tasks, including sentiment analysis, text classification, and named entity recognition.
                  <br />
                  🔸 <b className="purple">Deep Learning Frameworks: </b> Expertise in TensorFlow and PyTorch for developing neural networks and transformer-based architectures.
                  <br />
                  🔸 <b className="purple">Creative Coding & IoT: </b> Experience with <b className="purple">Arduino</b> and <b className="purple">Scratch</b> for interactive projects.
                </i>
                <br />
                <br />
                I am passionate about researching and building intelligent systems that can process and understand human language, applying AI to solve real-world problems. My work focuses on creating scalable solutions that bridge the gap between cutting-edge research and practical applications.
                <br />
                <br />
                Beyond technical skills, I enjoy collaborating with cross-functional teams, mentoring junior developers, and staying updated with the latest advancements in AI and machine learning.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="home-about-social">
              <h1>FIND ME ON</h1>
              <p>
                Feel free to <span className="purple">connect </span>with me
              </p>
              <ul className="home-about-social-links">
                <li className="social-icons">
                  <a
                    href="https://github.com/nhitny"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour  home-social-icons"
                  >
                    <AiFillGithub />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="mailto:nhitny2802@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <HiOutlineMail />
                  </a>
                </li>

                <li className="social-icons">
                  <a
                    href="https://www.linkedin.com/in/nhitny2802/"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour  home-social-icons"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://www.instagram.com/__yennhitn__/"
                    target="_blank"
                    rel="noreferrer"
                    className="icon-colour home-social-icons"
                  >
                    <AiFillInstagram />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
