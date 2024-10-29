import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ContactImage from '../Asset/Contact.jpg'; // Adjust path as needed

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData); 
      alert('Message sent!');
    } catch (error) {
      alert('Error sending message');
    }
  };

  return (
    <Container fluid style={{ background: "#ebf5fb", padding: "30px" }}>
      <Row>
        {/* Left Side - Form */}
        <Col md={6}>
          <h3 className="text-center my-4">Contact Us</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Control as="select" name="type" onChange={handleChange} required>
                    <option value="">Select Type</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                    <option value="sales">Sales</option>
                    <option value="feedback">Feedback</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows="3" name="message" onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Send Message</Button>
          </Form>
        </Col>

        {/* Right Side - Image */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <img 
            src={ContactImage}
            alt="Contact Us" 
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
