import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter, FaArrowUp } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="text-white py-4"
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #333, #555)',  // Same gradient as EndFooter
        fontFamily: "'Roboto', sans-serif", // Custom font
        transition: 'background 0.5s ease',
      }}
    >
      <Container className="text-center">
        <br />
        <Col className="justify-content-center">
          <div>
            <p style={{ fontSize: '16px', fontWeight: '300' }}>
              <FaLocationDot /> No. 5/1, CS COMPLEX, 1st FLOOR, MULLAI NAGAR, RAYAKOTTA ROAD, HOSUR-635109.
            </p>
            <p style={{ fontSize: '16px', fontWeight: '300' }}>
              <FaPhone /> 82705 28540 
            </p>
            <p style={{ fontSize: '16px', fontWeight: '300' }}>
              <FaPhone /> 98849 45606
              </p>
            <p style={{ fontSize: '16px', fontWeight: '300' }}>
              <IoIosMail /> J99Recruitmentservices@gmail.com
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
              <a href="https://facebook.com/YourPageName" target="_blank" rel="noopener noreferrer">
                <FaFacebook style={{ color: '#3b5998', fontSize: '32px', borderRadius: '50%', transition: 'transform 0.3s' }} />
              </a>
              <a href="https://instagram.com/YourUsername" target="_blank" rel="noopener noreferrer">
                <FaInstagram style={{ color: '#e1306c', fontSize: '32px', borderRadius: '50%', transition: 'transform 0.3s' }} />
              </a>
              <a href="https://wa.me/YourNumber" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp style={{ color: '#25d366', fontSize: '32px', borderRadius: '50%', transition: 'transform 0.3s' }} />
              </a>
              <a href="https://twitter.com/YourUsername" target="_blank" rel="noopener noreferrer">
                <FaTwitter style={{ color: '#1da1f2', fontSize: '32px', borderRadius: '50%', transition: 'transform 0.3s' }} />
              </a>
            </div>
          </div>
        </Col>

        {/* Back to Top Button */}
        <div
          onClick={scrollToTop}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#1da1f2',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <FaArrowUp />
        </div>
      </Container>
    </div>
  );
};

export default Footer;
