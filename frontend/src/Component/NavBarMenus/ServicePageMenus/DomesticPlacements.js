import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaSearch ,FaHandshake, FaSuitcaseRolling,  FaCheckCircle} from 'react-icons/fa';

const DomesticPlacements = ({ onClose }) => (
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
      <FaSuitcaseRolling /> Domestic Recruitment
    </h2>
    <p style={{ fontSize: "1.1rem", color: "#000", marginTop: "20px" }}>
    Domestic recruitment focuses on sourcing and placing talent within the country, catering to both IT and non-IT job seekers. It aims to connect skilled professionals with companies across various industries, ensuring they find the right match in terms of roles, skills, and company culture. Whether it's hiring for technical roles like software developers or non-technical positions like customer service or administrative support, domestic recruitment streamlines the hiring process for organizations while offering job seekers the opportunity to explore diverse career paths within the country. We’re here to guide you!
    </p>

    <h4 style={{ color: "#000", marginTop: "30px" }}>Steps to Career Success</h4>
    <ul style={{ listStyleType: "none", padding: 0, color: "#000", fontSize: "1.05rem" }}>
      <li style={{ margin: "15px 0" }}><FaSearch /> <b>Talent Sourcing</b> –  We actively source candidates with the right skills from across the country for both IT and non-IT sectors.</li>
      <li style={{ margin: "15px 0" }}><FaHandshake /> <b>Tailored Job Matching</b> – We match job seekers to suitable roles based on their skills, experience, and career aspirations.</li>
      <li style={{ margin: "15px 0" }}><FaCheckCircle/> <b>Visa & Work Permits</b> – Assistance with work visas and permits.</li>
    </ul>
  </Container>
);

export default DomesticPlacements;
