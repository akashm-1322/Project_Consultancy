const mongoose = require('mongoose');
const Department = require('../Models/Department'); // Adjust the path to your schema file

// Connection string to your MongoDB
const {connectMainDB} = require('../Config/db')

// Sample data
const departmentData = [
  { name: "Construction Works", subNames: "Labourer" },
  { name: "Construction Works", subNames: "Supervisor" },
  { name: "Construction Works", subNames: "Fork Lift Operator" },
];

  async function insertDepartments() {
    try {
      await connectMainDB();
      await Department.insertMany(departmentData);  // Insert all comments
      console.log('Department Data inserted successfully!');
    } catch (error) {
      console.error('Error inserting Department:', error);
    } finally {
      mongoose.connection.close();
    }
  }
  
  insertDepartments();