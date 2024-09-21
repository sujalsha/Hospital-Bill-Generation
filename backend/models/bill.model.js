const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient.model');
const Doctor = require('./doctor.model');

const Bill = sequelize.define('Bill', {
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    }
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'id'
    }
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
}, {
  timestamps: true,
  tableName: 'Bills'
});

// Define relationships
Bill.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Bill.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

module.exports = Bill;

