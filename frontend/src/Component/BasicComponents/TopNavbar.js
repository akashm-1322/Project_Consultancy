import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Box, keyframes } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const loggedIn = true;
const userRole = "admin";

const fetchAdminName = () => localStorage.getItem('adminName') || "AdminName";

// Keyframes for gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Keyframes for icon bounce
const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
`;

// Keyframes for text entrance
const fadeInScale = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const TopNavbar = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    if (loggedIn && userRole === "admin") {
      const name = fetchAdminName();
      setAdminName(name);
    }
  }, []);

  const getUserIcon = () => {
    if (!loggedIn) return <AccountCircleIcon sx={{ color: '#fff', fontSize: '32px' }} />;

    if (userRole === "user") {
      return <Box sx={iconStyles}>USER</Box>;
    } else if (userRole === "admin") {
      const adminInitials = adminName.slice(0, 2).toUpperCase();
      return <Box sx={iconStyles}>{adminInitials}</Box>;
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(135deg, #6a11cb, #2575fc, #6a11cb)',
        backgroundSize: '300% 300%',
        animation: `${gradientAnimation} 10s ease infinite`,
        overflowX: 'hidden',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {/* Left-aligned Logo and Consultancy Name */}
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <IconButton component={Link} to="/" sx={{ color: '#fff' }}>
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" width="70" height="30" />
          </IconButton>
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontFamily: 'Pacifico, cursive',
              fontSize: '2rem',
              textDecoration: 'none',
              marginLeft: '8px',
              animation: `${fadeInScale} 1.5s ease`,
            }}
          >
            J99 Recruitment Services Pvt. Ltd
          </Typography>
        </Box>

        {/* Right-aligned Contact Details and User Icon */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={contactDetailsBox}>
            <PhoneIcon sx={iconStyles} />
            <Typography sx={{ color: '#fff', fontSize: '1.2rem', padding: '3px' }}>+91 9884945606</Typography>
          </Box>
          <Box sx={contactDetailsBox}>
            <MailIcon sx={iconStyles} />
            <Typography sx={{ color: '#fff', fontSize: '1.2rem', padding: '3px' }}>J99Recruitmentservices@gmail.com</Typography>
          </Box>

          {/* User/Admin Icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: '10px' }}>
            {getUserIcon()}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Styles for the icon circle
const iconStyles = {
  width: '32px',
  height: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: '#fff',
  color: '#6a11cb',
  fontWeight: 'bold',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    backgroundColor: '#2575fc',
    transform: 'scale(1.1)',
    boxShadow: '0px 6px 12px rgba(37, 117, 252, 0.5)',
    animation: `${bounceAnimation} 0.6s ease`,
  },
};

// Styles for contact details
const contactDetailsBox = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: '5px 15px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  transition: 'background-color 0.4s ease, transform 0.3s ease',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#2575fc',
    transform: 'scale(1.05)',
    boxShadow: '0px 5px 10px rgba(37, 117, 252, 0.5)',
  },
};

export default TopNavbar;
