import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FieldComponent.css';
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

const FieldComponent = () => {
  const [fields, setFields] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message , setMessage] = useState('');
  const [formData, setFormData] = useState({
    names: [""],
    vacancies: [0],
    imageUrl: '',
    countryData: ''
  });
  const [sortKey, setSortKey] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const API_BASE_URL_FIELD = 'http://localhost:5000/api/field';


  const fetchFields = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL_FIELD}?page=${currentPage}&limit=${itemsPerPage}&sortKey=${sortKey}&sortDirection=${sortDirection}`
      );
      setFields(response.data.fields);
      setTotal(response.data.total);
      console.log('Field Data Fetched');
      console.log(response.data.field);
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  };


  // Fetch fields with pagination and sorting
  useEffect(() => {
    fetchFields();
  }, [currentPage, sortDirection , sortKey , itemsPerPage]);


    //validating Form data
   const validateForm = () => {
    const errors = {};
    if (!formData.names.length || formData.names.some((n) => n.trim() === ""))
      errors.name = "Field names are required.";
    if (!formData.vacancies.length || formData.vacancies.some((v) => !v))
      errors.vacancies = "Vacancies for all fields are required.";
    if (!formData.countryData)
      errors.countryData = "Country data is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle adding a new name/vacancy field
  const handleAddField = () => {
    setFormData({
      ...formData,
      names: [...formData.names, ""],
      vacancies: [...formData.vacancies, ""],
    });
  };

  // Handle removing a name/vacancy field
  const handleRemoveField = (index) => {
    const updatedNames = formData.names.filter((_, i) => i !== index);
    const updatedVacancies = formData.vacancies.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      names: updatedNames,
      vacancies: updatedVacancies,
    });
  };


    const handleEdit = (id) => {
      const field = fields.find((field) => field._id === id);
      setFormData({
        names: field.names,
        vacancies: field.vacancies,
        countryData: field.countryData,
        imageUrl: field.imageUrl, // Keep the image if no new file is uploaded
      });
      setEditingFieldId(id); // Set the ID of the field being edited
    };
    
      // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const formDataToSend = new FormData();
    formData.names.forEach((name, index) => {
      formDataToSend.append(`names[${index}]`, name);
  });
     formData.vacancies.forEach((vacancy, index) => {
      formDataToSend.append(`vacancies[${index}]`, vacancy);
  });
    formDataToSend.append("countryData", formData.countryData);
    if (formData.imageUrl) {
      formDataToSend.append("imageUrl", formData.imageUrl);
    }
    console.log("FormData to send:", Array.from(formDataToSend.entries()));

    try {
      if (editingFieldId) {
        await axios.put(`${API_BASE_URL_FIELD}/${editingFieldId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_BASE_URL_FIELD}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setFormData({
        names: [""],
        vacancies: [0],
        countryData: "",
        imageUrl: "",
      });
      setEditingFieldId(null);
      fetchFields();
    } catch (error) {
      console.error("Error submitting field data:", error);
      setError("Error submitting field data.");
    } finally {
      setLoading(false);
    }
  };
    
  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle sorting
  const handleSortChange = (key) => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  };

  // Handle input change
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "imageUrl") {
      setFormData({ ...formData, imageUrl: e.target.files[0] });
    } else if (index !== null) {
      const updatedArray = [...formData[name]];
      updatedArray[index] = value;
      setFormData({ ...formData, [name]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Delete a field
  const handleDelete = async (id) => {
    try {
      console.log("Deleting field with ID:", id); // Debug log
      await axios.delete(`${API_BASE_URL_FIELD}/${id}`);
      setFields(fields.filter((field) => field._id !== id));
    } catch (error) {
      console.error("Error deleting field:", error);
      setError("Error deleting field.");
    }
  };


  return (
    <div className="field-container">
      <h1>Field Management</h1>
      {error && <div className="error-message">{error}</div>}
      {/* Add Field Form */}
      <form onSubmit={handleSubmit} className="field-form">
      {formData.names.map((_, index) => (
          <div key={index} className="dynamic-field-group">
            <input
              type="text"
              name="names"
              value={formData.names[index]}
              onChange={(e) => handleChange(e, index)}
              placeholder="Department Name"
              style={{margin:'5px'}}
              required
            />
            <input
              type="number"
              name="vacancies"
              value={formData.vacancies[index]}
              onChange={(e) => handleChange(e, index)}
              placeholder="Vacancies"
              style={{margin:'5px'}}
              required
            />
            <button type="button" onClick={() => handleRemoveField(index)} style={{margin:'5px'}} >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddField} style={{width:'200px', height:'50px'}}>
          Add Field
        </button>
        <input
          type="text"
          name="countryData"
          value={formData.countryData}
          onChange={handleChange}
          style={{width:'200px', height:'50px'}}
          placeholder="Country"
          required
        />
        {formErrors.countryData && <span className="error">{formErrors.countryData}</span>}
        <input type="file" name="imageUrl" onChange={handleChange} />
        <button type="submit" style={{width:'200px', height:'50px'}}>
        {editingFieldId ? 'Update Country' : 'Add Country'}
        </button>
      </form>

      {/* Field List */}
      <h2>Fields List</h2>
      {loading ? (
        <p>Loading ...</p>):
      (<table>
        <thead>
          <tr>
            <th onClick={() => handleSortChange('name')}>
              Department / University Name {sortKey === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSortChange('vacancies')}>
              Vacancies {sortKey === 'vacancies' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSortChange('countryData')}>
              Country Name {sortKey === 'countryData' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th>Department / University Vacancy Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(fields) && fields.length > 0 ? (
              fields.map((field) => (
                <tr key={field._id}>
                  <td>
                    <ul>
                      {Array.isArray(field.names) && field.names.length > 0 ? field.names.map((name, index) => (
                        <li key={index}>{name}</li>
                      )): ( <p> No Field Names Available </p>)}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {Array.isArray(field.vacancies) && field.vacancies.length > 0 ? field.vacancies.map((vac, index) => (
                        <li key={index}>{vac}</li>
                      )) : ( <p> No Field Vacancies Available </p>)}
                    </ul>
                  </td>
              <td>{field.countryData}</td>
              <td>
                {field.imageUrl && (
                <img src={`http://localhost:5000${field.imageUrl}`} alt={field.name} width="70" height="30" />
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(field._id)}><FaUserEdit/></button>
                <button onClick={() => handleDelete(field._id)}><MdDelete/></button>
              </td>
            </tr>
            ))
            ) : (
            <tr>
              <td colSpan="5">No fields available.</td>
            </tr>
            )}

        </tbody>
      </table>
      )}

      {/* Pagination */}
      <div className="pagination-f">
      {Number.isFinite(total) && itemsPerPage > 0 ? (
      [...Array(Math.ceil(total / itemsPerPage)).keys()].map((number) => (
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

export default FieldComponent;
