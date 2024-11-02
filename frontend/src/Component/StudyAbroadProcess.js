import {Container, Button } from 'react-bootstrap';

const StudyAbroadProcess = ({ onClose }) => (
    <Container fluid style={{ background: "#ffffff", padding: "20px", marginTop: "20px", width: "100%" }}>
      <Button variant="outline-secondary" onClick={onClose} className="mb-4">Back to Services</Button>
      <h4>Study Abroad Process</h4>
      <p>Guidance on studying abroad, including visa and application processes...</p>
      <h5>Y-Axis: Education Opportunities</h5>
      <ul>
        <li>Choosing the right universities and programs</li>
        <li>Application and admission processes</li>
        <li>Student visa guidance</li>
      </ul>
    </Container>
  );

  export default StudyAbroadProcess;