import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define Admin schema
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
});

// Hash the password before saving
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is new/changed

  try {
    const saltRounds = 10; // Recommended strength
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Create Admin model
const Admin = mongoose.model('Admin', AdminSchema);

// Export the Admin model
export default Admin;
