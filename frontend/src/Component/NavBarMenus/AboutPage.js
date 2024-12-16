import React from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import { motion } from "framer-motion";

// Content Data
const aboutContent = [
  {
    title: "Our Mission",
    description:
      "Our mission is to drive innovation and create value for our clients through cutting-edge solutions, creative thinking, and expert collaboration. We believe in using technology to empower businesses and individuals, bringing a positive impact to communities worldwide.",
    icon: "🌟",
  },
  {
    title: "Our Vision",
    description:
      "Our vision is to become a global leader in innovation and technology, constantly evolving to meet the needs of the future. We aim to foster creativity, inclusivity, and excellence in everything we do, setting new standards in our industry.",
    icon: "🔮",
  },
  {
    title: "Core Values",
    description:
      "Integrity, collaboration, and continuous improvement are the core values that drive us. We are committed to ethical practices, mutual respect, and the relentless pursuit of excellence.",
    icon: "💡",
  },
];

const teamMembers = [
  {
    name: "Vinoth Kumar.V",
    designation: "CEO & Founder",
    photo: "/Team/Team_Member_1.png",
  },
  {
    name: "Sreedhar.S",
    designation: "MD",
    photo: "/Team/Team_Member_2.png",
  },
  {
    name: "Silvester.V",
    designation: "Marketing Lead",
    photo: "/Team/Team_Member_3.png",
  },
];

const AboutPage = () => {
  return (
    <Box
      sx={{
        py: 5,
        px: { xs: 2, sm: 4, md: 8 },
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      {/* About Us Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        About Us
      </Typography>

      {/* About Section */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-around"
        gap={4}
        mb={6}
      >
        {aboutContent.map((section, index) => (
          <Paper
            key={index}
            elevation={6}
            sx={{
              p: 4,
              maxWidth: { xs: "100%", md: "30%" },
              borderRadius: 4,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              {section.icon} {section.title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {section.description}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Meet the Team Section */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Meet the Team
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
      >
        {teamMembers.map((member, index) => (
          <Box
            key={index}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
              borderRadius: "12px",
              backgroundColor: "white",
              boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
              width: { xs: "100%", sm: "300px" },
              textAlign: "center",
            }}
          >
            <Avatar
              src={member.photo}
              alt={member.name}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            />
            <Typography variant="h6" fontWeight="bold">
              {member.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {member.designation}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AboutPage;
