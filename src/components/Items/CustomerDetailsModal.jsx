import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './combined-item-styles.css';

const CustomerDetailsModal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    customerName, 
    setCustomerName, 
    phoneNumber, 
    setPhoneNumber,
    buttonText = "Submit",
    title = "Customer Details"
}) => {
    const [errors, setErrors] = useState({});

    // Create or get the modal root element
    const getModalRoot = () => {
        let modalRoot = document.getElementById('modal-root');
        if (!modalRoot) {
            modalRoot = document.createElement('div');
            modalRoot.id = 'modal-root';
            modalRoot.style.position = 'relative';
            modalRoot.style.zIndex = '99999';
            document.body.appendChild(modalRoot);
        }
        return modalRoot;
    };

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Hide any other overlays that might be showing
            document.body.classList.add('modal-open');
        } else {
            document.body.style.overflow = 'unset';
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(number);
    };

    const handleSubmit = () => {
        const newErrors = {};

        if (!customerName.trim()) {
            newErrors.name = "Please enter your name";
        }

        if (!phoneNumber.trim()) {
            newErrors.phone = "Please enter your phone number";
        } else if (!validatePhoneNumber(phoneNumber)) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit();
    };

    const handleClose = () => {
        setErrors({});
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    };

    // Add keyboard event listener
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const modalContent = (
        <div className="customer-modal-overlay" onClick={handleOverlayClick}>
            <div className="customer-modal-content">
                <div className="customer-modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close-btn" onClick={handleClose}>×</button>
                </div>
                
                <div className="customer-form">
                    <div className="input-group">
                        <label htmlFor="customerName">Your Name</label>
                        <input
                            id="customerName"
                            type="text"
                            placeholder="Enter your full name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            id="phoneNumber"
                            type="text"
                            placeholder="Enter 10-digit phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            maxLength="10"
                            className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                </div>

                <div className="customer-modal-actions">
                    <button className="btn-secondary" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="btn-primary" onClick={handleSubmit}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );

    // Use createPortal to render the modal at the modal root level
    return createPortal(modalContent, getModalRoot());
};

export default CustomerDetailsModal;
