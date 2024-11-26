import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/BasicComponents/Navbar";
import OpeningPage from "./Component/Pages/OpeningPage";
import HomePage from "./Component/NavBarMenus/HomePage";
import ServicesPage from "./Component/NavBarMenus/Service";
import AboutPage from "./Component/NavBarMenus/AboutPage";
import ContactPage from "./Component/NavBarMenus/ContactPage";
import AdminContacts from "./Component/NavBarMenus/AdminContacts";
import Footer from "./Component/BasicComponents/Footer";
import EndFooter from "./Component/BasicComponents/EndFooter";
import ContactBoxes from "./Component/Pages/ContactBoxes";
import CountryComponent from "./Component/NavBarMenus/CountryComponent";
import FieldComponent from "./Component/NavBarMenus/FieldComponent"; // Import the new component
import "./App.css";

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(""); // "USER" or "ADMIN"
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState(""); // Store the admin's name here
  const [showContactBoxes, setShowContactBoxes] = useState(true); // State to control visibility of ContactBoxes

  const handleNavigate = (type, adminName = "") => {
    setIsLoggedIn(true);
    setUserType(type); // Set "ADMIN" or "USER" directly
    setAdminName(adminName); // Set the admin's name

    // Persist login state
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", type);
    if (type === "ADMIN") localStorage.setItem("adminName", adminName);
  };

  const handleLogout = () => {
    // Clear localStorage and reset states
    localStorage.clear();
    setIsLoggedIn(false);
    setUserType("");
    setAdminName("");
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserType = localStorage.getItem("userType");

    if (storedIsLoggedIn === "true" && storedUserType) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
      if (storedUserType === "ADMIN") {
        const name = localStorage.getItem("adminName");
        setAdminName(name); // Fetch the admin name from localStorage
      }
    }
    setLoading(false);

    // Function to handle scroll and check the bottom position
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 600) {
        setShowContactBoxes(false); // Hide contact boxes when bottom is less than or equal to 600px
      } else {
        setShowContactBoxes(true); // Show contact boxes when it's not
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <div>Loading...</div>; // Display loading state while data is being retrieved

  return (
    <>
      {!isLoggedIn ? (
        <OpeningPage onNavigate={handleNavigate} />
      ) : (
        <div className="app-wrapper">
          <Navbar
            isAdmin={userType === "ADMIN"}
            adminName={adminName}
            onLogout={handleLogout}
          />
          <div className="main-content">
            {/* Conditionally render ContactBoxes based on the scroll position */}
            {showContactBoxes && <ContactBoxes />}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Admin Route */}
              {userType === "ADMIN" && (
              <Route
              path="/admincontacts"
              element={
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <AdminContacts />
                <CountryComponent />
                <FieldComponent />
                </div>
              }
              />
            )}

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
          <EndFooter />
        </div>
      )}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
