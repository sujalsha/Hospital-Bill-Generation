import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GenerateBill() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [billItems, setBillItems] = useState([{ description: '', amount: 0 }]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/patients')
      .then(response => setPatients(response.data))
      .catch(error => console.log(error));
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
    const bill = { patientId: selectedPatient, items: billItems };
    axios.post('/api/bills', bill)
      .then(() => navigate('/bills'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Generate Bill</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient</label>
          <select className="form-control" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
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
