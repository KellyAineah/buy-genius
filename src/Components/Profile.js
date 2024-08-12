import React, { useState, useEffect, useContext } from 'react';
import { fetchUserProfile } from '../Components/api.js';
import { AuthContext } from './AuthContext';
//import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    role: '',
    image_url: ''
  });
  const [error, setError] = useState('');
  const { isAuthenticated, userId } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      setError('User is not authenticated or user ID is not available.');
      return;
    }

    const fetchData = async () => {
      try {
        console.log('Fetching user profile for ID:', userId); 
        const data = await fetchUserProfile(userId);
        console.log('User profile data:', data); 
        setUser({
          email: data.email || '',
          username: data.username || '',
          role: data.is_admin ? 'Admin' : data.is_retailer ? 'Retailer' : 'User',
          image_url: data.image_url || ''
        });
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setError('Failed to load profile data.');
      }
    };

    fetchData();
  }, [isAuthenticated, userId]);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  return (
    <div className="profile-card">
      <h2>Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user.username ? (
        <div className="profile-info">
          <div className="profile-image">
            {user.image_url ? (
              <img src={user.image_url} alt={`${user.username}'s profile`} />
            ) : (
              <div className="placeholder-image">
                {getInitial(user.username)}
              </div>
            )}
          </div>
          <h3>Welcome, {user.username}!</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default Profile;

