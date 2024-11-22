import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaLanguage, FaUserGraduate, FaGlobe } from 'react-icons/fa';

const LanguageTrainingProcess = ({ onClose }) => (
  <Container
    fluid
    style={{
      background: "linear-gradient(90deg , rgb(226, 210, 221) , rgb(201, 210, 223) , rgb(199, 217, 206))",
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
      <FaLanguage /> Language Coaching Process
    </h2>
    <p style={{ fontSize: "1.1rem", color: "#555", marginTop: "20px" }}>
      Achieve language proficiency with courses designed to meet your global communication needs.
    </p>

    <h4 style={{ color: "#333", marginTop: "30px" }}>Training Programs</h4>
    <ul style={{ listStyleType: "none", padding: 0, color: "#555", fontSize: "1.05rem" }}>
      <li style={{ margin: "15px 0" }}><FaLanguage /> <b>Language Courses</b> – From beginner to advanced proficiency.</li>
      <li style={{ margin: "15px 0" }}><FaUserGraduate /> <b>Certification Prep</b> – Prepare for language exams like IELTS or TOEFL.</li>
      <li style={{ margin: "15px 0" }}><FaGlobe /> <b>Cross-cultural Communication</b> – Training for effective communication across cultures.</li>
    </ul>
  </Container>
);

export default LanguageTrainingProcess;
