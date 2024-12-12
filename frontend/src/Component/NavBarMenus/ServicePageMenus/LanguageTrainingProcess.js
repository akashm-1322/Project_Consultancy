import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaLanguage, FaUserGraduate, FaGlobe } from 'react-icons/fa';
import './LanguageTrainingProcess.css'

const LanguageTrainingProcess = ({ onClose }) => (
  <Container fluid className="language-training-container">
    <Button onClick={onClose} className="back-button">
      <FaArrowLeft /> Back to Services
    </Button>

    <h2 className="heading">
      <FaLanguage /> Language Coaching Process
    </h2>
    <p className="description">
      Achieve language proficiency with courses designed to meet your global communication needs.
    </p>

    <h4 className="subheading">Training Programs</h4>
    <ul className="training-list">
      <li><FaLanguage /> <b>Language Courses</b> – From beginner to advanced proficiency.</li>
      <li><FaUserGraduate /> <b>Certification Prep</b> – Prepare for language exams like IELTS or TOEFL.</li>
      <li><FaGlobe /> <b>Cross-cultural Communication</b> – Training for effective communication across cultures.</li>
    </ul>
  </Container>
);

export default LanguageTrainingProcess;
