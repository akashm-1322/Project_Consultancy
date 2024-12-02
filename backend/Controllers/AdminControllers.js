import Admin from '../Models/Admin.js';
import bcrypt from 'bcrypt';

// Create Admin
const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create new admin
    const admin = new Admin({ username, password }); // Password will be hashed automatically
    await admin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error: error.message });
  }
};

// Login Admin
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin with the given username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful', username: admin.username });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

// Get Admins (Optional: Add authorization to limit access)
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, { password: 0 }); // Exclude passwords
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
};

export default {createAdmin, loginAdmin, getAdmins };
