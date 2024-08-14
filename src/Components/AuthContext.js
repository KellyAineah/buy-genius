import React, { createContext, useState, useEffect } from 'react';
import { checkSession } from './api';

export const AuthContext = createContext();

// AuthProvider component to wrap around your application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession()
      .then(data => {
        if (data.id) {
          setIsAuthenticated(true);
          setUserId(data.id);
          setUserRole(data.is_admin ? 'admin' : data.is_retailer ? 'retailer' : 'user');
        } else {
          setIsAuthenticated(false);
          setUserId(null);
          setUserRole('');
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUserId(null);
        setUserRole('');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userId, setIsAuthenticated, setUserRole, setUserId }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};
