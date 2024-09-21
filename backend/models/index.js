const sequelize = require('../config/database');
const Patient = require('./patient.model');
const Doctor = require('./doctor.model');
const Bill = require('./bill.model');
const BillItem = require('./billItem.model');

// Associations
Patient.hasMany(Bill, { as: 'bills', foreignKey: 'patientId' });
Doctor.hasMany(Bill, { as: 'bills', foreignKey: 'doctorId' });
Bill.belongsTo(Patient, { as: 'patient', foreignKey: 'patientId' });
Bill.belongsTo(Doctor, { as: 'doctor', foreignKey: 'doctorId' });

Bill.hasMany(BillItem, { as: 'items', foreignKey: 'billId' });
BillItem.belongsTo(Bill, { as: 'bill', foreignKey: 'billId' });

module.exports = {
  sequelize,
  Patient,
  Doctor,
  Bill,
  BillItem
};
