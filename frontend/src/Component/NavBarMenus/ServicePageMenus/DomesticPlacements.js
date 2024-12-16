import React from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { FaArrowLeft, FaSuitcaseRolling } from 'react-icons/fa';
import { MdAssessment ,  MdOutlineFindInPage } from "react-icons/md";
import { HiBuildingOffice } from "react-icons/hi2";
import { GiSkills } from "react-icons/gi";

// Main Component
const DomesticPlacements = ({ onClose }) => {

  // Inline styles for responsiveness
  const responsiveStyles = {
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
      marginBottom: '15px',
      color: '#222',
      animation: 'slideInLeft 1s ease',
    },
    description: {
      fontSize: '1.2rem',
      lineHeight: 1.6,
      marginBottom: '30px',
      maxWidth: '800px',
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
      transition: 'transform 0.3s ease',
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
    <Box sx={responsiveStyles.container}>
      {/* Back Button */}
      <Button onClick={onClose} sx={responsiveStyles.backButton} startIcon={<FaArrowLeft />}>
        Back to Services
      </Button>

      {/* Title */}
      <Typography variant="h4" component="h2" sx={responsiveStyles.title}>
        <FaSuitcaseRolling style={{ marginRight: '10px' }} /> Domestic Recruitment
      </Typography>

      {/* Description */}
      <Typography sx={responsiveStyles.description}>
        Domestic recruitment focuses on sourcing and placing talent within the country, catering to both IT and non-IT job seekers.
        It aims to connect skilled professionals with companies across various industries, ensuring they find the right match in
        terms of roles, skills, and company culture. Whether it's hiring for technical roles like software developers or non-technical
        positions like customer service or administrative support, domestic recruitment streamlines the hiring process for organizations
        while offering job seekers the opportunity to explore diverse career paths within the country. We’re here to guide you!
      </Typography>

      {/* Steps Title */}
      <Typography variant="h5" sx={responsiveStyles.stepsTitle}>
        Steps to Career Success
      </Typography>

      {/* Steps List */}
      <List>
        <ListItem sx={responsiveStyles.listItem}>
          <HiBuildingOffice style={responsiveStyles.icon} />
          <ListItemText
            primary={<b>Post-Hiring Support & Onboarding</b>}
            secondary="Our support doesn't end with placement. We assist candidates with smooth onboarding, helping them adapt to their new roles while ensuring employers are satisfied with the hiring process."
          />
        </ListItem>

        <ListItem sx={responsiveStyles.listItem}>
          <MdAssessment style={responsiveStyles.icon} />
          <ListItemText
            primary={<b> Interview Coordination & Skill Assessment</b>}
            secondary="We organize and manage the interview process between job seekers and hiring organizations. Additionally, we conduct preliminary skill assessments to validate candidates' technical expertise, soft skills, and role fit."
          />
        </ListItem>

        <ListItem sx={responsiveStyles.listItem}>
          <GiSkills style={responsiveStyles.icon} />
          <ListItemText
            primary={<b>Tailored Job Matching</b>}
            secondary="Our experts assess candidates' skills, experience, and career aspirations to match them with suitable roles. We ensure alignment between job seekers' capabilities and company requirements to streamline the hiring process for both parties."
          />
        </ListItem>

        <ListItem sx={responsiveStyles.listItem}>
          <MdOutlineFindInPage style={responsiveStyles.icon} />
          <ListItemText
            primary={<b>Candidate Sourcing</b>}
            secondary="We actively identify and source skilled candidates from across the country using various channels like job portals, professional networks, and direct outreach. Whether for IT or non-IT roles, our process ensures a robust talent pool that meets the specific requirements of the organization."
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default DomesticPlacements;
