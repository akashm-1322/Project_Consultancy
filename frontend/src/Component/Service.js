import React, { useState } from "react";
import { Card, Col, Row, Container, Button } from "react-bootstrap";
import { FaPassport, FaBriefcase, FaUserGraduate, FaLanguage } from "react-icons/fa";
import CareerCounselingProcess from "./CareerCounselingProcess";
import LanguageTrainingProcess from "./LanguageTrainingProcess";
import StudyAbroadProcess from "./StudyAbroadProcess";
import TravelAbroadProcess from "./TravelAbroadProcess";
import { motion } from "framer-motion"; // Framer Motion for animations

const services = [
  {
    title: "Travel Abroad",
    icon: <FaPassport />,
    description: "Explore exciting destinations and start your global journey with ease.",
  },
  {
    title: "Study Abroad",
    icon: <FaBriefcase />,
    description: "Achieve your academic dreams with our comprehensive study abroad guidance.",
  },
  {
    title: "Career Counseling",
    icon: <FaUserGraduate />,
    description: "Shape your future with personalized career counseling and advice.",
  },
  {
    title: "Language Training",
    icon: <FaLanguage />,
    description: "Master new languages and break barriers with our expert training programs.",
  },
];

const Service = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleReadMore = (service) => {
    setSelectedService(service.title);
  };

  return (
    <Container
      fluid
      style={{
        background: "linear-gradient(135deg, #f4ecf7, #e8e9fc)",
        padding: "40px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Add Background Graphics */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-100px",
          width: "300px",
          height: "300px",
          background: "rgba(108, 99, 255, 0.2)",
          borderRadius: "50%",
          filter: "blur(100px)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "-100px",
          width: "300px",
          height: "300px",
          background: "rgba(108, 99, 255, 0.2)",
          borderRadius: "50%",
          filter: "blur(100px)",
          zIndex: 1,
        }}
      />

      <Row>
        {services.map((service, index) => (
          <Col key={index} md={3} className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <ServiceCard service={service} onReadMore={() => handleReadMore(service)} />
            </motion.div>
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
  <Card className="text-center shadow-sm" style={{ border: "none", overflow: "hidden", borderRadius: "15px" }}>
    <Card.Body>
      <motion.div
        whileHover={{ rotate: 15, scale: 1.2 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{ fontSize: "40px", color: "#6c63ff" }}
      >
        {service.icon}
      </motion.div>
      <Card.Title className="mt-3">{service.title}</Card.Title>
      <Card.Text style={{ fontSize: "0.9rem", color: "#6c757d" }}>{service.description}</Card.Text>
      <Button
        variant="link"
        onClick={onReadMore}
        className="mt-2 text-primary"
        style={{ textDecoration: "none", fontWeight: "bold" }}
      >
        Learn More
      </Button>
    </Card.Body>
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        bottom: "0",
        left: "0",
        height: "5px",
        background: "#6c63ff",
        width: "100%",
        transformOrigin: "left",
      }}
    />
  </Card>
);

export default Service;
