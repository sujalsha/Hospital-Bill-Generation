import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('/api/patients')
      .then(response => setPatients(response.data))
      .catch(error => console.log(error));
  }, []);

  const deletePatient = (id) => {
    axios.delete(`/api/patients/${id}`)
      .then(() => setPatients(patients.filter(patient => patient.id !== id)))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Patient List</h2>
      <Link to="/add-patient" className="btn btn-primary mb-2">Add New Patient</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.contact}</td>
              <td>
                <Link to={`/edit-patient/${patient.id}`} className="btn btn-warning mr-2">Edit</Link>
                <button onClick={() => deletePatient(patient.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;
