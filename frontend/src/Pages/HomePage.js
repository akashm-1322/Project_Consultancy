import React from 'react';
import Banner from '../Component/Banner';
import Testimonials from '../Component/Testimonials';
import CountryPage from './CountryPage';
import ProcessImageBanner from './ProcessImageBanner';
import OurTeam from '../Component/CountryGuide';
import Certifications from './Certifications';

const HomePage = () => (
  <>
    <Banner />
    <CountryPage />
    <Testimonials />
    <ProcessImageBanner />
    <OurTeam />
    <Certifications />
  </>
);

export default HomePage;
