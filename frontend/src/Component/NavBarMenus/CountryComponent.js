import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CountryComponent.css';
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

const CountryComponent = () => {
  const [countries, setCountries] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;
  const [editingCountryId, setEditingCountryId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    vacancies: 0,
    shapeImage: null,
  });
  const [sortKey, setSortKey] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const API_BASE_URL_COUN = 'http://localhost:5000/api/countries';

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL_COUN}?page=${currentPage}&limit=${contactsPerPage}&sortKey=${sortKey}&sortDirection=${sortDirection}`
      );
      setCountries(response.data.countries);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setError('Failed to fetch countries.');
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [currentPage, sortDirection, sortKey ]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Country name is required.';
    if (!formData.code) errors.code = 'Country code is required.';
    if (!formData.type) errors.type = 'Type is required.';
    if (isNaN(formData.vacancies)) {
      errors.vacancies = 'Vacancies must be a valid number.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the form
    if (!validateForm()) {
      return; // Stop if validation fails
    }
  
    // Create FormData instance for multipart/form-data
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('code', formData.code);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('vacancies', formData.vacancies);
    if (formData.shapeImage) {
      formDataToSend.append('shapeImage', formData.shapeImage);
    }
  
    setLoading(true);
    setError(null);
  
    try {
      let response;
      if (editingCountryId) {
        // Update existing country
        response = await axios.put(
          `${API_BASE_URL_COUN}/${editingCountryId}`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        // Add new country
        response = await axios.post(`${API_BASE_URL_COUN}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
  
      console.log('Success:', response.data);
      setFormData({
        name: '',
        code: '',
        type: '',
        vacancies: 0,
        shapeImage: null,
      });
      setEditingCountryId(null); // Reset editing state
      await fetchCountries(); // Refresh the country list
    } catch (error) {
      console.error('Error submitting data:', error.response?.data || error.message);
      setError('Failed to submit the data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  


  const handleChange = (e) => {
    if (e.target.name === 'shapeImage') {
      setFormData({ ...formData, shapeImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL_COUN}/${id}`);
      setCountries(countries.filter((country) => country._id !== id));
    } catch (error) {
      console.error('Error deleting country:', error);
      setError('Error deleting country.');
    }
  };

  const handleEdit = (id) => {
    const country = countries.find((country) => country._id === id);
    if (country) {
      setFormData({
        name: country.name,
        code: country.code,
        type: country.type,
        vacancies: country.vacancies,
        shapeImage: null, // Set this to `null` because we are not handling the preloading of images in the input field
      });
      setEditingCountryId(id);
    } else {
      setError('Country not found.');
    }
  };
  

  const handleSortChange = (key) => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="country-container">
      <h1>Country Management</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="country-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Country Name"
          required
        />
        {formErrors.name && <span className="error">{formErrors.name}</span>}
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Country Code"
          required
        />
        {formErrors.code && <span className="error">{formErrors.code}</span>}
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type"
          required
        />
        {formErrors.type && <span className="error">{formErrors.type}</span>}
        <input
          type="number"
          name="vacancies"
          value={formData.vacancies}
          onChange={handleChange}
          placeholder="Vacancies"
          required
        />
        {formErrors.vacancies && (
          <span className="error">{formErrors.vacancies}</span>
        )}
        <input type="file" name="shapeImage" onChange={handleChange} />
        <button type="submit">
          {editingCountryId ? 'Update Field' : 'Add Field'}
        </button>
      </form>


      <h2>Countries List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSortChange('name')}>
                Country Name {sortKey === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th onClick={() => handleSortChange('code')}>
                Country Code {sortKey === 'code' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th onClick={() => handleSortChange('type')}>
                Type {sortKey === 'type' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th onClick={() => handleSortChange('vacancies')}>
                Vacancies {sortKey === 'vacancies' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th>Shape Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(countries) && countries.length > 0) ? (countries.map((country) => (
              <tr key={country._id}>
                <td>{country.name}</td>
                <td>{country.code}</td>
                <td>{country.type}</td>
                <td>{country.vacancies}</td>
                <td>
                  {country.shapeImage && (
                    <img
                      src={`http://localhost:5000${country.shapeImage}`}
                      alt={country.name}
                      width="70"
                      height="30"
                    />
                  )}
                </td>
                <td className='table-row-c'>
                  <button onClick={() => handleEdit(country._id)}><FaUserEdit /></button>
                  <button onClick={() => handleDelete(country._id)}><MdDelete /></button>
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan="6">No Countries Data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}




        {/*Pagination*/}
         <div className="pagination-c">
        {Number.isFinite(total) && contactsPerPage > 0 ? (
        [...Array(Math.ceil(total / contactsPerPage)).keys()].map((number) => (
        <button key={number + 1} onClick={() => handlePageChange(number + 1)}>
        {number + 1}
      </button>
    ))
  ) : (
    <p>No data available for pagination.</p>
  )}
</div>
    </div>
  );
};

export default CountryComponent;
