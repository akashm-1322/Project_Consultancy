const Contact = require('../Models/Contact');

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
  // First, get the total count of documents (this is required for pagination)
  const total = await Contact.countDocuments();

  // Sort all contacts first, then paginate
  const contacts = await Contact.find()
    .sort(sortOptions) // Apply sorting to the entire dataset
    .skip((page - 1) * limit) // Pagination: skip previous pages
    .limit(Number(limit)); // Limit the results based on the current page

  res.json({ contacts, total });
} catch (error) {
  res.status(500).json({ error: error.message });
}

};

const deleteContacts = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createContact, getContacts , deleteContacts};
