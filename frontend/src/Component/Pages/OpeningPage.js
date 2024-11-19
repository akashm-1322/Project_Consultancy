import React, { useState } from "react";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import "./OpeningPage.css";

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

    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      if (response.data.message === "Login successful") {
        // Navigate to Admin Page with username
        onNavigate("ADMIN", response.data.admin.username);
      } else {
        // Handle unexpected responses
        setErrorMessage("Unexpected response from server.");
      }
    } catch (error) {
      // Display error messages based on server response
      setErrorMessage(
        error.response?.data?.message || "Error connecting to the database"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="opening-page">
      <div className="content-wrapper">
        <div className="left-box">
          <div className="page-content">
            <h1 className="title">Welcome to Our Application</h1>
            <p className="subheading">Select your role to continue:</p>

            {/* Render User or Admin login options */}
            {!isAdminLogin ? (
              <div className="button-container">
                <button onClick={handleUserLogin} className="button user-button">
                  <FaUser className="button-icon" /> User Page
                </button>
                <button
                  onClick={() => setIsAdminLogin(true)}
                  className="button admin-button"
                >
                  <FaSignInAlt className="button-icon" /> Admin Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleAdminLogin} className="admin-login-form">
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button
                  type="button"
                  onClick={() => setIsAdminLogin(false)}
                  className="back-button"
                >
                  Back
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="right-box">
          <div className="company-logo">
            <img
              src="/path/to/your/logo.png" // Replace with the actual path to the logo
              alt="Company Logo"
              width="400"
              height="400"
            />
          </div>
          <p className="consultancy-name">J99 Recruitment Services Pvt. Ltd</p>
        </div>
      </div>
    </div>
  );
};

export default OpeningPage;
