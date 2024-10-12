import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate to redirect
import { ShopContext } from '../../context/ShopContext';
import { useOrder } from '../../context/OrderContext'; // Ensure you import the OrderContext
import './combined-item-styles.css';

const Item = (props) => {
    const { addToCart } = useContext(ShopContext);
    const {
        orderItems, setOrderItems,
        showOrderOverlay, setShowOrderOverlay,
        customerName, setCustomerName,
        phoneNumber, setPhoneNumber
    } = useOrder();

    const [showCustomerInput, setShowCustomerInput] = useState(false);
    const [isSingleItemOrder, setIsSingleItemOrder] = useState(false); // Track whether it's a single item order
    const navigate = useNavigate(); // To navigate to the PaymentPage

    const handleAddToCart = () => {
        setIsSingleItemOrder(false); // It's not a single item order
        if (customerName && phoneNumber) {
            setOrderItems(prevItems => {
                // Check if the current item already exists in the cart by its ID
                const existingItem = prevItems.find(item => item.id === props.id);
                if (existingItem) {
                    // If it exists, increment the quantity of the existing item
                    return prevItems.map(item =>
                        item.id === props.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                } else {
                    // If it doesn't exist, add the new item with quantity 1
                    return [...prevItems, { ...props, quantity: 1 }];
                }
            });
            // Call addToCart from the ShopContext, but only for unique items
            addToCart(props.id); 
        } else {
            // Ask for customer details if it's the first item
            setShowCustomerInput(true);
        }
    };

    const handleBuyNow = () => {
        setIsSingleItemOrder(true); // Mark as a single item order
        if (!customerName || !phoneNumber) {
            setShowCustomerInput(true);
        } else {
            setOrderItems([{ ...props, quantity: 1 }]);
            setShowOrderOverlay(true);
        }
    };

    const handleCustomerSubmit = () => {
        if (!customerName.trim() || !phoneNumber.trim()) {
            alert('Please fill in all fields');
            return;
        }
    
        if (isSingleItemOrder) {
            // For single item orders (Buy Now), navigate to the payment page
            setOrderItems([{ ...props, quantity: 1 }]); // Add the current item as the only order
            setShowCustomerInput(false);
            navigate('/payment'); // Navigate to Payment Page after submitting customer details
        } else {
            // For multi-item orders, just add the first item to the cart
            setOrderItems(prevItems => {
                const existingItem = prevItems.find(item => item.id === props.id);
                if (existingItem) {
                    // If the item already exists in the cart, update its quantity
                    return prevItems.map(item =>
                        item.id === props.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                }
                // If it's a new item, add it to the cart with quantity 1
                return [...prevItems, { ...props, quantity: 1 }];
            });
            addToCart(props.id); // Call addToCart for context consistency
            setShowCustomerInput(false);
        }
    };

    return (
        <div className='item-box'>
            <Link to={`/product/${props.id}`}>
                <img src={props.image} alt={props.name} className='item-image' />
            </Link>
            <div className='item-details'>
                <h3>{props.name}</h3>
                <p>{props.description}</p>
                <div className='item-prices'>
                    {props.price && <p className='item-price'>₹{props.price}</p>}
                </div>

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
                    <button className='add-item-button' onClick={handleBuyNow}>
                        Buy Item
                    </button>
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
                            <button onClick={handleCustomerSubmit}>
                                {isSingleItemOrder ? 'Make Payment' : 'Add More Items'}
                            </button>
                            <button onClick={() => setShowCustomerInput(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Item;
