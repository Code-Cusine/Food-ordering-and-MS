import React from "react";
import '../heroes/hero.css';
import heroImage from '../assets/food_banner.jpg'; // Ensure the path is correct and file name is valid

const Hero = () => {
    return (
        <div className="hero">
            {/* Hero Image */}
            <img src={heroImage} alt="Hero" className="hero-image" />
            {/* Description Section */}
        </div>
    );
};

export default Hero