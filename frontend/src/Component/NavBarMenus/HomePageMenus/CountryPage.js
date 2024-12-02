import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import "./CountryPage.css";

const CountryPage = () => {
  const [countries, setCountries] = useState([]);
  const [fields, setFields] = useState([]);
  const [expandedCountry, setExpandedCountry] = useState(null);
  const updateTimeoutRef = useRef(null); // Use useRef to store the timeout

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch countries and fields data only once on component mount
        const countriesResponse = await axios.get(
          "http://localhost:5000/api/countries?all=true"
        );
        const fieldsResponse = await axios.get("http://localhost:5000/api/field?all=true");

        setCountries(countriesResponse.data.countries || []);
        setFields(fieldsResponse.data.fields || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure this only runs once on component mount

  // Function to calculate total vacancies for each country
  const calculateTotalVacancies = useCallback(
    (country) => {
      const matchingFields = fields.filter(
        (field) => field.countryData === country.name && field.fieldData === country.type
      );

      if (!matchingFields.length) {
        console.warn(`No matching fields found for country: ${country.name} (${country.type})`);
      }

      return matchingFields.reduce(
        (sum, field) => sum + field.vacancies.reduce((a, b) => a + b, 0),
        0
      );
    },
    [fields]
  );

  // Function to update country vacancies via API call
  const updateCountryVacancies = useCallback(
    async (countryId, totalVacancies) => {
      try {
        const countryToUpdate = countries.find((country) => country._id === countryId);
        if (!countryToUpdate) {
          console.error(`Country with ID ${countryId} not found`);
          return;
        }

        if (countryToUpdate.vacancies !== totalVacancies) {
          const response = await axios.patch(
            `http://localhost:5000/api/countries/${countryId}`,
            { vacancies: totalVacancies }
          );
          console.log("Updated Country:", response.data);
        }
      } catch (error) {
        console.error(`Error updating country vacancies for ID ${countryId}:`, error);
      }
    },
    [countries]
  );

  useEffect(() => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      countries.forEach((country) => {
        const totalVacancies = calculateTotalVacancies(country);
        updateCountryVacancies(country._id, totalVacancies);
      });
    }, 500); // Delay of 500ms to batch updates

    // Cleanup function to clear the timeout
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [countries, fields, calculateTotalVacancies, updateCountryVacancies]);

  const toggleCountryCards = (countryId) => {
    console.log(countryId);
    setExpandedCountry((prev) => (prev === countryId ? null : countryId));
  };

  const renderMatchingCards = (country) => {
    const matchingFields = fields.filter(
      (field) => field.countryData === country.name && field.fieldData === country.type
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
      "Travel Abroad"
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
