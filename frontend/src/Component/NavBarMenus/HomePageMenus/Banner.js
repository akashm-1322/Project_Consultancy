import React, { useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { FaCircle } from "react-icons/fa"; // Modern dot icon
import './Banner.css'; // Importing the external CSS file

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
                <div className="carousel-container">
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
                    className={`carousel-item-content ${activeIndex === index ? 'active' : ''}`}
                  >
                    <h3 className="carousel-title">
                      {image.title}
                    </h3>
                    <p className="carousel-description">
                      {image.description}
                    </p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Dotted Indicators at Left Mid */}
          <div className="carousel-dot-container">
            {images.map((_, dotIndex) => (
              <FaCircle
                key={dotIndex}
                onClick={() => handleDotClick(dotIndex)}
                size={activeIndex === dotIndex ? 14 : 10}
                className={`carousel-dot ${activeIndex === dotIndex ? 'active' : 'passive'}`}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
