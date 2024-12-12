import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaUserGraduate, FaGlobe, FaSuitcaseRolling, FaPassport, FaPlane } from 'react-icons/fa';
import './StudyAbroadProcess.css'; // Import the external CSS file

const StudyAbroadProcess = ({ onClose }) => (
  <Container fluid className="study-abroad-container">
    <Button onClick={onClose} className="back-button">
      <FaArrowLeft /> Back to Services
    </Button>

    <h2 className="section-title">
      <FaUserGraduate /> Study Abroad Process
    </h2>
    <p className="description">
      Embarking on your study abroad journey is an exciting step toward building
      a bright future. We provide comprehensive guidance to make this process
      smooth and stress-free!
    </p>

    <h4 className="steps-title">Steps to Study Abroad</h4>
    <ul className="steps-list">
      <li><FaGlobe /> <b>Personalized Counseling</b> – Understanding your goals and choosing the right programs.</li>
      <li><FaUserGraduate /> <b>University Selection</b> – Shortlisting programs aligned with your aspirations.</li>
      <li><FaPassport /> <b>Application Assistance</b> – Preparing documents, applications, and meeting deadlines.</li>
      <li><FaSuitcaseRolling /> <b>Visa Guidance</b> – Step-by-step assistance with the visa process.</li>
      <li><FaPlane /> <b>Pre-departure Support</b> – Tips for travel, accommodation, and settling in your new country.</li>
    </ul>
  </Container>
);

export default StudyAbroadProcess;
