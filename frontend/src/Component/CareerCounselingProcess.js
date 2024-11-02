import {Container, Button } from 'react-bootstrap';

const CareerCounselingProcess = ({ onClose }) => (
    <Container fluid style={{ background: "#ffffff", padding: "20px", marginTop: "20px", width: "100%" }}>
      <Button variant="outline-secondary" onClick={onClose} className="mb-4">Back to Services</Button>
      <h4>Career Counseling Process</h4>
      <p>International career guidance and counseling...</p>
      <h5>Y-Axis: Career Opportunities</h5>
      <ul>
        <li>Identifying career paths suited to your skills</li>
        <li>Finding job opportunities in your target countries</li>
        <li>Work visa and permits guidance</li>
      </ul>
    </Container>
  );

  export default CareerCounselingProcess;