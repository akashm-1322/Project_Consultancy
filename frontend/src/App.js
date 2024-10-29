import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './Component/Navbar';
import Footer from './Component/Footer';
import HomePage from './Pages/HomePage';
import Service from './Component/Service';
import ContactPage from './Pages/ContactPage';
import AboutPage from './Pages/AboutPage';

const App = () => (
  <Router>
    <NavbarComponent />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<Service />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
