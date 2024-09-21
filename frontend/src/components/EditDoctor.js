import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function EditDoctor() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [availability, setAvailability] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/doctors/${id}`)
      .then(response => {
        setName(response.data.name);
        setSpecialty(response.data.specialty);
        setAvailability(response.data.availability);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedDoctor = { name, specialty, availability };

    api.put(`/doctors/${id}`, updatedDoctor)
      .then(() => navigate('/doctors'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Edit Doctor</h2>
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
        <button type="submit" className="btn btn-success">Update Doctor</button>
      </form>
    </div>
  );
}

export default EditDoctor;
