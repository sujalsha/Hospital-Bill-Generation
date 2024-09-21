import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import EditPatient from './components/EditPatient';
import DoctorList from './components/DoctorList';
import AddDoctor from './components/AddDoctor';
import BillList from './components/BillList';
import GenerateBill from './components/GenerateBill';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="text-center my-4">Hospital Billing System</h1>
        
        {/* Add a navigation bar */}
        <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" to="/patients">Patient List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-patient">Add Patient</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/doctors">Doctor List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-doctor">Add Doctor</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bills">Billing History</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/generate-bill">Generate Bill</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/patients" element={<PatientList />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/edit-patient/:id" element={<EditPatient />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/bills" element={<BillList />} />
          <Route path="/generate-bill" element={<GenerateBill />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
