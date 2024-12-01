import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
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
    <Container className="about-page">
      {/* About Us Title */}
      <Typography variant="h4" className="about-title">
        About Us
      </Typography>

      {/* About Section */}
      <Grid container spacing={4} justifyContent="center">
        {aboutContent.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <div className="about-box">
              <Typography variant="h5" className="about-section-title">
                <span>{section.icon}</span> {section.title}
              </Typography>
              <Typography variant="body1" className="about-description">
                {section.description}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Meet the Team Section */}
      <section className="meet-the-team">
        <Typography variant="h4" className="team-title">
          Meet the Team
        </Typography>

        <Grid container spacing={3} justifyContent="center" className='team-build'>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card className="team-card">
                <div className="team-photo-wrapper">
                  <CardMedia
                    component="img"
                    alt={member.name}
                    image={member.photo}
                    className="team-photo"
                  />
                </div>
                <CardContent>
                  <Typography variant="h6" className="team-name">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" className="team-designation">
                    {member.designation}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
    </Container>
  );
};

export default AboutPage;
