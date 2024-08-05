import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { AuthContext } from './AuthContext';
import { logout } from './api';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const { isAuthenticated, userRole, setIsAuthenticated, setUserRole } = useContext(AuthContext);
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
    logout()
      .then(() => {
        setIsAuthenticated(false);
        setUserRole('');
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout request failed', error);
      });
  };

  const renderNavLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Explore Products</Link></li>
          <li className="wishlist" ref={wishlistRef}>
            <div className="wishlist-icon" onClick={toggleWishlistDropdown}>
              My Wishlist
              <div className={`dropdown-menu ${wishlistOpen ? 'open' : ''}`}>
                <div className="wishlist-message">
                  <p>Save your favorite items! <br/> Track the price of your favorite items!</p>
                  <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
                </div>
              </div>
            </div>
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </>
      );
    }

    if (userRole === 'admin') {
      return (
        <>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Explore Products</Link></li>
          <li><Link to="/admin_dashboard">Dashboard</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/retailers">Retailers</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><button className="btn btn-logout" onClick={handleLogout}>Logout</button></li>
        </>
      );
    } else if (userRole === 'retailer') {
      return (
        <>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Explore Products</Link></li>
          <li><Link to="/retailer_dashboard">Dashboard</Link></li>
          <li><Link to="/my_products">My Products</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/messages">Messages</Link></li>
          <li><button className="btn btn-logout" onClick={handleLogout}>Logout</button></li>
        </>
      );
    } else {
      return (
        <>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Explore Products</Link></li>
          <li className="wishlist" ref={wishlistRef}>
            <div className="wishlist-icon" onClick={toggleWishlistDropdown}>
              My Wishlist
              <div className={`dropdown-menu ${wishlistOpen ? 'open' : ''}`}>
                <div className="wishlist-items">
                  <p>Your wishlist is empty. Start adding your favorite products!</p>
                </div>
              </div>
            </div>
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><button className="btn btn-logout" onClick={handleLogout}>Logout</button></li>
        </>
      );
    }
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="logo">
        <Link to="/">BuyGenius</Link>
      </div>
      <ul className="nav-links">
        {renderNavLinks()}
        <li>
          <ThemeSwitcher isDark={theme === "dark"} onChange={() => toggleTheme()} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
