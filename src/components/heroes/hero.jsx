import React from "react";
import '../heroes/hero.css';
import heroImage from '../assets/Designer.jpeg'; 
import bestseller from "../assets/bestseller.jpg";

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero">
                <img src={heroImage} alt="Hero" className="hero-image" />
            </div>
            <div className="Bestseller">
                <img src={bestseller} alt="Bestseller" className="bestseller-image" />
            </div>
        </div>
    );
};

export default Hero;
