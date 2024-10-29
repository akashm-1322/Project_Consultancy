import React from 'react';
import { Card, Col, Row , Container} from 'react-bootstrap';

const services = [
  { title: "Immigration Consulting", description: "Expert advice on immigration." },
  { title: "Visa Processing", description: "Assistance with visa applications." },
  { title: "Career Counseling", description: "Guidance for career growth abroad." },
];

const Service = () => (
  <Container style={{background: "#f4ecf7"}}>
    <h2 className="text-center my-4"> Our Services: </h2>
    <Row>
      {services.map((service, index) => (
        <Col key={index} md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>{service.title}</Card.Title>
              <Card.Text>{service.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default Service;