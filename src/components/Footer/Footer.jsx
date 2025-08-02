import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css'
import footer_logo from '../assets/l4.png'
import instagram_icon from '../assets/instagram_icon.png'
import pintester_icon from '../assets/pintester_icon.png'
import whatsapp_icon from '../assets/whatsapp_icon.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-content">
                <div className="footer-section footer-logo">
                    <img src={footer_logo} alt="Cuisine Code Logo" />
                    <p>Cuisine Code</p>
                    <p className="footer-description">
                        Delicious food delivered to your doorstep. Experience the best cuisine with our premium food ordering service.
                    </p>
                </div>
                
                <div className="footer-section footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/foods">Menu</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                    </ul>
                </div>

                <div className="footer-section footer-contact">
                    <h3>Contact Info</h3>
                    <div className="contact-item">
                        <p>📍 123 Food Street, Cuisine City</p>
                    </div>
                    <div className="contact-item">
                        <p>📞 +1 (555) 123-4567</p>
                    </div>
                    <div className="contact-item">
                        <p>✉️ info@cuisinecode.com</p>
                    </div>
                </div>

                <div className="footer-section footer-social">
                    <h3>Follow Us</h3>
                    <div className="footer-social-icons">
                        <a href="#" className="footer-icons-container">
                            <img src={instagram_icon} alt="Instagram" />
                        </a>
                        <a href="#" className="footer-icons-container">
                            <img src={pintester_icon} alt="Pinterest" />
                        </a>
                        <a href="#" className="footer-icons-container">
                            <img src={whatsapp_icon} alt="WhatsApp" />
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <hr />
                <div className="footer-copyright">
                    <p>Copyright © 2024 Cuisine Code. All Rights Reserved.</p>
                    <div className="footer-legal">
                        <Link to="/privacy">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;