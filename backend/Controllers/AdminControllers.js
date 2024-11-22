const Admin = require('../Models/Admin');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });
    if (admin.password !== password) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET_KEY, { expiresIn: '100h' });

    res.json({ message: 'Login successful', admin, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
