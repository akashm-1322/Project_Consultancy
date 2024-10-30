import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../Asset/Work_Together.jpg';

const steps = [
  { step: 'Step 1', description: 'Initial Consultation', date: '01 Jan 2024' },
  { step: 'Step 2', description: 'Design and Planning', date: '15 Jan 2024' },
  { step: 'Step 3', description: 'Development', date: '01 Feb 2024' },
  { step: 'Step 4', description: 'Testing and Feedback', date: '15 Feb 2024' },
  { step: 'Step 5', description: 'Final Delivery', date: '01 Mar 2024' },
];

const ProcessImageBanner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center position-relative"
      style={{
        width: '100%',
        height: '500px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Semi-transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
          zIndex: 1,
        }}
      ></div>

      {/* Overlay Process Plan Text */}
      <div
        className="position-absolute d-flex flex-column align-items-center"
        style={{
          zIndex: 2,
          bottom: '0',
          fontSize: '1.5rem',
          fontWeight: 600,
          color: '#ffffff',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
          animation: 'moveUp 20s linear infinite',
        }}
      >
        {steps.map((step, index) => (
          <div key={index} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <p style={{ margin: 0 }}>{step.step}: {step.description}</p>
            <small style={{ fontSize: '1rem', fontWeight: 500 }}>{step.date}</small>
          </div>
        ))}
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes moveUp {
            0% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default ProcessImageBanner;
