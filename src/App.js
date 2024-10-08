import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Products from './Components/Products';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import AdminDashboard from './Components/AdminDashboard';
import MyProducts from './Components/MyProducts';
import Wishlist from './Components/Wishlist';  
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { AuthProvider } from './Components/AuthContext';
import Users from './Components/Users';
import useTheme from './Components/UseTheme';
import SearchHistory from './Components/SearchHistory';
import './Theme.css';
import './App.css';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <AuthProvider>
      <Router>
        <div className={`app ${theme}`}>
          <Header />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<div className="homepage-wrapper"><HomePage /></div>}/>
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin_dashboard" element={<AdminDashboard />} />
              <Route path="/my_products" element={<MyProducts />} />
              <Route path="/users" element={<Users />} />
              <Route path="/search_history" element={<SearchHistory />} />
              <Route path="/wishlist" element={<Wishlist />} />  
            </Routes>
          </div>
          <Footer theme={theme} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
