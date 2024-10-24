import React, { useState } from 'react';
import './PaymentPage.css';
import phonepe from '../assets/phonepe-logo-icon.svg';
import paytm from '../assets/paytm-icon_1.png';
import googlepay from '../assets/google-pay-icon.webp';
import { FaTimes, FaMoneyBillAlt, FaAmazonPay, FaCreditCard, FaUniversity } from 'react-icons/fa';
import axios from 'axios';
import { useOrder } from '../../context/OrderContext';

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
      } else if (method === 'upi') {
        setShowUpiSuccessOverlay(false);
      }
    } else {
      setSelectedPaymentMethod(method);
      setHighlightedPaymentMethod(method);
      if (method === 'creditCard') {
        setShowCardDetailsModal(true);
      } else if (method === 'netBanking') {
        setShowNetBankingOptions(!showNetBankingOptions);
      } else if (method === 'cashOnDelivery') {
        handleCashPayment();
      } else if (method === 'upi') {
        handleUpiPayment(); // Trigger UPI payment process
      }
    }
  };
  
  
  const handleUpiPayment = () => {
    processPayment('UPI');
  };
  
  const handleUpiIdChange = (e) => {
    const enteredUpiId = e.target.value;
    const isValid = /^[0-9]{10}@[a-z]{3,}$/.test(enteredUpiId);
    setIsValidUpiId(isValid);
    setUpiId(enteredUpiId);
  };

  const handleUpiMethodClick = (method) => {
    // Set the selected UPI method and process payment
    setSelectedPaymentMethod(method);
    setHighlightedPaymentMethod(method);
    handleUpiPayment(); // This triggers UPI payment process
  };

  const handleCardMethodClick = (method) => {
    // Set the selected UPI method and process payment
    setSelectedPaymentMethod(method);
    setHighlightedPaymentMethod(method);
    handleCardPayment(); // This triggers UPI payment process
  };
  

  const handleUpiIdSubmit = (e) => {
    e.preventDefault();
    if (/^[0-9]{10}@[a-z]{3,}$/.test(upiId)) {
      processPayment('UPI');
    } else {
      alert('Invalid UPI ID');
    }
  };

  const handleCashPayment = () => {
    processPayment('Cash');
  };

  const handleCardPayment = () => {
    // Directly process the payment without card details and show success overlay
    processPayment('Card');
  };

  const processPayment = async (paymentType) => {
    try {
      const grandtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
      // Create order request
      const orderData = {
        custname: customerName,
        contactno: phoneNumber,
        items: orderItems.map(item => ({
          itemid: item.id,
          itemname: item.name,
          quantity: item.quantity,
          price: item.price,
          foodtype: item.foodtype,
        })),
      };
  
      const orderResponse = await axios.post('http://localhost:5000/api/orders', orderData);
      const { custid, orderid } = orderResponse.data;
  
      // Proceed with payment only if the order creation is successful
      const paymentData = {
        orderid,
        custid,
        grandtotal,
        paymenttype: paymentType,
        paymentstatus: 'Completed',
      };
  
      const paymentResponse = await axios.post('http://localhost:5000/api/payments', paymentData);
  
      console.log('Order and payment processed successfully', {
        order: orderResponse.data,
        payment: paymentResponse.data,
      });
  
      // Show the relevant success overlay based on payment type
      if (paymentType === 'Card') {
        setShowCardDetailsSuccessOverlay(true); // Show card payment success overlay
      } else if (paymentType === 'UPI') {
        setShowUpiSuccessOverlay(true);
      } else if (paymentType === 'Net Banking') {
        setShowNetBankingSuccessOverlay(true);
      } else if (paymentType === 'Cash') {
        setShowCodOverlay(true);
      }
  
      setShowOrderOverlay(false);
    } catch (error) {
      console.error('Error processing order and payment:', error);
      alert('There was an error processing your order. Please try again.');
    }
  };
  
  

  const handleCloseUpiSuccessOverlay = () => {
    setShowUpiSuccessOverlay(false);
  };

  const handleCloseCardDetailsModal = () => {
    setShowCardDetailsModal(false);
    setHighlightedPaymentMethod(null);
  };

  const handleNetBankingOptionChange = (e) => {
    setSelectedNetBankingOption(e.target.value);
  };

  const handleContinueNetBanking = () => {
    if (selectedNetBankingOption && selectedNetBankingOption !== 'Select an option') {
      processPayment('Net Banking');
    } else {
      alert('Please select a Net Banking option.');
    }
  };

  const handleCloseNetBankingSuccessOverlay = () => {
    setShowNetBankingSuccessOverlay(false);
    setHighlightedPaymentMethod(null);
  };

  const handleCvvSubmit = (cvv) => {
    if (cvv) {
      processPayment('Credit Card', { cvv });
    } else {
      alert('Please enter the CVV');
    }
  };

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
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent click
                      handleUpiMethodClick("phonepe");
                    }}
                  />
                  <img
                    src={paytm}
                    alt="Paytm"
                    className="upi-icon"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent click
                      handleUpiMethodClick("phonepe");
                    }}
                  />
                  <img
                    src={googlepay}
                    alt="Google Pay"
                    className="upi-icon"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent click
                      handleUpiMethodClick("phonepe");
                    }}
                  />
                </div>
              </div>
              <div
                className={`circular-icon ${highlightedPaymentMethod === 'upi' ? 'highlighted' : ''}`}
               
              >
                <div className="inner-icon orange"></div>
              </div>
            </div>
          </div>

          <div className="other-payment-container">
            <h2>MORE WAYS TO PAY</h2>
            <div className="payment-method">
              <div className="payment-icon">
                <FaCreditCard />
              </div>
              <div className="payment-info">
                <h3>Credit or debit card</h3>
              </div>
              <div className="circular-icon-wrapper">
              <div
              className={`circular-icon ${highlightedPaymentMethod === 'creditCard' ? 'highlighted' : ''}`}
                  onClick={(e) => { 
                  e.stopPropagation();
                  handleCardMethodClick("creditCard"); // This should be "creditCard" instead of "Card"
  }}
>
                 <div className="inner-icon blue"></div>
                 </div>
                 </div>
                 </div>

            <div className="payment-method">
              <div className="payment-icon">
                <FaUniversity />
              </div>
              <div className="payment-info">
                <h3>Net Banking</h3>
                {showNetBankingOptions && (
                  <div className='net-banking-options'>
                    <select onChange={handleNetBankingOptionChange}>
                      <option>Select an option</option>
                      <option>Airtel Payments Bank</option>
                      <option>HDFC Bank</option>
                      <option>State Bank of India</option>
                      <option>Bank of Baroda</option>
                      <option>Induslnd Bank</option>
                    </select>
                    <button className="net-banking-continue" onClick={handleContinueNetBanking}>Continue</button>
                  </div>
                )}
              </div>
              <div className="circular-icon-wrapper">
                <div
                  className={`circular-icon ${highlightedPaymentMethod === 'netBanking' ? 'highlighted' : ''}`}
                  onClick={() => handlePaymentMethodClick('netBanking')}
                >
                  <div className="inner-icon blue"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  
      {showUpiSuccessOverlay && (
        <UpiSuccessOverlay onClose={handleCloseUpiSuccessOverlay} selectedPaymentMethod={selectedPaymentMethod} />
      )}
      {showCardDetailsSuccessOverlay && (
        <CardDetailsSuccessOverlay onClose={handleCloseCardDetailsSuccessOverlay} />
      )}
      {showNetBankingSuccessOverlay && (
        <NetBankingSuccessOverlay
          onClose={handleCloseNetBankingSuccessOverlay}
          selectedNetBankingOption={selectedNetBankingOption}
        />
      )}
    </div>
  );
};

const UpiSuccessOverlay = ({ onClose, selectedPaymentMethod }) => {
  let paymentMethodName;
  if (selectedPaymentMethod === 'phonepe') {
    paymentMethodName = 'PhonePe';
  } else if (selectedPaymentMethod === 'paytm') {
    paymentMethodName = 'Paytm';
  } else if (selectedPaymentMethod === 'googlepay') {
    paymentMethodName = 'Google Pay';
  } else {
    paymentMethodName = 'UPI';
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className="close-icon-2" onClick={onClose} />
        <h2>UPI Payment Successful</h2>
        <p>Your payment through {paymentMethodName} has been processed successfully. Thank you!</p>
      </div>
    </div>
  );
};


const CardDetailsSuccessOverlay = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className="close-icon-3" onClick={onClose} />
        <h2>Card Payment Successful</h2>
        <p>Your card payment has been processed successfully. Thank you for your purchase!</p>
      </div>
    </div>
  );
};

const NetBankingSuccessOverlay = ({ onClose, selectedNetBankingOption }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className="close-icon-4" onClick={onClose} />
        <h2>Net Banking Payment Successful</h2>
        <p>Your payment through {selectedNetBankingOption} has been processed successfully. Thank you for your purchase!</p>
      </div>
    </div>
  );
};

export default PaymentPage;