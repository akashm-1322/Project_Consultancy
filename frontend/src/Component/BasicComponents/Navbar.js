import React from "react";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";

const Navbar = ({ isAdmin, adminName, onLogout }) => {
  return (
    <div>
      <TopNavbar
        userRole={isAdmin ? "admin" : "user"}
        adminName={adminName}
        onLogout={onLogout}
      />
      <BottomNavbar isAdmin={isAdmin} />
    </div>
  );
};

export default Navbar;
