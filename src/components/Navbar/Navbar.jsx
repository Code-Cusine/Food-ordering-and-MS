import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../assets/l3.png';
import cartIcon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios'; // For making API calls to the backend
import { ShopContext } from '../../context/ShopContext';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  /*
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  /*
  const [showLoginOptions, setShowLoginOptions] = useState(false); // For displaying login options
  const [isRegistering, setIsRegistering] = useState(false); // Toggle for forms
  const [showFormOverlay, setShowFormOverlay] = useState(false); // Show/Hide Form Overlay

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  */

  /*
  const openLoginPage = () => {
    setShowLoginOptions(true); // Display login options overlay
  };

  const closeOverlay = () => {
    setShowLoginOptions(false);
    setShowFormOverlay(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  */

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    setIsMobileMenuOpen(false); // Close mobile menu when an item is clicked
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu open/close
  };

  /*
  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      alert(response.data.message); // Show success message
      setIsLoggedIn(true); // Set logged in state
      closeOverlay();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); // Show error message
      } else {
        alert('An unexpected error occurred.'); // Handle unexpected errors
      }
    }
  };

  const handleRegisterSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, email, password });
      alert(response.data.message); // Show success message
      closeOverlay();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); // Show error message
      } else {
        alert('An unexpected error occurred.'); // Handle unexpected errors
      }
    }
  };

  const handleAdminLogin = () => {
    // Redirect or show admin login form
    alert("Redirecting to Admin Login Page..."); // Replace with actual redirection logic
    // For example: window.location.href = '/admin/login'; or set another state to display admin login form
  };
  */
  
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Cuisine Code Logo" />
         
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />} {/* Toggle between hamburger and close icon */}
      </div>
      <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <li onClick={() => handleMenuClick("shop")} className={activeMenu === "shop" ? "active" : ""}>
          <Link style={{ textDecoration: 'none' }} to='/'>Bestseller</Link>
          {activeMenu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("drink")} className={activeMenu === "drink" ? "active" : ""}>
          <Link style={{ textDecoration: 'none' }} to='/drinks'>Drinks</Link>
          {activeMenu === "drink" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("food")} className={activeMenu === "food" ? "active" : ""}>
          <Link style={{ textDecoration: 'none' }} to='/foods'>Food</Link>
          {activeMenu === "food" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("merchandise")} className={activeMenu === "aboutus" ? "active" : ""}>
          <Link style={{ textDecoration: 'none' }} to='/aboutus'>About Us</Link>
          {activeMenu === "aboutus" ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
        {/* Commented out login logic */}
        {/* 
        {isLoggedIn ? (
          <div className="profile-wrapper">
            <FaUser onClick={() => setShowLogoutOverlay(true)} />
            {showLogoutOverlay && (
              <div className="logout-overlay" onClick={closeOverlay}>
                <div className="logout-content" onClick={e => e.stopPropagation()}>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={openLoginPage}></button>
        )}
        */}
        
        <Link to='/cart'>
          <img src={cartIcon} alt="Cart" />
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </Link>
      </div>

      {/* 
      {showLoginOptions && (
        <div className="login-options-overlay" onClick={closeOverlay}>
          <div className="login-options-content" onClick={e => e.stopPropagation()}>
            <FaTimes className="close-icon" onClick={closeOverlay} style={{ cursor: 'pointer', top: '-20px', right:'-185px' }} />
            <button onClick={handleAdminLogin} style={{background:'#FF8C00' }}>Login as Admin</button> 
            <button onClick={() => { setIsRegistering(false); setShowFormOverlay(true); setShowLoginOptions(false); }} style={{background:'#3EB489' }}>Login as Existing User</button>
            <button onClick={() => { setIsRegistering(true); setShowFormOverlay(true); setShowLoginOptions(false); } } style={{background:'#007BFF' }}>Register as New User</button>
            
          </div>
        </div>
      )}

      {showFormOverlay && (
        <div className="login-form-overlay" onClick={closeOverlay}>
          <div className="login-form-content" onClick={e => e.stopPropagation()}>
            <FaTimes className="close-icon" onClick={closeOverlay} style={{ cursor: 'pointer', right : '-350px', top:'-10px' }} />
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            {isRegistering && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isRegistering ? (
              <button onClick={handleRegisterSubmit}>Register</button>
            ) : (
              <button onClick={handleLoginSubmit}>Login</button>
            )}
          </div>
        </div>
      )}
      */}
    </div>
  );
};

export default Navbar;
