import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavbarComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: '#eaf2f8', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
      <Container className='text-dark' style={{fontWeight: "600" , fontSize:"24px"}}>
        <Toolbar>
          {/* Logo and Brand */}
          <Box display="flex" alignItems="center" flexGrow={1}>
            <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="logo">
              <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" width="70" height="30" style={{ marginRight: '8px' }} />
            </IconButton>
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
              J99 World Tours
            </Typography>
          </Box>

          {/* Menu Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button component={Link} to="/" color="inherit">
              <b>Home</b>
            </Button>
            <Button component={Link} to="/services" color="inherit">
              <b>Services</b>
            </Button>
            <Button component={Link} to="/about" color="inherit">
              <b>About Us</b>
            </Button>
            <Button component={Link} to="/contact" color="inherit">
              <b>Contact</b>
            </Button>

            {/* Dropdown Menu */}
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              endIcon={<MenuIcon />}
            >
              <b>More</b>
            </Button>
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
              <MenuItem onClick={handleMenuClose} component={Link} to="/action">
                <b>Action</b>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/another-action">
                <b>Another Action</b>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/something-else">
                <b>Something Else</b>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarComponent;
