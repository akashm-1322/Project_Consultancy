import {Container, Button } from 'react-bootstrap';

const LanguageTrainingProcess = ({ onClose }) => (
    <Container fluid style={{ background: "#ffffff", padding: "20px", marginTop: "20px", width: "100%" }}>
      <Button variant="outline-secondary" onClick={onClose} className="mb-4">Back to Services</Button>
      <h4>Language Training Process</h4>
      <p>Information on language training programs for global communication...</p>
      <h5>Y-Axis: Language Proficiency</h5>
      <ul>
        <li>Beginner to advanced language courses</li>
        <li>Preparation for language certification exams</li>
        <li>Cross-cultural communication training</li>
      </ul>
    </Container>
  );

  export default LanguageTrainingProcess;