const Bill = require('../models/bill.model');
const BillItem = require('../models/billItem.model');
const Patient = require('../models/patient.model');
const Doctor = require('../models/doctor.model');

// Create a new bill and its associated items
exports.createBill = async (req, res) => {
  try {
    const { patientId, doctorId, items } = req.body;

    // Validate required fields
    if (!patientId || !doctorId || !items.length) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate total amount based on the items
    const totalAmount = items.reduce((acc, item) => acc + parseFloat(item.amount), 0);

    // Create a new bill
    const bill = await Bill.create({ patientId, doctorId, totalAmount });

    // Create bill items
    const billItems = items.map(item => ({ ...item, billId: bill.id }));
    await BillItem.bulkCreate(billItems);

    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the bill' });
  }
};

// Get all bills with patient and doctor details
exports.getAllBills = async (req, res) => {
    try {
      const bills = await Bill.findAll({
        include: [
          { model: Patient, as: 'patient' },
          { model: Doctor, as: 'doctor' }
        ]
      });
      res.json(bills);
    } catch (error) {
      console.error('Error fetching billing history:', error);
      res.status(500).json({ error: 'An error occurred while fetching billing history' });
    }
  };

// Get a single bill by ID
exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findByPk(req.params.id, {
      include: [
        { model: Patient, as: 'patient' },
        { model: Doctor, as: 'doctor' },
        { model: BillItem, as: 'items' }
      ]
    });

    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the bill' });
  }
};

// Delete a bill
exports.deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByPk(req.params.id);
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    await Bill.destroy({ where: { id: req.params.id } });
    await BillItem.destroy({ where: { billId: req.params.id } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the bill' });
  }
};

// Update a bill
exports.getAllBills = async (req, res) => {
  try {
    // Fetch all bills along with associated patient and doctor details
    const bills = await Bill.findAll({
      include: [
        { model: Patient, as: 'patient' },
        { model: Doctor, as: 'doctor' }
      ]
    });
    res.json(bills);
  } catch (error) {
    console.error('Error fetching billing history:', error);
    res.status(500).json({ error: 'An error occurred while fetching billing history' });
  }
};


