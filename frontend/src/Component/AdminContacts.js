import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Adjust the import path according to your project structure
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Box, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Grid } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const Container = styled(Box)(({ theme }) => ({
  padding: '20px',
  maxWidth: '100%',
  background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',  // Gradient background
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
}));

const TableRowStyled = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#f1f1f1',  // Hover effect for row
    transform: 'scale(1.02)', // Slight scale up for hover animation
    transition: 'transform 0.3s ease, background-color 0.3s ease', // Smooth transition for hover
  },
  borderBottom: '2px solid #ddd', // Row border
  marginBottom: '10px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '12px',
  borderBottom: '1px solid #ddd',  // Add a border to each cell
  fontSize: '1rem',
  color: '#333',
  textAlign: 'center',
  fontWeight: 'bold',
  '&:first-child': {
    borderTopLeftRadius: '10px',
  },
  '&:last-child': {
    borderTopRightRadius: '10px',
  },
}));

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    destinationPlace: '',
  });

  // Fetch contacts from Firestore
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsCollection = collection(db, 'contacts');
        const contactSnapshot = await getDocs(contactsCollection);
        const contactList = contactSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setContacts(contactList);
      } catch (error) {
        setError('Error fetching contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Add a new contact
  const handleAddContact = async () => {
    try {
      const contactsCollection = collection(db, 'contacts');
      await addDoc(contactsCollection, newContact);
      setContacts([...contacts, newContact]); // Optimistic update
      setNewContact({
        name: '',
        email: '',
        phone: '',
        type: '',
        destinationPlace: '',
      });
    } catch (error) {
      setError('Error adding contact');
    }
  };

  // Edit a contact
  const handleEditContact = async (id) => {
    const contactRef = doc(db, 'contacts', id);
    const updatedData = { ...newContact }; // Take new contact data for the update
    await updateDoc(contactRef, updatedData);
    setContacts(contacts.map(contact => (contact.id === id ? { ...contact, ...updatedData } : contact)));
    setNewContact({
      name: '',
      email: '',
      phone: '',
      type: '',
      destinationPlace: '',
    });
  };

  // Delete a contact
  const handleDeleteContact = async (id) => {
    try {
      const contactRef = doc(db, 'contacts', id);
      await deleteDoc(contactRef);
      setContacts(contacts.filter(contact => contact.id !== id)); // Remove from UI optimistically
    } catch (error) {
      setError('Error deleting contact');
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ marginTop: '10px' }}>Loading contacts...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>Admin Contacts</Typography>

      {/* Add New Contact Form */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Type"
            value={newContact.type}
            onChange={(e) => setNewContact({ ...newContact, type: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Destination"
            value={newContact.destinationPlace}
            onChange={(e) => setNewContact({ ...newContact, destinationPlace: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddContact}>Add Contact</Button>
        </Grid>
      </Grid>

      {contacts.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center' }}>No contacts available.</Typography>
      ) : (
        <TableContainer sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Destination</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell> {/* Added Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRowStyled key={contact.id}>
                  <StyledTableCell>{contact.name}</StyledTableCell>
                  <StyledTableCell>{contact.email}</StyledTableCell>
                  <StyledTableCell>{contact.phone}</StyledTableCell>
                  <StyledTableCell>{contact.type}</StyledTableCell>
                  <StyledTableCell>{contact.destination}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditContact(contact.id)}
                      sx={{ marginRight: '10px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </TableRowStyled>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminContacts;
