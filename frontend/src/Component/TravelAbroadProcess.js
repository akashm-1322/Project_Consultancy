import {Container, Button } from 'react-bootstrap';

const TravelAbroadProcess = ({ onClose }) => (
    <Container fluid style={{ background: "#ffffff", padding: "20px", marginTop: "20px", width: "100%" }}>
      <Button variant="outline-secondary" onClick={onClose} className="mb-4">Back to Services</Button>
      <h4>Travel Abroad Process</h4>
      <p>Detailed information about traveling abroad...</p>
      <h5>Y-Axis: Travel Destinations</h5>
      <ul>
        <li>Top destinations for international travel</li>
        <li>Visa requirements and application processes</li>
        <li>Travel safety and health guidelines</li>
      </ul>
    </Container>
  );

  export default TravelAbroadProcess;
  