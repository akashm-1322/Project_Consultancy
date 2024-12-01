import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaPlane, FaGlobe, FaSuitcaseRolling, FaPassport } from 'react-icons/fa';

const WorkAbroadProcess = ({ onClose }) => (
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
      <FaPlane /> Work and Travel Abroad Process
    </h2>
    <p style={{ fontSize: "1.1rem", color: "#000", marginTop: "20px" }}>
      Get ready to explore the world by both Official and as Tourist! We provide information and guidance on safe, informed travel.
    </p>

    <h4 style={{ color: "#000", marginTop: "30px" }}>Travel  or Work Preparation</h4>
    <ul style={{ listStyleType: "none", padding: 0, color: "#000", fontSize: "1.05rem" }}>
      <li style={{ margin: "15px 0" }}><FaGlobe /> <b>Top Destinations</b> – Explore top travel destinations worldwide.</li>
      <li style={{ margin: "15px 0" }}><FaPassport /> <b>Visa Assistance</b> – Help with travel documentation and visas.</li>
      <li style={{ margin: "15px 0" }}><FaSuitcaseRolling /> <b>Travel Insurance</b> – Work abroad with your most facinating Jobs .</li>
      <li style={{ margin: "15px 0" }}><FaPlane /> <b>Flight Bookings</b> – Get to Your most favourite Destinations with most Favourite Jobs.</li>
    </ul>
  </Container>
);

export default WorkAbroadProcess;
