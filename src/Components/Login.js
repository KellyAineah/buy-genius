import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Components/api';
import { AuthContext } from './AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, setUserRole, setUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const data = await login({ email, password });
      setLoading(false);

      if (data.id) {
        setIsAuthenticated(true);
        setUserId(data.id);
        setUserRole(data.is_admin ? 'admin' : data.is_retailer ? 'retailer' : 'user');
        navigate('/');
      } else {
        setError(data.error || 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error.message);
      if (error.message.includes('403')) {
        setError('Your retailer account is not approved yet. Please wait for admin approval.');
      } else {
        setError(error.message || 'Failed to connect to the server. Please try again later.');
      }
    }
  };

  return (
    <div className="login-form">
      <h1>BuyGenius</h1>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
