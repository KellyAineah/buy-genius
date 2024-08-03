import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher'
import './Navbar.css';

const Navbar = ({ isAuthenticated, theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const wishlistRef = useRef(null);

  const toggleWishlistDropdown = () => {
    setWishlistOpen(!wishlistOpen);
  };

  const handleClickOutside = (event) => {
    if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
      setWishlistOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="logo">
        <Link to="/">BuyGenius</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Explore Products</Link></li>
        <li className="wishlist" ref={wishlistRef}>
          <div className="wishlist-icon" onClick={toggleWishlistDropdown}>
            My Wishlist
            <div className={`dropdown-menu ${wishlistOpen ? 'open' : ''}`}>
              {!isAuthenticated ? (
                <div className="wishlist-message">
                  <p>Save your favorite items! <br/> Track the price of your favorite items!</p>
                  <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
                </div>
              ) : (
                <div className="wishlist-items">
                  <p>Your wishlist is empty. Start adding your favorite products!</p>
                </div>
              )}
            </div>
          </div>
        </li>
        <li><Link to="/about">About</Link></li>
        
        {!isAuthenticated ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button className="btn btn-logout" onClick={handleLogout}>Logout</button></li>
          </>
        )}
        <li>
          <ThemeSwitcher isDark={theme === "dark"} onChange={() => toggleTheme()} /> {/* Add ThemeSwitcher */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
