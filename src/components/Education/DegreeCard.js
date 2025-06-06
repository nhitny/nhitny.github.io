// // src/components/Education/DegreeCard.js
// import React from "react";
// import Card from "react-bootstrap/Card";

// function DegreeCard(props) {
//     return (
//         <Card className="project-card-view">
//             <Card.Body>
//                 <Card.Title>{props.title}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">
//                     {props.school}
//                 </Card.Subtitle>
//                 <Card.Text>{props.content}</Card.Text>
//                 <div className="text-end fw-bold text-danger">{props.time}</div>
//             </Card.Body>
//         </Card>
//     );
// }

// export default DegreeCard;


import React from "react";
import Card from "react-bootstrap/Card";
import { Row, Col, Button } from "react-bootstrap";

function DegreeCard({ logo, title, school, time, details, website }) {
    return (
        <Row className="align-items-center mb-4">
            {/* LOGO BÊN TRÁI */}
            <Col md={2} className="d-flex align-items-center justify-content-center">
                <div className="edu-logo-img">
                    <img src={logo} alt="UIT logo" />
                </div>
            </Col>

            {/* CARD BẰNG CẤP */}
            <Col md={10}>
                <Card className="project-card-view">
                    <div style={{ backgroundColor: "#a855f7", color: "white", padding: "10px 20px", borderTopLeftRadius: "6px", borderTopRightRadius: "6px" }}>
                        <Row>
                            <Col>
                                <h5 style={{ fontWeight: "600" }}>{title}</h5>
                                <h6 style={{ fontWeight: "bold" }}>{school}</h6>
                            </Col>
                            <Col xs="auto" className="d-flex align-items-start">
                                <span style={{ fontWeight: "bold" }}>{time}</span>
                            </Col>
                        </Row>
                    </div>
                    <Card.Body style={{ padding: "20px" }}>
                        <div className="edu-details-text">{details}</div>
                        {website && (
                            <div className="text-end mt-3">
                                <Button
                                    variant="danger"
                                    href={website}
                                    target="_blank"
                                    style={{
                                        fontWeight: "bold",
                                        padding: "6px 18px",
                                        backgroundColor: "#a855f7",  // 🎨 màu tím nền
                                        borderColor: "#a855f7",      // 🎨 viền tím
                                        color: "white"               // ✨ chữ trắng
                                    }}                                >
                                    Visit Website
                                </Button>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default DegreeCard;

