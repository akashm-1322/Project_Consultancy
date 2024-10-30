import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample certification data
const certifications = [
  { title: 'Certified React Developer', logo: 'path/to/react-certification.png' },
  { title: 'AWS Certified Solutions Architect', logo: 'path/to/aws-certification.png' },
  { title: 'Google Cloud Professional', logo: 'path/to/google-cloud-certification.png' },
  { title: 'Scrum Master Certified', logo: 'path/to/scrum-certification.png' },
  { title: 'PMP Certified', logo: 'path/to/pmp-certification.png' },
];

const Certifications = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Certifications</h2>
      <div className="row justify-content-between align-items-center">
        {certifications.map((certification, index) => (
          <div className="col-2 text-center mx-2" key={index}>
            <img
              src={certification.logo}
              alt={certification.title}
              style={{
                width: '100%', // Scalable width
                height: 'auto', // Auto height to maintain aspect ratio
                maxHeight: '100px', // Max height to ensure uniform size
              }}
            />
            <p className="mt-2" style={{ fontSize: '0.875rem' }}>{certification.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
