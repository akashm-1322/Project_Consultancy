import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Box,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
} from "@mui/material";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { FaHome, FaUsers } from "react-icons/fa";
import { MdContactEmergency, MdFlightTakeoff } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { motion } from "framer-motion";

// Framer Motion Component
const MotionBox = motion(Box);

const BottomNavbar = ({ isAdmin }) => {
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const theme = useTheme();

  // Breakpoints for responsiveness
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isSmallScreen = isMobile || isTablet;

  // Open/Close menu handlers
  const openMenuDialog = () => setMenuDialogOpen(true);
  const closeMenuDialog = () => setMenuDialogOpen(false);

  // Animated Link Component
  const AnimatedLink = ({ to, icon: Icon, text, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={to}
        onClick={(e) => {
          if (onClick) onClick();
          closeMenuDialog(); // Ensure close on click for all links
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#000",
          fontSize: "1.2rem",
          textDecoration: "none",
          padding: "10px 16px",
          borderRadius: "12px",
          background: "linear-gradient(90deg, #ffffff, #e6f9ee)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <Icon style={{ fontSize: 24, color: "#03a15a" }} />
        {text}
      </Link>
    </motion.div>  
  );

  return (
    <AppBar
      position="relative"
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(90deg, #ffffff, #03a15a)",
        boxShadow: 3,
      }}
    >
      {/* Main Navigation */}
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Mobile Menu Icon */}
          {isSmallScreen && (
            <IconButton onClick={openMenuDialog} sx={{ color: "#000" }}>
              <IoMenuSharp style={{ fontSize: 32 }} />
            </IconButton>
          )}

          {/* Desktop Navigation */}
          {!isSmallScreen && (
            <Stack direction="row" spacing={8}>
              <AnimatedLink to="/" icon={FaHome} text="Home" />
              <AnimatedLink to="/services" icon={MdFlightTakeoff} text="Services" />
              <AnimatedLink to="/about" icon={FaUsers} text="About Us" />
              <AnimatedLink to="/contact" icon={MdContactEmergency} text="Contact" />
              {isAdmin && (
                <AnimatedLink to="/admincontacts" icon={RiAdminFill} text="Admin Contacts" />
              )}
            </Stack>
          )}
        </Toolbar>
      </MotionBox>

      {/* Dialog for Mobile/Tablet Navigation */}
      <Dialog
        open={menuDialogOpen}
        onClose={closeMenuDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            background: "linear-gradient(135deg, #ffffff, #d0f3e4)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            position: "relative",
          },
        }}
      >
        <DialogContent
          sx={{
            padding: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Close Icon */}
          <IconButton
  onClick={(e) => {
    e.stopPropagation();
    closeMenuDialog();
  }}
  sx={{ position: "absolute", top: 2, right: 2, color: "#000" }}
>
  <IoClose style={{ fontSize: 28 }} />
</IconButton>


          {/* Navigation Links */}
          <AnimatedLink to="/" icon={FaHome} text="Home" onClick={closeMenuDialog} />
          <AnimatedLink
            to="/services"
            icon={MdFlightTakeoff}
            text="Services"
            onClick={closeMenuDialog}
          />
          <AnimatedLink to="/about" icon={FaUsers} text="About Us" onClick={closeMenuDialog} />
          <AnimatedLink
            to="/contact"
            icon={MdContactEmergency}
            text="Contact"
            onClick={closeMenuDialog}
          />
          {isAdmin && (
            <AnimatedLink
              to="/admincontacts"
              icon={RiAdminFill}
              text="Admin Contacts"
              onClick={closeMenuDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </AppBar>
  );
};

export default BottomNavbar;
