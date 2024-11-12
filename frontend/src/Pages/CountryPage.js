import React from 'react';
import { FaPlus, FaEye } from "react-icons/fa";
import aus from "../Asset/aus_flag.jpg";
import uk from "../Asset/uk_flag.png";
import ger from "../Asset/ger_flag.png";
import pol from "../Asset/pol_flag.png";
import swi from "../Asset/swi_flag.png";
import uae from "../Asset/uae_flag.png";
import kuw from "../Asset/kuw_flag.png";
import qat from "../Asset/qatar_flag.png";
import can from "../Asset/canada_flag.png";
import ser from "../Asset/serbia_flag.png";
import alb from "../Asset/albania_flag.png";
import gre from "../Asset/greece_flag.png";
import cro from "../Asset/croatia_flag.png";
import slo from "../Asset/slovakia.png";
import ita from "../Asset/italy_flag.png";
import cze from "../Asset/czech_flag.png";
import hun from "../Asset/hungary_flag.png";
import ire from "../Asset/ireland_flag.png";
import lux from "../Asset/luxemburg_flag.png";

// Sample visitors count for each country
const studyCountries = [
  { name: 'Germany', code: 'GER', plus: <FaPlus />, shape: ger, visitors: 1200 },
  { name: 'Poland', code: 'POL', plus: <FaPlus />, shape: pol, visitors: 800 },
  { name: 'Switzerland', code: 'SWE', plus: <FaPlus />, shape: swi, visitors: 950 },
];

const workCountries = [
  { name: 'Dubai', code: 'DUB', plus: <FaPlus />, shape: uae, visitors: 1500 },
  { name: 'Saudi Arabia', code: 'SAU', plus: <FaPlus />, shape: uae, visitors: 1100 },
  { name: 'Kuwait', code: 'KUW', plus: <FaPlus />, shape: kuw, visitors: 950 },
  { name: 'Qatar', code: 'QAT', plus: <FaPlus />, shape: qat, visitors: 1400 },
  { name: 'Australia', code: 'AUS', plus: <FaPlus />, shape: aus, visitors: 1300 },
  { name: 'Canada', code: 'CAN', plus: <FaPlus />, shape: can, visitors: 1600 },
  { name: 'Serbia', code: 'SER', plus: <FaPlus />, shape: ser, visitors: 700 },
  { name: 'Albania', code: 'ALB', plus: <FaPlus />, shape: alb, visitors: 650 },
  { name: 'Greece', code: 'GRE', plus: <FaPlus />, shape: gre, visitors: 750 },
  { name: 'Croatia', code: 'CRO', plus: <FaPlus />, shape: cro, visitors: 850 },
  { name: 'Slovakia', code: 'SLO', plus: <FaPlus />, shape: slo, visitors: 500 },
  { name: 'Italy', code: 'ITA', plus: <FaPlus />, shape: ita, visitors: 1000 },
  { name: 'Czech Republic', code: 'CZ', plus: <FaPlus />, shape: cze, visitors: 600 },
  { name: 'United Kingdom', code: 'UK', plus: <FaPlus />, shape: uk, visitors: 1450 },
  { name: 'Hungary', code: 'HUN', plus: <FaPlus />, shape: hun, visitors: 520 },
  { name: 'Ireland', code: 'IRE', plus: <FaPlus />, shape: ire, visitors: 460 },
  { name: 'Luxembourg', code: 'LUX', plus: <FaPlus />, shape: lux, visitors: 400 },
];

const CountryList = ({ countries, title }) => (
  <div className="country-section mb-5">
    <h4 className="text-center mb-4">{title}</h4>
    <div className="d-flex flex-column align-items-center w-100">
      {countries.map((country, index) => (
        <div
          key={index}
          className="country-card shadow-sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#e8eaf6',
            width: '100%',
            height: '60px',
            justifyContent: 'space-around',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '8px',
            transition: 'transform 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {/* Country Code */}
          <span style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>{country.code}</span>
          {/* Country Name */}
          <span style={{ flex: 2, textAlign: 'center', color: '#3f51b5' }}>{country.name}</span>
          {/* Country Flag Image */}
          <span style={{ flex: 1, textAlign: 'center' }}>
            <img src={country.shape} alt={`${country.name} flag`} style={{ width: '30px', height: '20px' }} />
          </span>
          {/* Plus Icon */}
          <span style={{ flex: 1, textAlign: 'center' }}>{country.plus}</span>
          {/* Eye Icon with Visitor Count */}
          <span style={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FaEye style={{ color: '#757575' }} />
            {country.visitors}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const CountryPage = () => {
  return (
    <div className="container my-5" style={{ background: '#f3f4f6', padding: '20px', borderRadius: '12px' }}>
      <h2 className="text-center my-4">Countries We Serve</h2>
      <CountryList countries={studyCountries} title="Study Countries" />
      <CountryList countries={workCountries} title="Work Countries" />
    </div>
  );
};

export default CountryPage;
