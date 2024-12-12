import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaSearch, FaHandshake, FaSuitcaseRolling, FaCheckCircle } from 'react-icons/fa';
import './DomesticPlacements.css';

const DomesticPlacements = ({ onClose }) => (
  <Container fluid className="domestic-placements-container">
    <Button onClick={onClose} className="back-button">
      <FaArrowLeft /> Back to Services
    </Button>

    <h2 className="title">
      <FaSuitcaseRolling /> Domestic Recruitment
    </h2>
    <p className="description">
      Domestic recruitment focuses on sourcing and placing talent within the country, catering to both IT and non-IT job seekers. 
      It aims to connect skilled professionals with companies across various industries, ensuring they find the right match in 
      terms of roles, skills, and company culture. Whether it's hiring for technical roles like software developers or non-technical 
      positions like customer service or administrative support, domestic recruitment streamlines the hiring process for organizations 
      while offering job seekers the opportunity to explore diverse career paths within the country. We’re here to guide you!
    </p>

    <h4 className="steps-title">Steps to Career Success</h4>
    <ul className="steps-list">
      <li><FaSearch /> <b>Talent Sourcing</b> – We actively source candidates with the right skills from across the country for both IT and non-IT sectors.</li>
      <li><FaHandshake /> <b>Tailored Job Matching</b> – We match job seekers to suitable roles based on their skills, experience, and career aspirations.</li>
      <li><FaCheckCircle /> <b>Visa & Work Permits</b> – Assistance with work visas and permits.</li>
    </ul>
  </Container>
);

export default DomesticPlacements;
