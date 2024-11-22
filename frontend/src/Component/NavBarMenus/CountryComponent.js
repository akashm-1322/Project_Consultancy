import React, { useState } from 'react';
import axios from 'axios';

const CountryComponent = ({ countries, setCountries }) => {
  const [countryData, setCountryData] = useState({
    name: '',
    code: '',
    type: '',
    shape: '',
    image: null, // Added image property
  });
  const [image, setImage] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCountryData({ ...countryData, [name]: value });
  };

  // Handle file input change for country flag
  const handleFileChange = (e) => {
    setCountryData({ ...countryData, image: e.target.files[0] });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', countryData.image);

    // Upload image first
    axios.post('/upload-image', formData).then((response) => {
      const imageUrl = response.data.imageUrl;

      // Add country
      axios
        .post('/countries', { ...countryData, shape: imageUrl })
        .then((res) => {
          alert('Country added');
          setCountries([...countries, res.data]); // Add new country to list
          setCountryData({ name: '', code: '', type: '', shape: '', image: null }); // Reset form
        })
        .catch((err) => alert(err.message));
    });
  };

  return (
    <div>
      <h2>Country Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Country Name"
          value={countryData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="code"
          placeholder="Country Code"
          value={countryData.code}
          onChange={handleInputChange}
        />
        <select
          name="type"
          value={countryData.type}
          onChange={handleInputChange}
        >
          <option value="work abroad">Work Abroad</option>
          <option value="study abroad">Study Abroad</option>
          <option value="language coaching">Language Coaching</option>
        </select>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit Country</button>
      </form>

      <h2>Country List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Type</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(countries) && countries.length > 0 ? (
    countries.map((country) => (
      <tr key={country._id}>
        <td>{country.name}</td>
        <td>{country.code}</td>
        <td>{country.type}</td>
        <td>
          {country.shape ? (
            <img src={country.shape} alt="Country Flag" width="50" />
          ) : (
            'No image'
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4">No countries available</td>
    </tr>
  )}
</tbody>
</table>
</div>
  )};
export default CountryComponent;
