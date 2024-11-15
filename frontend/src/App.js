// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import OpeningPage from './Pages/OpeningPage';
import FirstApp from './Pages/FirstApp'; // Import the FirstApp component
import NavbarComponent from './Component/Navbar'; // Navbar should be available across main pages only
import ServicesPage from './Component/Service'; // Services Page
import AboutPage from './Pages/AboutPage'; // About Page
import ContactPage from './Pages/ContactPage'; // Contact Page
import Footer from './Component/Footer';
import NavFooter from './Component/NavFooter';

const AppContent = () => {
  const location = useLocation();
  
  // Conditionally show Navbar and Footers based on the current route
  const showNavAndFooter = location.pathname !== '/';

  return (
    <>
      {showNavAndFooter && <NavbarComponent />}
      
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/home/*" element={<FirstApp />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      
      {showNavAndFooter && <Footer />}
      {showNavAndFooter && <NavFooter />}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
