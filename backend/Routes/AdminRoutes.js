// AdminRoutes.js
const express = require("express");
const router = express.Router();

module.exports = (Admin) => {
  // Admin login
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isMatch = admin.password === password;
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.status(200).json({ message: "Login successful", admin });
    } catch (err) {
      res.status(500).json({ message: "Error connecting to the database", error: err });
    }
  });

  return router;
};
