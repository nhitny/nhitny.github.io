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
            {/* Nếu là PDF, hiển thị preview trang đầu */}
            {props.isPdf ? (
                <a href={props.demoLink} target="_blank" rel="noopener noreferrer">
                    <div style={{
                        width: '100%',
                        height: '300px',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#f5f5f5'
                    }}>
                        <Document
                            file={props.imgPath}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={<div style={{ padding: '20px' }}>Loading PDF...</div>}
                        >
                            <Page
                                pageNumber={1}
                                width={350}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </Document>
                    </div>
                </a>
            ) : (
                /* Nếu là ảnh thường, hiển thị như cũ */
                <a href={props.ghLink} target="_blank" rel="noopener noreferrer">
                    <Card.Img variant="top" src={props.imgPath} alt="card-img" />
                </a>
            )}

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
