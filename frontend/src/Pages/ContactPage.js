import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaEdit, FaUserAlt } from 'react-icons/fa'; // Using React Icons
import ContactImage from '../Asset/Contact.jpg'; // Adjust path as needed

import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

// Country Data
const studyCountries = [
  { name: 'Germany', code: 'GER' },
  { name: 'Poland', code: 'POL' },
  { name: 'Switzerland', code: 'SWE' },
];

const workCountries = [
  { name: 'Dubai', code: 'DUB' },
  { name: 'Saudi Arabia', code: 'SAU' },
  { name: 'Kuwait', code: 'KUW' },
  { name: 'Qatar', code: 'QAT' },
  { name: 'Australia', code: 'AUS' },
  { name: 'Canada', code: 'CAN' },
  { name: 'Serbia', code: 'SER' },
  { name: 'Albania', code: 'ALB' },
  { name: 'Greece', code: 'GRE' },
  { name: 'Croatia', code: 'CRO' },
  { name: 'Slovakia', code: 'SLO' },
  { name: 'Italy', code: 'ITA' },
  { name: 'Czech Republic', code: 'CZE' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Hungary', code: 'HUN' },
  { name: 'Ireland', code: 'IRE' },
  { name: 'Luxembourg', code: 'LUX' },
];

const languageLearning = [
  { name: 'German', code: 'GER' },
  { name: 'Spanish', code: 'SPA' },
  { name: 'French', code: 'FRE' },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', type: '', message: '', designation: '' });
  const [selectedType, setSelectedType] = useState(''); // For selecting study/work/language
  const [selectedCountry, setSelectedCountry] = useState(''); // For selecting the country
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'type') {
      setSelectedType(e.target.value); // Set selected type (study, work, learning)
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value); // Set selected country when dropdown value changes
    setFormData({ ...formData, designation: e.target.value }); // Update designation as country code
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add form data to Firestore
      await addDoc(collection(db, "contacts"), formData);
      setStatusMessage("Message sent successfully!");
      setFormData({ name: '', phone: '', email: '', type: '', message: '', designation: '' }); // Clear form
      setSelectedType('');
      setSelectedCountry('');
    } catch (error) {
      setStatusMessage("Error sending message. Please try again.");
      console.error("Error adding document: ", error);
    }
  };

  const renderCountries = () => {
    let countries;
    switch (selectedType) {
      case 'study':
        countries = studyCountries;
        break;
      case 'work':
        countries = workCountries;
        break;
      case 'learning':
        countries = languageLearning;
        break;
      default:
        return null;
    }

    return (
      <Form.Group>
        <Form.Label><FaMapMarkerAlt /> Destination</Form.Label>
        <Form.Control as="select" name="designation" onChange={handleCountryChange} value={selectedCountry} required>
          <option value="">Select Destination</option>
          {countries.map((country, index) => (
            <option key={index} value={country.code}>
              {country.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
  };

  return (
    <Container fluid style={styles.container}>
      <Row>
        {/* Left Side - Form */}
        <Col md={6} style={styles.leftCol}>
          <h3 className="text-center my-4" style={styles.header}>
            <FaEdit /> Contact Us
          </h3>
          <Form onSubmit={handleSubmit} style={styles.form}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label><FaUserAlt /> Name</Form.Label>
                  <Form.Control type="text" name="name" onChange={handleChange} value={formData.name} required style={styles.input} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label><FaPhoneAlt /> Phone</Form.Label>
                  <Form.Control type="text" name="phone" onChange={handleChange} value={formData.phone} required style={styles.input} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label><FaEnvelope /> Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} required style={styles.input} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Control as="select" name="type" onChange={handleChange} value={formData.type} required style={styles.input}>
                    <option value="">Select Type</option>
                    <option value="study">Study Abroad</option>
                    <option value="work">Work Abroad</option>
                    <option value="learning">Language Learning</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Country Selection (Destination) */}
            {selectedType && (
              <Row>
                <Col md={12}>
                  {renderCountries()}
                </Col>
              </Row>
            )}
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows="3" name="message" onChange={handleChange} value={formData.message} required style={styles.input} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" style={styles.button}>
              Send Message
            </Button>
          </Form>
          {statusMessage && <p className="mt-3">{statusMessage}</p>}
        </Col>

        {/* Right Side - Image */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <img
            src={ContactImage}
            alt="Contact Us"
            style={styles.image}
          />
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  container: {
    background: "#f4f9fd",
    padding: "50px",
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    color: '#2C3E50',
    fontSize: '2rem',
    letterSpacing: '2px',
  },
  form: {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    background: '#2980B9',
    fontFamily: 'Poppins, sans-serif',
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  leftCol: {
    paddingRight: '20px',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
};

export default ContactPage;
