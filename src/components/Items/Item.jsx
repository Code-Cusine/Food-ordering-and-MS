import React, {useContext} from 'react';
import './combined-item-styles.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ShopContext } from '../../context/ShopContext';


const Item = (props) => {
    const { addToCart } = useContext(ShopContext);
    const navigate = useNavigate(); // Create a navigate instance
    
    const handleAddToCart = () => {
        addToCart(props.id); // Add the item without any size
    };

    const handleBuyNow = () => {
        // Navigate to the payment page when Buy Item is clicked
        navigate('/payment');
    };

    return (
        <div className='item-box'>
            <Link to={`/product/${props.id}`}>
                <img
                    src={props.image}
                    alt={props.name}
                    className='item-image'
                    onClick={() => window.scrollTo(0, 0)}
                />
            </Link>
            <div className='item-details'>
                <h3>{props.name}</h3>
                <p>{props.description}</p>
                <div className='item-prices'>
                    {props.price && (
                        <p className='item-price'>₹{props.price}</p>
                    )}
                </div>
                <div className='item-actions'>
                    <button className='add-item-button' onClick={handleBuyNow}>Buy Item</button> {/* Buy Now button */}
                    <button className='add-to-cart-button' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Item;
