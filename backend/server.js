const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define a Mongoose schema and model
const certificationSchema = new mongoose.Schema({
  title: String,
  logo: String,
});

const Certification = mongoose.model('Certification', certificationSchema);

// Routes
app.get('/api/certifications', async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/certifications', async (req, res) => {
  const { title, logo } = req.body;
  const certification = new Certification({ title, logo });

  try {
    await certification.save();
    res.status(201).json(certification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
