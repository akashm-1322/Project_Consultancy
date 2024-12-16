import React from 'react';

const EndFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#222',
        color: '#ffffff',
        borderTop: '2px solid #1976d2',
        padding: '20px 0',
      }}
    >
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          {/* Left Section */}
          <div
            className="col-12 col-md-6 col-lg-4 text-center text-lg-start mb-3 mb-md-0"
            style={{ fontSize: '14px' }}
          >
            <p className="mb-0">&copy; {currentYear} - J99 Recruitment Services Pvt. Ltd.</p>
            <p className="mb-0">All Rights Reserved.</p>
          </div>

          {/* Center Section */}
          <div
            className="col-12 col-md-6 col-lg-4 text-center mb-3 mb-md-0"
            style={{ fontSize: '14px' }}
          >
            <p className="mb-1">Follow Us:</p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
              style={{ textDecoration: 'none' }}
            >
              Facebook
            </a>
            |
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
              style={{ textDecoration: 'none' }}
            >
              Twitter
            </a>
            |
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2"
              style={{ textDecoration: 'none' }}
            >
              Instagram
            </a>
          </div>

          {/* Right Section */}
          <div
            className="col-12 col-lg-4 text-center text-lg-end"
            style={{ fontSize: '14px' }}
          >
            <p className="mb-1">Contact us:</p>
            <a
              href="mailto:J99Recruitmentservices@gmail.com"
              className="text-white"
              style={{ textDecoration: 'none' }}
            >
              J99Recruitmentservices@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EndFooter;
