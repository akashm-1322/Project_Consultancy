import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/system';

const teamMembers = [
  { name: 'Alice Johnson', role: 'CEO', image: '/path/to/alice.jpg' },
  { name: 'Bob Smith', role: 'CTO', image: '/path/to/bob.jpg' },
  { name: 'Catherine Wu', role: 'Head of Marketing', image: '/path/to/catherine.jpg' },
  { name: 'David Lee', role: 'Lead Developer', image: '/path/to/david.jpg' },
];

// Background section styling
const BackgroundSection = styled(Box)({
  backgroundImage: 'url("/path/to/background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '4rem 0',
  color: '#fff',
  position: 'relative',
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  },
});

const AboutPage = () => {
  return (
    <Box>
      {/* Introduction Section */}
      <BackgroundSection>
        <Container maxWidth="md" style={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            About Us
          </Typography>
          <Typography variant="h6" component="p">
            We are a dedicated team, passionate about delivering excellence in every project we undertake.
          </Typography>
        </Container>
      </BackgroundSection>

      {/* Our Mission Section */}
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Our Mission
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto', mb: 3 }}>
          Our mission is to create exceptional digital experiences for our clients by harnessing the power of innovation and creativity. We strive to exceed expectations and transform ideas into tangible, lasting results.
        </Typography>
      </Container>

      {/* Meet the Team Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Meet the Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ boxShadow: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <Box display="flex" justifyContent="center" mt={3}>
                  <Avatar src={member.image} alt={member.name} sx={{ width: 80, height: 80 }} />
                </Box>
                <CardContent>
                  <Typography variant="h6" component="h3" align="center" sx={{ fontWeight: 'bold' }}>
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
      <Container sx={{ py: 6, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Our Values
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '700px', mx: 'auto', mb: 3 }}>
          Integrity, Innovation, and Impact — our core values guide us in every project. We believe in building trust, pioneering new solutions, and delivering value that makes a difference.
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutPage;
