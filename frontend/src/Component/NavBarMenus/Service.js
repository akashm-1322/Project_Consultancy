import React, { useState } from "react";
import { Card, Col, Row, Container} from "react-bootstrap";
import { FaPassport, FaBriefcase, FaUserGraduate, FaLanguage } from "react-icons/fa";
import DomesticPlacements from "./ServicePageMenus/DomesticPlacements";
import LanguageTrainingProcess from "./ServicePageMenus/LanguageTrainingProcess";
import StudyAbroadProcess from "./ServicePageMenus/StudyAbroadProcess";
import TravelAbroadProcess from "./ServicePageMenus/TravelANDWorklAbroadProcess";
import { motion } from "framer-motion"; // Framer Motion for animations
import './Service.css';  // Importing external CSS file

const services = [
  {
    title: "Travel and Work Abroad",
    icon: <FaPassport />,
    description: "Explore exciting destinations and start your global journey with ease.Get into your Favourite Jobs in your Favourite Destinations.",
  },
  {
    title: "Study Abroad",
    icon: <FaBriefcase />,
    description: "Achieve your academic dreams with our comprehensive study abroad guidance.",
  },
  {
    title: "Domestic Placements",
    icon: <FaUserGraduate />,
    description: "Domestic recruitment focuses on sourcing and placing qualified candidates within IT and non-IT sectors across the country, tailored to meet both employer and job seeker needs.",
  },
  {
    title: "Language Coaching",
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
    <Container fluid className="service-container">  {/* Use specific class name */}
      {/* Add Background Graphics */}
      <div className="background-circle top-left" />
      <div className="background-circle bottom-left" />

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
      {selectedService === "Travel and Work Abroad" && <TravelAbroadProcess onClose={() => setSelectedService(null)} />}
      {selectedService === "Study Abroad" && <StudyAbroadProcess onClose={() => setSelectedService(null)} />}
      {selectedService === "Domestic Placements" && <DomesticPlacements onClose={() => setSelectedService(null)} />}
      {selectedService === "Language Coaching" && <LanguageTrainingProcess onClose={() => setSelectedService(null)} />}
    </Container>
  );
};

const ServiceCard = ({ service, onReadMore }) => (
  <Card className="service-card shadow-sm">
    <Card.Body>
      <motion.div
        whileHover={{ rotate: 15, scale: 1.2 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="icon"
      >
        {service.icon}
      </motion.div>
      <Card.Title className="title">{service.title}</Card.Title>
      <Card.Text className="description">{service.description}</Card.Text>
      <button
        variant="link"
        onClick={onReadMore}
        className="learn-more-btn"
      >
        Learn More
      </button>
    </Card.Body>
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5 }}
      className="bottom-line"
    />
  </Card>
);

export default Service;
