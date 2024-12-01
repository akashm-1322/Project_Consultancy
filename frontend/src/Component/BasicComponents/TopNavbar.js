import React from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";  // Import the logout icon
import { keyframes } from "@mui/system";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const scaleAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const bounceAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const fadeInAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const TopNavbar = ({ userRole, adminName, onLogout }) => {
  const renderUserDetails = () => {
    if (userRole === "admin") {
      const displayName = adminName.slice(0, 4).toUpperCase(); // First 4 letters of admin username
      return (
        <>
          <AccountCircleIcon sx={{ ...iconStyles, animation: `${scaleAnimation} 1s ease-in-out` }} />
          <Typography sx={{ ...userTextStyles, animation: `${fadeInAnimation} 2s ease` }}>
            {displayName}
          </Typography>
        </>
      );
    } else if (userRole === "user") {
      return (
        <>
          <AccountCircleIcon sx={{ ...iconStyles, animation: `${scaleAnimation} 1s ease-in-out` }} />
          <Typography sx={{ ...userTextStyles, animation: `${fadeInAnimation} 2s ease` }}>
            USER
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <AccountCircleIcon sx={{ ...iconStyles, animation: `${scaleAnimation} 1s ease-in-out` }} />
          <Typography sx={{ ...userTextStyles, animation: `${fadeInAnimation} 2s ease` }}>
            Guest
          </Typography>
        </>
      );
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg , #fff , rgba(3, 161, 90, 0.975))",
        backgroundSize: "300% 300%",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
        <div className="logo-container ml-2">
        <img src="/j99_logo.png" alt="logo" width="80" height="50" />
        </div>
          <Typography
            variant="h4"
            sx={{
              color: "rgba(3, 161, 90, 0.975)",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: "1.8rem",
              fontFamily: "Times New Roman, serif",
              animation: `${fadeInAnimation} 3s ease`,
            }}
          >
            J99 Recruitment Services Pvt. Ltd
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={3}>
          <Box sx={{ ...contactBoxStyles, animation: `${bounceAnimation} 2s infinite` }}>
            <FaPhone sx={{ fontSize: "32px"}}  style ={{color: "#000" }} />
            <Typography sx={contactTextStyles}>+91 9884945606</Typography>
          </Box>
          <Box sx={{ ...contactBoxStyles, animation: `${bounceAnimation} 2s infinite` }}>
            <FaEnvelope sx={{ fontSize: "32px"}} style ={{color: "#000" }} />
            <Typography sx={contactTextStyles}>
              J99Recruitmentservices@gmail.com
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            {renderUserDetails()}
            <IconButton onClick={onLogout} sx={{ color: "#fff", marginLeft: 2 }}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Styles
const iconStyles = {
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "#fff",
  color: "#000",
  fontWeight: "bold",
  fontSize: "1rem",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
};

const userTextStyles = {
  color: "#000",
  fontWeight: "bold",
  fontSize: "1.1rem",
};

const contactBoxStyles = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  padding: "8px",
  borderRadius: "50px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
};

const contactTextStyles = {
  marginLeft: "8px",
  color: "#000",
  fontSize: "1rem",
  fontWeight: "600",
};

export default TopNavbar;
