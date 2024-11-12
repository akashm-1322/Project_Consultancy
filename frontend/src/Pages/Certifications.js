import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample certification data
const certifications = [
  { image: require('../Asset/100_trusted.jpeg') },
  { image: require('../Asset/5_star_rating.png') },
  { image: require('../Asset/certified_buisness_excellence.png') },
  { image: require('../Asset/multi_award_winner.jpeg') },
  { image: require('../Asset/scholarship_guarenteed.png') },
];

const Certifications = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Certifications</h2>
      <div className="row justify-content-between align-items-center">
        {certifications.map((certification, index) => (
          <div className="col-2 text-center mx-2" key={index}>
            <img
              src={certification.image}
              alt={certification}
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
