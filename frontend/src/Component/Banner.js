import React, { useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import Study from "../Asset/Study.jpg";
import lang from "../Asset/Language_Training.jpg";
import WorkAbroad from "../Asset/Work_Abroad.jpg";
import career from "../Asset/Career_Advancement.jpg";

const images = [
  { src: Study, title: "Study Abroad", description: "Explore top universities and gain international experience." },
  { src: lang, title: "Language Training", description: "Enhance your language skills in immersive environments." },
  { src: WorkAbroad, title: "Work Abroad", description: "Open doors to global job opportunities." },
  { src: career, title: "Career Guidance", description: "Get professional advice to boost your career." }
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Carousel 
            activeIndex={activeIndex} 
            onSelect={handleSelect} 
            indicators={false} 
            controls={false} 
            interval={3000} 
            className="carousel slide"
          >
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <div style={{ position: "relative" }}>
                  <img 
                    src={image.src} 
                    alt={image.title} 
                    className={`d-block w-100 carousel-image ${activeIndex === index ? 'animate-blur' : ''}`}
                  />

                  {/* Centered Title and Description */}
                  <div 
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "30%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      color: "#ffffff",
                      opacity: activeIndex === index ? 1 : 0,
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '1.2rem',
                      transition: 'opacity 0.8s ease 0.5s'
                    }}
                  >
                    <h3 style={{ fontSize: "2rem", fontWeight: "600", margin: "0" }}>{image.title}</h3>
                    <p>{image.description}</p>
                  </div>

                  {/* Vertical Dot Navigation Inside Image */}
                  <div 
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    {images.map((_, dotIndex) => (
                      <div 
                        key={dotIndex}
                        onClick={() => handleDotClick(dotIndex)}
                        style={{
                          width: activeIndex === dotIndex ? "24px" : "16px",
                          height: activeIndex === dotIndex ? "24px" : "16px",
                          backgroundColor: activeIndex === dotIndex ? "#6c63ff" : "#e9ecef",
                          border: activeIndex === dotIndex ? "2px solid #ffffff" : "none",
                          borderRadius: "50%",
                          cursor: "pointer",
                          transition: "all 0.3s ease"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
