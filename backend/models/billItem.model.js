const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Bill = require('./bill.model');

const BillItem = sequelize.define('BillItem', {
  billId: {
    type: DataTypes.INTEGER,
    references: {
      model: Bill,
      key: 'id',
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = BillItem;
