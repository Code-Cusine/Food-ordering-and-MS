import React, { useState } from 'react';
import './PaymentPage.css';
import phonepe from '../assets/phonepe-logo-icon.svg';
import paytm from '../assets/paytm-icon_1.png';
import googlepay from '../assets/google-pay-icon.webp';
import { FaTimes, FaMoneyBillAlt, FaAmazonPay, FaCreditCard, FaUniversity } from 'react-icons/fa';
import axios from 'axios';
import { useOrder } from '../../context/OrderContext';

/* State control variables for various functionalities */
const PaymentPage = () => {
  const {
    orderItems,
    customerName,
    phoneNumber,
    setShowOrderOverlay
  } = useOrder();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [showCardDetailsModal, setShowCardDetailsModal] = useState(false);
  const [showCvvModal, setShowCvvModal] = useState(false);
  const [showNetBankingOptions, setShowNetBankingOptions] = useState(false);
  const [selectedNetBankingOption, setSelectedNetBankingOption] = useState('');
  const [isValidUpiId, setIsValidUpiId] = useState(true);
  const [highlightedPaymentMethod, setHighlightedPaymentMethod] = useState(null);
  const [showCodOverlay, setShowCodOverlay] = useState(false);
  const [showUpiSuccessOverlay, setShowUpiSuccessOverlay] = useState(false);
  const [showCardDetailsSuccessOverlay, setShowCardDetailsSuccessOverlay] = useState(false);
  const [showNetBankingSuccessOverlay, setShowNetBankingSuccessOverlay] = useState(false);
  const [upiInputPlaceholder, setUpiInputPlaceholder] = useState('Enter UPI ID');

  const handlePaymentMethodClick = (method) => {
    if (selectedPaymentMethod === method) {
      setSelectedPaymentMethod(null);
      setHighlightedPaymentMethod(null);
      if (method === 'netBanking') {
        setShowNetBankingOptions(false);
      } else if (method === 'cashOnDelivery') {
        setShowCodOverlay(false);
      }
    } else {
      setSelectedPaymentMethod(method);
      setHighlightedPaymentMethod(method);
      if (method === 'creditCard') {
        setShowCardDetailsModal(true);
      } else if (method === 'netBanking') {
        setShowNetBankingOptions(!showNetBankingOptions);
      } else if (method === 'cashOnDelivery') {
        handleCashPayment(); // Call handleCashPayment when Cash on Delivery is selected
      } else if (['phonepe', 'paytm', 'googlepay'].includes(method)) {
        setUpiId('');
        setIsValidUpiId(true);
        setUpiInputPlaceholder(`Enter ${method === 'phonepe' ? 'PhonePe' : method === 'paytm' ? 'Paytm' : 'Google Pay'} UPI ID`);
      }
    }
  };

  /* UPI ID type checking */
  const handleUpiIdChange = (e) => {
    const enteredUpiId = e.target.value;
    const isValid = /^[0-9]{10}@[a-z]{3,}$/.test(enteredUpiId);
    setIsValidUpiId(isValid);
    setUpiId(enteredUpiId);
  };

  /* Successful Submission of UPI ID */
  const handleUpiIdSubmit = (e) => {
    e.preventDefault();
    if (/^[0-9]{10}@[a-z]{3,}$/.test(upiId)) {
      setShowUpiSuccessOverlay(true);
      setUpiId('');
    } else {
      alert('Invalid UPI ID');
    }
  };

  const handleCashPayment = () => {
    processPayment('Cash'); // Process cash payment
  };

  const processPayment = async (paymentType, cardDetails = null) => {
    try {
      // Calculate the grand total
      const grandtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

      // Prepare order data
      const orderData = {
        custname: customerName,
        contactno: phoneNumber,
        items: orderItems.map(item => ({
          itemid: item.id,
          itemname: item.name,
          quantity: item.quantity,
          price: item.price,
          foodtype: item.foodtype
        }))
      };

      // Create the order
      const orderResponse = await axios.post('http://localhost:5000/api/orders', orderData);
      const { custid, orderid } = orderResponse.data;

      // Prepare payment data
      const paymentData = {
        orderid,
        custid,
        grandtotal,
        paymenttype: paymentType,
        paymentstatus: 'Completed'
      };

      // Add card details if applicable
      if (cardDetails) {
        paymentData.cardDetails = cardDetails;
      }

      // Process the payment
      const paymentResponse = await axios.post('http://localhost:5000/api/payments', paymentData);

      // Handle successful payment
      console.log('Order and payment processed successfully', { order: orderResponse.data, payment: paymentResponse.data });

      // Show success overlay based on payment type
      if (paymentType === 'UPI') {
        setShowUpiSuccessOverlay(true);
      } else if (paymentType === 'Credit Card') {
        setShowCardDetailsSuccessOverlay(true);
      } else if (paymentType === 'Net Banking') {
        setShowNetBankingSuccessOverlay(true);
      } else if (paymentType === 'Cash') {
        setShowCodOverlay(true);
      }

      // Close the order overlay
      setShowOrderOverlay(false);
    } catch (error) {
      console.error('Error processing order and payment:', error);
      alert('There was an error processing your order. Please try again.');
    }
  };

  const handleCloseUpiSuccessOverlay = () => {
    setShowUpiSuccessOverlay(false);
  };

  /* Conditional displaying of credit/debit card overlay */
  const handleCloseCardDetailsModal = () => {
    setShowCardDetailsModal(false);
    setHighlightedPaymentMethod(null);
  };

  /* Selection of net Banking option */
  const handleNetBankingOptionChange = (e) => {
    setSelectedNetBankingOption(e.target.value);
  };

  /* Successful alert message for net banking */
  const handleContinueNetBanking = () => {
    if (selectedNetBankingOption && selectedNetBankingOption !== 'Select an option') {
      setShowNetBankingSuccessOverlay(true);
    } else {
      alert('Please select a Net Banking option.');
    }
  };

  const handleCloseNetBankingSuccessOverlay = () => {
    setShowNetBankingSuccessOverlay(false);
    setHighlightedPaymentMethod(null);
  };

  /* Handling successful CVV Submit for Credit/Debit Card */
  const handleCvvSubmit = (cvv) => {
    if (cvv) {
      setShowCardDetailsSuccessOverlay(true);
      setShowCvvModal(false);
      setHighlightedPaymentMethod(null);
    } else {
      alert('Please enter the CVV');
    }
  };

  /* Closing of CVV Overlay */
  const handleCloseCvvModal = () => {
    setShowCvvModal(false);
  };

  const handleCloseCardDetailsSuccessOverlay = () => {
    setShowCardDetailsSuccessOverlay(false);
  };

  return (
    <div className="payment-page-container">
      <div className="payment-page">
        <div className="payment-container">
          <div className="recommended-container">
            <h2>RECOMMENDED</h2>
            <div className="payment-method">
              <div className="payment-icon">
                <FaMoneyBillAlt />
              </div>
              <div className="payment-info">
                <h3>Cash</h3>
                {showCodOverlay && (
                  <div className="cod-overlay">
                    <div className="cod-overlay-content">
                      <FaTimes
                        className="close-icon-1"
                        onClick={() => {
                          setShowCodOverlay(false);
                          handlePaymentMethodClick('cashOnDelivery');
                        }}
                      />
                      <h2>Payment Successful</h2>
                      <p>Payment has been made through Cash. Thank You</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="circular-icon-wrapper">
                <div
                  className={`circular-icon ${highlightedPaymentMethod === 'cashOnDelivery' ? 'highlighted' : ''}`}
                  onClick={() => handlePaymentMethodClick('cashOnDelivery')}
                >
                  <div className="inner-icon blue"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="amazon-pay-container">
            <h2>PAYMENT METHODS</h2>
            <div
              className="payment-method"
              onClick={() => handlePaymentMethodClick("upi")}
            >
              <div className="payment-icon">
                <FaAmazonPay />
              </div>
              <div className="payment-info">
                <h3>Other UPI Apps</h3>
                <div className="icon-container">
                  <img
                    src={phonepe}
                    alt="PhonePe"
                    className="upi-icon"
                    onClick={() => handlePaymentMethodClick("phonepe")}
                  />
                  <img
                    src={paytm}
                    alt="Paytm"
                    className="upi-icon"
                    onClick={() => handlePaymentMethodClick("paytm")}
                  />
                  <img
                    src={googlepay}
                    alt="Google Pay"
                    className="upi-icon"
                    onClick={() => handlePaymentMethodClick("googlepay")}
                  />
                </div>
                {showUpiSuccessOverlay && (
                  <div className="upi-overlay">
                    <div className="upi-overlay-content">
                      <FaTimes className="close-icon" onClick={handleCloseUpiSuccessOverlay} />
                      <h2>UPI ID Successfully Submitted</h2>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`circular-icon ${highlightedPaymentMethod === 'upi' ? 'highlighted' : ''}`}
                onClick={() => handlePaymentMethodClick('upi')}
              >
                <div className="inner-icon orange"></div>
              </div>
            </div>
            {['phonepe', 'paytm', 'googlepay'].includes(selectedPaymentMethod) && (
              <div className="upi-input-container">
                <form onSubmit={handleUpiIdSubmit}>
                  <input
                    type="text"
                    placeholder={upiInputPlaceholder}
                    value={upiId}
                    onChange={handleUpiIdChange}
                    className={`upi-input ${isValidUpiId ? '' : 'invalid'}`}
                  />
                  <button type="submit" disabled={!isValidUpiId}>Submit</button>
                </form>
              </div>
            )}
          </div>

          {/* Credit/Debit Card Payment */}
          <div className="payment-method">
            <div className="payment-icon">
              <FaCreditCard />
            </div>
            <div className="payment-info">
              <h3>Credit/Debit Card</h3>
              {showCardDetailsModal && (
                <div className="card-details-modal">
                  <h4>Enter Card Details</h4>
                  <button onClick={handleCloseCardDetailsModal}>Close</button>
                  <input type="text" placeholder="Card Number" />
                  <button onClick={() => setShowCvvModal(true)}>Proceed</button>
                </div>
              )}
              {showCardDetailsSuccessOverlay && (
                <div className="card-details-success-overlay">
                  <div className="card-success-overlay-content">
                    <FaTimes className="close-icon" onClick={handleCloseCardDetailsSuccessOverlay} />
                    <h2>Card Payment Successful</h2>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`circular-icon ${highlightedPaymentMethod === 'creditCard' ? 'highlighted' : ''}`}
              onClick={() => handlePaymentMethodClick('creditCard')}
            >
              <div className="inner-icon green"></div>
            </div>
          </div>

          {/* CVV Modal */}
          {showCvvModal && (
            <div className="cvv-modal">
              <input type="text" placeholder="CVV" onBlur={(e) => handleCvvSubmit(e.target.value)} />
              <button onClick={handleCloseCvvModal}>Close</button>
            </div>
          )}

          {/* Net Banking */}
          <div className="payment-method">
            <div className="payment-icon">
              <FaUniversity />
            </div>
            <div className="payment-info">
              <h3>Net Banking</h3>
              {showNetBankingOptions && (
                <div className="net-banking-options">
                  <select value={selectedNetBankingOption} onChange={handleNetBankingOptionChange}>
                    <option>Select an option</option>
                    <option>Bank A</option>
                    <option>Bank B</option>
                    <option>Bank C</option>
                  </select>
                  <button onClick={handleContinueNetBanking}>Continue</button>
                </div>
              )}
              {showNetBankingSuccessOverlay && (
                <div className="net-banking-success-overlay">
                  <div className="net-banking-success-overlay-content">
                    <FaTimes className="close-icon" onClick={handleCloseNetBankingSuccessOverlay} />
                    <h2>Net Banking Successful</h2>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`circular-icon ${highlightedPaymentMethod === 'netBanking' ? 'highlighted' : ''}`}
              onClick={() => handlePaymentMethodClick('netBanking')}
            >
              <div className="inner-icon purple"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
