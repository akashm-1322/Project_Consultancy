import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CountryPage.css";

const CountryPage = () => {
  const [countries, setCountries] = useState([]);
  const [fields, setFields] = useState([]);
  const [expandedCountry, setExpandedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axios.get(
          "http://localhost:5000/api/countries?all=true"
        );
        setCountries(countriesResponse.data.countries || []);

        const fieldsResponse = await axios.get("http://localhost:5000/api/field?all=true");
        setFields(fieldsResponse.data.fields || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleCountryCards = (countryId) => {
    setExpandedCountry((prev) => (prev === countryId ? null : countryId));
  };

  const calculateTotalVacancies = (country) => {
    // Calculate the total vacancies for a given country based on the fields
    return fields
      .filter(
        (field) => field.countryData === country.name && field.fieldData === country.type
      )
      .reduce((sum, field) => sum + field.vacancies.reduce((a, b) => a + b, 0), 0);
  };
  
  // Fetch data and update all countries' vacancies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axios.get(
          "http://localhost:5000/api/countries?all=true"
        );
        const fetchedCountries = countriesResponse.data.countries || [];
  
        // Update each country's vacancies with the calculated total
        const updatedCountries = fetchedCountries.map((country) => {
          const totalVacancies = calculateTotalVacancies(country);
          return { ...country, vacancies: totalVacancies }; // Set updated total vacancies
        });
  
        // Update the countries state with the new vacancies
        setCountries(updatedCountries);
  
        // Update the backend with the new vacancies for each country
        updatedCountries.forEach((country) => {
          updateCountryVacancies(country._id, country.vacancies);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []); // Re-fetch when fields data changes
  
  const updateCountryVacancies = async (countryId, totalVacancies) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/countries/${countryId}`, 
        { vacancies: totalVacancies }
      );
      console.log('Updated Country:', response.data); // Check response
    } catch (error) {
      console.error('Error updating country vacancies:', error);
    }
  };
  

  const renderMatchingCards = (country) => {
    const matchingFields = fields.filter(
      (field) =>
        field.countryData === country.name && field.fieldData === country.type
    );

    if (matchingFields.length === 0) {
      return <p>No matching fields for this country.</p>;
    }

    return (
      <div className="cards-container">
        {matchingFields.map((field) => (
          <div className="card" key={field._id}>
            <div className="card-image">
              <img
                src={`http://localhost:5000${field.imageUrl}`}
                alt={field.fieldData}
              />
            </div>
            <div className="card-content">
              <h3>{field.fieldData}</h3>
              <table className="field-table">
                <thead>
                  <tr>
                    <th>Names</th>
                    <th>Vacancies</th>
                  </tr>
                </thead>
                <tbody>
                  {field.names.map((name, index) => (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>{field.vacancies[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCountryStrips = () => {
    const types = [
      "Study Abroad",
      "Work Abroad",
      "Language Coaching",
      "Domestic Placements",
    ];

    return types.map((type) => (
      <div key={type} className="type-section">
        <h2>{type}</h2>
        {countries
          .filter((country) => country.type === type)
          .map((country) => {
            const totalVacancies = calculateTotalVacancies(country);
            return (
              <div key={country._id} className="country-strip">
                <div className="country-header">
                  <img
                    className="country-image"
                    src={`http://localhost:5000${country.shapeImage}`}
                    alt={country.name}
                  />
                  <div className="country-details">
                    <h3>{country.name} ({country.code})</h3>
                    <p className="total-vacancies">
                      Total Vacancies:{" "}
                      <span className="animated-number">{totalVacancies}</span>
                    </p>
                  </div>
                  <button
                    className="toggle-button"
                    onClick={() => toggleCountryCards(country._id)}
                  >
                    {expandedCountry === country._id ? "Hide Cards" : "Show Cards"}
                  </button>
                </div>
                {expandedCountry === country._id && (
                <div className="matching-cards">{renderMatchingCards(country)}</div>
                )}

              </div>
            );
          })}
      </div>
    ));
  };


  return (
    <div className="country-page">
      <h1>Country Fields</h1>
      {renderCountryStrips()}
    </div>
  );
};

export default CountryPage;
