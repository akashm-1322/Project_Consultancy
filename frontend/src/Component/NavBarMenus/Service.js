import React, { useState } from 'react';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FaPassport, FaBriefcase, FaSchool, FaLanguage } from 'react-icons/fa';
import DomesticPlacements from './ServicePageMenus/DomesticPlacements';
import LanguageTrainingProcess from './ServicePageMenus/LanguageTrainingProcess';
import StudyAbroadProcess from './ServicePageMenus/StudyAbroadProcess';
import TravelAbroadProcess from './ServicePageMenus/TravelANDWorklAbroadProcess';
import './Service.css';  // Importing external CSS file

const services = [
  {
    title: "Travel and Work Abroad",
    icon: <FaPassport />,
    description: "Explore exciting destinations and start your global journey with ease. Get into your favourite jobs in your favourite destinations.",
  },
  {
    title: "Study Abroad",
    icon: <FaBriefcase />,
    description: "Achieve your academic dreams with our comprehensive study abroad guidance.",
  },
  {
    title: "Domestic Placements",
    icon: <FaSchool />,
    description: "Domestic recruitment focuses on sourcing and placing qualified candidates within IT and non-IT sectors across the country, tailored to meet both employer and job seeker needs.",
  },
  {
    title: "Language Coaching",
    icon: <FaLanguage />,
    description: "Master new languages and break barriers with our expert training programs.",
  },
];

const Service = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleReadMore = (service) => {
    setSelectedService(service.title);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedService(null);
  };

  return (
    <Box className="service-container">
      <Box className="background-circle top-left" />
      <Box className="background-circle bottom-left" />

      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2} padding={2}>
        {services.map((service, index) => (
          <Box
            key={index}
            flex="1 1 45%"  // Make each card responsive
            p={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            boxShadow={3}
            borderRadius={2}
            className="service-card"
            sx={{
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <Box sx={{ fontSize: '2rem', marginBottom: 2 }}>{service.icon}</Box>
            <Typography variant="h6" align="center" className="title">{service.title}</Typography>
            <Typography variant="body2" align="center" className="description">{service.description}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={() => handleReadMore(service)}
            >
              Learn More
            </Button>
          </Box>
        ))}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{selectedService}</DialogTitle>
        <DialogContent>
          {selectedService === "Travel and Work Abroad" && <TravelAbroadProcess />}
          {selectedService === "Study Abroad" && <StudyAbroadProcess />}
          {selectedService === "Domestic Placements" && <DomesticPlacements />}
          {selectedService === "Language Coaching" && <LanguageTrainingProcess />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Service;
