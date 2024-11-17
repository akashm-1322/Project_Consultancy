import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Certifications.css'; // Import the CSS file

// Sample certification data
const certifications = [
  { image: require('../../../Asset/100_trusted.jpeg'), title: 'Trusted' },
  { image: require('../../../Asset/5_star_rating.png'), title: '5-Star Rating' },
  { image: require('../../../Asset/certified_buisness_excellence.png'), title: 'Business Excellence' },
  { image: require('../../../Asset/multi_award_winner.jpeg'), title: 'Award Winner' },
  { image: require('../../../Asset/scholarship_guarenteed.png'), title: 'Scholarship Guaranteed' },
];

const Certifications = () => {
  return (
    <div className="certifications-container my-5">
      <div className="row justify-content-between align-items-center">
        {certifications.map((certification, index) => (
          <div className="col-2 text-center mx-2" key={index}>
            <div className="certification-card">
              <img
                src={certification.image}
                alt={certification.title}
                className="certification-image"
              />
            </div>
            <p className="certification-title">{certification.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
