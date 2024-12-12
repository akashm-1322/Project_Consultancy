import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaPlane, FaGlobe, FaSuitcaseRolling, FaPassport } from 'react-icons/fa';
import './TravelANDWorkAbroadProcess.css';

const WorkAbroadProcess = ({ onClose }) => (
  <Container fluid className='work-travel-container'>
    <Button onClick={onClose} className="work-travel-button">
      <FaArrowLeft /> Back to Services
    </Button>

    <h2 className='work-title'>
      <FaPlane /> Work and Travel Abroad Process
    </h2>
    <p className='work-description'>
      Get ready to explore the world by both Official and as Tourist! We provide information and guidance on safe, informed travel.
    </p>

    <h4  className='work-steps'>Travel or Work Preparation</h4>
    <ul className='work-list'>
      <li>
        <FaGlobe /> <b>Top Destinations</b> – Explore top travel destinations worldwide.
      </li>
      <li>
        <FaPassport /> <b>Visa Assistance</b> – Help with travel documentation and visas.
      </li>
      <li>
        <FaSuitcaseRolling /> <b>Travel Insurance</b> – Work abroad with your most fascinating Jobs.
      </li>
      <li>
        <FaPlane /> <b>Flight Bookings</b> – Get to your most favorite destinations with the most favorite Jobs.
      </li>
    </ul>
  </Container>
);

export default WorkAbroadProcess;
