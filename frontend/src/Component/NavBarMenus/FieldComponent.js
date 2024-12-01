import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FieldComponent.css";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

const FieldComponent = () => {
  const [fields, setFields] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    names: [""],
    vacancies: [0],
    imageUrl: "",
    countryData: "",
    fieldData: "",
  });
  const [sortKey, setSortKey] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const API_BASE_URL_FIELD = "http://localhost:5000/api/field";

  const fetchFields = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL_FIELD}?page=${currentPage}&limit=${itemsPerPage}&sortKey=${sortKey}&sortDirection=${sortDirection}`
      );
      setFields(response.data.fields);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching fields:", error);
      setError("Error fetching fields.");
    }
  };

  useEffect(() => {
    fetchFields();
  }, [currentPage, sortDirection, sortKey]);

  const validateForm = () => {
    const errors = {};
    if (!formData.names.length || formData.names.some((n) => n.trim() === ""))
      errors.names = "Field names are required.";
    const uniqueNames = new Set(
      formData.names.map((name) => name.trim().toLowerCase())
    );
    if (uniqueNames.size !== formData.names.length) {
      errors.names = "Duplicate department names are not allowed.";
    }
    if (!formData.vacancies.length || formData.vacancies.some((v) => v <= 0))
      errors.vacancies = "Valid vacancies are required.";
    if (!formData.countryData)
      errors.countryData = "Country data is required.";
    if (!formData.fieldData)
      errors.fieldData = "Field data is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddField = () => {
    setFormData({
      ...formData,
      names: [...formData.names, ""],
      vacancies: [...formData.vacancies, 0],
    });
  };

  const handleRemoveField = (index) => {
    const updatedNames = formData.names.filter((_, i) => i !== index);
    const updatedVacancies = formData.vacancies.filter((_, i) => i !== index);
    setFormData({ ...formData, names: updatedNames, vacancies: updatedVacancies });
  };

  const handleEdit = (id) => {
    const field = fields.find((f) => f._id === id);
    if (field) {
      setFormData({
        names: field.names,
        vacancies: field.vacancies,
        countryData: field.countryData,
        imageUrl: field.imageUrl || "",
        fieldData: field.fieldData,
      });
      setEditingFieldId(id);
    }
    else {
      setError('Field not found.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const formDataToSend = new FormData();
    formData.names.forEach((name, index) =>
      formDataToSend.append(`names[${index}]`, name)
    );
    formData.vacancies.forEach((vacancy, index) =>
      formDataToSend.append(`vacancies[${index}]`, vacancy)
    );
    formDataToSend.append("countryData", formData.countryData);
    formDataToSend.append("fieldData", formData.fieldData);
    if (formData.imageUrl) {
      formDataToSend.append("imageUrl", formData.imageUrl);
    }

    setLoading(true);
    setError(null); 

    try {
      let response;
      if (editingFieldId) {
        response = await axios.put(`${API_BASE_URL_FIELD}/${editingFieldId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post(`${API_BASE_URL_FIELD}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setFormData({
        names: [""],
        vacancies: [0],
        countryData: "",
        imageUrl: null,
        fieldData: "",
      });
      setEditingFieldId(null);
      await fetchFields();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to submit the data. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (key) => {
    setSortKey(key);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

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

  const handleDelete = async (id) => {
    try {
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

      <form onSubmit={handleSubmit} className="field-form">
        {formData.names.map((_, index) => (
          <div key={index} className="dynamic-field-group">
            <input
            className='custom-form-control'
              type="text"
              name="names"
              value={formData.names[index]}
              onChange={(e) => handleChange(e, index)}
              placeholder="Department Name"
              required
            />
            <input
            className='custom-form-control'
              type="number"
              name="vacancies"
              value={formData.vacancies[index]}
              onChange={(e) => handleChange(e, index)}
              placeholder="Vacancies"
              required
            />
            <button className='custom-form-control' type="button" onClick={() => handleRemoveField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button  className='custom-form-control' type="button" onClick={handleAddField}>
          Add Field
        </button>
        <input
         className='custom-form-control'
          type="text"
          name="countryData"
          value={formData.countryData}
          onChange={handleChange}
          placeholder="Country"
          required
        />
        <input
         className="custom-form-control"
          type="text"
          name="fieldData"
          value={formData.fieldData}
          onChange={handleChange}
          placeholder="Field Type"
          required
        />
        <input className="custom-form-control" type="file" name="imageUrl" onChange={handleChange} />
        <button type="submit">
          {editingFieldId ? "Update Field" : "Add Field"}
        </button>
      </form>

      <h2>Fields List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSortChange("name")}>Name</th>
              <th onClick={() => handleSortChange("vacancies")}>Vacancies</th>
              <th onClick={() => handleSortChange("countryData")}>Country Name {sortKey === 'countryData' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
              <th onClick={() => handleSortChange("fieldData")}>Type {sortKey === 'fieldData' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(fields) && fields.length > 0 ) ? (
              fields.map((field) => (
                <tr key={field._id}>
                  <td>
                    <ul>
                      {field.names.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {field.vacancies.map((vacancy, index) => (
                        <li key={index}>{vacancy}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{field.countryData}</td>
                  <td>{field.fieldData}</td>
                  <td>
                    {field.imageUrl && (
                      <img
                        src={`http://localhost:5000${field.imageUrl}`}
                        alt={field._id} width="70" height="30"
                      />
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(field._id)}>
                      <FaUserEdit />
                    </button>
                    <button onClick={() => handleDelete(field._id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No fields found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <div className="pagination">
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
