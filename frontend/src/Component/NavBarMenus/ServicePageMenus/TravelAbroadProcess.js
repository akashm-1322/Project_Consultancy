import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaPlane, FaGlobe, FaSuitcaseRolling, FaPassport } from 'react-icons/fa';

const TravelAbroadProcess = ({ onClose }) => (
  <Container
    fluid
    style={{
      background: "#f0f8ff",
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
      <FaPlane /> Travel Abroad Process
    </h2>
    <p style={{ fontSize: "1.1rem", color: "#555", marginTop: "20px" }}>
      Get ready to explore the world! We provide information and guidance on safe, informed travel.
    </p>

    <h4 style={{ color: "#333", marginTop: "30px" }}>Travel Preparation</h4>
    <ul style={{ listStyleType: "none", padding: 0, color: "#555", fontSize: "1.05rem" }}>
      <li style={{ margin: "15px 0" }}><FaGlobe /> <b>Top Destinations</b> – Explore top travel destinations worldwide.</li>
      <li style={{ margin: "15px 0" }}><FaPassport /> <b>Visa Assistance</b> – Help with travel documentation and visas.</li>
      <li style={{ margin: "15px 0" }}><FaSuitcaseRolling /> <b>Travel Insurance</b> – Protect yourself with travel insurance options.</li>
      <li style={{ margin: "15px 0" }}><FaPlane /> <b>Flight Bookings</b> – Get the best flight deals and arrangements.</li>
    </ul>
  </Container>
);

export default TravelAbroadProcess;
