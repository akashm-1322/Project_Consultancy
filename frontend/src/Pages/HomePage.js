import React from 'react';
import Banner from '../Component/Banner';
import Testimonials from '../Component/Testimonials';
import CountryPage from './CountryPage';
import WeProcess from '../Component/WeProcess'

const HomePage = () => (
  <>
    <Banner />
    <CountryPage />
    <Testimonials />
    <WeProcess />
  </>
);

export default HomePage;
