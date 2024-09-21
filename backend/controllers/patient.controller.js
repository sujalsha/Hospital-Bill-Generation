const Patient = require('../models/patient.model');

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).send('Error retrieving patients');
  }
};

exports.addPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.json(patient);
  } catch (error) {
    res.status(500).send('Error adding patient');
  }
};

exports.deletePatient = async (req, res) => {
  try {
    await Patient.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting patient');
  }
};

exports.getPatientById = async (req, res) => {
    try {
      const patient = await Patient.findByPk(req.params.id);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json(patient);
    } catch (error) {
      res.status(500).send('Error retrieving patient');
    }
  };
