import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSort } from 'react-icons/fa';
import './AdminContacts.css';
import { RiNumbersFill } from "react-icons/ri";

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
    studyCountry: '',
    workCountry: '',
    learningLanguage: '',
  });

  const studyCountries = [
    { id: 1 , name: 'Germany', code: 'GER' },
    { id: 2 , name: 'Poland', code: 'POL' },
    { id: 3 , name: 'Switzerland', code: 'SWE' },
    { id: 4 , name: 'Singapore', code: 'SIN' },
  ];

  const workCountries = [
    { id: 1 , name: 'Dubai', code: 'DUB' },
    { id: 2 , name: 'Saudi Arabia', code: 'SAU' },
    { id: 3 , name: 'Kuwait', code: 'KUW' },
    { id: 4 , name: 'Qatar', code: 'QAT' },
    { id: 5 , name: 'Australia', code: 'AUS' },
    { id: 6 , name: 'Canada', code: 'CAN' },
    { id: 7 , name: 'Serbia', code: 'SER' },
    { id: 8 , name: 'Albania', code: 'ALB' },
    { id: 9 , name: 'Greece', code: 'GRE' },
    { id: 10 , name: 'Croatia', code: 'CRO' },
    { id: 11 , name: 'Slovakia', code: 'SLO' },
    { id: 12 , name: 'Italy', code: 'ITA' },
    { id: 13 , name: 'Czech Republic', code: 'CZE' },
    { id: 14 , name: 'United Kingdom', code: 'UK' },
    { id: 15 , name: 'Hungary', code: 'HUN' },
    { id: 16 , name: 'Ireland', code: 'IRE' },
    { id: 17 , name: 'Luxembourg', code: 'LUX' },
    { id: 18 , name: 'Singapore' , code: 'SIN'}
  ];
  
  const languageLearning = [
    { id: 1 , name: 'German', code: 'GER' }
  ];
  
  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const today = new Date();

    if (!formData.name || !nameRegex.test(formData.name)) {
      errors.name = 'Name is required and must contain only letters and spaces.';
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
      errors.dateofjoining = 'Date of joining cannot be in the future.';
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

  const API_BASE_URL = 'http://localhost:5000/contacts';

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          page: currentPage,
          limit: contactsPerPage,
          sortKey: sortConfig.key,
          sortOrder: sortConfig.direction,
        },
      });
      setContacts(response.data || []);
      setTotalContacts(response.data.length || 0);
    } catch (error) {
      setError('Error fetching contacts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, sortConfig]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
      fetchContacts();
    } catch (error) {
      setError('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (key) => {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalContacts / contactsPerPage)) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setEditingContactId(contact._id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchContacts();
    } catch (error) {
      setError('Error deleting contact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Contact Management</h1>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="admin-form">
  <input
    type="text"
    name="name"
    placeholder="Name"
    value={formData.name}
    onChange={handleChange}
    className="custom-form-control"
    required
  />
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    className="custom-form-control"
    required
  />
  <input
    type="tel"
    name="phone"
    placeholder="Phone"
    value={formData.phone}
    onChange={handleChange}
    className="custom-form-control"
    required
  />
  <input
    type="date"
    name="dateofjoining"
    value={formData.dateofjoining}
    onChange={handleChange}
    className="custom-form-control"
    required
  />
  <input
    type="textarea"
    name="message"
    value={formData.message}
    onChange={handleChange}
    className="custom-form-control"
    required
  />
  <select
    name="type"
    value={formData.type}
    onChange={handleChange}
    className="custom-form-control"
    required
  >
    <option value="">Select Type</option>
    <option value="Study Abroad">Study Abroad</option>
    <option value="Work/Travel Abroad">Work/Travel Abroad</option>
    <option value="Language Coaching">Language Coaching</option>
  </select>

  {formData.type === "Study Abroad" && (
    <select
      name="destination"
      value={formData.destination}
      onChange={handleChange}
      className="custom-form-control"
      required
    >
      <option value="">Select Study Country</option>
      {studyCountries.map((country) => (
        <option key={country.id} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  )}

  {formData.type === "Work/Travel Abroad" && (
    <select
      name="destination"
      value={formData.destination}
      onChange={handleChange}
      className="custom-form-control"
      required
    >
      <option value="">Select Work Country</option>
      {workCountries.map((country) => (
        <option key={country.id} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  )}

  {formData.type === "Language Coaching" && (
    <select
      name="destination"
      value={formData.destination}
      onChange={handleChange}
      className="custom-form-control"
      required
    >
      <option value="">Select Language</option>
      {languageLearning.map((language) => (
        <option key={language.id} value={language.code}>
          {language.name}
        </option>
      ))}
    </select>
    
  )}
            <button type="submit">{editingContactId ? 'Update' : 'Add'}</button>
          </form>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSortChange('name')}> Name <FaSort /></th>
                <th onClick={() => handleSortChange('phone')}> Phone <FaSort /></th>
                <th onClick={() => handleSortChange('email')}> Email <FaSort /></th>
                <th onClick={() => handleSortChange('type')}> Type <FaSort /></th>
                <th onClick={() => handleSortChange('message')}> Message <FaSort /></th>
                <th onClick={() => handleSortChange('destination')}> Destination <FaSort /></th>
                <th onClick={() => handleSortChange('dateofjoining')}> Date of Joining <FaSort /></th>
                {/* Other table headers */}
                <th className="d-flex flex-column justify-content-center text-center">
                <div>Actions</div>
                <div> <RiNumbersFill/> {totalContacts}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.length ? (
                contacts.map((contact) => (
                  <tr key={contact._id} className="table-row">
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td>{contact.type}</td>
                  <td>{contact.message}</td>
                  <td>{contact.destination}</td>
                  <td>{contact.dateofjoining}</td>
                    <td>
                      <button onClick={() => handleEdit(contact)}>Edit</button>
                      <button onClick={() => handleDelete(contact._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No contacts found</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{`Page ${currentPage}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalContacts / contactsPerPage)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminContacts;
