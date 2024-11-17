import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/BasicComponents/Navbar";
import OpeningPage from "./Component/Pages/OpeningPage";
import HomePage from "./Component/NavBarMenus/HomePage";
import ServicesPage from "./Component/NavBarMenus/Service";
import AboutPage from "./Component/NavBarMenus/AboutPage";
import ContactPage from "./Component/NavBarMenus/ContactPage";
import AdminContacts from "./Component/NavBarMenus/AdminContacts";
import Footer from "./Component/BasicComponents/Footer";
import ContactBoxes from "./Component/Pages/ContactBoxes";
import EndFooter from "./Component/BasicComponents/EndFooter";
import "./App.css";

const AppContent = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHidden, setIsHidden] = useState(false);  // State for hiding contact box

  const handleNavigate = (isAdmin) => {
    localStorage.setItem("hasVisited", "true");
    localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
    setIsFirstVisit(false);
    setIsAdmin(isAdmin);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far the user has scrolled from the bottom of the page
      const scrollPosition = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;

      // Hide contact boxes if scrolled 500px or less from the bottom
      if (scrollPosition <= 500) {
        setIsHidden(true); // Hide the contact boxes
      } else {
        setIsHidden(false); // Show the contact boxes
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isFirstVisit) {
    return <OpeningPage onNavigate={handleNavigate} />;
  }

  return (
    <div className="app-wrapper">
      <Navbar isAdmin={isAdmin} />
      <div className="main-content">
        {/* Conditionally hide or show the ContactBoxes */}
        {!isHidden && <ContactBoxes />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {isAdmin && <Route path="/admincontacts" element={<AdminContacts />} />}
        </Routes>
      </div>
      <div className="d-flex flex-column">
        <Footer /> {/* Footer with an id for scroll detection */}
        <div style={{ marginTop: '20px' }}>
          <EndFooter />
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
