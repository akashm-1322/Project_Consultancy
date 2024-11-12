import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/system';

// Define the team members
const teamMembers = [
  { name: 'Alice Johnson', role: 'CEO', image: '/path/to/alice.jpg' },
  { name: 'Bob Smith', role: 'CTO', image: '/path/to/bob.jpg' },
  { name: 'Catherine Wu', role: 'Head of Marketing', image: '/path/to/catherine.jpg' },
  { name: 'David Lee', role: 'Lead Developer', image: '/path/to/david.jpg' },
];

// Custom styled component for the background section
const BackgroundSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/path/to/background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '5rem 0',
  color: '#fff',
  position: 'relative',
  textAlign: 'center',
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.4)', // Apply shadow here
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Enhanced dark overlay
  },
  zIndex: 1,
}));

const AboutPage = () => {
  return (
    <Box>
      {/* Introduction Section */}
      <BackgroundSection>
        <Container maxWidth="md" style={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
            About Us
          </Typography>
          <Typography variant="body1" component="p" sx={{ fontSize: '1.2rem', maxWidth: '700px', mx: 'auto', color: '#e0e0e0' }}>
            We are a dedicated consultancy firm, committed to guiding ambitious individuals in pursuing education and career opportunities abroad.
          </Typography>
        </Container>
      </BackgroundSection>

      {/* Our Mission Section */}
      <Container sx={{ py: 8, textAlign: 'center', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)', borderRadius: '16px', my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', fontSize: '2rem' }}>
          Our Mission
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto', fontSize: '1.1rem', color: '#616161' }}>
          Our mission is to simplify the journey to study or work overseas by providing accessible support. We empower clients with the resources and confidence to succeed in global environments.
        </Typography>
      </Container>

      {/* Meet the Team Section */}
      <Container sx={{ py: 8, boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.15)', borderRadius: '16px', my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#3f51b5', fontSize: '2rem' }}>
          Meet the Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{
                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)', // Soft shadow on team cards
                transition: '0.3s',
                '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.3)' },
                borderRadius: '16px',
              }}>
                <Box display="flex" justifyContent="center" mt={3}>
                  <Avatar src={member.image} alt={member.name} sx={{ width: 100, height: 100, border: '3px solid #3f51b5' }} />
                </Box>
                <CardContent>
                  <Typography variant="h6" component="h3" align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Values Section */}
      <Container sx={{ py: 8, textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: '16px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', fontSize: '2rem' }}>
          Our Values
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto', fontSize: '1.1rem', color: '#616161' }}>
          At the heart of our consultancy, our values drive everything we do. We believe in empowerment through education, ensuring that every client has the resources to succeed globally.
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutPage;
