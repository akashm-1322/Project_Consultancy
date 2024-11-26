const express = require('express');
const router = express.Router();
const { createContact, getContacts ,deleteContacts} = require('../Controllers/ContactControllers');

// GET all contacts
router.get('/', getContacts);

// POST a new contact
router.post('/', createContact);

// PUT (update) a contact
router.put('/:id', deleteContacts);



module.exports = router;

