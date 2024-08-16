import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import './Profile.css';

const Profile = () => {
  const { isAuthenticated, userEmail, userName, userRole, userWhatsapp } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <p style={{ color: 'red' }}>User is not authenticated.</p>;
  }

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  return (
    <div className="profile-card">
      <h2>User Profile</h2>
      <div className="profile-info">
        <div className="profile-image">
          <div className="placeholder-image">
            {getInitial(userName)}
          </div>
        </div>
        <p><strong>Email:</strong> {userEmail}</p>
        <p><strong>Username:</strong> {userName}</p>
        <p><strong>Role:</strong> {userRole}</p>
        {userRole === 'retailer' && userWhatsapp && (
          <p><strong>WhatsApp:</strong> {userWhatsapp}</p> 
        )}
      </div>
    </div>
  );
};

export default Profile;
