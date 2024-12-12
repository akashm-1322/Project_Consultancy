import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { styled } from '@mui/system';

const BottomNavbar = ({ isAdmin }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  /*const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };*/

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg , rgba(3, 161, 90, 0.975) , #fff )",
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
        height: '60px',
        width: '100%',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: 0,
        }}
      >
        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: '20px',
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          <Tooltip title="Home" arrow>
            <StyledButton component={Link} to="/" startIcon={<HomeIcon />}>
              Home
            </StyledButton>
          </Tooltip>
          <Tooltip title="Services" arrow>
            <StyledButton component={Link} to="/services" startIcon={<FlightTakeoffIcon />}>
              Services
            </StyledButton>
          </Tooltip>
          <Tooltip title="About Us" arrow>
            <StyledButton component={Link} to="/about" startIcon={<InfoIcon />}>
              About Us
            </StyledButton>
          </Tooltip>
          <Tooltip title="Contact" arrow>
            <StyledButton component={Link} to="/contact" startIcon={<ContactMailIcon />}>
              Contact
            </StyledButton>
          </Tooltip>
          {isAdmin && (
            <Tooltip title="Admin Contacts" arrow>
              <StyledButton component={Link} to="/admincontacts" startIcon={<ContactMailIcon />}>
                Admin Contacts
              </StyledButton>
            </Tooltip>
          )}
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            color="inherit"
            onClick={toggleMobileMenu}
            sx={{
              color: '#000',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.3s ease',
              },
            }}
          >
            <MenuIcon sx={{ fontSize: '1.8rem' }} />
          </IconButton>
        </Box>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <Box
            sx={{
              position: 'absolute',
              top: '60px',
              left: 0,
              width: '100%',
              backgroundColor: 'white',
              zIndex: 2,
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <StyledMenuButton onClick={toggleMobileMenu} component={Link} to="/" startIcon={<HomeIcon />}>
              Home
            </StyledMenuButton>
            <StyledMenuButton onClick={toggleMobileMenu} component={Link} to="/services" startIcon={<FlightTakeoffIcon />}>
              Services
            </StyledMenuButton>
            <StyledMenuButton onClick={toggleMobileMenu} component={Link} to="/about" startIcon={<InfoIcon />}>
              About Us
            </StyledMenuButton>
            <StyledMenuButton onClick={toggleMobileMenu} component={Link} to="/contact" startIcon={<ContactMailIcon />}>
              Contact
            </StyledMenuButton>
            {isAdmin && (
              <StyledMenuButton onClick={toggleMobileMenu} component={Link} to="/admincontacts" startIcon={<ContactMailIcon />}>
                Admin Contacts
              </StyledMenuButton>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Styled Button for Desktop Menu with hover animation
const StyledButton = styled(Button)(({ theme }) => ({
  color: '#000',
  fontWeight: '700',
  fontSize: '1.2rem',
  fontFamily: 'Roboto, sans-serif',
  padding: '10px 15px',
  '&:hover': {
    color: '#FF7F50', // Orange color
    background: 'linear-gradient(90deg , rgba(3, 161, 90, 0.975) , #fff)',
    transform: 'scale(1.05)', // Zoom-in effect on hover
    transition: 'transform 0.3s ease, color 0.3s ease', // Smooth transition for hover effect
  },
}));

// Styled Button for Mobile Dropdown Menu
const StyledMenuButton = styled(Button)(({ theme }) => ({
  color: '#000',
  fontWeight: '700',
  fontSize: '1rem',
  fontFamily: 'Roboto, sans-serif',
  padding: '10px 15px',
  justifyContent: 'flex-start',
  '&:hover': {
    color: '#FF7F50', // Orange color
    background: 'linear-gradient(90deg , rgba(3, 161, 90, 0.975) , #fff)',
    transform: 'scale(1.05)', // Zoom-in effect on hover
    transition: 'transform 0.3s ease, color 0.3s ease', // Smooth transition for hover effect
  },
}));

export default BottomNavbar;