import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AddDoctor() {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [availability, setAvailability] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure all fields are present
    if (!name || !specialty || !availability) {
      alert('All fields are required');
      return;
    }

    const newDoctor = { name, specialty, availability };

    // Post the data to the backend API
    api.post('/doctors', newDoctor)
    .then(() => navigate('/doctors'))
    .catch(error => {
      console.log('Error:', error.response ? error.response.data : error.message);
      alert('Failed to add doctor');
    });
  };

  return (
    <div>
      <h2>Add New Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Specialty</label>
          <input type="text" className="form-control" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Availability</label>
          <input type="text" className="form-control" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Add Doctor</button>
      </form>
    </div>
  );
}

export default AddDoctor;
