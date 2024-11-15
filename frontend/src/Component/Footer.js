import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const Footer = () => (
  <footer className="bg-dark text-white py-4">
    <Container className="text-center">
      <br />
      <Col className="fs-5 justify-content-center">
        <div>
          <p><FaLocationDot /> No. 5/1, CS COMPLEX, 1st FLOOR, MULLAI NAGAR, RAYAKOTTA ROAD, HOSUR-635109.</p>
          <p><FaPhone /> 8270528540 </p>
          <p><IoIosMail /> J99WorldTour@gmail.com</p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '10px'
          }}>
            <a href="https://facebook.com/YourPageName" target="_blank" rel="noopener noreferrer">
              <FaFacebook style={{ color: '#3b5998', fontSize: '32px', borderRadius: '50%' }} />
            </a>
            <a href="https://instagram.com/YourUsername" target="_blank" rel="noopener noreferrer">
              <FaInstagram style={{ color: '#e1306c', fontSize: '32px', borderRadius: '50%' }} />
            </a>
            <a href="https://wa.me/YourNumber" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp style={{ color: '#25d366', fontSize: '32px', borderRadius: '50%' }} />
            </a>
            <a href="https://twitter.com/YourUsername" target="_blank" rel="noopener noreferrer">
              <FaTwitter style={{ color: '#1da1f2', fontSize: '32px', borderRadius: '50%' }} />
            </a>
          </div>
        </div>
      </Col>
    </Container>
  </footer>
);

export default Footer;
