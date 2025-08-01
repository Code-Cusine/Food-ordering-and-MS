import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/l3.png';
import cartIcon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <img src={logo} alt="FoodieHub Logo" />
        <span className="brand-text">FoodieHub</span>
      </div>
      
      <button 
        className="hamburger" 
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <li onClick={() => handleMenuClick("shop")} className={activeMenu === "shop" ? "active" : ""}>
          <Link to='/' aria-label="Home">
            <span className="menu-icon">🏠</span>
            <span className="menu-text">Home</span>
          </Link>
        </li>
        <li onClick={() => handleMenuClick("drink")} className={activeMenu === "drink" ? "active" : ""}>
          <Link to='/drinks' aria-label="Drinks">
            <span className="menu-icon">🥤</span>
            <span className="menu-text">Drinks</span>
          </Link>
        </li>
        <li onClick={() => handleMenuClick("food")} className={activeMenu === "food" ? "active" : ""}>
          <Link to='/foods' aria-label="Food">
            <span className="menu-icon">🍽️</span>
            <span className="menu-text">Food</span>
          </Link>
        </li>
        <li onClick={() => handleMenuClick("aboutus")} className={activeMenu === "aboutus" ? "active" : ""}>
          <Link to='/aboutus' aria-label="About Us">
            <span className="menu-icon">ℹ️</span>
            <span className="menu-text">About Us</span>
          </Link>
        </li>
      </ul>
      
      <div className="nav-login-cart">
        <ThemeToggle />
        <Link to='/cart' className="nav-cart-icon" aria-label={`Shopping cart with ${getTotalCartItems()} items`}>
          <img src={cartIcon} alt="Shopping Cart" />
          {getTotalCartItems() > 0 && (
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
