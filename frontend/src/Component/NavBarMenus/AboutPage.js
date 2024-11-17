import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import './AboutPage.css'; // Importing the CSS file for styling

// About Content Data
const aboutContent = [
  {
    title: "Our Mission",
    description: "Our mission is to drive innovation and create value for our clients through cutting-edge solutions, creative thinking, and expert collaboration. We believe in using technology to empower businesses and individuals, bringing a positive impact to communities worldwide. We constantly strive to enhance user experiences and optimize the value we deliver through ongoing research and development. We are dedicated to sustainability and aim to contribute to the betterment of the world through responsible business practices.",
    icon: "🌟",  // Using an emoji as an icon
  },
  {
    title: "Our Vision",
    description: "Our vision is to become a global leader in innovation and technology, constantly evolving to meet the needs of the future. We aim to foster creativity, inclusivity, and excellence in everything we do, setting new standards in our industry. We aspire to lead by example in adopting new technologies, improving efficiency, and creating an ecosystem where collaboration thrives. Our goal is to build lasting relationships with clients, partners, and communities, enabling them to grow and succeed in an ever-changing world.",
    icon: "🔮",  // Using an emoji as an icon
  },
  {
    title: "Core Values",
    description: "Integrity, collaboration, and continuous improvement are the core values that drive us. We are committed to ethical practices, mutual respect, and the relentless pursuit of excellence. We believe that by embodying these values, we create lasting relationships with our clients and partners. Our core values guide us in every decision we make and ensure that we provide innovative solutions that align with the highest standards of professionalism and accountability. We encourage open dialogue, feedback, and personal growth within our team to create a supportive and inclusive work environment.",
    icon: "💡",  // Using an emoji as an icon
  },
];

// Team Members Data
const teamMembers = [
  {
    name: "John Doe",
    designation: "CEO & Founder",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Jane Smith",
    designation: "CTO",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Mark Johnson",
    designation: "Lead Developer",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Emma Williams",
    designation: "Product Manager",
    photo: "https://via.placeholder.com/150",
  },
];

const AboutPage = () => {
  return (
    <Container
      className="about-page"
      sx={{
        py: 8,
        boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.15)',
        borderRadius: '16px',
        my: 4,
      }}
    >
      {/* About Page Title with Animation */}
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#3f51b5',
          fontSize: '2rem',
          mb: 5,
          animation: 'fadeIn 1.5s ease-in-out',  // Animation for title
        }}
      >
        About Us
      </Typography>

      {/* About Us Paragraph with Animation */}
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          color: '#555',
          lineHeight: '1.6',
          mb: 4,
          animation: 'fadeIn 2s ease-in-out', // Animation for paragraph
        }}
      >
        We are a company committed to driving innovation and creating value for our clients. Our team works tirelessly to deliver top-notch solutions that empower businesses and individuals. We believe in fostering collaboration and leveraging technology to improve lives and communities across the globe. Join us as we strive to lead in technological advancement and make a positive impact in the world.
      </Typography>

      {/* About Content with Animation */}
      <Grid container spacing={4} justifyContent="center">
        {aboutContent.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <div className="about-box" style={{ animation: `fadeInBox ${1 + index * 0.5}s ease-in-out` }}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#3f51b5',
                  fontSize: '2rem',
                  mb: 3,
                }}
              >
                <span className="icon">{section.icon}</span> {section.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: '#555',
                  lineHeight: '1.6',
                  mb: 4,
                }}
              >
                {section.description}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Meet the Team Section with Animation */}
      <section className="meet-the-team">
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#3f51b5',
            fontSize: '2rem',
            mb: 5,
            animation: 'slideIn 1s ease-out', // Animation for Meet the Team title
          }}
        >
          Meet the Team
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  textAlign: 'center',
                  boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
                  borderRadius: '16px',
                  padding: '20px',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt={member.name}
                  height="150"
                  image={member.photo}
                  sx={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '16px',
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777' }}>
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
