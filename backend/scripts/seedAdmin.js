const bcrypt = require('bcryptjs');
const Admin = require('../Models/Admin');
const {connectMainDB} = require('../Config/db');

// Array of admin objects to insert
const admins = [
  {
    username: 'ash1322MKV',
    password: 'ash@1322AKMD',
  },
  {
    username: 'Steve2312',
    password: 'Steve@333',
  },
  {
    username: 'J99.vinoth',
    password: '111397@Vj',
  },
];

const seedAdmins = async () => {
  try {
    // Connect to MongoDB
    await connectMainDB();

    // Hash passwords and prepare data for insertion
    const adminsWithHashedPasswords = admins.map((admin) => ({
      username: admin.username,
      password: bcrypt.hashSync(admin.password, 10), // Hash password
    }));

    // Insert admins into the database
    await Admin.insertMany(adminsWithHashedPasswords);
    console.log('Admins inserted successfully');
    process.exit();
  } catch (error) {
    console.error('Error inserting admins:', error);
    process.exit(1);
  }
};

// Call the function to seed the admins
seedAdmins();
