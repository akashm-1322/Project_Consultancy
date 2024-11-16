import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import OpeningPage from './Pages/OpeningPage';
import HomePage from './Pages/HomePage';
import ServicesPage from './Component/Service';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import AdminContacts from './Component/AdminContacts';
import Footer from './Component/Footer';
import NavFooter from './Component/NavFooter';

const AppContent = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true); // OpeningPage visible initially
  const [isAdmin, setIsAdmin] = useState(false);

  const handleNavigate = (admin) => {
    // Set visit states only after user takes action
    localStorage.setItem('hasVisited', 'true');
    localStorage.setItem('isAdmin', admin ? 'true' : 'false');
    setIsFirstVisit(false);
    setIsAdmin(admin);
  };

  if (isFirstVisit) {
    // Always render OpeningPage until action is taken
    return <OpeningPage onNavigate={handleNavigate} />;
  }

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {isAdmin && <Route path="/admincontacts" element={<AdminContacts />} />}
      </Routes>
      <Footer />
      <NavFooter />
    </>
  );
};


const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
