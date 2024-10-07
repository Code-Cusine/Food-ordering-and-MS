import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../../context/ShopContext';
import './combined-item-styles.css';

const API_URL = 'http://localhost:5000/api';

const Item = (props) => {
    const { addToCart } = useContext(ShopContext);
    const navigate = useNavigate();
    const [showCustomerInput, setShowCustomerInput] = useState(false);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = () => {
        addToCart(props.id);
    };

    const handleBuyNow = () => {
        setShowCustomerInput(true);
    };

    const handleCustomerSubmit = async () => {
        if (!customerName.trim() || !phoneNumber.trim()) {
            alert('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${API_URL}/orders`, {
                custname: customerName,
                contactno: phoneNumber,
                ordername: props.name,
                quantity: 1,
                price: props.price,
                foodtype: props.category || 'N/A'
            });

            setOrderDetails({
                custname: customerName,
                custid: response.data.custid,
                orderid: response.data.orderid,
                noofvisits: response.data.visits,
                ordername: props.name,
                foodtype: props.category || 'N/A',
                quantity: 1,
                price: props.price,
                isVeg: props.isVeg, // For food items
                isDrink: props.category === 'Drinks' // Check if it's a drink
            });

            setShowCustomerInput(false);
            setShowOrderConfirmation(true);
        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='item-box'>
            <Link to={`/product/${props.id}`}>
                <img
                    src={props.image}
                    alt={props.name}
                    className='item-image'
                    onClick={() => window.scrollTo(0, 0)}
                />
            </Link>
            <div className='item-details'>
                <h3>{props.name}</h3>
                <p>{props.description}</p>
                <div className='item-prices'>
                    {props.price && (
                        <p className='item-price'>₹{props.price}</p>
                    )}
                </div>

                {/* Veg/Non-Veg Indicator */}
                {props.category === 'Food' && (
                    <div className='food-type'>
                        {props.isVeg ? (
                            <span className='veg-badge'>Veg</span>
                        ) : (
                            <span className='non-veg-badge'>Non-Veg</span>
                        )}
                    </div>
                )}

                <div className='item-actions'>
                    <button className='add-item-button' onClick={handleBuyNow}>Buy Item</button>
                    <button className='add-to-cart-button' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>

            {showCustomerInput && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Customer Details</h2>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <div className="button-group">
                            <button 
                                onClick={handleCustomerSubmit} 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : 'Submit'}
                            </button>
                            <button onClick={() => setShowCustomerInput(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showOrderConfirmation && orderDetails && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Order Confirmed!</h2>
                        <div className="order-details">
                            <p><strong>Customer Name:</strong> {orderDetails.custname}</p>
                            <p><strong>Customer ID:</strong> {orderDetails.custid}</p>
                            <p><strong>Order Name:</strong> {orderDetails.ordername}</p>
                            <p><strong>Order ID:</strong> {orderDetails.orderid}</p>
                            <p><strong>Visits:</strong> {orderDetails.noofvisits}</p>
                            <p><strong>Food Type:</strong> {orderDetails.foodtype}</p>

                            {/* Display vegetarian/non-vegetarian only for food items */}
                            {orderDetails.foodtype === 'Food' && (
                                <p><strong>Vegetarian:</strong> {orderDetails.isVeg ? "Yes" : "No"}</p>
                            )}

                            <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
                            <p><strong>Price:</strong> ₹{orderDetails.price}</p>
                        </div>
                        <div className="button-group">
                            <button onClick={() => setShowOrderConfirmation(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Item;
