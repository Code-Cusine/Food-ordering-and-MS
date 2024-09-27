import React from "react";
import boy_removebg_preview from '../assets/boy_removebg_preview.png';
import girl_removebg_preview from '../assets/girl_removebg_preview.png';
import kids_removebg_preview from '../assets/kids_removebg_preview.png';
import '../heroes/hero.css';

const foodItems = [
    {
        id: 1,
        name: "Caffe Americano",
        description: "Rich in flavour, full-bodied espresso with hot water in true...",
        price: "₹ 241.50",
        image: boy_removebg_preview,
    },
    {
        id: 2,
        name: "Cold Coffee",
        description: "Our signature rich in flavour espresso blended with delicate...",
        price: "₹ 304.50",
        image: girl_removebg_preview,
    },
    {
        id: 3,
        name: "Java Chip Frappuccino",
        description: "Mocha sauce and Frappuccino chips blended with Frappu...",
        price: "₹ 325.50",
        image: kids_removebg_preview,
    },
];

const Hero = () => {
    return (
        <div className="hero">
            {foodItems.map((item) => (
                <div className="food-box" key={item.id}>
                    <img src={item.image} alt={`${item.name} Image`} className="food-image" />
                    <div className="food-details">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p className="food-price">{item.price}</p>
                        <button className="add-item-button">Add Item</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Hero;
