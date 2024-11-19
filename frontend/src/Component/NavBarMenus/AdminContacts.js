import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminContacts.css'; // Ensure this file is included with animations and styles

const studyCountries = [
  { name: 'Germany', code: 'GER' },
  { name: 'Poland', code: 'POL' },
  { name: 'Switzerland', code: 'SWE' },
];

const workCountries = [
  { name: 'Dubai', code: 'DUB' },
  { name: 'Saudi Arabia', code: 'SAU' },
  { name: 'Kuwait', code: 'KUW' },
  { name: 'Qatar', code: 'QAT' },
  { name: 'Australia', code: 'AUS' },
  { name: 'Canada', code: 'CAN' },
  { name: 'Serbia', code: 'SER' },
  { name: 'Albania', code: 'ALB' },
  { name: 'Greece', code: 'GRE' },
  { name: 'Croatia', code: 'CRO' },
  { name: 'Slovakia', code: 'SLO' },
  { name: 'Italy', code: 'ITA' },
  { name: 'Czech Republic', code: 'CZE' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Hungary', code: 'HUN' },
  { name: 'Ireland', code: 'IRE' },
  { name: 'Luxembourg', code: 'LUX' },
];

const learningLanguage = [
  { name: 'German', code: 'GER' },
  { name: 'English', code: 'ENG' },
];

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [destination, setDestination] = useState('');
  const [editingContactId, setEditingContactId] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/contacts'; // Ensure this aligns with your server's contacts route

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      console.log('API Response:', response.data); // Check the API response
      setContacts(Array.isArray(response.data) ? response.data : []); // Ensure contacts is an array
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  

  const getDestinations = () => {
    switch (type) {
      case 'Study Abroad':
        return studyCountries;
      case 'Work Abroad':
        return workCountries;
      case 'Learning Language':
        return learningLanguage;
      default:
        return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = { name, phone, email, type, message, destination };

    try {
      if (editingContactId) {
        // Update contact
        await axios.put(`${API_BASE_URL}/${editingContactId}`, contactData);
      } else {
        // Add new contact
        await axios.post(API_BASE_URL, contactData);
      }

      // Reset form and fetch updated contacts
      resetForm();
      fetchContacts(); // Refresh contacts
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setType('');
    setMessage('');
    setDestination('');
    setEditingContactId(null);
  };

  const handleEdit = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
    setType(contact.type);
    setMessage(contact.message);
    setDestination(contact.destination);
    setEditingContactId(contact._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchContacts(); // Refresh contacts after deletion
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="title">Admin Contact Management</h1>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="input-field"
        >
          <option value="">Select Type</option>
          <option value="Study Abroad">Study Abroad</option>
          <option value="Work Abroad">Work Abroad</option>
          <option value="Learning Language">Learning Language</option>
        </select>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          disabled={!type}
          className="input-field"
        >
          <option value="">Select Destination</option>
          {getDestinations().map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="input-field"
        ></textarea>
        <button type="submit" className="submit-btn">
          {editingContactId ? 'Update Contact' : 'Add Contact'}
        </button>
      </form>

      <h2>Contacts</h2>
      <table className="contacts-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Type</th>
            <th>Destination</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact._id} className="table-row">
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>{contact.type}</td>
                <td>{contact.destination}</td>
                <td>{contact.message}</td>
                <td>
                  <button onClick={() => handleEdit(contact)} className="edit-btn">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No contacts available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContacts;
