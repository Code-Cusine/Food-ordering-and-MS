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
                <button className='add-item-button'>Add Item</button>
            </div>
        </div>
    );
};

export default Item;