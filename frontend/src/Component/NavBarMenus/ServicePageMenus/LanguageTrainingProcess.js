import React from "react";
import { Box, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import { ArrowBack, Language, School, Public } from "@mui/icons-material";

// Main Component
const LanguageTrainingProcess = ({ onClose }) => {
  // Inline responsive styles
  const responsiveStyles = {
    container: {
      padding: "20px",
      margin: "10px",
      background: "linear-gradient(135deg, rgba(3, 161, 90, 0.8), #fff)",
      borderRadius: "10px",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Roboto', sans-serif",
      color: "#333",
      animation: "fadeIn 1s ease-out",
    },
    backButton: {
      backgroundColor: "#007bff",
      color: "white",
      fontWeight: 600,
      padding: "10px 20px",
      marginBottom: "20px",
      borderRadius: "5px",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#ff5722",
      },
    },
    title: {
      display: "flex",
      alignItems: "center",
      fontSize: "2rem",
      fontWeight: 700,
      gap: "10px",
      marginBottom: "15px",
      color: "#222",
      animation: "slideInLeft 1s ease",
    },
    description: {
      fontSize: "1.2rem",
      lineHeight: 1.6,
      marginBottom: "30px",
      maxWidth: "800px",
      textAlign: "center",
      animation: "fadeIn 1s ease-out 0.5s",
    },
    subheading: {
      fontSize: "1.6rem",
      fontWeight: 600,
      color: "#007bff",
      marginBottom: "20px",
      textAlign: "center",
      animation: "slideInRight 1s ease",
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "15px",
      margin: "10px 0",
      borderRadius: "10px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
      },
    },
    icon: {
      fontSize: "1.8rem",
      color: "#007bff",
      marginRight: "10px",
      transition: "transform 0.3s ease",
    },
    "@media (max-width: 768px)": {
      title: { fontSize: "1.8rem" },
      description: { fontSize: "1rem" },
      subheading: { fontSize: "1.4rem" },
      listItem: { padding: "10px" },
    },
    "@media (max-width: 425px)": {
      title: { fontSize: "1.5rem" },
      description: { fontSize: "0.9rem" },
      subheading: { fontSize: "1.2rem" },
      listItem: { fontSize: "0.9rem", padding: "8px" },
    },
  };

  return (
    <Box sx={responsiveStyles.container}>
      {/* Back Button */}
      <Button onClick={onClose} sx={responsiveStyles.backButton} startIcon={<ArrowBack />}>
        Back to Services
      </Button>

      {/* Title */}
      <Typography variant="h4" component="h2" sx={responsiveStyles.title}>
        <Language sx={{ fontSize: "2rem" }} /> Language Coaching Process
      </Typography>

      {/* Description */}
      <Typography sx={responsiveStyles.description}>
        Achieve language proficiency with courses designed to meet your global communication needs.
      </Typography>

      {/* Subheading */}
      <Typography variant="h5" sx={responsiveStyles.subheading}>
        Training Programs
      </Typography>

      {/* Training List */}
      <List>
        <ListItem sx={responsiveStyles.listItem}>
          <Language sx={responsiveStyles.icon} />
          <ListItemText
            primary={<Typography variant="body1"><b>Language Courses</b> – From beginner to advanced proficiency.</Typography>}
          />
        </ListItem>

        <ListItem sx={responsiveStyles.listItem}>
          <School sx={responsiveStyles.icon} />
          <ListItemText
            primary={<Typography variant="body1"><b>Certification Prep</b> – Prepare for exams like IELTS or TOEFL.</Typography>}
          />
        </ListItem>

        <ListItem sx={responsiveStyles.listItem}>
          <Public sx={responsiveStyles.icon} />
          <ListItemText
            primary={<Typography variant="body1"><b>Cross-cultural Communication</b> – Training for effective global communication.</Typography>}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default LanguageTrainingProcess;
