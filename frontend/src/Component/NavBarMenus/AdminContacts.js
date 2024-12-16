import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Pagination,
  MenuItem,
} from "@mui/material";
import { FaSort, FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countries, setCountries] = useState([]);
  const [contactsPerPage] = useState(10);
  const [totalContacts, setTotalContacts] = useState(0);
  const [editingContactId, setEditingContactId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [formErrors, setFormErrors] = useState({});
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    message: "",
    destination: "",
    dateofjoining: "",
  });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  const API_BASE_URL_COUN = "http://localhost:5500/api/countries";
  const API_BASE_URL = "http://localhost:5500/api/contact";

  // Fetch Contacts
  const fetchContacts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}?page=${currentPage}&limit=${contactsPerPage}`
      );
      setContacts(response.data.contacts || []);
      setTotalContacts(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }, [currentPage, contactsPerPage]);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await axios.get(API_BASE_URL_COUN);
      setCountries(response.data.countries);

      // Extract unique types
      const types = [...new Set(response.data.countries.map(country => country.type))];
      setUniqueTypes(types);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) errors.phone = "Phone is required";
    if (!formData.type) errors.type = "Type is required";
    if (!formData.destination) errors.destination = "Destination is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingContactId) {
        await axios.put(`${API_BASE_URL}/${editingContactId}`, formData);
      } else {
        await axios.post(API_BASE_URL, formData);
      }
      fetchContacts();
      setAlert({ open: true, message: "Contact saved successfully!", severity: "success" });
      setFormData({
        name: "",
        phone: "",
        email: "",
        type: "",
        message: "",
        destination: "",
        dateofjoining: "",
      });
      setEditingContactId(null);
    } catch (error) {
      setAlert({ open: true, message: "Error saving contact!", severity: "error" });
    }
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setEditingContactId(contact._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchContacts();
      setAlert({ open: true, message: "Contact deleted!", severity: "success" });
    } catch (error) {
      setAlert({ open: true, message: "Error deleting contact!", severity: "error" });
    }
  };

  const handleSortChange = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;

    // Update state
    setFormData({ ...formData, type: selectedType, destination: '' });
  
    // Filter destinations based on selected type
    const destinations = countries
      .filter(country => country.type === selectedType)
      .map(country => country.name);
  
    setFilteredDestinations(destinations);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
  <Typography variant="h4" align="center" gutterBottom>
    Admin Contact Management
  </Typography>

  {/* Form */}
  <Paper elevation={6} sx={{ p: 3, mb: 4 }}>
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <TextField
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <TextField
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={!!formErrors.phone}
          helperText={formErrors.phone}
        />
        <TextField
          select
          name="Type"
          label="Type"
          value={formData.type}
          onChange={handleTypeChange}
        >
    <MenuItem value="">Select Type</MenuItem>
    {uniqueTypes.map((type, index) => (
      <MenuItem key={index} value={type}>
        {type}
      </MenuItem>
    ))}
        </TextField>
        <TextField
        select
        label="Destination"
        name="Destination"
        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
        value={formData.destination}
        error={!!formErrors.destination}
        helperText={formErrors.destination}>
        <MenuItem value="">Select Destination</MenuItem>
    {filteredDestinations.map((destination, index) => (
      <MenuItem key={index} value={destination}>
        {destination}
      </MenuItem>
    ))}
</TextField>

        <TextField
          label="Message"
          multiline
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        <Button variant="contained" type="submit">
          {editingContactId ? "Update Contact" : "Add Contact"}
        </Button>
      </Box>
    </form>
  </Paper>

  {/* Table */}
  <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
  <Table>
    {/* Table Headers */}
    <TableHead>
      <TableRow>
        {["Name", "Email", "Phone", "Type", "Message", "Destination", "Date of Joining", "Actions"].map((head) => (
          <TableCell key={head} onClick={() => handleSortChange(head)}>
            {head} <FaSort />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

    {/* Table Body */}
    <TableBody>
      {contacts.map((contact) => (
        <TableRow key={contact._id}>
          <TableCell>{contact.name}</TableCell>
          <TableCell>{contact.email}</TableCell>
          <TableCell>{contact.phone}</TableCell>
          <TableCell>{contact.type || "N/A"}</TableCell>
          <TableCell>{contact.message || "N/A"}</TableCell>
          <TableCell>{contact.destination || "N/A"}</TableCell>
          <TableCell>{contact.dateofjoining || "N/A"}</TableCell>
          <TableCell>
            <IconButton color="primary" onClick={() => handleEdit(contact)}>
              <FaUserEdit />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(contact._id)}>
              <MdDelete />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


  {/* Pagination */}
  <Box display="flex" justifyContent="center" my={2}>
    <Pagination
      count={Math.ceil(totalContacts / contactsPerPage)}
      page={currentPage}
      onChange={(e, value) => setCurrentPage(value)}
    />
  </Box>

  {/* Snackbar */}
  <Snackbar
    open={alert.open}
    autoHideDuration={4000}
    onClose={() => setAlert({ ...alert, open: false })}
  >
    <Alert severity={alert.severity}>{alert.message}</Alert>
  </Snackbar>
</Box>
  );
};

export default AdminContacts;
