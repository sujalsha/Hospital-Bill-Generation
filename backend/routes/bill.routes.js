const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.controller');

// Bill routes
router.post('/', billController.createBill);
router.get('/', billController.getAllBills);
router.get('/:id', billController.getBillById);
router.delete('/:id', billController.deleteBill);

module.exports = router;
