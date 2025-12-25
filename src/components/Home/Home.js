import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-anime-tech.png";
// import homeLogo from "../../Assets/home-main-nhitny.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import CircuitAnimation from "./CircuitAnimation";

function Home({ darkMode }) {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        {/* <Particle /> */}
        <Particle darkMode={darkMode} />
        <CircuitAnimation />
        <Container className="home-content" style={{ position: 'relative', zIndex: 2 }}>
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
              <div className="avatar-wrapper">
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid tech-avatar"
                  style={{ maxHeight: "450px" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}
export default Home;

