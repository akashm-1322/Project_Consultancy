// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to databases and initialize models
let MainDB, ContactsDB, Admin, Contact;

(async () => {
  try {
    // Create separate connections for MainDB and ContactsDB
    MainDB = mongoose.createConnection(process.env.MONGO_URI_MAIN);
    ContactsDB = mongoose.createConnection(process.env.MONGO_URI_CONTACTS);

    // Initialize models using the separate connections
    const AdminSchema = require("./Models/Admin");
    const ContactSchema = require("./Models/Contact");

    Admin = MainDB.model("Admin", AdminSchema);
    Contact = ContactsDB.model("Contact", ContactSchema);

    // Create an initial admin if none exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await createAdmin("admin@example.com", "adminPassword123"); // Create the first admin
      console.log("Initial Admin created");
    }

    // Initialize routes and pass models to them
    const adminRoutes = require("./Routes/AdminRoutes")(Admin); // Pass Admin model
    const contactRoutes = require("./Routes/ContactRoutes")(Contact); // Pass Contact model

    // API routes for admin and contacts
    app.use("/admin", adminRoutes);
    app.use("/contacts", contactRoutes);

    console.log("Routes initialized successfully");
  } catch (error) {
    console.error("Error initializing routes:", error);
    process.exit(1); // Exit if DB connection or route initialization fails
  }
})();

let Comment;

(async () => {
  try {
    // Add the Comment schema to the MainDB connection
    const CommentSchema = require('./Models/Comment');
    Comment = MainDB.model('Comment', CommentSchema);

    // Initialize routes
    const commentRoutes = require('./Routes/CommentRoutes')(Comment); // Pass Comment model

    app.use('/comments', commentRoutes);
  } catch (error) {
    console.error('Error setting up comments:', error);
    process.exit(1);
  }
})();


// Route to fetch all contacts (fallback check)
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

// Admin login route
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "100h" }
    );

    return res.json({ message: "Login successful", admin, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Function to create an admin (if no admin exists)
async function createAdmin(username, password) {
  const admin = new Admin({
    username: username,
    password: password, // Store the password as plain text (consider hashing in a production app)
  });

  await admin.save();
}

// Serve static frontend files
const frontendPath = path.join(__dirname, "../frontend/build"); // Adjust path to your React build
app.use(express.static(frontendPath));

// Serve React frontend for any route not handled by API routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
