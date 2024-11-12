import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Container, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/system';

// Top Navbar Component (Logo, Consultancy Name, Contact Details)
const TopNavbarComponent = () => {
  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', height: '120px' }}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo and Consultancy Name */}
          <Box display="flex" alignItems="center" sx={{ height: '90%' }}>
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
                height: '100%', // Ensure it takes up 100% height within the container
                display: 'flex',
                alignItems: 'center', // Center vertically
              }}
            >
              J99 World Tours
            </Typography>
          </Box>

          {/* Contact Details */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                backgroundColor: 'black',
                padding: '5px 15px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <PhoneIcon sx={{ color: '#fff', marginRight: '8px' }} />
              <Typography sx={{ color: '#fff', fontSize: '1.2rem' }}>+1 234 567 890</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'black',
                padding: '5px 15px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MailIcon sx={{ color: '#fff', marginRight: '8px' }} />
              <Typography sx={{ color: '#fff', fontSize: '1.2rem' }}>contact@j99tours.com</Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Bottom Navbar Component (Menu Links)
const BottomNavbarComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Styled Button with hover and transition effects
  const StyledButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.2rem',
    fontFamily: 'Roboto, sans-serif',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      color: '#ffcc00',
      transform: 'scale(1.1)',
    },
  }));

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'black', boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)', height: '60px' }}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Menu Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
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

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="inherit" onClick={handleMenuOpen} sx={{ color: '#fff' }}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile Dropdown Menu */}
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
          >
            <StyledButton onClick={handleMenuClose} component={Link} to="/" fullWidth>
              Home
            </StyledButton>
            <StyledButton onClick={handleMenuClose} component={Link} to="/services" fullWidth>
              Services
            </StyledButton>
            <StyledButton onClick={handleMenuClose} component={Link} to="/about" fullWidth>
              About Us
            </StyledButton>
            <StyledButton onClick={handleMenuClose} component={Link} to="/contact" fullWidth>
              Contact
            </StyledButton>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Main Navbar Component that includes both Top and Bottom Navbars
const NavbarComponent = () => {
  return (
    <>
      <TopNavbarComponent />
      <BottomNavbarComponent />
    </>
  );
};

export default NavbarComponent;
