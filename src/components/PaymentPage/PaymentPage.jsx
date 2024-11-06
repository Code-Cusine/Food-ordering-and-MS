import React, { useState } from 'react';
import './PaymentPage.css';
import phonepe from '../assets/phonepe-logo-icon.svg';
import paytm from '../assets/paytm-icon_1.png';
import googlepay from '../assets/google-pay-icon.webp';
import { FaTimes, FaMoneyBillAlt, FaAmazonPay, FaCreditCard } from 'react-icons/fa';
import axios from 'axios';
import { useOrder } from '../../context/OrderContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = () => {
  const {
    orderItems,
    customerName,
    phoneNumber,
    setShowOrderOverlay
  } = useOrder();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); 
  const [highlightedPaymentMethod, setHighlightedPaymentMethod] = useState(null);
  const [showCodOverlay, setShowCodOverlay] = useState(false);
  const [showUpiSuccessOverlay, setShowUpiSuccessOverlay] = useState(false);
  const [showCardDetailsSuccessOverlay, setShowCardDetailsSuccessOverlay] = useState(false);
  const [showNetBankingSuccessOverlay, setShowNetBankingSuccessOverlay] = useState(false);
  const [isPaymentProcessed, setIsPaymentProcessed] = useState(false);
  const [showPaymentProcessedOverlay, setShowPaymentProcessedOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentMethodClick = (method) => {
    setIsLoading(true);
    if (selectedPaymentMethod === method) {
      setSelectedPaymentMethod(null);
      setHighlightedPaymentMethod(null);
      if (method === 'cashOnDelivery') {
        setShowCodOverlay(false);
      } else if (method === 'upi') {
        setShowUpiSuccessOverlay(false);
      }
      setIsLoading(false);
    } else {
      setSelectedPaymentMethod(method);
      setHighlightedPaymentMethod(method);
      if (method === 'creditCard') {
        handleCardPayment();
      } else if (method === 'cashOnDelivery') {
        handleCashPayment();
      } else if (method === 'upi') {
        handleUpiPayment();
      }
    }
  };

  const handleUpiPayment = () => {
    processPayment('UPI');
  };

  const handleUpiMethodClick = (method) => {
    setSelectedPaymentMethod(method);
    setHighlightedPaymentMethod(method);
    handleUpiPayment();
  };

  const handleCardMethodClick = (method) => {
    setSelectedPaymentMethod(method);
    setHighlightedPaymentMethod(method);
    handleCardPayment();
  };

  const handleCashPayment = () => {
    processPayment('Cash');
  };

  const handleCardPayment = () => {
    processPayment('Card');
  };

  const processPayment = async (paymentType) => {
    if (isPaymentProcessed) {
      setShowPaymentProcessedOverlay(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true); // Show loading bar

    try {
      const grandtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

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

      const paymentData = {
        orderid,
        custid,
        grandtotal,
        paymenttype: paymentType,
        paymentstatus: 'Completed',
      };

      await axios.post('http://localhost:5000/api/payments', paymentData);

      setIsPaymentProcessed(true);

      if (paymentType === 'Card') {
        setShowCardDetailsSuccessOverlay(true);
      } else if (paymentType === 'UPI') {
        setShowUpiSuccessOverlay(true);
      } else if (paymentType === 'Net Banking') {
        setShowNetBankingSuccessOverlay(true);
      } else if (paymentType === 'Cash') {
        setShowCodOverlay(true);
      }

      setShowOrderOverlay(false);
      
      toast.success('Payment processed successfully!', { position: "top-right" });
    } catch (error) {
      console.error('Error processing order and payment:', error);
      toast.error('There was an error processing your order. Please try again.', { position: "top-right" });
    } finally {
      setIsLoading(false); // Hide loading bar
    }
  };

  const handleCloseUpiSuccessOverlay = () => {
    setShowUpiSuccessOverlay(false);
  };

  const handleCloseNetBankingSuccessOverlay = () => {
    setShowNetBankingSuccessOverlay(false);
    setHighlightedPaymentMethod(null);
  };

  const handleCloseCardDetailsSuccessOverlay = () => {
    setShowCardDetailsSuccessOverlay(false);
  };

  const PaymentProcessedOverlay = ({ onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <FaTimes className="close-icon1" onClick={onClose} />
          <h2>Payment Already Processed</h2>
          <p>This order has already been paid for. Thank you!</p>
          {isLoading && (
            <div className="payment-processed-loading-bar">
              <div className="loading-bar-inner" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="payment-page-container">
      <ToastContainer />
      {isLoading && (
        <div className="loading-bar-container">
          <div className="loading-bar-inner" />
        </div>
      )}
      
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
                      e.stopPropagation();
                      handleUpiMethodClick("phonepe");
                    }}
                  />
                  <img
                    src={paytm}
                    alt="Paytm"
                    className="upi-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpiMethodClick("paytm");
                    }}
                  />
                  <img
                    src={googlepay}
                    alt="Google Pay"
                    className="upi-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpiMethodClick("googlepay");
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
                  handleCardMethodClick("creditCard");
  }}
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
      {showPaymentProcessedOverlay && (
        <PaymentProcessedOverlay onClose={() => setShowPaymentProcessedOverlay(false)} />
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