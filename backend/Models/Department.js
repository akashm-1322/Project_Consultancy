import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subNames: { type: String, required: true },
});

const Department =  mongoose.model('Department', DepartmentSchema);
export default Department;
