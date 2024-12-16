import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaEdit } from 'react-icons/fa';
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

  const API_URL_CON = 'http://localhost:5500/api/countries?all=true';

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
    <Box sx={{ display: 'flex', margin: '2vh', flexDirection: { xs: 'column', md: 'row' }, height: '100vh' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 2 }}>
        <Typography variant="h3" gutterBottom>Contact Us</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label={<><IoManOutline /> Name</>}
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            label={<><FaPhoneAlt /> Phone</>}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          <TextField
            label={<><FaEnvelope /> Email</>}
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label={<><FaEdit /> Message</>}
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
            error={Boolean(errors.message)}
            helperText={errors.message}
          />
          <TextField
            label={<><FaMapMarkerAlt /> Date of Joining</>}
            name="dateofjoining"
            value={formData.dateofjoining}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            type="date"
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.dateofjoining)}
            helperText={errors.dateofjoining}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleTypeChange}
              error={Boolean(errors.type)}
            >
              <MenuItem value="">Select Type</MenuItem>
              {uniqueTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {errors.type && <FormHelperText error>{errors.type}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Destination</InputLabel>
            <Select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              error={Boolean(errors.destination)}
            >
              <MenuItem value="">Select Destination</MenuItem>
              {filteredDestinations.map((destination, index) => (
                <MenuItem key={index} value={destination}>
                  {destination}
                </MenuItem>
              ))}
            </Select>
            {errors.destination && <FormHelperText error>{errors.destination}</FormHelperText>}
          </FormControl>
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
            Send Message
          </Button>
          {statusMessage && <Typography variant="body1" color="success" sx={{ marginTop: 2 }}>{statusMessage}</Typography>}
        </form>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <img src={ContactImage} alt="Contact" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      </Box>
    </Box>
  );
};

export default ContactPage;
