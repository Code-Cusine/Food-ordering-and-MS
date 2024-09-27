import React, { useContext } from "react";
import './CartItems.css'
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import remove_icon from '../assets/cart_cross_icon.png'

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, incrementItemQuantity, decrementItemQuantity } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
     const totalCartAmount = getTotalCartAmount();
  if (totalCartAmount === 0) {
    alert("Your cart is empty. Please add items to your cart before proceeding to payment.");
  }
    else{
    navigate('/payment');
    }
  };


  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        const keys = Object.keys(cartItems);
        const cartItemKeys = keys.filter((key) => key.startsWith(`${e.id}-`));
        return cartItemKeys.map((key) => {
          const size = key.split("-")[1];
          if (cartItems[key] > 0) {
            return (
              <div key={key} className="cartitems-format cartitems-format-main">
                 
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name} - {size}</p>
                <p>${e.new_price}</p>
               
                <div className="cartitems-quantity-container">
                  <button className="cartitems-quantity" onClick={() => decrementItemQuantity(e.id, size)}>-</button>
                  <span className="cartitems-quantity-value">{cartItems[key]}</span>
                  <button className="cartitems-quantity" onClick={() => incrementItemQuantity(e.id, size)}>+</button>
                </div>
                <p>${e.new_price * cartItems[key]}</p>
                <img className="cartitems-remove-icon" src={remove_icon} onClick={() => removeFromCart(e.id, size)} alt="" /> 
              
              </div>
              
            );
          }
          return null;
        });
      })}
     
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>SubTotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>$ {getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO PAYMENT</button>

        </div>
      </div>
    </div>
  );
};

export default CartItems;