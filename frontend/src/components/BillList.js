import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BillList() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get('/api/bills')
      .then(response => setBills(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Billing History</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill.id}>
              <td>{bill.patientName}</td>
              <td>${bill.totalAmount}</td>
              <td>
                <button className="btn btn-info">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillList;
