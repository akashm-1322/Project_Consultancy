import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSort } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import './AdminContacts.css';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10);
  const [totalContacts, setTotalContacts] = useState(0);
  const [editingContactId, setEditingContactId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: '',
    message: '',
    destination: '',
    dateofjoining: '',
  });

  const API_BASE_URL = 'http://localhost:5000/api/contact';

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const sortKey = sortConfig.key;
      const sortDirection = sortConfig.direction;
      const response = await axios.get(
        `${API_BASE_URL}?page=${currentPage}&limit=${contactsPerPage}&sortKey=${sortKey}&sortDirection=${sortDirection}`
      );

      if (response.data && response.data.contacts) {
        setContacts(response.data.contacts);
        setTotalContacts(response.data.total);
      } else {
        setError('No contacts found.');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Error fetching contacts. Please check the API or server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage,sortConfig,currentPage]);

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const today = new Date();

    if (!formData.name || !nameRegex.test(formData.name)) {
      errors.name = 'Name must contain only letters and spaces.';
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      errors.phone = 'Phone must be exactly 10 digits.';
    }
    if (!formData.type) {
      errors.type = 'Type selection is required.';
    }
    if (!formData.dateofjoining) {
      errors.dateofjoining = 'Date of joining is required.';
    } else if (new Date(formData.dateofjoining) > today) {
      errors.dateofjoining = 'Date cannot be in the future.';
    }
    if (!formData.message) {
      errors.message = 'Message cannot be empty.';
    }
    if (!formData.destination) {
      errors.destination = 'Destination is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      if (editingContactId) {
        await axios.put(`${API_BASE_URL}/${editingContactId}`, formData);
        setEditingContactId(null);
      } else {
        await axios.post(API_BASE_URL, formData);
      }

      setFormData({
        name: '',
        phone: '',
        email: '',
        type: '',
        message: '',
        destination: '',
        dateofjoining: '',
      });

      await fetchContacts();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setEditingContactId(contact._id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchContacts();
    } catch (error) {
      setError('Error deleting contact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (key) => {
    const direction = (sortConfig.key === key && sortConfig.direction) === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalContacts / contactsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Contact Management</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          className="custom-form-control"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {formErrors.name && <span className="error-message">{formErrors.name}</span>}
        <input
          className="custom-form-control"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        <input
          className="custom-form-control"
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
        <select
          className="custom-form-control"
          name="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="Study Abroad">Study Abroad</option>
          <option value="Work Abroad">Work Abroad</option>
          <option value="Domestic Placements">Domestic Placements</option>
          <option value="Language Coaching">Language Coaching</option>
        </select>
        {formErrors.type && <span className="error-message">{formErrors.type}</span>}
        <textarea
          className="custom-form-control"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        {formErrors.message && <span className="error-message">{formErrors.message}</span>}
        <input
          className="custom-form-control"
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
        />
        {formErrors.destination && <span className="error-message">{formErrors.destination}</span>}
        <input
          className="custom-form-control"
          type="date"
          name="dateofjoining"
          placeholder="Date of Joining"
          value={formData.dateofjoining}
          onChange={(e) => setFormData({ ...formData, dateofjoining: e.target.value })}
        />
        {formErrors.dateofjoining && <span className="error-message">{formErrors.dateofjoining}</span>}
        <button className="admin-form-button" type="submit">
          {editingContactId ? 'Update Contact' : 'Add Contact'}
        </button>
      </form>
      {loading && <div className="loading">Loading...</div>}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortChange('name')}>Name <FaSort /></th>
            <th onClick={() => handleSortChange('email')}>Email <FaSort /></th>
            <th onClick={() => handleSortChange('phone')}>Phone <FaSort /></th>
            <th onClick={() => handleSortChange('type')}>Type <FaSort /></th>
            <th onClick={() => handleSortChange('destination')}>Destination <FaSort /></th>
            <th onClick={() => handleSortChange('Date of Joining')}>Date of Joining <FaSort /></th>
            <th onClick={() => handleSortChange('message')}>Message <FaSort /></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.type}</td>
              <td>{contact.destination}</td>
              <td>{contact.dateofjoining}</td>
              <td>{contact.message}</td>
              <td className="table-row">
                <button onClick={() => handleEdit(contact)}><FaUserEdit /></button>
                <button onClick={() => handleDelete(contact._id)}><MdDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
       <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {Math.ceil(totalContacts / contactsPerPage)}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= Math.ceil(totalContacts / contactsPerPage)}>
          Next
        </button>
        </div>


    </div>
  );
};

export default AdminContacts;
