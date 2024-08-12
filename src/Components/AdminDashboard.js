import React, { useState, useEffect } from 'react';
import { fetchPendingRetailers, approveRetailer, rejectRetailer } from '../Components/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [retailers, setRetailers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPendingRetailers()
      .then(data => {
        if (Array.isArray(data.retailers)) {
          setRetailers(data.retailers);
        } else {
          setError('Unexpected data format from API');
        }
      })
      .catch(err => setError('Failed to load retailers'));
  }, []);

  const handleApprove = (retailerId) => {
    approveRetailer(retailerId)
      .then(() => {
        setRetailers(retailers.filter(retailer => retailer.id !== retailerId));
      })
      .catch(err => setError('Failed to approve retailer'));
  };

  const handleReject = (retailerId) => {
    rejectRetailer(retailerId)
      .then(() => {
        setRetailers(retailers.filter(retailer => retailer.id !== retailerId));
      })
      .catch(err => setError('Failed to reject retailer'));
  };

  return (
    <div className="admin-dashboard">
      <h2>Pending Retailer Approvals</h2>
      {error && <p className="error">{error}</p>}
      {Array.isArray(retailers) && retailers.length > 0 ? (
        <ul>
          {retailers.map(retailer => (
            <li key={retailer.id}>
              {retailer.name}
              <div>
                <button className="approve" onClick={() => handleApprove(retailer.id)}>Approve</button>
                <button className="reject" onClick={() => handleReject(retailer.id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No retailers found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
