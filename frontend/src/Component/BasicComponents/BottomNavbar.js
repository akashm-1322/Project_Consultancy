import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Stack, Box, useTheme, useMediaQuery } from "@mui/material";
import { IoMenuSharp } from "react-icons/io5";
import { FaHome, FaUsers } from "react-icons/fa";
import { MdContactEmergency, MdFlightTakeoff } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const BottomNavbar = ({ isAdmin }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For screens < 768px
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // For screens < 1024px

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <AppBar position="relative" sx={{ bottom: 0, left: 0, right: 0, background: "linear-gradient(90deg, #ffffff, #03a15a)", boxShadow: 3 }}>
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center", textAlign:"center" ,  flexDirection: isMobile ? "column" : "row", alignItems: "center" }}>
          {/* Mobile Menu Icon */}
          <IconButton onClick={toggleMobileMenu} sx={{ display: isSmallScreen ? "block" : "none" }}>
            <IoMenuSharp style={{ fontSize: 30, color: "#000" }} />
          </IconButton>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Stack direction="row" spacing={8}>
              <Link to="/" className="nav-link">
                <IconButton sx={{ color: "#000" }}>
                  <FaHome style={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="body1" sx={{ color: "#000" }}>Home</Typography>
              </Link>
              <Link to="/services" className="nav-link">
                <IconButton sx={{ color: "#000" }}>
                  <MdFlightTakeoff style={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="body1" sx={{ color: "#000" }}>Services</Typography>
              </Link>
              <Link to="/about" className="nav-link">
                <IconButton sx={{ color: "#000" }}>
                  <FaUsers style={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="body1" sx={{ color: "#000" }}>About Us</Typography>
              </Link>
              <Link to="/contact" className="nav-link">
                <IconButton sx={{ color: "#000" }}>
                  <MdContactEmergency style={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="body1" sx={{ color: "#000" }}>Contact</Typography>
              </Link>
              {isAdmin && (
                <Link to="/admincontacts" className="nav-link">
                  <IconButton sx={{ color: "#000" }}>
                    <RiAdminFill style={{ fontSize: 32 }} />
                  </IconButton>
                  <Typography variant="body1" sx={{ color: "#000" }}>Admin Contacts</Typography>
                </Link>
              )}
            </Stack>
          )}

          {/* Mobile Dropdown Menu */}
          {mobileOpen && isMobile && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              sx={{ position: "absolute", bottom: "60px", width: "100%", backgroundColor: "white", boxShadow: 3, borderRadius: "8px" }}
            >
              <Stack spacing={2} sx={{ padding: 2  , color:"#000"}}>
                <Link to="/" className="mobile-link" onClick={toggleMobileMenu}>
                  <FaHome style={{ fontSize: 24, color: "#000" }} /> Home
                </Link>
                <Link to="/services" className="mobile-link" onClick={toggleMobileMenu}>
                  <MdFlightTakeoff style={{ fontSize: 24, color: "#000" }} /> Services
                </Link>
                <Link to="/about" className="mobile-link" onClick={toggleMobileMenu}>
                  <FaUsers style={{ fontSize: 24, color: "#000" }} /> About Us
                </Link>
                <Link to="/contact" className="mobile-link" onClick={toggleMobileMenu}>
                  <MdContactEmergency style={{ fontSize: 24, color: "#000" }} /> Contact
                </Link>
                {isAdmin && (
                  <Link to="/admincontacts" className="mobile-link" onClick={toggleMobileMenu}>
                    <RiAdminFill style={{ fontSize: 24, color: "#000" }} /> Admin Contacts
                  </Link>
                )}
              </Stack>
            </MotionBox>
          )}
        </Toolbar>
      </MotionBox>
    </AppBar>
  );
};

export default BottomNavbar;
