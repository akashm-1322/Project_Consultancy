import React from 'react';
import Banner from '../Component/Banner';
import Service from '../Component/Service';
import Testimonials from '../Component/Testimonials';
import CountryPage from './CountryPage';
import ContactForm from '../Component/ContactForm';

const HomePage = () => (
  <>
    <Banner />
    <Service />
    <CountryPage />
    <Testimonials />
    <WeProcess />
    <ContactForm />
  </>
);

export default HomePage;
