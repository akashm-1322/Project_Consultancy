import React from 'react';
import { FaPlus } from "react-icons/fa";
import { FaEarthEurope, FaEarthAmericas, FaEarthAsia } from "react-icons/fa6";
import { GiAustralia } from "react-icons/gi";

const countriesData = [
  { name: 'United States of America', code: 'US', plus: <FaPlus />, shape: <FaEarthAmericas /> },
  { name: 'United Kingdom', code: 'GB', plus: <FaPlus />, shape: <FaEarthEurope /> },
  { name: 'Australia', code: 'AU', plus: <FaPlus />, shape: <GiAustralia /> },
  { name: 'Germany', code: 'DE', plus: <FaPlus />, shape: <FaEarthEurope /> },
  { name: 'Poland', code: 'PL', plus: <FaPlus />, shape: <FaEarthEurope /> },
  { name: 'Singapore', code: 'SG', plus: <FaPlus />, shape: <FaEarthAsia /> },
  { name: 'Malaysia', code: 'MY', plus: <FaPlus />, shape: <FaEarthAsia /> },
];

const CountryPage = () => {
  return (
    <div className="country-strip" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' ,background: '#f9ebea'}}>
    <h2 className="text-center my-4"> Countries We Offer:</h2>
      {countriesData.map((country, index) => (
        <div
          key={index}
          className='shadow'
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#ccc',
            width: '70%',
            height: '50px',
            justifyContent: 'space-between',
            margin: '10px 0',
            padding: '0 5px',
          }}
        >
          {/* Left aligned: Country Code */}
          <span style={{ flex: 1, textAlign: 'center', margin: '0 5px' }}>{country.code}</span>

          {/* Center aligned: Country Name */}
          <span style={{ flex: 1, textAlign: 'center', margin: '0 5px' }}>{country.name}</span>

          {/* Center Right aligned: Country Shape */}
          <span style={{ flex: 1, textAlign: 'center', margin: '0 5px' }}>{country.shape}</span>

          {/* Right aligned: Plus Icon */}
          <span style={{ flex: 1, textAlign: 'center', margin: '0 5px' }}>{country.plus}</span>
        </div>
      ))}
    </div>
  );
};

export default CountryPage;
