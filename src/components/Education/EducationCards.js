import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { Document, Page, pdfjs } from 'react-pdf';

// Setup PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//${window.location.host}/pdf.worker.min.js`;

function EducationCards(props) {
    return (
        <Card className="project-card-view">
            {/* Wrapper div để cố định kích thước media cho tất cả cards */}
            <div style={{
                width: '100%',
                height: '300px', // Chiều cao cố định
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#ffffff', // Background trắng cho sạch
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                padding: '20px' // Thêm padding 20px để tạo khoảng trắng xung quanh
            }}>
                {props.isPdf ? (
                    <a href={props.demoLink} target="_blank" rel="noopener noreferrer" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Document
                            file={props.imgPath}
                            loading={<div style={{ padding: '20px', color: '#000' }}>Loading Preview...</div>}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <Page
                                pageNumber={1}
                                height={260} // Giảm height (300 - 40 padding) để fit đẹp
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </Document>
                    </a>
                ) : (
                    <a href={props.ghLink || props.demoLink} target="_blank" rel="noopener noreferrer" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card.Img
                            variant="top"
                            src={props.imgPath}
                            alt="card-img"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                borderRadius: '5px' // Bo góc nhẹ cho ảnh
                            }}
                        />
                    </a>
                )}
            </div>

            <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                <Card.Title className="tech-font" style={{ fontWeight: 700 }}>{props.title}</Card.Title>
                <Card.Text style={{ textAlign: "justify" }}>
                    {props.description}
                </Card.Text>

                {/* Wrapper để đẩy nút xuống dưới cùng */}
                <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                    {/* Nếu có Demo link, hiển thị nút View Certificate */}
                    {!props.isBlog && props.demoLink && (
                        <Button
                            variant="primary"
                            href={props.demoLink}
                            target="_blank"
                            className="tech-font"
                            style={{ width: '100%' }} // Full width button cho đẹp
                        >
                            <CgWebsite /> &nbsp;
                            View Certificate
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default EducationCards;
