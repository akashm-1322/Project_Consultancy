import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'; // Adjust as per your project structure
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import './AdminContacts.css'; // Import the external CSS file for styling

// Data for dropdown options
const types = ['Study', 'Work', 'Learning'];

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

const languageLearning = [
  { name: 'German', code: 'GER' },
  { name: 'Spanish', code: 'SPA' },
  { name: 'French', code: 'FRE' },
];

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    destination: '',
  });
  const [availableDestinations, setAvailableDestinations] = useState([]);
  const [error, setError] = useState(null);

  // Regular expressions for email and phone validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/;

  // Fetch contacts from Firestore
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsCollection = collection(db, 'contacts');
        const snapshot = await getDocs(contactsCollection);
        const contactList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactList);
      } catch (error) {
        setError('Error fetching contacts');
      }
    };

    fetchContacts();
  }, []);

  // Handle type selection and set destinations
  const handleTypeChange = (type) => {
    setNewContact({ ...newContact, type, destination: '' });

    switch (type) {
      case 'Study':
        setAvailableDestinations(studyCountries);
        break;
      case 'Work':
        setAvailableDestinations(workCountries);
        break;
      case 'Learning':
        setAvailableDestinations(languageLearning);
        break;
      default:
        setAvailableDestinations([]);
    }
  };

  // Validate the form fields
  const validateForm = () => {
    if (!newContact.name || !newContact.email || !newContact.phone || !newContact.type || !newContact.destination) {
      setError('All fields are required.');
      return false;
    }

    if (!emailRegex.test(newContact.email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (!phoneRegex.test(newContact.phone)) {
      setError('Please enter a valid phone number (10 digits).');
      return false;
    }

    setError(null);
    return true;
  };

  // Add a new contact
  const handleAddContact = async () => {
    if (!validateForm()) return;

    try {
      const contactsCollection = collection(db, 'contacts');
      const docRef = await addDoc(contactsCollection, newContact);
      setContacts([...contacts, { id: docRef.id, ...newContact }]);
      setNewContact({ name: '', email: '', phone: '', type: '', destination: '' });
      setAvailableDestinations([]);
    } catch (error) {
      setError('Error adding contact');
    }
  };

  // Edit a contact
  const handleEditContact = async (id) => {
    if (!validateForm()) return;

    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, newContact);
      setContacts(
        contacts.map((contact) => (contact.id === id ? { ...contact, ...newContact } : contact))
      );
      setNewContact({ name: '', email: '', phone: '', type: '', destination: '' });
      setAvailableDestinations([]);
    } catch (error) {
      setError('Error editing contact');
    }
  };

  // Delete a contact
  const handleDeleteContact = async (id) => {
    try {
      const contactRef = doc(db, 'contacts', id);
      await deleteDoc(contactRef);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      setError('Error deleting contact');
    }
  };

  return (
    <div className="admin-contacts-container">
      <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }} className="heading">
        Admin Contacts
      </Typography>

      {/* Add/Edit Contact Form */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }} className="form-container">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            className="input-field"
            error={error ? true : false}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            className="input-field"
            error={error ? true : false}
            helperText={error && !emailRegex.test(newContact.email) ? 'Invalid email format' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            className="input-field"
            error={error ? true : false}
            helperText={error && !phoneRegex.test(newContact.phone) ? 'Phone number must be 10 digits' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className="input-field">
            <InputLabel>Type</InputLabel>
            <Select
              value={newContact.type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="select-box"
              error={error ? true : false}
            >
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className="input-field">
            <InputLabel>Destination</InputLabel>
            <Select
              value={newContact.destination}
              onChange={(e) =>
                setNewContact({ ...newContact, destination: e.target.value })
              }
              disabled={!availableDestinations.length}
              className="select-box"
              error={error ? true : false}
            >
              {availableDestinations.map((destination) => (
                <MenuItem key={destination.code} value={destination.name}>
                  {destination.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddContact}
            disabled={error || !newContact.name || !newContact.email || !newContact.phone || !newContact.type || !newContact.destination}
            sx={{ marginTop: '20px' }}
          >
            Add Contact
          </Button>
        </Grid>
      </Grid>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <IconButton color="error">
            <WarningIcon color="error" />
          </IconButton>
          <Typography color="error">{error}</Typography>
        </div>
      )}

      {/* Contacts Table */}
      <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.type}</TableCell>
                <TableCell>{contact.destination}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditContact(contact.id)}>Edit</Button>
                  <Button onClick={() => handleDeleteContact(contact.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminContacts;
