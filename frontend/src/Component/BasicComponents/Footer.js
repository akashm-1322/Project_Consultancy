import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaWhatsapp, FaArrowUp } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer-container">
      <Container className="text-center">
        <br />
        <Col className="justify-content-center">
          <div>
            <p className="footer-text">
              <FaLocationDot /> No. 5/1, CS COMPLEX, 1st FLOOR, MULLAI NAGAR, RAYAKOTTA ROAD, HOSUR-635109.
            </p>
            <p className="footer-text">
              <FaPhone /> 82705 28540
            </p>
            <p className="footer-text">
              <FaPhone /> 98849 45606
            </p>
            <p className="footer-text">
              <IoIosMail /> J99Recruitmentservices@gmail.com
            </p>

            <div className="footer-icons">
              <a href="https://www.facebook.com/share/1K84SaGgB8/" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="social-icon facebook-icon" />
              </a>
              <a href="https://www.instagram.com/j99recurimentservices/profilecard/?igsh=MXd2azUwMXA3cGkzMg==" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon instagram-icon" />
              </a>
              <a href="https://wa.me/+919884945606" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="social-icon whatsapp-icon" />
              </a>
            </div>
          </div>
        </Col>

        <div className="back-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </div>
      </Container>
    </div>
  );
};

export default Footer;
