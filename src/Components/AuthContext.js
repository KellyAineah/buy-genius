import React, { createContext, useState, useEffect } from 'react';
import { checkSession } from './api';

export const AuthContext = createContext();

// AuthProvider component to wrap around your application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(''); // Add user email state
  const [userName, setUserName] = useState(''); // Add user name state
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    checkSession()
      .then(data => {
        if (data.id) {
          setIsAuthenticated(true);
          setUserId(data.id);
          setUserRole(data.is_admin ? 'admin' : data.is_retailer ? 'retailer' : 'user');
          setUserEmail(data.email); // Store email
          setUserName(data.username); // Store username
        } else {
          setIsAuthenticated(false);
          setUserId(null);
          setUserRole('');
          setUserEmail(''); // Clear email
          setUserName(''); // Clear username
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUserId(null);
        setUserRole('');
        setUserEmail(''); // Handle error case by clearing email
        setUserName(''); // Handle error case by clearing username
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        userRole, 
        userId, 
        userEmail, // Provide email in the context
        userName,  // Provide username in the context
        setIsAuthenticated, 
        setUserRole, 
        setUserId, 
        setUserEmail, // Set email function in the context
        setUserName // Set username function in the context
      }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};
