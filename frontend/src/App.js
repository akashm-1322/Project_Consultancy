import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './Component/Navbar';
import Footer from './Component/Footer';
import HomePage from './Pages/HomePage';
import ServicesPage from './Pages/ServicesPage';
import ContactPage from './Pages/ContactPage';
import AboutPage from './Pages/AboutPage';
import WeProcess from './Component/WeProcess';

const App = () => (
  <Router>
    <NavbarComponent />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
    <WeProcess />
    <Footer />
  </Router>
);

export default App;
