const express = require('express');
const router = express.Router();
const { createContact, getContacts ,deleteContacts, updateContact} = require('../Controllers/ContactControllers');

// GET all contacts
router.get('/', getContacts);

// POST a new contact
router.post('/', createContact);

// PUT (update) a contact
router.delete('/:id', deleteContacts);

router.put('/:id' , updateContact)



module.exports = router;

