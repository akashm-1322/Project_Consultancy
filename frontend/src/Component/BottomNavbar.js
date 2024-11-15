import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, Box, Button, Fade } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { styled } from '@mui/system';

const BottomNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'black',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
        height: '60px',
        width: '100%',
        overflow: 'hidden',  // Remove scrollbars
        zIndex: 1201,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: 0,
          overflow: 'hidden', // Prevent overflow that might cause scrollbars
        }}
      >
        {/* Desktop Menu Items */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: '20px',
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          <StyledButton component={Link} to="/" startIcon={<HomeIcon />} sx={{ textTransform: 'none' }}>
            Home
          </StyledButton>
          <StyledButton component={Link} to="/services" startIcon={<FlightTakeoffIcon />} sx={{ textTransform: 'none' }}>
            Services
          </StyledButton>
          <StyledButton component={Link} to="/about" startIcon={<InfoIcon />} sx={{ textTransform: 'none' }}>
            About Us
          </StyledButton>
          <StyledButton component={Link} to="/contact" startIcon={<ContactMailIcon />} sx={{ textTransform: 'none' }}>
            Contact
          </StyledButton>
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            sx={{ color: '#fff', '&:hover': { color: '#ffcc00' }, transition: 'color 0.3s ease' }}
          >
            <MenuIcon sx={{ fontSize: '1.8rem' }} />
          </IconButton>
        </Box>

        {/* Mobile Dropdown Menu with Fade Animation */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          TransitionComponent={Fade}
        >
          <StyledMenuButton onClick={handleMenuClose} component={Link} to="/" fullWidth>
            Home
          </StyledMenuButton>
          <StyledMenuButton onClick={handleMenuClose} component={Link} to="/services" fullWidth>
            Services
          </StyledMenuButton>
          <StyledMenuButton onClick={handleMenuClose} component={Link} to="/about" fullWidth>
            About Us
          </StyledMenuButton>
          <StyledMenuButton onClick={handleMenuClose} component={Link} to="/contact" fullWidth>
            Contact
          </StyledMenuButton>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

// Styled Button for Desktop with animations
const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  fontWeight: '700',
  fontSize: '1.2rem',
  fontFamily: 'Roboto, sans-serif',
  textTransform: 'uppercase',
  transition: 'color 0.3s ease, transform 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '&:hover': {
    color: '#ffcc00',
    transform: 'scale(1.1)',
  },
}));

// Styled Menu Button for Mobile with hover effect
const StyledMenuButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  fontWeight: '500',
  fontSize: '1rem',
  textTransform: 'capitalize',
  fontFamily: 'Roboto, sans-serif',
  padding: '10px 20px',
  transition: 'background-color 0.2s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: '#ffcc00',
    color: '#000',
  },
}));

export default BottomNavbar;
