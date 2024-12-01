const mongoose = require('mongoose');
require('dotenv').config();

const connectMainDB = async () => {
  try {
    const mainDBUri = process.env.MAIN_DB_URI;
    console.log('Connecting to Main DB:', mainDBUri);
    await mongoose.connect(mainDBUri, {
    });
    console.log('Connected to Main DB');
  } catch (err) {
    console.error('Error connecting to Main DB:', err.message);
  }
};


module.exports = { connectMainDB };
