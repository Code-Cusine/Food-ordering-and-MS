// src/components/Items/OrderOverlay.jsx

import React from 'react';
import { useOrder } from '../../context/OrderContext'; // Make sure the path is correct

const OrderOverlay = () => {
    const {
        orderItems,
        showOrderOverlay,
        customerName,
        phoneNumber,
        setShowOrderOverlay,
    } = useOrder(); // Use the custom hook

    if (!showOrderOverlay) return null;

    return (
        <div className="overlay">
            <div className="overlay-content">
                <h2>Your Order</h2>
                <div className="customer-info">
                    <p><strong>Customer Name:</strong> {customerName}</p>
                    <p><strong>Phone Number:</strong> {phoneNumber}</p>
                </div>
                <div className="order-items">
                    {orderItems.map((item, index) => (
                        <div key={index} className="order-item">
                            <span>{item.name}</span>
                            <span>Quantity: {item.quantity}</span>
                        </div>
                    ))}
                </div>
                <div className="button-group">
                    <button onClick={() => setShowOrderOverlay(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default OrderOverlay;
