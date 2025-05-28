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

  const toggleWishlistDropdown = () => setWishlistOpen(!wishlistOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleClickOutside = (event) => {
    if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
      setWishlistOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.menu-toggle')) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout()
      .then(() => {
        setIsAuthenticated(false);
        setUserRole('');
        navigate('/login');
        closeMenu();
      })
      .catch((err) => console.error('Logout failed:', err));
  };

  const renderNavLinks = () => (
    <>
      <li><NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
      <li><NavLink to="/products" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Explore Products</NavLink></li>
      <li className="wishlist" ref={wishlistRef}>
        <div className="wishlist-icon" onClick={toggleWishlistDropdown}>
          My Wishlist
          <div className={`dropdown-menu ${wishlistOpen ? 'open' : ''}`}>
            <div className="wishlist-message">
              <p>Save your favorite items! <br /> Track price drops!</p>
              <button className="btn btn-primary" onClick={() => { navigate('/login'); closeMenu(); }}>Login</button>
            </div>
          </div>
        </div>
      </li>
      <li><NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
      {!isAuthenticated && (
        <>
          <li><NavLink to="/login" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink></li>
          <li><NavLink to="/signup" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink></li>
        </>
      )}
      {isAuthenticated && (
        <>
          <li><NavLink to="/dashboard" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
          <li><button className="btn-logout" onClick={handleLogout}>Logout</button></li>
        </>
      )}
    </>
  );

  return (
    <nav className={`navbar ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="logo">
        <NavLink to="/" onClick={closeMenu}>MyShop</NavLink>
      </div>
      <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul ref={menuRef} className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {renderNavLinks()}
        <li><ThemeSwitcher theme={theme} toggleTheme={toggleTheme} /></li>
      </ul>
    </nav>
  );
};

export default Navbar;
