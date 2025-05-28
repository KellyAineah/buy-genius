import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { AuthContext } from './AuthContext';
import { logout } from './api';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const { isAuthenticated, userRole, setIsAuthenticated, setUserRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const wishlistRef = useRef(null);
  const menuRef = useRef(null);

  const toggleWishlistDropdown = () => {
    setWishlistOpen(!wishlistOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
      setWishlistOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.classList.contains('menu-toggle')) {
      setMenuOpen(false);
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
        setMenuOpen(false);
      })
      .catch(error => {
        console.error('Logout request failed', error);
      });
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const renderNavLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Explore Products</NavLink></li>
          <li className="wishlist" ref={wishlistRef}>
            <div className="wishlist-icon" onClick={toggleWishlistDropdown}>
              My Wishlist
              <div className={`dropdown-menu ${wishlistOpen ? 'open' : ''}`}>
                <div className="wishlist-message">
                  <p>Save your favorite items! <br /> Track the price of your favorite items!</p>
                  <button className="btn btn-primary" onClick={() => {
                    navigate('/login');
                    closeMenu();
                  }}>Login</button>
                </div>
              </div>
            </div>
          </li>
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Login</NavLink></li>
          <li><NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Sign Up</NavLink></li>
        </>
      );
    }

    if (userRole === 'admin') {
      return (
        <>
          <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Explore Products</NavLink></li>
          <li><NavLink to="/admin_dashboard" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Retailers</NavLink></li>
          <li><NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Users</NavLink></li>
          <li><NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Profile</NavLink></li>
          <li><button className="btn btn-logout" onClick={handleLogout}>Logout</button></li>
        </>
      );
    } else if (userRole === 'retailer') {
      return (
        <>
          <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Explore Products</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/my_products" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>My Products</NavLink></li>
          <li><NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Retailer Profile</NavLink></li>
          <li><button className="btn btn-logout" onClick={handleLogout}>Logout</button></li>
        </>
      );
    } else {
      return (
        <>
          <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Explore Products</NavLink></li>
          <li><NavLink to="/wishlist" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>♡ My Wishlist</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/search_history" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>User History</NavLink></li>
          <li><NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Profile</NavLink></li>
          <li><button className="btn btn-logout" onClick={handleLogout}>Logout</button></li>
        </>
      );
    }
  };

  return (
    <nav className={`navbar ${theme}`} ref={menuRef}>
      <div className="logo">
        <NavLink to="/" onClick={closeMenu}>BuyGenius</NavLink>
      </div>
      <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {renderNavLinks()}
        <li>
          <ThemeSwitcher isDark={theme === "dark"} onChange={() => toggleTheme()} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;