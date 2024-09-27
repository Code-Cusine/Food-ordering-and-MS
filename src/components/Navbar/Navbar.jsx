import React, { useContext, useState, useCallback, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/l3.png';
import cartIcon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage'; 
import Register from '../Register/Register';
import { ShopContext } from '../../context/ShopContext';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const [showLoginOptions, setShowLoginOptions] = useState(false); // For displaying login options
  const [isLoginTriggered, setIsLoginTriggered] = useState(false); // To handle actual login trigger
  const [showAdminPasswordInput, setShowAdminPasswordInput] = useState(false); // For admin password input
  const [adminPassword, setAdminPassword] = useState(''); // For storing admin password

  const openLoginPage = () => {
    setShowLoginOptions(true); // Display login options overlay
  };

  const closeOverlay = () => {
    setIsLoginPageOpen(false);
    setShowAdminPasswordInput(false);
    setShowLoginOptions(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Set logged in state if user is authenticated
  }, [isLoggedIn]);

  const handleProfileClick = useCallback(() => {
    setShowLogoutOverlay(true);
  }, []);

  const handleCancel = () => {
    setShowLogoutOverlay(false);
  };

  const handleOverlayClick = (e) => {
    e.stopPropagation();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu open/close
  };

  useEffect(() => {
    setShowLogoutOverlay(false);
  }, [isLoggedIn]);

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    setIsMobileMenuOpen(false); // Close mobile menu when an item is clicked
  };

  const handleLoginOptionClick = (loginType) => {
    setShowLoginOptions(false); // Close the login options overlay
    if (loginType === 'admin') {
      // Show admin password input
      setShowAdminPasswordInput(true);
    } else if (loginType === 'user') {
      // Trigger user login
      setIsLoginTriggered(true); // Set login trigger
      setIsLoginPageOpen(true); // Open the user login page or handle Google sign-in
    }
  };

  // Handle login process after the user has selected login as user
  useEffect(() => {
    if (isLoginTriggered) {
      // Call Google login or your custom login method here
      // Example: handleGoogleLogin();
      console.log('User login triggered');
    }
  }, [isLoginTriggered]);

  const handleAdminPasswordSubmit = () => {
    // Replace with actual admin password validation logic
    const correctPassword = 'admin123'; // Example password, replace with secure validation
    if (adminPassword === correctPassword) {
      console.log('Admin login successful');
      setIsLoggedIn(true); // Set logged in state
      setShowAdminPasswordInput(false); // Close admin password input
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Cuisine Code Logo" />
        <p>Cuisine Code</p>
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />} {/* Toggle between hamburger and close icon */}
      </div>
      <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <li onClick={() => handleMenuClick("shop")} className={activeMenu === "shop" ? "active" : ""}>
          <Link style={{ textDecoration: 'none' }} to='/'>Bestseller</Link>
          {activeMenu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("men")} className={activeMenu === "men" ? "active" : ""}>
          <Link style={{ textDecoration: 'none' }} to='/mens'>Drinks</Link>
          {activeMenu === "men" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("women")} className={activeMenu === "women" ? "active" : ""}>
          <Link style={{ textDecoration: 'none' }} to='/womens'>Food</Link>
          {activeMenu === "women" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("merchandise")} className={activeMenu === "merchandise" ? "active" : ""}>
          <Link style={{ textDecoration: 'none' }} to='/kids'>Merchandise</Link>
          {activeMenu === "merchandise" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("coffeeHome")} className={activeMenu === "coffeeHome" ? "active" : ""}>
          <Link style={{ textDecoration: 'none' }} to='/kids'>Coffee at Home</Link>
          {activeMenu === "coffeeHome" ? <hr /> : null}
        </li>
        <li onClick={() => handleMenuClick("readyToEat")} className={activeMenu === "readyToEat" ? "active" : ""}>
          <Link style={{ textDecoration: 'none' }} to='/kids'>Ready to Eat</Link>
          {activeMenu === "readyToEat" ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <div className="profile-wrapper">
            <FaUser onClick={handleProfileClick} />
            {showLogoutOverlay && (
              <div className="logout-overlay" onClick={handleCancel}>
                <div className="logout-content" onClick={e => e.stopPropagation()}>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={openLoginPage}>Login</button>  
        )}
        <Link to='/cart'>
          <img src={cartIcon} alt="Cart" />
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </Link>
      </div>

      {showLoginOptions && (
        <div className="login-options-overlay" onClick={() => setShowLoginOptions(false)}>
          <div className="login-options-content" onClick={handleOverlayClick}>
          <FaTimes className="close-icon" onClick={closeOverlay} style={{ cursor: 'pointer', position: 'absolute', top: '275px', right: '620px' }} />
            <button onClick={() => handleLoginOptionClick('admin')}>Login as Admin</button>
            <button onClick={() => handleLoginOptionClick('user')}>Login as User</button>
          </div>
        </div>
      )}

      {showAdminPasswordInput && (
        <div className="admin-password-overlay" onClick={closeOverlay}>
          <div className="admin-password-content" onClick={handleOverlayClick}>
          <FaTimes className="close-icon1" onClick={closeOverlay} style={{ cursor: 'pointer', position: 'absolute', top: '250px', right: '570px' }} />
            <h3>Please enter admin password</h3>
            <input 
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Admin Password"
              className="password-input"
            />
            <button onClick={handleAdminPasswordSubmit}>Submit</button>
          </div>
        </div>
      )}

      {isLoginPageOpen && (
        <LoginPage onClose={closeOverlay} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default Navbar;
