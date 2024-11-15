import React, { useState } from 'react';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import { FaPassport, FaBriefcase, FaUserGraduate, FaLanguage } from 'react-icons/fa';
import CareerCounselingProcess from "./CareerCounselingProcess";
import LanguageTrainingProcess from "./LanguageTrainingProcess";
import StudyAbroadProcess from "./StudyAbroadProcess";
import TravelAbroadProcess from "./TravelAbroadProcess";

const services = [
  { 
    title: "Travel Abroad", 
    icon: <FaPassport /> 
  },
  { 
    title: "Study Abroad", 
    icon: <FaBriefcase /> 
  },
  { 
    title: "Career Counseling", 
    icon: <FaUserGraduate /> 
  },
  { 
    title: "Language Training", 
    icon: <FaLanguage /> 
  },
];

const Service = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleReadMore = (service) => {
    setSelectedService(service.title);
  };

  return (
    <Container fluid style={{ background: "#f4ecf7", padding: "20px" }}>
      <h3 className="text-center mb-4">Our Services</h3>
      <Row>
        {services.map((service, index) => (
          <Col key={index} md={3} className="mb-3">
            <ServiceCard service={service} onReadMore={() => handleReadMore(service)} />
          </Col>
        ))}
      </Row>

      {/* Conditionally render the correct process component */}
      {selectedService === "Travel Abroad" && <TravelAbroadProcess onClose={() => setSelectedService(null)} />}
      {selectedService === "Study Abroad" && <StudyAbroadProcess onClose={() => setSelectedService(null)} />}
      {selectedService === "Career Counseling" && <CareerCounselingProcess onClose={() => setSelectedService(null)} />}
      {selectedService === "Language Training" && <LanguageTrainingProcess onClose={() => setSelectedService(null)} />}
    </Container>
  );
};

const ServiceCard = ({ service, onReadMore }) => (
  <Card className="text-center">
    <Card.Body>
      <div style={{ fontSize: "40px", color: "#6c63ff" }}>
        {service.icon}
      </div>
      <Card.Title className="mt-3">{service.title}</Card.Title>
      <Button variant="link" onClick={onReadMore} className="mt-2 text-primary" style={{ textDecoration: 'none' }}>
        Learn More
      </Button>
    </Card.Body>
  </Card>
);

// Individual Components for Each Service Process







export default Service;
