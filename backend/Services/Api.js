import axios from 'axios';

// Create an instance of Axios for backend communication
const API = axios.create({
  baseURL: 'http://localhost:5000',
});

// Function to fetch all contacts
export const getContacts = async () => {
  try {
    const response = await API.get('/contacts');
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

// Function to add a new contact
export const addContact = async (contact) => {
  try {
    const response = await API.post('/contacts', contact);
    return response.data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

// Function to delete a contact by ID
export const deleteContact = async (id) => {
  try {
    const response = await API.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

// Function to update a contact by ID
export const updateContact = async (id, contact) => {
  try {
    const response = await API.put(`/contacts/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

// Admin login API
export const loginAdmin = async (credentials) => {
  try {
    const response = await API.post('/admin/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
