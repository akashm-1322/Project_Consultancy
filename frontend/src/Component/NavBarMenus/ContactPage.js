import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaEdit, FaUserAlt } from 'react-icons/fa';
import { IoManOutline } from "react-icons/io5";
import ContactImage from '../../Asset/Contact.jpg'; // Adjust path as needed
import axios from 'axios'; // For fetching country data
import './ContactPage.css'; // Import external CSS

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    type: '', // Added type field
    destination: '',
    dateofjoining: ''
  });
  const [countries, setCountries] = useState([]); // Store fetched countries
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [filteredDestinations, setFilteredDestinations] = useState([]); // Store filtered destinations
  const [uniqueTypes, setUniqueTypes] = useState([]); // Store unique country types

  const API_URL_CON = 'http://localhost:5000/api/countries?all=true';

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(API_URL_CON); // Replace with actual endpoint
        console.log(response.data.countries);  // Log countries to verify
        setCountries(response.data.countries); // Assuming response contains an array of country objects
        const types = [...new Set(response.data.countries.map((country) => country.type))]; // Extract unique types
        setUniqueTypes(types); // Store unique types
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);
  

  // Handle type change and filter destinations
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData({ ...formData, type: selectedType, destination: '' }); // Reset destination when type changes
    const destinations = countries
      .filter((country) => country.type === selectedType) // Filter countries based on selected type
      .map((country) => country.name); // Get the destination names
    setFilteredDestinations(destinations);
    console.log(destinations); // Log filtered destinations
  };  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const today = new Date();

    if (!formData.name || !nameRegex.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces.';
    }
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message) {
      newErrors.message = 'Message is required.';
    }
    if (!formData.type) {
      newErrors.type = 'Please select a type.';
    }
    if (!formData.destination) {
      newErrors.destination = 'Please select a destination.';
    }
    if (!formData.dateofjoining) {
      newErrors.dateofjoining = 'Please enter your date of joining.';
    } else {
      const selectedDate = new Date(formData.dateofjoining);
      if (selectedDate > today) {
        newErrors.dateofjoining = 'Date of joining cannot be in the future.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatusMessage('Form submitted successfully!');
    setFormData({ name: '', phone: '', email: '', message: '', type: '', destination: '', dateofjoining: '' });
  };

  return (
    <Container fluid className="contact-container">
      <Row className="contact-row">
        <Col md={6} className="contact-form-col">
          <h3 className="contact-heading">Contact Us</h3>
          <Form onSubmit={handleSubmit} className="contact-form">
            <Form.Group>
              <Form.Label><IoManOutline /> Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Enter your name"
                className="custom-form-control"
                required
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label><FaPhoneAlt /> Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                placeholder="Enter your phone number"
                className="custom-form-control"
                required
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label><FaEnvelope /> Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Enter your email"
                className="custom-form-control"
                required
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label><FaEnvelope /> Date of Joining</Form.Label>
              <Form.Control
                type="date"
                name="dateofjoining"
                onChange={handleChange}
                value={formData.dateofjoining}
                className="custom-form-control"
                required
              />
              {errors.dateofjoining && <div className="error-message">{errors.dateofjoining}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label><FaMapMarkerAlt /> Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                onChange={handleTypeChange}
                value={formData.type}
                required
                className="custom-form-control"
              >
                <option value="">Select Type</option>
                {uniqueTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Control>
              {errors.type && <div className="error-message">{errors.type}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label><FaMapMarkerAlt /> Destination</Form.Label>
              <Form.Control
                as="select"
                name="destination"
                onChange={handleChange}
                value={formData.destination}
                required
                className="custom-form-control"
              >
                <option value="">Select Destination</option>
                {filteredDestinations.map((destination, index) => (
                  <option key={index} value={destination}>
                    {destination}
                  </option>
                ))}
              </Form.Control>
              {errors.destination && <div className="error-message">{errors.destination}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label><FaEdit /> Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                onChange={handleChange}
                value={formData.message}
                rows={3}
                className="custom-form-control"
                required
              />
              {errors.message && <div className="error-message">{errors.message}</div>}
            </Form.Group>
            <Button variant="primary" type="submit">Send Message</Button>
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
