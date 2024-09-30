import React, { useContext } from "react";
import './CartItems.css';
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import remove_icon from '../assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, incrementItemQuantity, decrementItemQuantity } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    const totalCartAmount = getTotalCartAmount();
    if (totalCartAmount === 0) {
      alert("Your cart is empty. Please add items to your cart before proceeding to payment.");
    } else {
      navigate('/payment');
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p className="hide-mobile">Quantity</p>
        <p className="hide-mobile">Total</p>
        <p>Remove</p>
      </div>
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id} className="cartitems-format cartitems-format-main">
              <img src={e.image} alt="" className="carticon-product-icon" />
              <p>{e.name}</p>
              <p>₹{e.price.toFixed(2)}</p>
              <div className="cartitems-quantity hide-mobile">
                <button onClick={() => decrementItemQuantity(e.id)}>-</button>
                <p>{cartItems[e.id]}</p>
                <button onClick={() => incrementItemQuantity(e.id)}>+</button>
              </div>
              <p className="hide-mobile">₹{(e.price * cartItems[e.id]).toFixed(2)}</p>
              <img className="cartitems-remove-icon" src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount().toFixed(2)}</h3>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;