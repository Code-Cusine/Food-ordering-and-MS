import React, { useContext } from "react";
import boy_removebg_preview from '../assets/boy_removebg_preview.png';
import girl_removebg_preview from '../assets/girl_removebg_preview.png';
import kids_removebg_preview from '../assets/kids_removebg_preview.png';
import '../heroes/hero.css';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from "../../context/ShopContext"; // Adjust the import path as needed

const foodItems = [
    {
        id: 1,
        name: "Caffe Americano",
        description: "Rich in flavour, full-bodied espresso with hot water.",
        price: 241.50,
        image: boy_removebg_preview,
    },
    {
        id: 2,
        name: "Cold Coffee",
        description: "Our signature rich in flavour espresso blended with delicate coffee.",
        price: 304.50,
        image: girl_removebg_preview,
    },
    {
        id: 3,
        name: "Java Chip Frappuccino",
        description: "Mocha sauce and Frappuccino chips blended into one.",
        price: 325.50,
        image: kids_removebg_preview,
    },
];

const Hero = () => {
    const navigate = useNavigate();
    const { addToCart } = useContext(ShopContext);

    const handleBuyNow = (item) => {
        navigate('/payment');
    };

    const handleAddToCart = (itemId) => {
        addToCart(itemId);
    };

    return (
        <div className="hero">
            {foodItems.map((item) => (
                <div className="food-box" key={item.id}>
                    <img src={item.image} alt={`${item.name} Image`} className="food-image" />
                    <div className="food-details">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p className="food-price">₹ {item.price.toFixed(2)}</p>
                        <div className='item-actions1'>
                            <button className='add-item-button1' onClick={() => handleBuyNow(item)}>Buy Item</button>
                            <button className='add-to-cart-button1' onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Hero;