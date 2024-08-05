import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../Components/api.js';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRetailer, setIsRetailer] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
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
          {errors.username && <p className="error">{errors.username}</p>}
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
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
