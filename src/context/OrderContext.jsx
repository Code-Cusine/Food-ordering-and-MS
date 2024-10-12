// src/context/OrderContext.js

import React, { createContext, useState, useContext } from 'react';

// Create OrderContext
const OrderContext = createContext();

// OrderProvider component
export const OrderProvider = ({ children }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [showOrderOverlay, setShowOrderOverlay] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const contextValue = {
        orderItems,
        setOrderItems,
        showOrderOverlay,
        setShowOrderOverlay,
        customerName,
        setCustomerName,
        phoneNumber,
        setPhoneNumber,
    };

    return (
        <OrderContext.Provider value={contextValue}>
            {children}
        </OrderContext.Provider>
    );
};

// Custom hook to use the OrderContext
export const useOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};
