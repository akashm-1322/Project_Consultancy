import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Use Routes and Route for nested routes
import HomePage from './HomePage';  // HomePage component
import ServicesPage from '../Component/Service';  // Services page
import AboutPage from './AboutPage';  // About page
import ContactPage from './ContactPage';  // Contact page

const FirstApp = () => (
  <div>
    {/* FirstApp will handle the nested routes */}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
    </Routes>
  </div>
);

export default FirstApp;
