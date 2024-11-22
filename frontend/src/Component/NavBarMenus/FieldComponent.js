import React, { useState } from 'react';
import axios from 'axios';

const FieldComponent = ({ fields = [], setFields, countries = [] }) => {
  const [fieldData, setFieldData] = useState({
    name: '',
    vacancies: '',
    countryId: '',
    image: null, // Added image property
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldData({ ...fieldData, [name]: value });
  };

  // Handle file input change for image
  const handleFileChange = (e) => {
    setFieldData({ ...fieldData, image: e.target.files[0] });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', fieldData.image);

    // Upload image first
    axios.post('/upload-image', formData).then((response) => {
      const imageUrl = response.data.imageUrl;

      // Add field
      axios
        .post('/fields', { ...fieldData, image: imageUrl })
        .then((res) => {
          alert('Field added');
          setFields([...fields, res.data]); // Add new field to list
          setFieldData({ name: '', vacancies: '', countryId: '', image: null }); // Reset form
        })
        .catch((err) => alert(err.message));
    });
  };

  return (
    <div>
      <h2>Field Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Field Name"
          value={fieldData.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="vacancies"
          placeholder="Vacancies"
          value={fieldData.vacancies}
          onChange={handleInputChange}
        />
        <select
          name="countryId"
          value={fieldData.countryId}
          onChange={handleInputChange}
        >
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option key={country._id} value={country._id}>
              {country.name}
            </option>
          ))}
        </select>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit Field</button>
      </form>

      <h2>Field List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Vacancies</th>
            <th>Country</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fields) && fields.length > 0 ? (
            fields.map((field) => (
              <tr key={field._id}>
                <td>{field.name}</td>
                <td>{field.vacancies}</td>
                <td>{field.countryId ? field.countryId.name : 'Unknown'}</td> {/* Check for countryId */}
                <td>
                  {field.image ? (
                    <img src={field.image} alt="Field" width="50" />
                  ) : (
                    'No image'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No fields available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FieldComponent;
