import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaUserGraduate, FaGlobe, FaSuitcaseRolling, FaPassport } from 'react-icons/fa';

const CareerCounselingProcess = ({ onClose }) => (
  <Container
    fluid
    style={{
      background: "#f9f9f9",
      padding: "40px",
      marginTop: "20px",
      width: "100%",
      textAlign: "center",
      borderRadius: "8px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
    }}
  >
    <Button
      variant="outline-primary"
      onClick={onClose}
      className="mb-4"
      style={{
        fontWeight: "bold",
        borderRadius: "20px",
      }}
    >
      <FaArrowLeft /> Back to Services
    </Button>

    <h2 style={{ fontWeight: "700", color: "#007bff" }}>
      <FaSuitcaseRolling /> Career Counseling Process
    </h2>
    <p style={{ fontSize: "1.1rem", color: "#555", marginTop: "20px" }}>
      Discover international career paths and opportunities that align with your skills and ambitions. We’re here to guide you!
    </p>

    <h4 style={{ color: "#333", marginTop: "30px" }}>Steps to Career Success</h4>
    <ul style={{ listStyleType: "none", padding: 0, color: "#555", fontSize: "1.05rem" }}>
      <li style={{ margin: "15px 0" }}><FaUserGraduate /> <b>Personal Assessment</b> – Identify career paths suited to your unique strengths.</li>
      <li style={{ margin: "15px 0" }}><FaGlobe /> <b>Global Opportunities</b> – Explore job opportunities in target countries.</li>
      <li style={{ margin: "15px 0" }}><FaPassport /> <b>Visa & Work Permits</b> – Assistance with work visas and permits.</li>
    </ul>
  </Container>
);

export default CareerCounselingProcess;
