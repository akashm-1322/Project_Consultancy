import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage'; // HomePage component
import ServicesPage from '../Component/Service'; // ServicesPage component
import AboutPage from './AboutPage'; // AboutPage component
import ContactPage from './ContactPage'; // ContactPage component

const FirstApp = () => (
  <div>
    <Routes>
      {/* Route for HomePage */}
      <Route path="/" element={<HomePage />} />
      {/* Other nested routes */}
      <Route path="services" element={<ServicesPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      {/* Fallback for unmatched routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </div>
);

export default FirstApp;
