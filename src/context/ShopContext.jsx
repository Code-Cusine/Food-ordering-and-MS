import React, { createContext, useState } from 'react';
import all_product from '../components/assets/all_product';

const ShopContext = createContext();

const ShopProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const incrementItemQuantity = (itemId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: (prevCartItems[itemId] || 0) + 1,
    }));
  };

  const decrementItemQuantity = (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItems((prevCartItems) => ({
        ...prevCartItems,
        [itemId]: prevCartItems[itemId] - 1,
      }));
    }
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

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

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export { ShopContext, ShopProvider };
export default ShopProvider;