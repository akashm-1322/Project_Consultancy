import express from 'express';
const router = express.Router();

import ContactControllers  from '../Controllers/ContactControllers.js';
const { createContact, getContacts ,deleteContacts, updateContact} = ContactControllers;

// GET all contacts
router.get('/', getContacts);

// POST a new contact
router.post('/', createContact);

// PUT (update) a contact
router.delete('/:id', deleteContacts);

router.put('/:id' , updateContact)



export default router;

