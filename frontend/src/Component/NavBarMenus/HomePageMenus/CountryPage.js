import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CountryPage.css";

const CountryPage = () => {
  const [countries, setCountries] = useState([]);
  const [fields, setFields] = useState([]);
  const [expandedCountries, setExpandedCountries] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all countries
        const countriesResponse = await axios.get(
          "http://localhost:5000/api/countries"
        );
        if (countriesResponse.data.countries) {
          setCountries(countriesResponse.data.countries);
        } else {
          console.error("Invalid countries data:", countriesResponse.data);
        }

        // Fetch all fields
        const fieldsResponse = await axios.get(
          "http://localhost:5000/api/field"
        );
        if (fieldsResponse.data.fields) {
          setFields(fieldsResponse.data.fields);
        } else {
          console.error("Invalid fields data:", fieldsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle the visibility of fields for a country
  const toggleCountryFields = (countryName) => {
    setExpandedCountries((prev) =>
      prev.includes(countryName)
        ? prev.filter((name) => name !== countryName)
        : [...prev, countryName]
    );
  };

  // Segregate countries by type
  const segregateCountriesByType = (type) => {
    return countries.filter((country) => country.type === type);
  };

  // Calculate total vacancies for a specific country
  const calculateTotalVacancies = (countryName) => {
    const countryFields = fields.filter(
      (field) => field.countryData === countryName
    );
    return countryFields.reduce((sum, field) => {
      return (
        sum +
        (field.vacancies
          ? field.vacancies.reduce((subSum, v) => subSum + v, 0)
          : 0)
      );
    }, 0);
  };

  // Render fields under a specific country
  const renderFields = (countryName) => {
    const countryFields = fields.filter(
      (field) => field.countryData === countryName
    );

    return (
      <div className="fields-container">
        {countryFields.length > 0 ? (
          countryFields.map((field) => (
            <div key={field._id} className="field-card">
              {field.imageUrl && (
                <img
                  src={`http://localhost:5000${field.imageUrl}`}
                  alt={`${field.countryData} field`}
                />
              )}
              <table className="field-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Vacancies</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(field.names) && field.names.length > 0 ? (
                    field.names.map((name, index) => (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>{field.vacancies[index]}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No fields available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No fields available for {countryName}.</p>
        )}
      </div>
    );
  };

  return (
    <div className="countries-container">
      {["Study Abroad", "Work Abroad", "Language Coaching", "Domestic Placements"].map(
        (type) => (
          <div key={type} className="type-section">
            <h2>{type}</h2>
            {segregateCountriesByType(type).map((country) => (
              <div key={country.id} className="country-strip">
                <div className="country-header">
                  <img
                    src={`http://localhost:5000${country.shapeImage}`}
                    alt={`${country.name} flag`}
                    className="country-flag"
                  />
                  <div>
                    <h3>
                      {country.name} ({country.code})
                    </h3>
                    <p>
                      Total Vacancies: {calculateTotalVacancies(country.name)}
                    </p>
                  </div>
                  <button onClick={() => toggleCountryFields(country.name)}>
                    {expandedCountries.includes(country.name)
                      ? "Hide Fields"
                      : "Show Fields"}
                  </button>
                </div>
                {expandedCountries.includes(country.name) &&
                  renderFields(country.name)}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default CountryPage;
