const Contact = require('../Models/Contact');
const mongoose = require('mongoose');

// Create Contact
const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Contacts
const getContacts = async (req, res) => {
  const { page = 1, limit = 10, sortKey = 'abc', sortDirection = 'asc' } = req.query;

  const sortOptions = {};
  if (sortKey) {
    sortOptions[sortKey] = sortDirection === 'asc' ? 1 : -1;
  }

  try {
    // Get the total count of documents (needed for pagination)
    const total = await Contact.countDocuments();

    // Sort and paginate contacts
    const contacts = await Contact.find()
      .sort(sortOptions) // Apply sorting
      .skip((page - 1) * limit) // Pagination: skip previous pages
      .limit(Number(limit)); // Limit results based on the current page

    res.json({ contacts, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Contact
const deleteContacts = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // Update contact
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } // Return the updated document and validate changes
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated successfully", updatedContact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact, getContacts, deleteContacts, updateContact };
