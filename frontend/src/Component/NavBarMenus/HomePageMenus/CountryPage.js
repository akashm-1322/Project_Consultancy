import React from "react";
import { FaPlus } from "react-icons/fa";
import aus from "../../../Asset/aus_flag.jpg";
import uk from "../../../Asset/uk_flag.png";
import ger from "../../../Asset/ger_flag.png";
import pol from "../../../Asset/pol_flag.png";
import swi from "../../../Asset/swi_flag.png";
import uae from "../../../Asset/uae_flag.png";
import kuw from "../../../Asset/kuw_flag.png";
import qat from "../../../Asset/qatar_flag.png";
import can from "../../../Asset/canada_flag.png";
import ser from "../../../Asset/serbia_flag.png";
import alb from "../../../Asset/albania_flag.png";
import gre from "../../../Asset/greece_flag.png";
import cro from "../../../Asset/croatia_flag.png";
import slo from "../../../Asset/slovakia.png";
import ita from "../../../Asset/italy_flag.png";
import cze from "../../../Asset/czech_flag.png";
import hun from "../../../Asset/hungary_flag.png";
import ire from "../../../Asset/ireland_flag.png";
import lux from "../../../Asset/luxemburg_flag.png";
import sin from "../../../Asset/sin_flag.png"

import './CountryPage.css'; // Import the new CSS file

const studyCountries = [
  { name: 'Germany', code: 'GER', plus: <FaPlus />, shape: ger},
  { name: 'Poland', code: 'POL', plus: <FaPlus />, shape: pol},
  { name: 'Switzerland', code: 'SWE', plus: <FaPlus />, shape: swi},
  { name: 'Singapore' , code: 'SIN', plus: <FaPlus/>, shape: sin}
];

const workCountries = [
  { name: 'Dubai', code: 'DUB', plus: <FaPlus />, shape: uae},
  { name: 'Saudi Arabia', code: 'SAU', plus: <FaPlus />, shape: uae},
  { name: 'Kuwait', code: 'KUW', plus: <FaPlus />, shape: kuw},
  { name: 'Qatar', code: 'QAT', plus: <FaPlus />, shape: qat},
  { name: 'Australia', code: 'AUS', plus: <FaPlus />, shape: aus},
  { name: 'Canada', code: 'CAN', plus: <FaPlus />, shape: can},
  { name: 'Serbia', code: 'SER', plus: <FaPlus />, shape: ser},
  { name: 'Albania', code: 'ALB', plus: <FaPlus />, shape: alb},
  { name: 'Greece', code: 'GRE', plus: <FaPlus />, shape: gre},
  { name: 'Croatia', code: 'CRO', plus: <FaPlus />, shape: cro},
  { name: 'Slovakia', code: 'SLO', plus: <FaPlus />, shape: slo},
  { name: 'Italy', code: 'ITA', plus: <FaPlus />, shape: ita},
  { name: 'Czech Republic', code: 'CZ', plus: <FaPlus />, shape: cze},
  { name: 'United Kingdom', code: 'UK', plus: <FaPlus />, shape: uk},
  { name: 'Hungary', code: 'HUN', plus: <FaPlus />, shape: hun},
  { name: 'Ireland', code: 'IRE', plus: <FaPlus />, shape: ire},
  { name: 'Luxembourg', code: 'LUX', plus: <FaPlus />, shape: lux},
  { name: 'Singapore' , code: 'SIN', plus: <FaPlus/>, shape: sin}
];

const learningLanguage = [
  {name: 'German', code: 'GER' , plus:<FaPlus/> , shape: ger }
]

const CountryStrip = ({ country }) => (
  <div className="country-strip shadow-lg">
  
    <span className="country-code">{country.code}</span>
    <span className="country-name">{country.name}</span>
    <img className="country-flag" src={country.shape} alt={`${country.name} flag`} />
    <span className="plus-icon">{country.plus}</span>
  </div>
);

const CountrySection = ({ title, countries }) => (
  <div className="country-section ">
    <h2 className="section-title text-center m-5">{title}</h2>
    <div className="country-list">
      {countries.map((country, index) => (
        <CountryStrip key={index} country={country} />
      ))}
    </div>
  </div>
);

const CountryPage = () => {
  return (
    <div className="country-page p-2">
      <div className="banner">
        <h1 className="banner-title">Explore Global Opportunities</h1>
        <p className="banner-subtitle">Connect to your future in work, study, and languages.</p>
      </div>
      <div className="content">
        <CountrySection    title="Study Destinations" countries={studyCountries} />
        <CountrySection    title="Work Destinations" countries={workCountries} />
        <CountrySection    title="Languages Coached" countries={learningLanguage} />
      </div>
    </div>
  );
};

export default CountryPage;
