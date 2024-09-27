import React, { useState, useContext } from "react";
import '../ProductDisplay/ProductDisplay.css'
import { ShopContext } from "../../context/ShopContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState(""); // State to store the selected size
    const [errorMessage, setErrorMessage] = useState(""); // State to manage error message
    const [addedToCartMessage, setAddedToCartMessage] = useState("");

    const handleAddToCart = () => {
        if (selectedSize === "") {
            alert("Please select a size!");
        } else {
            addToCart(product.id, selectedSize); // Pass selected size to addToCart function
            setErrorMessage(""); 
            toast.success("Item added to cart", { position: "top-center",autoClose:1000});
        }
    };

    const navigate = useNavigate();

    const handleProceedToCheckout = () => {
        if (selectedSize === "") {
            alert("Please select a size!");
        }
    else{
    navigate('/payment');
    }
  };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight, usually knitted, close-fitting overall guaranteed a best fit and can be worn on any occasion.
                </div>
                
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">

                        <div
                            className={selectedSize === 'S' ? 'selected-size' : ''}
                            onClick={() => setSelectedSize('S')}
                        >
                            S
                        </div>
                        <div
                            className={selectedSize === 'M' ? 'selected-size' : ''}
                            onClick={() => setSelectedSize('M')}
                        >
                            M
                        </div>
                        <div
                            className={selectedSize === 'L' ? 'selected-size' : ''}
                            onClick={() => setSelectedSize('L')}
                        >
                            L
                        </div>
                        <div
                            className={selectedSize === 'XL' ? 'selected-size' : ''}
                            onClick={() => setSelectedSize('XL')}
                        >
                            XL
                        </div>
                        <div
                            className={selectedSize === 'XXL' ? 'selected-size' : ''}
                            onClick={() => setSelectedSize('XXL')}
                        >
                            XXL
                        </div>
                    </div>
                </div>

                <div className="productdisplay-right-button">
                    <button onClick={handleAddToCart}>ADD TO CART</button>
                    <div className="productdisplay-right-buy-now">
                        <button onClick={handleProceedToCheckout}>BUY NOW</button>
                    </div>
                    
                    {addedToCartMessage && <div>{addedToCartMessage}</div>}
                </div>


                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
        
    );
}

export default ProductDisplay;
