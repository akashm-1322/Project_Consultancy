import Department from '../Models/Department.js'; // Import the Department models

const getDepartments = async (req , res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
      } catch (error) {
        res.status(500).json( {error: 'Server Error'} );
      }
}

const addDepartments = async (req, res) => {
    const { name, subNames } = req.body;
  
    if (!name || !subNames || !Array.isArray(subNames)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
  
    try {
      const department = await Department.findOneAndUpdate(
        { name },
        { subNames },
        { new: true, upsert: true }
      );
      res.json(department);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  };

  export default {getDepartments , addDepartments};
  