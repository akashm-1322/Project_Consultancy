const mongoose = require("mongoose");

// Function to connect to the Main Database
const connectMainDB = async () => {
  try {
    const mainDB = await mongoose.createConnection("mongodb://localhost:27017/adminAdmin");
    console.log("Main database connected successfully");
    return mainDB;
  } catch (err) {
    console.error("Main database connection failed:", err.message);
    process.exit(1); // Exit with failure
  }
};

// Function to connect to the Contacts Database
const connectContactsDB = async () => {
  try {
    const contactsDB = await mongoose.createConnection("mongodb://localhost:27017/adminContacts");
    console.log("Contacts database connected successfully");
    return contactsDB;
  } catch (err) {
    console.error("Contacts database connection failed:", err.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = { connectMainDB, connectContactsDB };
