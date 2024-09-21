import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function EditPatient() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  // Fetch the patient data when the component mounts
  useEffect(() => {
    api.get(`/patients/${id}`)
      .then(response => {
        setName(response.data.name);
        setAge(response.data.age);
        setContact(response.data.contact);
      })
      .catch(error => console.log(error));
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPatient = { name, age, contact };

    api.put(`/patients/${id}`, updatedPatient)
      .then(() => navigate('/patients'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Edit Patient</h2>
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
        <button type="submit" className="btn btn-success">Update Patient</button>
      </form>
    </div>
  );
}

export default EditPatient;
