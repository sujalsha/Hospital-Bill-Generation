const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');  // Import the controller

// Route to get all doctors
router.get('/', doctorController.getAllDoctors);

// Route to add a new doctor
router.post('/', doctorController.addDoctor);

// Route to get a doctor by ID
router.get('/:id', doctorController.getDoctorById);

// Optional: Route to update a doctor
router.put('/:id', doctorController.updateDoctor);

module.exports = router;
