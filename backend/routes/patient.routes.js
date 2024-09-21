const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');

router.get('/', patientController.getAllPatients);
router.post('/', patientController.addPatient);
router.delete('/:id', patientController.deletePatient);
router.get('/:id', patientController.getPatientById);


module.exports = router;
