import React from 'react';

const NavFooter = () => {
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling effect
    });
  };

  return (
    <footer style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#333',
      color: '#fff',
      position: 'relative',
      bottom: 0,
      width: '100%',
      textAlign: 'center',
      boxSizing: 'border-box'
    }}>
      <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} - J22 World Tours. All rights reserved.</p>
      <button
        onClick={scrollToTop}
        style={{
          background: 'none',
          border: '1px solid #fff',
          color: '#fff',
          fontSize: '1.2rem',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
          transition: 'color 0.3s, border-color 0.3s',
          marginRight: '5px'
        }}
        onMouseOver={(e) => {
          e.target.style.color = '#00bcd4';
          e.target.style.borderColor = '#00bcd4';
        }}
        onMouseOut={(e) => {
          e.target.style.color = '#fff';
          e.target.style.borderColor = '#fff';
        }}
      >
        ↑
      </button>
    </footer>
  );
};

export default NavFooter;
