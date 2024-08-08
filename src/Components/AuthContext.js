import React, { createContext, useState, useEffect } from 'react';
import { checkSession } from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    checkSession()
      .then(data => {
        if (data.id) {
          setIsAuthenticated(true);
          setUserRole(data.is_admin ? 'admin' : data.is_retailer ? 'retailer' : 'user');
        } else {
          setIsAuthenticated(false);
          setUserRole('');
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, setIsAuthenticated, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};