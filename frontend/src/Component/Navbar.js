import React from 'react';
import TopNavbar from './TopNavbar';
import BottomNavbar from './BottomNavbar';

const Navbar = ({ isAdmin }) => {
  return (
    <div>
      <TopNavbar />
      <BottomNavbar isAdmin={isAdmin} />
    </div>
  );
};

export default Navbar;
