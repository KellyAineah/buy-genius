import React, { createContext, useState, useEffect } from 'react';
import { checkSession, logout } from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userWhatsapp, setUserWhatsapp] = useState(''); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession()
      .then(data => {
        if (data.id) {
          setIsAuthenticated(true);
          setUserId(data.id);
          setUserRole(data.is_admin ? 'admin' : data.is_retailer ? 'retailer' : 'user');
          setUserEmail(data.email);
          setUserName(data.username);
          if (data.is_retailer) {
            setUserWhatsapp(data.whatsapp_number); 
          }
        } else {
          resetAuthState();
        }
      })
      .catch(() => {
        resetAuthState();
      })
      .finally(() => setLoading(false));
  }, []);

  const resetAuthState = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserRole('');
    setUserEmail('');
    setUserName('');
    setUserWhatsapp(''); 
  };

  const handleLogout = () => {
    logout().then(() => {
      resetAuthState();
      window.location.href = '/login';
    }).catch(() => {
      resetAuthState();
      window.location.href = '/login';
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        userRole, 
        userId, 
        userEmail, 
        userName, 
        userWhatsapp, 
        setIsAuthenticated, 
        setUserRole, 
        setUserId, 
        setUserEmail, 
        setUserName, 
        setUserWhatsapp, 
        handleLogout 
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
