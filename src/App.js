import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Products from './Components/Products';
import About from './Components/About';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import useTheme from './Components/UseTheme';
import './Theme.css';
import './App.css';

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Router>
      <div className={`app ${theme}`}>
        <Header />
        <Navbar isAuthenticated={false} toggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
