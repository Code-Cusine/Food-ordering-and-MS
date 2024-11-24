// src/context/OrderContext.js

import React, { createContext, useState, useContext } from 'react';
import { ShopContext } from './ShopContext';
// Create OrderContext
const OrderContext = createContext();

// OrderProvider component
export const OrderProvider = ({ children }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [showOrderOverlay, setShowOrderOverlay] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const syncCartToOrder = (cartItems, allProducts) => {
        const updatedOrderItems = [];
        
        // Convert cart items to order items format
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const product = allProducts.find(p => p.id === Number(itemId));
                if (product) {
                    updatedOrderItems.push({
                        ...product,
                        quantity: cartItems[itemId]
                    });
                }
            }
        }
        
        setOrderItems(updatedOrderItems);
    };

    const contextValue = {
        orderItems,
        setOrderItems,
        showOrderOverlay,
        setShowOrderOverlay,
        customerName,
        setCustomerName,
        phoneNumber,
        setPhoneNumber,
        syncCartToOrder,  
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
