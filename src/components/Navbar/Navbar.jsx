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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const [isUpdateOverlayOpen, setIsUpdateOverlayOpen] = useState(false); // State for the Update overlay

  // Fields for the item form
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [itemCategory, setItemCategory] = useState('Veg');
  const [itemPrice, setItemPrice] = useState('');

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    setIsMobileMenuOpen(false); // Close mobile menu when an item is clicked
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu open/close
  };

  const openUpdateOverlay = () => {
    setIsUpdateOverlayOpen(true);
  };

  const closeUpdateOverlay = () => {
    setIsUpdateOverlayOpen(false);
    resetFormFields();
  };

  const resetFormFields = () => {
    setItemName('');
    setItemDescription('');
    setItemImage(null);
    setItemCategory('Veg');
    setItemPrice('');
  };

  {/*const handleUpdateItem = () => {
    // Logic to handle the "Update Item" action (e.g., making an API call to update the item)
    console.log("Updating item with data:", {
      itemName,
      itemDescription,
      itemImage,
      itemCategory,
      itemPrice,
    });
    // Here, you can add an API call to save the updated item
    closeUpdateOverlay(); // Close the overlay after updating
  };*/}

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
        <li onClick={() => handleMenuClick("aboutus")} className={activeMenu === "aboutus" ? "active" : ""}>
          <Link style={{ textDecoration: 'none' }} to='/aboutus'>About Us</Link>
          {activeMenu === "aboutus" ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
       {/* <button onClick={openUpdateOverlay} className="update-menu-button">Update Menu Items</button>*/}
        
        <Link to='/cart'>
          <img src={cartIcon} alt="Cart" />
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </Link>
      </div>

      {/*{isUpdateOverlayOpen && (
        <div className="update-overlay" onClick={closeUpdateOverlay}>
          <div className="update-overlay-content" onClick={(e) => e.stopPropagation()}>
            <h2>Update Menu Item</h2>
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            <textarea
              placeholder="Item Description (Optional)"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            ></textarea>
            <input
              type="file"
              onChange={(e) => setItemImage(e.target.files[0])}
            />
            <select
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Drinks">Drinks</option>
            </select>
            <input
              type="number"
              placeholder="Item Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
            />
            <div className="overlay-buttons">
              <button onClick={handleUpdateItem}>Update Item</button>
              <button onClick={closeUpdateOverlay}>Cancel</button>
            </div>
          </div>
        </div>
      )}*/}
    </div>
  );
};

export default Navbar;
