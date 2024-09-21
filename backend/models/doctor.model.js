const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Doctor = sequelize.define('Doctor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Doctors', 
});

module.exports = Doctor;
