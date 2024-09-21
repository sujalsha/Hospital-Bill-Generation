import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddDoctor() {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [availability, setAvailability] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctor = { name, specialty, availability };
    axios.post('/api/doctors', doctor)
      .then(() => navigate('/doctors'))
      .catch(error => console.log(error));
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
