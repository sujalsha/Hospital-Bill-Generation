import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/DoctorList.css';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from the backend API
  useEffect(() => {
    api.get('/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Doctor List</h2>
      <Link to="/add-doctor" className="btn btn-primary mb-2">Add New Doctor</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>{doctor.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorList;
