import React, { useState, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { useOrder } from '../../context/OrderContext';
import CustomerDetailsModal from './CustomerDetailsModal';
import './combined-item-styles.css';

const Item = React.memo((props) => {
    const { addToCart } = useContext(ShopContext);
    const {
        orderItems, setOrderItems,
        customerName, setCustomerName,
        phoneNumber, setPhoneNumber
    } = useOrder();

    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [isSingleItemOrder, setIsSingleItemOrder] = useState(false);
    const navigate = useNavigate();

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(number);
    };

    const handleAddToCart = () => {
        setIsSingleItemOrder(false);
        if (customerName && phoneNumber && validatePhoneNumber(phoneNumber)) {
            setOrderItems(prevItems => {
                const existingItem = prevItems.find(item => item.id === props.id);
                if (existingItem) {
                    return prevItems.map(item =>
                        item.id === props.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                } else {
                    return [...prevItems, { ...props, quantity: 1 }];
                }
            });
            addToCart(props.id); 
        } else {
            setShowCustomerModal(true);
        }
    };

    const handleBuyNow = () => {
        setIsSingleItemOrder(true);
        if (!customerName || !phoneNumber || !validatePhoneNumber(phoneNumber)) {
            setShowCustomerModal(true);
        } else {
            setOrderItems([{ ...props, quantity: 1 }]);
            navigate('/payment');
        }
    };

    const handleCustomerSubmit = () => {
        if (isSingleItemOrder) {
            setOrderItems([{ ...props, quantity: 1 }]);
            setShowCustomerModal(false);
            navigate('/payment');
        } else {
            setOrderItems(prevItems => {
                const existingItem = prevItems.find(item => item.id === props.id);
                if (existingItem) {
                    return prevItems.map(item =>
                        item.id === props.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                }
                return [...prevItems, { ...props, quantity: 1 }];
            });
            addToCart(props.id);
            setShowCustomerModal(false);
        }
    };

    return (
        <div className='item-box'>
            <Link to={`/product/${props.id}`}>
                <img src={props.image} alt={props.name} className='item-image' />
            </Link>
            <div className='item-details'>
                <h3>{props.name}</h3>
                <p>{props.description}</p>
                <div className='item-prices'>
                    {props.price && <p className='item-price'>₹{props.price}</p>}
                </div>

                {props.category === 'Food' && (
                    <div className='food-type'>
                        {props.isVeg ? (
                            <span className='veg-badge'>Veg</span>
                        ) : (
                            <span className='non-veg-badge'>Non-Veg</span>
                        )}
                    </div>
                )}

                <div className='item-actions'>
                    <button className='add-item-button' onClick={handleBuyNow}>
                        Buy Item
                    </button>
                    <button className='add-to-cart-button' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>

            <CustomerDetailsModal
                isOpen={showCustomerModal}
                onClose={() => setShowCustomerModal(false)}
                onSubmit={handleCustomerSubmit}
                customerName={customerName}
                setCustomerName={setCustomerName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                buttonText={isSingleItemOrder ? 'Make Payment' : 'Add to Cart'}
                title="Customer Details"
            />
        </div>
    );
});

export default Item;
