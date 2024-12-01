import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaUserGraduate, FaGlobe, FaSuitcaseRolling, FaPassport, FaPlane } from 'react-icons/fa';

const StudyAbroadProcess = ({ onClose }) => (
  <Container
    fluid
    style={{
      background: "linear-gradient(90deg , #fff , rgba(3, 161, 90, 0.975))",
      padding: "40px",
      marginTop: "20px",
      width: "100%",
      textAlign: "center",
      borderRadius: "8px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
    }}
  >
    <Button
      onClick={onClose}
      className="mb-4"
      style={{
        fontWeight: "bold",
        borderRadius: "20px",
        border: "2px 2px black",
        color: "#000"
      }}
    >
      <FaArrowLeft /> Back to Services
    </Button>

    <h2 style={{ fontWeight: "700", color: "#000" }}>
      <FaUserGraduate /> Study Abroad Process
    </h2>
    <p style={{ fontSize: "1.1rem", color: "#000", marginTop: "20px" }}>
      Embarking on your study abroad journey is an exciting step toward building
      a bright future. We provide comprehensive guidance to make this process
      smooth and stress-free!
    </p>

    <h4 style={{ color: "#000", marginTop: "30px" }}>Steps to Study Abroad</h4>
    <ul style={{ listStyleType: "none", padding: 0, color: "#555", fontSize: "1.05rem" }}>
      <li style={{ margin: "15px 0" }}><FaGlobe /> <b>Personalized Counseling</b> – Understanding your goals and choosing the right programs.</li>
      <li style={{ margin: "15px 0" }}><FaUserGraduate /> <b>University Selection</b> – Shortlisting programs aligned with your aspirations.</li>
      <li style={{ margin: "15px 0" }}><FaPassport /> <b>Application Assistance</b> – Preparing documents, applications, and meeting deadlines.</li>
      <li style={{ margin: "15px 0" }}><FaSuitcaseRolling /> <b>Visa Guidance</b> – Step-by-step assistance with the visa process.</li>
      <li style={{ margin: "15px 0" }}><FaPlane /> <b>Pre-departure Support</b> – Tips for travel, accommodation, and settling in your new country.</li>
    </ul>
  </Container>
);

export default StudyAbroadProcess;
