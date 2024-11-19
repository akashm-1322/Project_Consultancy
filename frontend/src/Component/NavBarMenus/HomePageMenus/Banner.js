import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCircleDot } from 'react-icons/fa6'; // Updated icon
import './Banner.css';

const videos = [
  {
    src: '/videos/Language_Learning_1.mp4',
    title: 'Language Coaching',
    description: 'Achieve fluency with our language training programs. Tailored courses to prepare you for global communication.',
  },
  {
    src: '/videos/Study_Abroad_1.mp4',
    title: 'Study Abroad',
    description: 'Assistance with securing student visas. Explore educational opportunities across the globe.',
  },
  {
    src: '/videos/Work_Abroad_1.mp4',
    title: 'Travel and Work Abroad',
    description: 'Do what you like at where you want. Discover the best travel options for your international journey.',
  },
  {
    src: '/videos/Domestic_Recruitment_1.mp4',
    title: 'Domestic Placements',
    description: 'Guidance to grow your career inside India. Find the best opportunities that match your skillset.',
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef(null);

  // Automatically progress videos
  useEffect(() => {
    const currentVideo = videoRef.current;

    const handleVideoEnd = () => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    if (currentVideo) {
      currentVideo.addEventListener('ended', handleVideoEnd);
      currentVideo.play(); // Ensures videos autoplay on load
    }

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [activeIndex]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Container fluid className="p-0 banner-container">
      <Row noGutters>
        <Col xs={12} className="position-relative">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`video-slide ${activeIndex === index ? 'active' : ''}`}
              style={{ display: activeIndex === index ? 'block' : 'none' }}
            >
              <video
                ref={activeIndex === index ? videoRef : null}
                src={video.src}
                autoPlay
                muted
                loop={false}
                style={{
                  width: '100vw',
                  height: '100vh',
                  objectFit: 'cover',
                }}
              />
              <div
                className={`video-content ${
                  activeIndex === index ? 'fade-in' : ''
                }`}
              >
                <h3 className="video-title">{video.title}</h3>
                <p className="video-description">{video.description}</p>
              </div>
            </div>
          ))}
          <div className="dot-container">
            {videos.map((_, dotIndex) => (
              <FaCircleDot
                key={dotIndex}
                onClick={() => handleDotClick(dotIndex)}
                size={activeIndex === dotIndex ? 24 : 18}
                className={`dot ${activeIndex === dotIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
