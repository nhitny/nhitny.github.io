import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { Document, Page, pdfjs } from 'react-pdf';

// Setup PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function EducationCards(props) {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

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
                borderTopRightRadius: '10px'
            }}>
                {props.isPdf ? (
                    <a href={props.demoLink} target="_blank" rel="noopener noreferrer" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Document
                            file={props.imgPath}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={<div style={{ padding: '20px', color: '#000' }}>Loading Preview...</div>}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <Page
                                pageNumber={1}
                                height={300} // Set theo chiều cao
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
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain', // Đảm bảo ảnh không bị méo
                                padding: '10px',
                                borderRadius: '10px 10px 0 0'
                            }}
                        />
                    </a>
                )}
            </div>

            <Card.Body>
                <Card.Title className="tech-font" style={{ fontWeight: 700 }}>{props.title}</Card.Title>
                <Card.Text style={{ textAlign: "justify" }}>
                    {props.description}
                </Card.Text>
                {"\n"}
                {"\n"}

                {/* Nếu có Demo link, hiển thị nút View Certificate */}
                {!props.isBlog && props.demoLink && (
                    <Button
                        variant="primary"
                        href={props.demoLink}
                        target="_blank"
                        className="tech-font"
                    >
                        <CgWebsite /> &nbsp;
                        View Certificate
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}

export default EducationCards;
