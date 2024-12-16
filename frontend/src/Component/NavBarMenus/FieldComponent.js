import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, Paper } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { FaSort, FaUserEdit } from "react-icons/fa";
import "./FieldComponent.css";

const FieldComponent = () => {
  const [fields, setFields] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [editingFieldId, setEditingFieldId] = useState(null);
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
  const API_BASE_URL_FIELD = "http://localhost:5500/api/field";
  

  const fetchFields = useCallback(async () => {
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
  }, [API_BASE_URL_FIELD, currentPage, itemsPerPage, sortDirection, sortKey]);

  useEffect(() => {
    fetchFields();
  }, [currentPage, sortDirection, sortKey, fetchFields]);

  const validateForm = () => {
    const errors = {};
    if (!formData.names.length || formData.names.some((n) => n.trim() === "")) errors.names = "Field names are required.";
    const uniqueNames = new Set(formData.names.map((name) => name.trim().toLowerCase()));
    if (uniqueNames.size !== formData.names.length) errors.names = "Duplicate department names are not allowed.";
    if (!formData.vacancies.length || formData.vacancies.some((v) => v <= 0)) errors.vacancies = "Valid vacancies are required.";
    if (!formData.countryData) errors.countryData = "Country data is required.";
    if (!formData.fieldData) errors.fieldData = "Field data is required.";
    return Object.keys(errors).length === 0;
  };

  const handleAddField = () => {
    setFormData({ ...formData, names: [...formData.names, ""], vacancies: [...formData.vacancies, 0] });
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
    } else {
      setError('Field not found.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const formDataToSend = new FormData();
    formData.names.forEach((name, index) => formDataToSend.append(`names[${index}]`, name));
    formData.vacancies.forEach((vacancy, index) => formDataToSend.append(`vacancies[${index}]`, vacancy));
    formDataToSend.append("countryData", formData.countryData);
    formDataToSend.append("fieldData", formData.fieldData);
    if (formData.imageUrl) formDataToSend.append("imageUrl", formData.imageUrl);

    setLoading(true);
    setError(null);
    let response;
    try {
      if (editingFieldId) {
        response = await axios.put(`${API_BASE_URL_FIELD}/${editingFieldId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post(`${API_BASE_URL_FIELD}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setFormData({ names: [""], vacancies: [0], countryData: "", imageUrl: null, fieldData: "" });
      setEditingFieldId(null);
      await fetchFields();
    } catch (error) {
      const errorMessage = response?.data?.error || 'Failed to submit the data. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Field Management</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit} className="field-form">
        {formData.names.map((_, index) => (
          <Box key={index} sx={{ marginBottom: 2, display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Department Name"
              variant="outlined"
              name="names"
              value={formData.names[index]}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <TextField
              fullWidth
              label="Vacancies"
              variant="outlined"
              name="vacancies"
              type="number"
              value={formData.vacancies[index]}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <Button variant="contained" color="error" onClick={() => handleRemoveField(index)} sx={{ alignSelf: 'center' }}>
              Remove
            </Button>
          </Box>
        ))}
        <Button variant="contained" onClick={handleAddField}>Add Field</Button>

        <TextField
          fullWidth
          label="Country"
          variant="outlined"
          name="countryData"
          value={formData.countryData}
          onChange={handleChange}
          required
          sx={{ marginTop: 2 }}
        />
        <TextField
          fullWidth
          label="Field Type"
          variant="outlined"
          name="fieldData"
          value={formData.fieldData}
          onChange={handleChange}
          required
          sx={{ marginTop: 2 }}
        />
        <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
          Upload Image
          <input type="file" name="imageUrl" hidden onChange={handleChange} />
        </Button>
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          {editingFieldId ? "Update Field" : "Add Field"}
        </Button>
      </form>

      <Typography variant="h5" sx={{ marginTop: 4 }}>Fields List</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSortChange("name")}>Name <FaSort /></TableCell>
                <TableCell onClick={() => handleSortChange("vacancies")}>Vacancies <FaSort /></TableCell>
                <TableCell onClick={() => handleSortChange("countryData")}>Country</TableCell>
                <TableCell onClick={() => handleSortChange("fieldData")}>Type</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.length > 0 ? (
                fields.map((field) => (
                  <TableRow key={field._id}>
                    <TableCell>{field.names.join(", ")}</TableCell>
                    <TableCell>{field.vacancies.join(", ")}</TableCell>
                    <TableCell>{field.countryData}</TableCell>
                    <TableCell>{field.fieldData}</TableCell>
                    <TableCell>
                      {field.imageUrl && (
                        <img
                          src={`http://localhost:5500${field.imageUrl}`}
                          alt={field._id}
                          width="70"
                          height="30"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(field._id)}>
                        <FaUserEdit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(field._id)}>
                        <MdDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6">No fields found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      <Box sx={{ marginTop: 2 }}>
        {Number.isFinite(total) && itemsPerPage > 0 ? (
          [...Array(Math.ceil(total / itemsPerPage)).keys()].map((number) => (
            <Button key={number + 1} onClick={() => handlePageChange(number + 1)}>{number + 1}</Button>
          ))
        ) : (
          <Typography>No data available for pagination.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default FieldComponent;
