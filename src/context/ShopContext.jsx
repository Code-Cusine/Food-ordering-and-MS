import React, { createContext, useState } from 'react';
import all_product from '../components/assets/all_product';

// Create the ShopContext
const ShopContext = createContext();

// Create the ShopProvider component
const ShopProvider = (props) => {
    // State to manage cart items
    const [cartItems, setCartItems] = useState({});

    // Function to increment item quantity in the cart
    const incrementItemQuantity = (itemId, size) => {
        const key = `${itemId}-${size}`;
        setCartItems((prevCartItems) => ({
            ...prevCartItems,
            [key]: (prevCartItems[key] || 0) + 1,
        }));
    };

    // Function to decrement item quantity in the cart
    const decrementItemQuantity = (itemId, size) => {
        const key = `${itemId}-${size}`;
        if (cartItems[key] > 0) {
            setCartItems((prevCartItems) => ({
                ...prevCartItems,
                [key]: prevCartItems[key] - 1,
            }));
        }
    };

    // Function to add items to the cart
    const addToCart = (itemId, size) => {
        setCartItems((prev) => ({
            ...prev,
            [`${itemId}-${size}`]: (prev[`${itemId}-${size}`] || 0) + 1,
        }));
    };

    // Function to remove items from the cart
    const removeFromCart = (itemId, size) => {
        setCartItems((prev) => ({
            ...prev,
            [`${itemId}-${size}`]: (prev[`${itemId}-${size}`] || 0) - 1,
        }));
    };

    // Function to get the total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const [itemId, size] = item.split("-");
                const itemInfo = all_product.find((product) => product.id === Number(itemId));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };

    // Function to get the total cart items
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    // Provide cartItems and functions in the context value
    const contextValue = {
        cartItems,
        incrementItemQuantity,
        decrementItemQuantity,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        all_product,
    };

    // Return the ShopContext.Provider with the context value
    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export { ShopContext, ShopProvider };
export default ShopProvider;