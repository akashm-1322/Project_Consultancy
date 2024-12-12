import React, { useState, useEffect , Suspense , lazy} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/BasicComponents/Navbar";
import OpeningPage from "./Component/Pages/OpeningPage";
import "./App.css";

// Lazy Loading 
const HomePage = lazy(() => import("./Component/NavBarMenus/HomePage"));
const ServicesPage = lazy(() => import("./Component/NavBarMenus/Service"));
const AboutPage = lazy(() => import("./Component/NavBarMenus/AboutPage"));
const ContactPage = lazy(() => import("./Component/NavBarMenus/ContactPage"));
const AdminContacts = lazy(() => import("./Component/NavBarMenus/AdminContacts"));
const Footer = lazy(() => import("./Component/BasicComponents/Footer"));
const EndFooter = lazy(() => import("./Component/BasicComponents/EndFooter"));
const ContactBoxes = lazy(() => import("./Component/Pages/ContactBoxes"));
const CountryComponent = lazy(() => import("./Component/NavBarMenus/CountryComponent"));
const FieldComponent = lazy(() => import("./Component/NavBarMenus/FieldComponent"));


const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState(""); 
  const [showContactBoxes, setShowContactBoxes] = useState(true); 

  const handleNavigate = (type, adminName = "") => {
    setIsLoggedIn(true);
    setUserType(type); 
    setAdminName(adminName); 

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", type);
    if (type === "ADMIN") localStorage.setItem("adminName", adminName);
  };

  const handleLogout = () => {
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
        setAdminName(name); 
      }
    }
    setLoading(false);

    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 600) {
        setShowContactBoxes(false); 
      } else {
        setShowContactBoxes(true); 
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <head>
        <meta http-equiv="Cache-Control" content="no-store" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
      </head>
      <Suspense fallback={<div>Loading...</div>}>
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
            {showContactBoxes && <ContactBoxes />}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
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
      </Suspense>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
