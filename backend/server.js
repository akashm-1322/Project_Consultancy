const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('combined')); // For logging

// Database connection
mongoose.connect(process.env.MONGO_URI_MAIN, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Load routes
const adminRoutes = require('./Routes/AdminRoutes');
const commentRoutes = require('./Routes/CommentRoutes');
const contactRoutes = require('./Routes/ContactRoutes');
const countryRoutes = require('./Routes/CountryRoutes');
const fieldRoutes = require('./Routes/FieldRoutes');

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/fields', fieldRoutes);

// Correct frontend path
const frontendPath = path.join(__dirname, '../frontend/build'); // Adjust to go one level up to 'Project_Consultancy/frontend/build'

// Serve static files from the frontend build folder
app.use(express.static(frontendPath));

// Handle all other routes by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'index.html'));
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
