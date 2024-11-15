import React from 'react';
import Banner from '../Component/Banner';
import Testimonials from '../Component/Testimonials';
import CountryPage from './CountryPage';
import ProcessImageBanner from './ProcessImageBanner';
import Certifications from './Certifications';
import WeProcess from '../Component/WeProcess';

const HomePage = () => (
  <>
    <Banner />
    <CountryPage />
    <Testimonials />
    <WeProcess />
    <ProcessImageBanner />
    <Certifications />
  </>
);

export default HomePage;
