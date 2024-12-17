import React, { useState } from "react";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Fade,
} from "@mui/material";
import axios from "axios";

const OpeningPage = ({ onNavigate }) => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Navigate to User Page
  const handleUserLogin = () => {
    onNavigate("USER");
  };

  // Handle Admin Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Strong password required: 8+ chars, uppercase, lowercase, number, and special char."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5500/api/admin/login",
        { username, password }
      );
      if (response.data.message === "Login successful") {
        onNavigate("ADMIN", response.data.username);
      } else {
        setErrorMessage("Unexpected server response.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error connecting to server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
      }}
    >
      {/* Left Box */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 3, md: 5 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          animation: "fadeIn 1.2s ease-in",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            color: "#333",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Welcome to Our Application
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            textAlign: "center",
            color: "#555",
          }}
        >
          Select your role to continue:
        </Typography>

        {/* Role Selection Buttons */}
        {!isAdminLogin ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<FaUser />}
              onClick={handleUserLogin}
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                px: 4,
                py: 1.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#145da0",
                  transform: "scale(1.05)",
                },
              }}
            >
              User Page
            </Button>
            <Button
              variant="outlined"
              startIcon={<FaSignInAlt />}
              onClick={() => setIsAdminLogin(true)}
              sx={{
                px: 4,
                py: 1.5,
                color: "#1976d2",
                borderColor: "#1976d2",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  transform: "scale(1.05)",
                },
              }}
            >
              Admin Login
            </Button>
          </Box>
        ) : (
          <Fade in={isAdminLogin}>
            <Box
              component="form"
              onSubmit={handleAdminLogin}
              sx={{
                width: "100%",
                maxWidth: 400,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2,
              }}
            >
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorMessage && (
                <Typography color="error" variant="body2">
                  {errorMessage}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.5,
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#145da0",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
              <Button
                variant="text"
                onClick={() => setIsAdminLogin(false)}
                sx={{ color: "#1976d2" }}
              >
                Back
              </Button>
            </Box>
          </Fade>
        )}
      </Box>

      {/* Right Box */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow: "-5px 0 10px rgba(0, 0, 0, 0.2)",
          position: "relative",
          animation: "slideIn 1.2s ease-out",
          "@keyframes slideIn": {
            from: { transform: "translateX(100%)", opacity: 0 },
            to: { transform: "translateX(0)", opacity: 1 },
          },
        }}
      >
        <Box textAlign="center">
          <img
            src="/j99_logo.png"
            alt="Company Logo"
            style={{
              width: "60%",
              maxWidth: "300px",
              marginBottom: "20px",
              animation: "bounce 2s infinite",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            J99 Recruitment Services Pvt. Ltd
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OpeningPage;
