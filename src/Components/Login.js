import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Components/api.js';
import { AuthContext } from './AuthContext';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthenticated, setUserRole, setUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    login({ email, password })
      .then(data => {
        if (data.id) {
          setIsAuthenticated(true);
          setUserId(data.id); // Store the user ID in context
          setUserRole(data.is_admin ? 'admin' : data.is_retailer ? 'retailer' : 'user');
          navigate('/');
        } else {
          setError('Invalid credentials. Redirecting to signup.');
          setTimeout(() => {
            navigate('/signup');
          }, 2000); // Redirect after 2 seconds
        }
      })
      .catch(err => {
        setError('An error occurred. Redirecting to signup.');
        setTimeout(() => {
          navigate('/signup');
        }, 2000); // Redirect after 2 seconds
      });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;