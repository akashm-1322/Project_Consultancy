import React from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { FaArrowLeft, FaUserGraduate, FaGlobe, FaSuitcaseRolling, FaPassport, FaPlane } from 'react-icons/fa';

const StudyAbroadProcess = ({ onClose }) => {
  // Inline styles for responsiveness
  const styles = {
    container: {
      padding: '20px',
      background: 'linear-gradient(135deg, rgba(3, 161, 90, 0.8), #fff)',
      borderRadius: '10px',
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Roboto', sans-serif",
      color: '#333',
      animation: 'fadeIn 1s ease-out',
      margin: '10px',
    },
    backButton: {
      backgroundColor: '#007bff',
      color: 'white',
      fontWeight: 600,
      padding: '10px 20px',
      marginBottom: '20px',
      borderRadius: '5px',
      '&:hover': {
        backgroundColor: '#ff5722',
      },
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '2rem',
      fontWeight: 700,
      marginBottom: '15px',
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
      <Typography variant="h4" component="h2" sx={styles.title}>
        <FaUserGraduate style={styles.icon} /> Study Abroad Process
      </Typography>

      {/* Description */}
      <Typography sx={styles.description}>
        Embarking on your study abroad journey is an exciting step toward building a bright future. We provide
        comprehensive guidance to make this process smooth and stress-free!
      </Typography>

      {/* Steps Title */}
      <Typography variant="h5" sx={styles.stepsTitle}>
        Steps to Study Abroad
      </Typography>

      {/* Steps List */}
      <List>
        <ListItem sx={styles.listItem}>
          <FaGlobe style={styles.icon} />
          <ListItemText
            primary={<b>Personalized Counseling</b>}
            secondary="Understanding your goals and choosing the right programs."
          />
        </ListItem>

        <ListItem sx={styles.listItem}>
          <FaUserGraduate style={styles.icon} />
          <ListItemText
            primary={<b>University Selection</b>}
            secondary="Shortlisting programs aligned with your aspirations."
          />
        </ListItem>

        <ListItem sx={styles.listItem}>
          <FaPassport style={styles.icon} />
          <ListItemText
            primary={<b>Application Assistance</b>}
            secondary="Preparing documents, applications, and meeting deadlines."
          />
        </ListItem>

        <ListItem sx={styles.listItem}>
          <FaSuitcaseRolling style={styles.icon} />
          <ListItemText
            primary={<b>Visa Guidance</b>}
            secondary="Step-by-step assistance with the visa process."
          />
        </ListItem>

        <ListItem sx={styles.listItem}>
          <FaPlane style={styles.icon} />
          <ListItemText
            primary={<b>Pre-departure Support</b>}
            secondary="Tips for travel, accommodation, and settling in your new country."
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default StudyAbroadProcess;
