const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

// Load environment variables from .env
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Connect to MongoDB (Main DB)
mongoose
  .connect(process.env.MAIN_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the main database!'))
  .catch((err) => console.error('Error connecting to database', err));

// Import Routes
const adminRoutes = require('./Routes/AdminRoutes');
const commentRoutes = require('./Routes/CommentRoutes');
const contactRoutes = require('./Routes/ContactRoutes');
const countryRoutes = require('./Routes/CountryRoutes');
const fieldRoutes = require('./Routes/FieldRoutes');

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/field', fieldRoutes);

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads', // Directory where files will be stored
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename file with timestamp to avoid conflicts
  },
});

const upload = multer({ storage });


// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// React routing, return index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
