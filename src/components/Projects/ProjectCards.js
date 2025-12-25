import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite, CgFileDocument } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  return (
    <Card
      ref={cardRef}
      className={`project-card-view ${isVisible ? 'project-card-visible' : 'project-card-hidden'}`}
    >
      {/* Removed Card.Img as requested */}
      <Card.Body>
        <Card.Title className="tech-font" style={{ fontWeight: 700, fontSize: "1.5em", marginBottom: "15px" }}>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>

        {/* Display Technologies if provided */}
        {props.technologies && (
          <div style={{ marginBottom: "15px", marginTop: "15px", fontSize: "2em", display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
            {props.technologies}
          </div>
        )}
        <Button variant="primary" href={props.ghLink} target="_blank" className="tech-font">
          <BsGithub /> &nbsp;
          {props.isBlog ? "Blog" : "GitHub"}
        </Button>
        {"\n"}
        {"\n"}

        {/* Paper Link Button */}
        {props.paperLink && (
          <Button
            variant="primary"
            href={props.paperLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
            className="tech-font"
          >
            <CgFileDocument /> &nbsp;
            {"Paper"}
          </Button>
        )}

        {/* Demo Link Button */}
        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
            className="tech-font"
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
