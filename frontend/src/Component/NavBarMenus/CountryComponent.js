import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { FaUserEdit, FaSort } from 'react-icons/fa';
import './CountryComponent.css';

const CountryComponent = () => {
  const [countries, setCountries] = useState([]);
  const [fields, setFields] = useState([]);
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
  const API_BASE_URL_COUN = 'http://localhost:5500/api/countries';
  const API_BASE_URL_FIELDS = 'http://localhost:5500/api/field';

  const fetchCountries = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL_COUN}?page=${currentPage}&limit=${contactsPerPage}&sortKey=${sortKey}&sortDirection=${sortDirection}`
      );
      setCountries(response.data.countries);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setError("Failed to fetch countries.");
    }
  }, [currentPage, contactsPerPage, sortKey, sortDirection]);

  const fetchFields = useCallback(async () => {
    try {
      const response = await axios.get(API_BASE_URL_FIELDS);
      setFields(response.data.fields);
    } catch (error) {
      console.error('Error fetching fields:', error);
      setError('Failed to fetch fields.');
    }
  }, []);

  useEffect(() => {
    fetchCountries();
    fetchFields();
  }, [currentPage, sortKey, sortDirection , fetchCountries , fetchFields]);

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

    if (!validateForm()) {
      return;
    }

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
      if (editingCountryId) {
        await axios.put(`${API_BASE_URL_COUN}/${editingCountryId}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(`${API_BASE_URL_COUN}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setFormData({ name: '', code: '', type: '', vacancies: 0, shapeImage: null });
      setEditingCountryId(null);
      await fetchCountries();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to submit the data. Please try again.';
      setError(errorMessage);
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
        shapeImage: null,
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

  const getVacanciesFromFields = (countryName, countryType) => {
    const matchedFields = Array.isArray(fields)
      ? fields.filter(
          (field) =>
            field.countryData === countryName && field.fieldData === countryType
        )
      : [];
    
    if (matchedFields.length === 0) return 0;
  
    const totalVacancies = matchedFields.reduce((sum, field) => {
      const vacancies = Array.isArray(field.vacancies)
        ? field.vacancies.reduce((subSum, num) => subSum + num, 0)
        : 0;
      return sum + vacancies;
    }, 0);
  
    return totalVacancies;
  };

  return (
    <div className="country-container">
      <Typography variant="h4" gutterBottom>
        Country Management
      </Typography>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="country-form">
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Country Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Country Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          error={!!formErrors.code}
          helperText={formErrors.code}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          error={!!formErrors.type}
          helperText={formErrors.type}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Vacancies"
          name="vacancies"
          type="number"
          value={formData.vacancies}
          onChange={handleChange}
          required
          error={!!formErrors.vacancies}
          helperText={formErrors.vacancies}
        />
        <input
          type="file"
          name="shapeImage"
          onChange={handleChange}
          style={{ marginBottom: '16px' }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {editingCountryId ? 'Update Field' : 'Add Field'}
        </Button>
      </form>

      <Typography variant="h6" gutterBottom>
        Countries List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSortChange('name')}>Country Name <FaSort /></TableCell>
                <TableCell onClick={() => handleSortChange('code')}>Country Code <FaSort /></TableCell>
                <TableCell onClick={() => handleSortChange('type')}>Type <FaSort /></TableCell>
                <TableCell onClick={() => handleSortChange('vacancies')}>Vacancies <FaSort /></TableCell>
                <TableCell>Image Shape</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countries.map((country) => (
                <TableRow key={country._id}>
                  <TableCell>{country.name}</TableCell>
                  <TableCell>{country.code}</TableCell>
                  <TableCell>{country.type}</TableCell>
                  <TableCell>{getVacanciesFromFields(country.name, country.type)}</TableCell>
                  <TableCell>
                    {country.shapeImage && (
                      <img
                        src={`http://localhost:5500${country.shapeImage}`}
                        alt={country.name}
                        width="70"
                        height="30"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(country._id)}>
                      <FaUserEdit />
                    </Button>
                    <Button onClick={() => handleDelete(country._id)}>
                      <MdDelete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div className="pagination">
        {Array.from({ length: Math.ceil(total / contactsPerPage) }, (_, i) => (
          <Button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            variant={currentPage === i + 1 ? 'contained' : 'outlined'}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CountryComponent;
