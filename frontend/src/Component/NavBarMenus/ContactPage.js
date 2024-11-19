import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaEdit, FaUserAlt } from 'react-icons/fa';
import ContactImage from '../../Asset/Contact.jpg'; // Adjust path as needed
import axios from 'axios'; // Import axios for API requests
import './ContactPage.css'; // Import external CSS

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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: '',
    message: '',
    destination: '',
  });
  const [selectedType, setSelectedType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Regex patterns for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'type') {
      setSelectedType(e.target.value);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setFormData({ ...formData, destination: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone || !phoneRegex.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.type) newErrors.type = 'Please select a type';
    if (!formData.message) newErrors.message = 'Message is required';
    if (!formData.destination) newErrors.destination = 'Please select a destination';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Send data to the backend
      await axios.post('http://localhost:5000/contacts', formData);
      setStatusMessage('Message sent successfully!');
      setFormData({ name: '', phone: '', email: '', type: '', message: '', destination: '' });
      setSelectedType('');
      setSelectedCountry('');
    } catch (error) {
      setStatusMessage('Error sending message. Please try again.');
      console.error(error);
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
        <Form.Control
          as="select"
          name="destination"
          onChange={handleCountryChange}
          value={selectedCountry}
          required
        >
          <option value="">Select Destination</option>
          {countries.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </Form.Control>
        {errors.destination && <div className="error-message">{errors.destination}</div>}
      </Form.Group>
    );
  };

  return (
    <Container fluid className="contact-container">
      <Row className="contact-row">
        <Col md={6} className="contact-form-col">
          <h3 className="contact-heading">Contact Us</h3>
          <Form onSubmit={handleSubmit} className="contact-form">
            <Form.Group className="form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                required
                className="form-control"
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label><FaPhoneAlt /> Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                required
                className="form-control"
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label><FaEnvelope /> Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
                className="form-control"
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label><FaUserAlt /> Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                onChange={handleChange}
                value={formData.type}
                required
              >
                <option value="">Select Type</option>
                <option value="study">Study</option>
                <option value="work">Work</option>
                <option value="learning">Language Learning</option>
              </Form.Control>
              {errors.type && <div className="error-message">{errors.type}</div>}
            </Form.Group>
            {renderCountries()}
            <Form.Group className="form-group">
              <Form.Label><FaEdit /> Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                onChange={handleChange}
                value={formData.message}
                rows={3}
                required
                className="form-control"
              />
              {errors.message && <div className="error-message">{errors.message}</div>}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="submit-btn"
            >
              Send Message
            </Button>
            {statusMessage && <div className="status-message">{statusMessage}</div>}
          </Form>
        </Col>
        <Col md={6} className="contact-image-col">
          <img src={ContactImage} alt="Contact" className="contact-image" />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
