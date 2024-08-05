import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../Components/api.js';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRetailer, setIsRetailer] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    signup({ username, email, password, is_retailer: isRetailer })
      .then(data => {
        if (data.id) {
          if (data.is_retailer) {
            setMessage('Your account has been created. Please wait for admin approval before you can start selling.');
          } else {
            navigate('/login');
          }
        } else {
          setMessage('Signup failed. Please try again.');
        }
      });
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
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
        <label>
          Retailer:
          <input
            type="checkbox"
            checked={isRetailer}
            onChange={(e) => setIsRetailer(e.target.checked)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
