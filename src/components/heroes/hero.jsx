import React, { useContext } from "react";
import '../heroes/hero.css';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from "../../context/ShopContext"; // Adjust the import path as needed
import java_chip_frappuccino from '../assets/drinks_images/Java_Chip_Frappuccino.jpg'
import cold_coffee  from '../assets/drinks_images/Cold_Coffee.jpg'
import caffe_americano from '../assets/drinks_images/American_Coffee.jpg'
const foodItems = [
    {
        id: 1,
        name: "Caffe Americano",
        description: "Rich in flavour, full-bodied espresso with hot water.",
        price: 241.50,
        image: caffe_americano,
    },
    {
        id: 2,
        name: "Cold Coffee",
        description: "Our signature rich in flavour espresso blended with delicate coffee.",
        price: 304.50,
        image: cold_coffee,
    },
    {
        id: 3,
        name: "Java Chip Frappuccino",
        description: "Mocha sauce and Frappuccino chips blended into one.",
        price: 325.50,
        image: java_chip_frappuccino,
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