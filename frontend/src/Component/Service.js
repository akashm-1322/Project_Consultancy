import React, { useState } from 'react';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import { FaPassport, FaBriefcase, FaUserGraduate, FaLanguage } from 'react-icons/fa';

const services = [
  { 
    title: "Travel Abroad", 
    description: "Get expert advice on immigration policies. Discover the best travel options for your international journey.", 
    icon: <FaPassport /> 
  },
  { 
    title: "Study Abroad", 
    description: "Assistance with securing student visas. Explore educational opportunities across the globe.", 
    icon: <FaBriefcase /> 
  },
  { 
    title: "Career Counseling", 
    description: "Guidance to grow your career internationally. Find the best opportunities that match your skillset.", 
    icon: <FaUserGraduate /> 
  },
  { 
    title: "Language Training", 
    description: "Achieve fluency with our language training programs. Tailored courses to prepare you for global communication.", 
    icon: <FaLanguage /> 
  },
];

const Service = () => (
  <Container fluid style={{ background: "#f4ecf7", padding: "20px" }}>
    <h3 className="text-center mb-4">Our Services</h3>
    <Row>
      {services.map((service, index) => (
        <Col key={index} md={3} className="mb-3">
          <ServiceCard service={service} />
        </Col>
      ))}
    </Row>
  </Container>
);

const ServiceCard = ({ service }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Card className="text-center">
      <Card.Body>
        <div style={{ fontSize: "40px", color: "#6c63ff" }}>
          {service.icon}
        </div>
        <Card.Title className="mt-3">{service.title}</Card.Title>
        {showDescription && <Card.Text>{service.description}</Card.Text>}
        <Button 
          variant="link" 
          onClick={() => setShowDescription(!showDescription)}
          className="mt-2 bg-primary text-white"
          style={{ textDecoration: 'none' }}
        >
          {showDescription ? 'Hide' : 'Read'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Service;
