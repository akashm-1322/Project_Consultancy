import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

// Load environment variables from .env
dotenv.config();

// Get the current directory from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
import adminRoutes from './Routes/AdminRoutes.js';
import commentRoutes from './Routes/CommentRoutes.js';
import contactRoutes from './Routes/ContactRoutes.js';
import countryRoutes from './Routes/CountryRoutes.js';
import fieldRoutes from './Routes/FieldRoutes.js';
import deptRoutes from './Routes/DepartmentRoutes.js';

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/field', fieldRoutes);
app.use('/api/department', deptRoutes);

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
