import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Banner = () => (
  <Container fluid className=" shadow p-5 my-5 bg-light rounded-3 text-center" style={{ 
    backgroundImage: 'url(/path/to/banner.jpg)', 
    backgroundSize: 'cover', 
    color: 'white' 
  }}>
    <Row className="justify-content-center">
      <Col md={8}>
        <h1 className="display-4 text-dark">Explore Your Opportunities</h1>
        <p className="lead text-dark">Immigration, Visa Services, Career Counseling</p>
        <hr className="my-4" />
        <Button variant="primary" size="lg">Get Started</Button>
      </Col>
    </Row>
  </Container>
);

export default Banner;
