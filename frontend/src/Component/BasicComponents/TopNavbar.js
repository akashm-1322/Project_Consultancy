import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";

const MotionBox = motion(Box);

const TopNavbar = ({ userRole, adminName, onLogout }) => {
  const theme = useTheme();

  // Breakpoints for responsiveness
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For screens <768px

  // Generate first two letters of username
  const getAvatarLetters = () => {
    if (userRole === "admin" && adminName) {
      return adminName.slice(0, 2).toUpperCase();
    } else if (userRole === "user") {
      return "US";
    }
    return "GU"; // For Guest
  };

  // Function to display user details
  const renderUserDetails = () => {
    const displayName =
      userRole === "admin" ? adminName.slice(0, 4).toUpperCase() : userRole === "user" ? "USER" : "Guest";

    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          sx={{
            bgcolor: "#ff9800",
            color: "black",
            width: isMobile ? 32 : 40,
            height: isMobile ? 32 : 40,
            fontSize: isMobile ? "0.8rem" : "1rem",
          }}
        >
          {getAvatarLetters()}
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {displayName}
        </Typography>
      </Stack>
    );
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #ffffff, #03a15a)", // Background gradient
        backgroundSize: "cover",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Framer Motion Animation */}
      <MotionBox
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Toolbar  sx={{
            display: "flex",
            justifyContent: "center", // Center content horizontally
            alignItems: "center", // Center content vertically
            gap: 4, // Add gap between elements
            flexWrap: "wrap", // Ensure responsiveness
          }}>
          {/* Logo Section */}
          <Box display="flex" alignItems="center" gap={2} sx={{ justifyContent: "center" }}>
            <img
              src="/j99_logo.png"
              alt="logo"
              width={isMobile ? 50 : 80}
              height={isMobile ? 50 : 80}
              style={{ borderRadius: "8px" }}
            />
            <Typography
              variant={isMobile ? "h6" : "h5"}
              component="div"
              sx={{ fontWeight: "bold", lineHeight: 1.2, color: "black" , textAlign: "center"}}
            >
              J99 Recruitment Services Pvt. Ltd
            </Typography>
          </Box>

          {/* Contact Information */}
          {!isMobile && (
            <Stack direction="row" spacing={4} alignItems="center" justifyContent="center">
              <Stack
  direction="row"
  spacing={1}
  alignItems="center"
  sx={{
    backgroundColor: "white",
    borderRadius: "50px", // Makes the container cylindrical
    padding: "8px 16px", // Vertical and horizontal padding
    color: "black",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for a 3D effect
  }}
>
  <PhoneIcon sx={{ color: "#03a15a" }} /> {/* Phone icon color */}
  <Typography variant="body1" sx={{ fontWeight: "500" }}>
    +91 9884945606
  </Typography>
</Stack>

<Stack
  direction="row"
  spacing={1}
  alignItems="center"
  sx={{
    backgroundColor: "white",
    borderRadius: "50px", // Makes the container cylindrical
    padding: "8px 16px",
    color: "black",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for a 3D effect
  }}
>
  <EmailIcon sx={{ color: "#03a15a" }} /> {/* Email icon color */}
  <Typography variant="body1" sx={{ fontWeight: "500" }}>
    J99Recruitmentservices@gmail.com
  </Typography>
</Stack>

            </Stack>
          )}

          {/* User Actions */}
          <Stack direction="row" spacing={2} alignItems="center">
            {renderUserDetails()}
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={onLogout}
              sx={{
                fontSize: isMobile ? "0.7rem" : "0.875rem",
                "&:hover": { transform: "scale(1.05)" },
                transition: "transform 0.3s ease-in-out",
              }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </MotionBox>
    </AppBar>
  );
};

export default TopNavbar;
