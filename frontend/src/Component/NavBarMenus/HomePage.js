import React from 'react';
import Banner from './HomePageMenus/Banner'
import Testimonials from './HomePageMenus/Testimonials';
import CountryPage from './HomePageMenus/CountryPage';
import Certifications from './HomePageMenus/Certifications';
import WeProcess from './HomePageMenus/WeProcess';
import DepartmentPage from './HomePageMenus/DepartmentPage';

const HomePage = () => (
  <>
    <Banner />
    <CountryPage />
    <DepartmentPage />
    <Testimonials />
    <WeProcess />
    <Certifications />
  </>
);

export default HomePage;
