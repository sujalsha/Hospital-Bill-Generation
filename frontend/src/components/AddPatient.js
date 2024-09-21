import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPatient() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = { name, age, contact };
    axios.post('/api/patients', patient)
      .then(() => navigate('/patients'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Add Patient</button>
      </form>
    </div>
  );
}

export default AddPatient;
