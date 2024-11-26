const Admin = require('../Models/Admin');

// Create Admin
const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error: error.message });
  }
};

// Get Admins
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
};

module.exports = { createAdmin, getAdmins };
