import React, { useEffect, useState } from 'react';
import api from '../services/api';  
import '../styles/BillList.css';

function BillList() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    api.get('/bills')
      .then(response => {
        console.log('Fetched bills:', response.data);  // Log to check if data is fetched
        setBills(response.data);
      })
      .catch(error => {
        console.error('Error fetching billing history:', error);
      });
  }, []);

  return (
    <div className="bill-list">
      <h2>Billing History</h2>
      {bills.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Total Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bills.map(bill => (
              <tr key={bill.id}>
                <td>{bill.patient.name}</td>
                <td>{bill.doctor.name}</td>
                <td>${bill.totalAmount}</td>
                <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No billing history found.</p>
      )}
    </div>
  );
}

export default BillList;
