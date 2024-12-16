import React from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { FaArrowLeft, FaPlane, FaGlobe, FaSuitcaseRolling, FaPassport } from 'react-icons/fa';
import { MdTravelExplore } from "react-icons/md";

// WorkAbroadProcess Component
const WorkAbroadProcess = ({ onClose }) => {
  // Inline styles with responsive adjustments
  const styles = {
    container: {
      padding: '20px',
      background: 'linear-gradient(135deg, rgba(3, 161, 90, 0.8), #fff)',
      borderRadius: '10px',
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Roboto', sans-serif",
      color: '#333',
      margin: '10px',
      animation: 'fadeIn 1s ease-out',
    },
    backButton: {
      backgroundColor: '#007bff',
      color: 'white',
      fontWeight: 600,
      padding: '10px 20px',
      marginBottom: '20px',
      borderRadius: '5px',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#ff5722',
      },
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '2rem',
      fontWeight: 700,
      marginBottom: '20px',
      color: '#222',
      animation: 'slideInLeft 1s ease',
    },
    description: {
      fontSize: '1.2rem',
      lineHeight: 1.6,
      marginBottom: '30px',
      textAlign: 'justify',
      animation: 'fadeIn 1s ease-out 0.5s',
    },
    stepsTitle: {
      fontSize: '1.6rem',
      fontWeight: 600,
      color: '#007bff',
      marginBottom: '20px',
      textAlign: 'center',
      animation: 'slideInRight 1s ease',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '10px',
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
      },
    },
    icon: {
      fontSize: '1.5rem',
      color: '#007bff',
      marginRight: '10px',
    },
    '@media (max-width: 768px)': {
      title: { fontSize: '1.8rem' },
      description: { fontSize: '1rem' },
      stepsTitle: { fontSize: '1.4rem' },
      listItem: { padding: '10px' },
    },
    '@media (max-width: 425px)': {
      title: { fontSize: '1.5rem' },
      description: { fontSize: '0.9rem' },
      stepsTitle: { fontSize: '1.2rem' },
      listItem: { fontSize: '0.9rem', padding: '8px' },
    },
  };

  return (
    <Box sx={styles.container}>
      {/* Back Button */}
      <Button onClick={onClose} sx={styles.backButton} startIcon={<FaArrowLeft />}>
        Back to Services
      </Button>

      {/* Title */}
      <Typography variant="h4" sx={styles.title}>
        <FaPlane style={{ marginRight: '10px' }} /> Work and Travel Abroad Process
      </Typography>

      {/* Description */}
      <Typography sx={styles.description}>
        Get ready to explore the world both officially and as a tourist! We provide information and guidance on safe, informed travel.
      </Typography>

      {/* Steps Title */}
      <Typography variant="h5" sx={styles.stepsTitle}>
        Travel or Work Preparation
      </Typography>

      {/* Steps List */}
      <List>
        <ListItem sx={styles.listItem}>
          <FaGlobe style={styles.icon} />
          <ListItemText primary={<b>Consultation and Destination Planning</b>} secondary="Personalized consultations to understand the client's preferences, purpose of travel (work, tourism, study), budget, and timeline." />
        </ListItem>

        <ListItem sx={styles.listItem}>
          <FaPassport style={styles.icon} />
          <ListItemText primary={<b>Visa Assistance and Documentation</b>} secondary="Helping clients with the complex process of securing appropriate visas and preparing necessary documentation." />
        </ListItem>

        <ListItem sx={styles.listItem}>
          <FaSuitcaseRolling style={styles.icon} />
          <ListItemText primary={<b>Job Placement and Work Support</b>} secondary="For those looking to work abroad, the consultancy connects job seekers with opportunities aligned with their skills and career goals." />
        </ListItem>

        <ListItem sx={styles.listItem}>
          <MdTravelExplore  style={styles.icon} />
          <ListItemText primary={<b>Travel Bookings and Insurance</b>} secondary="Managing logistics like flights, accommodations, and travel insurance to ensure a smooth journey." />
        </ListItem>

        <ListItem sx={styles.listItem}>
          <FaPlane style={styles.icon} />
          <ListItemText primary={<b>Pre-Departure and Post-Arrival Support</b>} secondary="Ensuring clients are fully prepared before departure and providing assistance after they arrive at their destination." />
        </ListItem>
      </List>
    </Box>
  );
};

export default WorkAbroadProcess;
