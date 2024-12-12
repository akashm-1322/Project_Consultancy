import React from 'react';
import './AboutPage.css';

const aboutContent = [
  {
    title: "Our Mission",
    description:
      "Our mission is to drive innovation and create value for our clients through cutting-edge solutions, creative thinking, and expert collaboration. We believe in using technology to empower businesses and individuals, bringing a positive impact to communities worldwide.",
    icon: "🌟",
  },
  {
    title: "Our Vision",
    description:
      "Our vision is to become a global leader in innovation and technology, constantly evolving to meet the needs of the future. We aim to foster creativity, inclusivity, and excellence in everything we do, setting new standards in our industry.",
    icon: "🔮",
  },
  {
    title: "Core Values",
    description:
      "Integrity, collaboration, and continuous improvement are the core values that drive us. We are committed to ethical practices, mutual respect, and the relentless pursuit of excellence.",
    icon: "💡",
  },
];

const teamMembers = [
  {
    name: "Vinoth Kumar.V",
    designation: "CEO & Founder",
    photo: "/Team/Team_Member_1.png",
  },
  {
    name: "Sreedhar.S",
    designation: "MD",
    photo: "/Team/Team_Member_2.png",
  },
  {
    name: "Silvester.V",
    designation: "Marketing Lead",
    photo: "/Team/Team_Member_3.png",
  },
];

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* About Us Title */}
      <h4 className="about-title">
        About Us
      </h4>

      {/* About Section */}
      <div className="about-card" justifyContent="center">
        {aboutContent.map((section, index) => (
          <div  className="about-card-container" item xs={12} sm={6} md={4} key={index}>
            <div className="about-box">
              <h4 className="about-section-title">
                <span>{section.icon}</span> {section.title}
              </h4>
              <h1 className="about-description">
                {section.description}
              </h1>
            </div>
          </div>
        ))}
      </div>

      {/* Meet the Team Section */}
      <section className="meet-the-team">
        <h4 className="about-title">
          Meet the Team
        </h4>

        <div className='team-build'>
          {teamMembers.map((member, index) => (
            <div item xs={12} sm={4} key={index}>
              <div className="team-card">
                <div className="team-photo-wrapper">
                  <img
                    alt={member.name}
                    src={member.photo}
                    className="team-photo"
                  />
                </div>
                <div>
                  <h6 className="team-name">
                    {member.name}
                  </h6>
                  <h2 className="team-designation">
                    {member.designation}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
