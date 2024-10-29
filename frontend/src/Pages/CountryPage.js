import React from 'react';
import { FaPlus } from "react-icons/fa";
import usa from "../Asset/usa_flag.png";
import aus from "../Asset/aus_flag.jpg";
import uk from "../Asset/uk_flag.png";
import ger from "../Asset/ger_flag.png";
import pol from "../Asset/pol_flag.png";
import sin from "../Asset/sin_flag.png";
import mal from "../Asset/mal_flag.png";

const countriesData = [
  { name: 'United States of America', code: 'US', plus: <FaPlus />, shape: usa },
  { name: 'United Kingdom', code: 'GB', plus: <FaPlus />, shape: uk },
  { name: 'Australia', code: 'AU', plus: <FaPlus />, shape: aus },
  { name: 'Germany', code: 'DE', plus: <FaPlus />, shape: ger },
  { name: 'Poland', code: 'PL', plus: <FaPlus />, shape: pol },
  { name: 'Singapore', code: 'SG', plus: <FaPlus />, shape: sin },
  { name: 'Malaysia', code: 'MY', plus: <FaPlus />, shape: mal },
];

const CountryPage = () => {
  return (
    <div className="country-strip" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', background: '#f9ebea' }}>
      <h3 className="text-center my-4">Countries We Offer:</h3>
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

          {/* Center Right aligned: Country Shape - Render the image */}
          <span style={{ flex: 1, textAlign: 'center', margin: '0 5px' }}>
            <img src={country.shape} alt={`${country.name} flag`} style={{ width: '30px', height: '20px' }} />
          </span>

          {/* Right aligned: Plus Icon */}
          <span style={{ flex: 1, textAlign: 'center', margin: '0 5px' }}>{country.plus}</span>
        </div>
      ))}
    </div>
  );
};

export default CountryPage;
