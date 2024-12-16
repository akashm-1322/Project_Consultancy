import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import { GiAchievement } from "react-icons/gi";
import { FaUsers, FaGraduationCap, FaPlane, FaTrophy } from "react-icons/fa";
import success1 from "../../../Asset/success1.jpg";
import success2 from "../../../Asset/success2.jpg";
import { motion } from "framer-motion"; // For animations

const successImages = [
  { src: success1, alt: "Counselling" },
  { src: success2, alt: "Admissions" },
];


// Stats data
const statsData = [
  {
    label: "Years of Experience",
    value: 13,
    icon: <GiAchievement size={40} color="#4caf50" />,
  },
  {
    label: "Counselled Students",
    value: 100,
    icon: <FaUsers size={40} color="#2196f3" />,
  },
  {
    label: "Admissions Secured",
    value: 100,
    icon: <FaGraduationCap size={40} color="#ff9800" />,
  },
  {
    label: "Visas Processed",
    value: 100,
    icon: <FaPlane size={40} color="#673ab7" />,
  },
  {
    label: "Success Rate",
    value: 90,
    suffix: "%",
    icon: <FaTrophy size={40} color="#f44336" />,
  },
];

// Counter Component for animated stats
const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = value / 100; // Smooth animation
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(current));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <Typography variant="h4" fontWeight="bold" color="primary">
      {count}
      {suffix || "+"}
    </Typography>
  );
};

const WeProcess = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: 2,
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      {/* Header Section */}
      <Typography variant="h3" fontWeight="bold" mb={2}>
        Why Choose Us?
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        Trusted by thousands to guide their international education journey.
      </Typography>

      {/* Stats Section */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 6 }}
      >
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card
                elevation={6}
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 4,
                  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#e0f2f1",
                    width: 70,
                    height: 70,
                    mb: 2,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Counter value={stat.value} suffix={stat.suffix} />
                <Typography variant="h6" mt={1} color="textSecondary">
                  {stat.label}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Graphics Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Empowering Success, One Step at a Time
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={4}>
          From personalized counselling to successful visa processing, we are here
          to guide you.
        </Typography>
      </Box>

      {/* Images Section */}
      <Box sx={{ my: 4 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {successImages.map((image, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <motion.img
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: "300px", // Set fixed height for all images
                objectFit: "cover", // Maintain aspect ratio, cropping if necessary
                borderRadius: "12px",
                boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
  );
};

export default WeProcess;
