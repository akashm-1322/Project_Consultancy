import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample team member data
const teamMembers = [
  { name: 'Alice Johnson', role: 'Project Manager', photo: 'path/to/alice.jpg' },
  { name: 'Bob Smith', role: 'Lead Developer', photo: 'path/to/bob.jpg' },
  { name: 'Charlie Brown', role: 'UI/UX Designer', photo: 'path/to/charlie.jpg' },
  { name: 'Dana White', role: 'QA Engineer', photo: 'path/to/dana.jpg' },
];

const OurTeam = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Team</h2>
      <div className="row justify-content-center">
        {teamMembers.map((member, index) => (
          <div className="col-md-3 col-sm-6 text-center mb-4" key={index}>
            <img
              src={member.photo}
              alt={member.name}
              style={{
                width: '80px', // Image width
                height: '80px', // Image height
                borderRadius: '50%', // Circular images
                objectFit: 'cover', // Ensure image covers the area
                marginBottom: '10px', // Space between image and text
              }}
            />
            <h5 className="mt-2" style={{ fontSize: '1rem' }}>{member.name}</h5>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
