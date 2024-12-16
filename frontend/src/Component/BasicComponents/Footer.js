import React from 'react';
import { Container, Box, Stack, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { FaPhone, FaFacebook, FaInstagram, FaWhatsapp, FaArrowUp , FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // For mobile devices
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // For tablets

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ backgroundColor: '#111', padding: 4, position: 'relative', marginTop: 5 , color: 'white'}}>
      <Container sx={{ textAlign: 'center' }}>
        <Stack
          direction={isMobile || isTablet ? 'column' : 'row'}
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          {/* Footer Content */}
          <Box>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
              <FaMapMarkerAlt style={{ marginRight: '8px' }} />
              No. 5/1, CS COMPLEX, 1st FLOOR, MULLAI NAGAR, RAYAKOTTA ROAD, HOSUR-635109.
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
              <FaPhone style={{ marginRight: '8px' }} />
              82705 28540
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
              <FaPhone style={{ marginRight: '8px' }} />
              98849 45606
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
              <IoIosMail style={{ marginRight: '8px' }} />
              J99Recruitmentservices@gmail.com
            </Typography>

            {/* Social Media Icons */}
            <Stack direction="row" spacing={3} justifyContent="center">
              <IconButton href="https://www.facebook.com/share/1K84SaGgB8/" target="_blank" sx={{ color: '#4267B2' }}>
                <FaFacebook style={{ fontSize: '30px' }} />
              </IconButton>
              <IconButton href="https://www.instagram.com/j99recurimentservices/profilecard/?igsh=MXd2azUwMXA3cGkzMg==" target="_blank" sx={{ color: '#C13584' }}>
                <FaInstagram style={{ fontSize: '30px' }} />
              </IconButton>
              <IconButton href="https://wa.me/+919884945606" target="_blank" sx={{ color: '#25D366' }}>
                <FaWhatsapp style={{ fontSize: '30px' }} />
              </IconButton>
            </Stack>
          </Box>
        </Stack>

        {/* Scroll to Top Button */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            cursor: 'pointer',
            padding: 2,
            backgroundColor: '#03a15a',
            borderRadius: '50%',
            display: 'inline-block',
            '&:hover': {
              backgroundColor: '#028a3b',
            },
          }}
          onClick={scrollToTop}
        >
          <FaArrowUp style={{ color: 'white', fontSize: '24px' }} />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
