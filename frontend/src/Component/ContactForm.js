import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData); // Assuming an endpoint to handle contact
      alert('Message sent!');
    } catch (error) {
      alert('Error sending message');
    }
  };

  return (
    <Container style={{background: "#ebf5fb"}}>
      <h2 className="text-center shadow my-4">Contact Us</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows="3" name="message" onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">Send Message</Button>
      </Form>
    </Container>
  );
};

export default ContactForm;
