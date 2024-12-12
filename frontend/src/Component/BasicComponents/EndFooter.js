import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Endfooter.css'; // Import the CSS file

const EndFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="end-footer">
      <Container>
        <Row>
          <Col className="footer-section">
            <p>&copy; {currentYear} - J99 Recruitment Services Pvt. Ltd. All Rights Reserved.</p>
          </Col>
          <Col className="footer-section">
            <p>
              Follow Us: 
              <a href="https://www.facebook.com" className="footer-link">Facebook</a> |
              <a href="https://www.twitter.com" className="footer-link">Twitter</a> |
              <a href="https://www.instagram.com" className="footer-link">Instagram</a>
            </p>
          </Col>
          <Col className="footer-section">
            <p>
              Contact us: 
              <a href="mailto:J99WorldTour@gmail.com" className="footer-link">J99Recruitmentservices@gmail.com</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EndFooter;
