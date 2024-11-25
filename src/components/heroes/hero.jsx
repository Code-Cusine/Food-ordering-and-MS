import React from "react";
import '../heroes/hero.css';
import heroImage from '../assets/Designer.jpeg';
import bestseller from "../assets/bestseller.jpg";
import caffe_americano from '../assets/drinks_images/American_Coffee.jpg';
import onion_and_capsicum_pizza from '../assets/food_images_veg/6__Onion_And_Capcicum_Pizza.jpg'
import crispy_chicken_burger from '../assets/food_images_non_veg/2_x_Krispy_Chicken_Burger.jpg'

const Hero = () => {
    // Array of items to display
    const items = [
        {
            id: 1,
            image: caffe_americano,
            title: "Caffe Americano",
            description: "Rich in flavour, full-bodied espresso with hot water.",
            price: "₹299",
            category : 'Drinks',
            foodtype : 'Drinks'
        },
        {
            id: 13,
            image: onion_and_capsicum_pizza,
            title: "Onion and Capsicum Pizza",
            description: "A flavorful pizza loaded with sautéed onions and capsicums, perfect for those who love a savory twist.",
            price: "₹349",
            type : 'Veg'
        },
        {
            id: 28,
            image: crispy_chicken_burger,
            title: "Crispy Chicken Burger",
            description: "A juicy chicken patty coated in a crispy batter, served with lettuce, tomato, and mayo on a soft bun", 
            price: "₹399",
            type: 'Non- Veg'
        },
    ];

    return (
        <div className="hero-container">
            <div className="hero">
                <img src={heroImage} alt="Hero" className="hero-image" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2px' }}>
                <div className="Bestseller">
                    <img src={bestseller} alt="Bestseller" className="bestseller-image" />
                </div>
                {/* Horizontal layout for items */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: '10px', 
                    marginTop: '-160px',
                    marginLeft: '360px',
                    overflowY: 'auto' // In case the boxes overflow
                }}>
                    {items.map((item) => (
                        <div key={item.id} className="item-box1">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="item-image"
                            />
                            <div className="item-details">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p className="item-price">{item.price}</p>
                                <h3>{item.category}</h3>
                                <h3>{item.type}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
