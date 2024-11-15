import React, { useState } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // Stylish left/right arrows
import { MdOutlineWifiTethering } from "react-icons/md"; // Keep the styled icon but enhance with animations

// Updated image data array with relative paths
const images = [
  { src: "/FL_img1.jpg", title: "Language Training", description: "Achieve fluency with our language training programs. Tailored courses to prepare you for global communication." },
  { src: "/S&S_img2.jpg", title: "Study Abroad", description: "Assistance with securing student visas. Explore educational opportunities across the globe." },
  { src: "/World_Tour.jpg", title: "Work Abroad", description: "Get expert advice on immigration policies. Discover the best travel options for your international journey.." },
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

                  {/* Centered Title and Description with Smooth Fade In */}
                  <div 
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      textAlign: "center",
                      color: "#ffffff",
                      opacity: activeIndex === index ? 1 : 0,
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '1.2rem',
                      transition: 'opacity 1s ease, transform 1s ease',
                      transform: activeIndex === index ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)',
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
                    }}>
                      {image.description}
                    </p>
                  </div>

                  {/* Vertical Navigation Arrows */}
                  <div 
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "20px"
                    }}
                  >
                    {images.map((_, dotIndex) => (
                      <MdOutlineWifiTethering
                        key={dotIndex}
                        onClick={() => handleDotClick(dotIndex)}
                        size={activeIndex === dotIndex ? 30 : 20}
                        color={activeIndex === dotIndex ? "#6c63ff" : "#e9ecef"}
                        style={{
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          transform: activeIndex === dotIndex ? 'scale(1.2)' : 'scale(1)',
                          boxShadow: activeIndex === dotIndex ? '0 0 15px rgba(108, 99, 255, 0.6)' : 'none',
                        }}
                      />
                    ))}
                  </div>

                  {/* Next/Previous Arrow Controls */}
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    right: "20px",
                    transform: "translateY(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    zIndex: 10
                  }}>
                    <AiOutlineLeft
                      size={40}
                      color="#fff"
                      onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
                      style={{ cursor: "pointer", transition: "transform 0.3s", ':hover': { transform: 'scale(1.1)' }}}
                    />
                    <AiOutlineRight
                      size={40}
                      color="#fff"
                      onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                      style={{ cursor: "pointer", transition: "transform 0.3s", ':hover': { transform: 'scale(1.1)' }}}
                    />
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
