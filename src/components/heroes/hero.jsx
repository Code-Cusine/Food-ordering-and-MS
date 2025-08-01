import React from "react";
import '../heroes/hero.css';
import heroImage from '../assets/Designer.jpeg';
import caffe_americano from '../assets/drinks_images/American_Coffee.jpg';
import onion_and_capsicum_pizza from '../assets/food_images_veg/6__Onion_And_Capcicum_Pizza.jpg'
import crispy_chicken_burger from '../assets/food_images_non_veg/2_x_Krispy_Chicken_Burger.jpg'

const Hero = () => {
    // Array of bestseller items to display
    const bestsellerItems = [
        {
            id: 1,
            image: caffe_americano,
            title: "Caffe Americano",
            description: "Rich in flavour, full-bodied espresso with hot water.",
            price: "₹299",
            category: 'Drinks',
            badge: 'Popular'
        },
        {
            id: 13,
            image: onion_and_capsicum_pizza,
            title: "Onion and Capsicum Pizza",
            description: "A flavorful pizza loaded with sautéed onions and capsicums.",
            price: "₹349",
            category: 'Veg',
            badge: 'Best Seller'
        },
        {
            id: 28,
            image: crispy_chicken_burger,
            title: "Crispy Chicken Burger",
            description: "Juicy chicken patty with crispy coating, lettuce, and mayo.", 
            price: "₹399",
            category: 'Non-Veg',
            badge: 'Chef\'s Choice'
        },
    ];

    return (
        <div style={{margin: 0, padding: 0}}>
            {/* Modern Hero Section */}
            <section className="hero">
                <div className="hero-content fade-in-up">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Delicious Food, 
                            <br />
                            Delivered Fresh
                        </h1>
                        <p className="hero-subtitle">
                            Experience the finest flavors crafted with love and delivered right to your doorstep. 
                            From gourmet meals to refreshing drinks, we've got your cravings covered.
                        </p>
                        <div className="hero-cta">
                            <button className="btn btn-primary">
                                Order Now
                            </button>
                            <button className="btn btn-secondary">
                                View Menu
                            </button>
                        </div>
                    </div>
                    <div className="hero-image-container">
                        <img src={heroImage} alt="Delicious Food" className="hero-image" />
                        
                        {/* Floating Elements */}
                        <div className="floating-element floating-element-1">
                            🍕
                        </div>
                        <div className="floating-element floating-element-2">
                            ☕
                        </div>
                        <div className="floating-element floating-element-3">
                            🍔
                        </div>
                    </div>
                </div>
            </section>

            {/* Modern Bestseller Section */}
            <section className="bestseller-section">
                <div className="bestseller-container">
                    <h2 className="bestseller-title">Our Bestsellers</h2>
                    <div className="bestseller-grid">
                        {bestsellerItems.map((item, index) => (
                            <div key={item.id} className="bestseller-item fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                                <div className="bestseller-badge">{item.badge}</div>
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="bestseller-image"
                                />
                                <div className="bestseller-content">
                                    <h3 className="bestseller-name">{item.title}</h3>
                                    <p className="bestseller-description">{item.description}</p>
                                    <div className="item-price">{item.price}</div>
                                    <div className="item-actions1">
                                        <button className="btn btn-primary">
                                            Add to Cart
                                        </button>
                                        <button className="btn btn-secondary">
                                            Quick View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
