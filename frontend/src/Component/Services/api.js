import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://localhost:5000/contacts';

// Get all contacts
export const getContacts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

// Add a new contact
export const addContact = async (contactData) => {
  try {
    const response = await axios.post(BASE_URL, contactData);
    return response.data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

// Delete a contact by ID
export const deleteContact = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

// Update a contact by ID
export const updateContact = async (id, updatedContactData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedContactData);
    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};
