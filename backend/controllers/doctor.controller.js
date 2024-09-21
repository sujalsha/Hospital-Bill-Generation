const Doctor = require('../models/doctor.model');

// Add Doctor Function
exports.addDoctor = async (req, res) => {
  try {
    const { name, specialty, availability } = req.body;

    if (!name || !specialty || !availability) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new doctor entry in the Doctors table
    const newDoctor = await Doctor.create({ name, specialty, availability });
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ error: 'An error occurred while adding the doctor' });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'An error occurred while fetching doctors' });
  }
};

// Get a doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the doctor' });
  }
};

// Update a doctor (if you have this feature)
exports.updateDoctor = async (req, res) => {
  try {
    const { name, specialty, availability } = req.body;
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Update doctor information
    doctor.name = name;
    doctor.specialty = specialty;
    doctor.availability = availability;

    await doctor.save();
    res.json(doctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ error: 'An error occurred while updating the doctor' });
  }
};
