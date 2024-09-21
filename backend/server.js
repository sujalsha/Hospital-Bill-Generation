const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const billRoutes = require('./routes/bill.routes');

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/bills', billRoutes);

// Connect to the database and start the server
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});
