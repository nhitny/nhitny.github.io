// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import ProjectCard from "./EducationCards";
// import DegreeCard from "./DegreeCard"; // ⬅️ Thêm dòng này
// import Particle from "../Particle";
// import leaf from "../../Assets/Educations/leaf.png";
// import emotion from "../../Assets/Educations/emotion.png";
// import editor from "../../Assets/Educations/codeEditor.png";
// import chatify from "../../Assets/Educations/chatify.png";
// import suicide from "../../Assets/Educations/suicide.png";
// import bitsOfCode from "../../Assets/Educations/blog.png";

// function Educations() {
//   return (
//     <Container fluid className="project-section">
//       <Particle />
//       <Container>

//         {/* 🎓 PHẦN EDUCATION */}
//         <h1 className="project-heading">
//           My <strong className="purple">Education</strong>
//         </h1>
//         <p style={{ color: "white" }}>
//           Basic Qualifications and Degrees I’ve earned over the years.
//         </p>
//         <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
//           <Col md={6} className="project-card">
//             <DegreeCard
//               title="Master Degree in Computer Science"
//               school="University of Information Technology, VNU-HCM"
//               time="2020 – 2022"
//               content={
//                 <ul>
//                   <li>⚡ Specialized in NLP, Deep Learning & Big Data</li>
//                   <li>⚡ Research on spell-checking and error correction</li>
//                   <li>⚡ Applied ML/DL to solve NLP problems</li>
//                   <li>⚡ Participated in academic research on NLP systems</li>
//                 </ul>
//               }
//             />
//           </Col>

//           <Col md={6} className="project-card">
//             <DegreeCard
//               title="Engineer Degree in Software Engineering"
//               school="University of Information Technology, VNU-HCM"
//               time="2015 – 2020"
//               content={
//                 <ul>
//                   <li>⚡ Learned OOP, Design Patterns, Algorithms</li>
//                   <li>⚡ Focused on Backend, Web & Mobile Development</li>
//                   <li>⚡ Built multiple real-world software projects</li>
//                 </ul>
//               }
//             />
//           </Col>
//         </Row>

//         {/* 🏆 PHẦN CERTIFICATIONS */}
//         <h1 className="project-heading">
//           My <strong className="purple">Certifications</strong>
//         </h1>
//         <p style={{ color: "white" }}>
//           Here are a few certifications I've worked on recently.
//         </p>
//         <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
//           <Col md={4} className="project-card">
//             <ProjectCard imgPath={chatify} isBlog={false} title="Chatify" ghLink="https://github.com/soumyajit4419/Chatify" />
//           </Col>
//           <Col md={4} className="project-card">
//             <ProjectCard imgPath={bitsOfCode} isBlog={false} title="Bits-0f-C0de" ghLink="https://github.com/soumyajit4419/Bits-0f-C0de" />
//           </Col>
//           <Col md={4} className="project-card">
//             <ProjectCard imgPath={editor} isBlog={false} title="Editor.io" ghLink="https://github.com/soumyajit4419/Editor.io" />
//           </Col>
//           <Col md={4} className="project-card">
//             <ProjectCard imgPath={leaf} isBlog={false} title="Plant AI" ghLink="https://github.com/soumyajit4419/Plant_AI" />
//           </Col>
//           <Col md={4} className="project-card">
//             <ProjectCard imgPath={suicide} isBlog={false} title="Ai For Social Good" ghLink="https://github.com/soumyajit4419/AI_For_Social_Good" />
//           </Col>
//           <Col md={4} className="project-card">
//             <ProjectCard imgPath={emotion} isBlog={false} title="Face Recognition and Emotion Detection" ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection" />
//           </Col>
//         </Row>

//       </Container>
//     </Container>
//   );
// }

// export default Educations;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./EducationCards";
import DegreeCard from "./DegreeCard"; // ⬅️ Thêm dòng này
import Particle from "../Particle";

// Logo và hình ảnh
import uitLogo from "../../Assets/Educations/uit-logo.png";
import sguLogo from "../../Assets/Educations/sgu-logo.png";

// Certificates
import certAIAnomaly from "../../Assets/Educations/Applications of AI for Anomaly Detection.pdf";
import certAIAgents from "../../Assets/Educations/AI Agents Fundamentals.png";
import certAttention from "../../Assets/Educations/Attention Mechanisms and Transformer Models Course.jpeg";
import certGeminiEducator from "../../Assets/Educations/Gemini Certified Educator.pdf";
import certGeminiFaculty from "../../Assets/Educations/Gemini Certified Faculty.pdf";
import certGeminiStudent from "../../Assets/Educations/Gemini Certified University Student.pdf";
import certGoogleEducator from "../../Assets/Educations/Google Certified Educator Level 1.pdf";

function Educations() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>

        {/* === PHẦN EDUCATION === */}
        <h1 className="project-heading">
          My <strong className="purple">Education</strong>
        </h1>
        <p className="edu-subtitle">
          Degrees I've earned and programs I'm currently pursuing.
        </p>

        <Row>
          <Col md={12}>
            <DegreeCard
              logo={uitLogo}
              title="Master Degree in Computer Science"
              school="The University of Information Technology, Vietnam National University, HCM City"
              time="Dec 2024 – Present"
              website="https://www.uit.edu.vn"
              details={
                <ul className="edu-bullet-list">
                  <li>⚡ Specialization in Natural Language Processing (NLP)</li>
                  <li>⚡ Research orientation in language models and generative AI</li>
                </ul>
              }
            />
          </Col>

          <Col md={12}>
            <DegreeCard
              logo={sguLogo}
              title="Engineer Degree in Information Technology (High-Quality Program)"
              school="Saigon University"
              time="2018 – 2023"
              website="https://www.sgu.edu.vn/"
              details={
                <ul className="edu-bullet-list">
                  <li>⚡ Studied Data Structures, Algorithms, Software Engineering</li>
                  <li>⚡ Completed projects in Web Development, Mobile, and Backend Development</li>
                </ul>
              }
            />
          </Col>
        </Row>

        {/* === PHẦN CERTIFICATIONS === */}
        <h1 className="project-heading">
          My <strong className="purple">Certifications</strong>
        </h1>
        <p className="edu-subtitle">
          Here are a few certifications I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={certAIAnomaly}
              isBlog={false}
              isPdf={true}
              title="Applications of AI for Anomaly Detection"
              demoLink={certAIAnomaly}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={certAIAgents}
              isBlog={false}
              title="AI Agents Fundamentals"
              demoLink={certAIAgents}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={certAttention}
              isBlog={false}
              title="Attention Mechanisms and Transformer Models"
              demoLink={certAttention}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={certGeminiEducator}
              isBlog={false}
              isPdf={true}
              title="Gemini Certified Educator"
              demoLink={certGeminiEducator}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={certGeminiFaculty}
              isBlog={false}
              isPdf={true}
              title="Gemini Certified Faculty"
              demoLink={certGeminiFaculty}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={certGeminiStudent}
              isBlog={false}
              isPdf={true}
              title="Gemini Certified University Student"
              demoLink={certGeminiStudent}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={certGoogleEducator}
              isBlog={false}
              isPdf={true}
              title="Google Certified Educator Level 1"
              demoLink={certGoogleEducator}
            />
          </Col>
        </Row>

      </Container>
    </Container>
  );
}

export default Educations;
