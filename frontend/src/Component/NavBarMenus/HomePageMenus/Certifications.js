import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, ThemeProvider, createTheme } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Sample certification data
const certifications = [
  { image: require('../../../Asset/100_trusted.jpeg'), title: 'Trusted' },
  { image: require('../../../Asset/5_star_rating.png'), title: '5-Star Rating' },
  { image: require('../../../Asset/certified_buisness_excellence.png'), title: 'Business Excellence' },
  { image: require('../../../Asset/multi_award_winner.jpeg'), title: 'Award Winner' },
  { image: require('../../../Asset/scholarship_guarenteed.png'), title: 'Scholarship Guaranteed' },
];

// Create a custom theme for the component
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#90caf9',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
});

// Animation for hover effect on cards
const hoverAnimation = keyframes`
  0% {
    transform: translateY(0);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
  100% {
    transform: translateY(-10px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

// Styled Card for animation
const AnimatedCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    animation: `${hoverAnimation} 0.3s forwards`,
  },
}));

const Certifications = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          py: 5,
          backgroundColor: '#f9f9f9',
          textAlign: 'center',
        }}
      >
        {/* Section Title */}
        <Typography variant="h4" sx={{ mb: 4, color: 'primary.main', fontWeight: 'bold' }}>
          Our Certifications
        </Typography>

        {/* Responsive Grid Layout */}
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {certifications.map((certification, index) => (
            <Grid
              item
              xs={12}            // 1 column on mobile
              sm={6}             // 2 columns on tablets
              md={4}             // 3 columns on medium devices
              lg={2}             // 5 cards distributed on larger devices
              key={index}
            >
              <AnimatedCard>
                {/* Card Content */}
                <CardMedia
                  component="img"
                  height="140"
                  image={certification.image}
                  alt={certification.title}
                  sx={{ objectFit: 'contain', backgroundColor: '#fff', p: 2 }}
                />
                <CardContent sx={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: '600', color: 'text.primary' }}
                  >
                    {certification.title}
                  </Typography>
                </CardContent>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Certifications;
