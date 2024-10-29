import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-dark text-white py-4">
    <Container>
      <Row>
        <Col md={6}>
          <h5>About Us</h5>
          <p>Providing expert immigration and visa consulting.</p>
        </Col>
        <Col md={6} className="text-right">
          <h5>Contact Info</h5>
          <p>Email: </p>
          <p>Phone: </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;