// src/pages/UserPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import the hook
import { FaUserCircle, FaRegSmile, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';
import './UserPage.css';

const UserPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // You can navigate to the home page after the user page is loaded
  const handleNavigateToHome = () => {
    navigate('/home');
  };

  return (
    <div className="user-page">
      <header className="user-page-header">
        <FaUserCircle className="user-icon" />
        <h2>Welcome to the User Page</h2>
        <p>Explore our features designed just for you!</p>
      </header>

      <section className="user-page-content">
        <div className="feature-card">
          <FaRegSmile className="feature-icon" />
          <h3>Friendly Experience</h3>
          <p>Our platform is designed to make your experience enjoyable and easy to navigate.</p>
        </div>

        <div className="feature-card">
          <FaInfoCircle className="feature-icon" />
          <h3>About Us</h3>
          <p>Learn more about our journey, values, and commitment to serving you better.</p>
        </div>

        <div className="feature-card">
          <FaPhoneAlt className="feature-icon" />
          <h3>24/7 Support</h3>
          <p>Need help? Our support team is available around the clock to assist you.</p>
        </div>
      </section>

      <footer className="user-page-footer">
        <button onClick={handleNavigateToHome}>Go to Home</button>
      </footer>
    </div>
  );
};

export default UserPage;
