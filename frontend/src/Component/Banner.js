import React, { useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { MdOutlineWifiTethering } from "react-icons/md";

// Updated image data array with relative paths
const images = [
  { src: "/FL_img1.jpg", title: "Language Training", description: "Enhance your language skills in immersive environments." },
  { src: "/S&S_img2.jpg", title: "Study Abroad", description: "Explore top universities and gain international experience." },
  { src: "/World_Tour.jpg", title: "Work Abroad", description: "Open doors to global job opportunities." },
  { src: "/Visa_Consult.jpg", title: "Career Guidance", description: "Get professional advice to boost your career." }
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
    <Container fluid className="p-0">
      <Row noGutters>
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
                  {/* Fullscreen Image */}
                  <img 
                    src={image.src} 
                    alt={image.title} 
                    style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
                    className={`d-block carousel-image ${activeIndex === index ? 'animate-blur' : ''}`}
                  />

                  {/* Centered Title and Description */}
                  <div 
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
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

                  {/* Vertical Icon Navigation */}
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
                      <MdOutlineWifiTethering
                        key={dotIndex}
                        onClick={() => handleDotClick(dotIndex)}
                        size={activeIndex === dotIndex ? 28 : 20}
                        color={activeIndex === dotIndex ? "#6c63ff" : "#e9ecef"}
                        style={{
                          cursor: "pointer",
                          transition: "all 0.3s ease",
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
