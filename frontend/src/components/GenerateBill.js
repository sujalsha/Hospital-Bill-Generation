import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function GenerateBill() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [billItems, setBillItems] = useState([{ description: '', amount: 0 }]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patients and doctors
    api.get('/patients').then(response => setPatients(response.data));
    api.get('/doctors').then(response => setDoctors(response.data));
  }, []);

  const handleAddBillItem = () => {
    setBillItems([...billItems, { description: '', amount: 0 }]);
  };

  const handleBillItemChange = (index, field, value) => {
    const newBillItems = [...billItems];
    newBillItems[index][field] = value;
    setBillItems(newBillItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bill = {
      patientId: selectedPatient,
      doctorId: selectedDoctor,
      items: billItems,
    };

    api.post('/bills', bill)
      .then(() => navigate('/bills'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Generate Bill</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient</label>
          <select className="form-control" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} required>
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Doctor</label>
          <select className="form-control" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
        </div>
        {billItems.map((item, index) => (
          <div key={index} className="form-group">
            <label>Item Description</label>
            <input type="text" className="form-control" value={item.description} onChange={(e) => handleBillItemChange(index, 'description', e.target.value)} required />
            <label>Amount</label>
            <input type="number" className="form-control" value={item.amount} onChange={(e) => handleBillItemChange(index, 'amount', e.target.value)} required />
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={handleAddBillItem}>Add Item</button>
        <button type="submit" className="btn btn-success">Generate Bill</button>
      </form>
    </div>
  );
}

export default GenerateBill;
