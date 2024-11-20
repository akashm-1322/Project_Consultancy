// ContactRoutes.js
const express = require("express");
const router = express.Router();

module.exports = (Contact) => {
  // Get all contacts
  router.get("/", async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Add a new contact
  router.post("/", async (req, res) => {
    const { name, phone, email, type, destination, message , dateofjoining} = req.body;

    try {
      const newContact = new Contact({ name, phone, email, type, destination, message , dateofjoining});
      await newContact.save();
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ error: "Failed to create contact" });
    }
  });

  // Update a contact
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, phone, email, type, destination, message , dateofjoining} = req.body;

    try {
      const updatedContact = await Contact.findByIdAndUpdate(
        id,
        { name, phone, email, type, destination, message ,dateofjoining},
        { new: true }
      );
      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(500).json({ error: "Failed to update contact" });
    }
  });

  // Delete a contact
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      await Contact.findByIdAndDelete(id);
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });

  return router;
};
