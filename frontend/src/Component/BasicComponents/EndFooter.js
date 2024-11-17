import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const EndFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #333, #555)',  // Same gradient as Footer
        color: 'white',
        textAlign: 'center',
        fontSize: '14px',
        padding: '20px 0',
        fontFamily: "'Roboto', sans-serif",  // Custom font for consistency
        animation: 'fadeIn 2s ease forwards',
        transition: 'background 0.5s ease',
      }}
    >
      <Container>
        <Row>
          <Col>
            <p>&copy; {currentYear} -   J99 Recruitment Services Pvt. Ltd. All Rights Reserved.</p>
          </Col>
          <Col>
            <p>Follow Us: 
              <a href="https://www.facebook.com" style={{ color: 'white', marginLeft: '10px' }}>Facebook</a> |
              <a href="https://www.twitter.com" style={{ color: 'white', marginLeft: '10px' }}>Twitter</a> |
              <a href="https://www.instagram.com" style={{ color: 'white', marginLeft: '10px' }}>Instagram</a>
            </p>
          </Col>
          <Col>
            <p>Contact us: 
              <a href="mailto:J99WorldTour@gmail.com" style={{ color: 'white', marginLeft: '10px' }}>J99Recruitmentservices@gmail.com</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EndFooter;
