import React, { useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { FaCircle } from "react-icons/fa"; // Modern dot icon

const images = [
  { src: "/FL_img1.jpg", title: "Language Training", description: "Achieve fluency with our language training programs. Tailored courses to prepare you for global communication." },
  { src: "/S&S_img2.jpg", title: "Study Abroad", description: "Assistance with securing student visas. Explore educational opportunities across the globe." },
  { src: "/World_Tour.jpg", title: "Work Abroad", description: "Get expert advice on immigration policies. Discover the best travel options for your international journey." },
  { src: "/Visa_Consult.jpg", title: "Career Guidance", description: "Guidance to grow your career internationally. Find the best opportunities that match your skillset." }
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
                  {/* Fullscreen Image with Parallax Effect */}
                  <img 
                    src={image.src} 
                    alt={image.title} 
                    style={{
                      width: "100vw",
                      height: "100vh",
                      objectFit: "cover",
                      transition: 'transform 1s ease',
                      transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)'
                    }}
                    className={`d-block carousel-image ${activeIndex === index ? 'animate-blur' : ''}`}
                  />
                  
                  {/* Centered Title and Description */}
                  <div 
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      textAlign: "center",
                      color: "#fff",
                      opacity: activeIndex === index ? 1 : 0,
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '1.2rem',
                      transition: 'opacity 1s ease, transform 1s ease',
                      transform: activeIndex === index ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)',
                      background: 'rgba(0, 0, 0, 0.5)',
                      padding: '20px',
                      borderRadius: '10px',
                      maxWidth: '80%'
                    }}
                  >
                    <h3 style={{
                      fontSize: "2rem", 
                      fontWeight: "600", 
                      margin: "0",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)"
                    }}>
                      {image.title}
                    </h3>
                    <p style={{
                      marginTop: '15px',
                      fontSize: '1.1rem',
                      lineHeight: '1.5',
                      maxWidth: '600px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      color: "#e0e0e0"
                    }}>
                      {image.description}
                    </p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Dotted Indicators at Left Mid */}
          <div 
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              zIndex: 1000
            }}
          >
            {images.map((_, dotIndex) => (
              <FaCircle
                key={dotIndex}
                onClick={() => handleDotClick(dotIndex)}
                size={activeIndex === dotIndex ? 14 : 10}
                color={activeIndex === dotIndex ? "#6c63ff" : "#e9ecef"}
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: activeIndex === dotIndex ? 'scale(1.2)' : 'scale(1)',
                  boxShadow: activeIndex === dotIndex ? '0 0 10px rgba(108, 99, 255, 0.6)' : 'none',
                }}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
