import React from 'react';
import './combined-item-styles.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
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
                        <p className='item-price'>{props.price}</p>
                    )}
                </div>
                <div className='item-actions'>
                    <button className='add-item-button'>Buy Item</button>
                    <button className='add-to-cart-button'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Item;
