import React from "react";
import '../heroes/hero.css';
import heroImage from '../assets/Designer.jpeg'; 

const Hero = () => {
    return (
        <div className="hero">
           
            <img src={heroImage} alt="Hero" className="hero-image" />
            
        </div>
    );
};

export default Hero