import React, { useState } from 'react';
import './PaymentPage.css';

import phonepe from '../assets/phonepe-logo-icon.svg';
import paytm from '../assets/paytm-icon_1.png';
import googlepay from '../assets/google-pay-icon.webp';
import { FaTimes, FaMoneyBillAlt, FaAmazonPay, FaCreditCard } from 'react-icons/fa';
import axios from 'axios';
import { useOrder } from '../../context/OrderContext';
import LoadingOverlay from './LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import qrcode from "../assets/feb880db-a7c8-4411-a551-c40dcf083c0a_GooglePay_QR.png"

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
  const [isLoading, setIsLoading] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [isPaymentProcessed, setIsPaymentProcessed] = useState(false);
  const [showPaymentProcessedOverlay, setShowPaymentProcessedOverlay] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const navigate = useNavigate();

  const handlePaymentMethodClick = (method) => {
    setIsLoading(true);
    if (selectedPaymentMethod === method) {
      setSelectedPaymentMethod(null);
      setHighlightedPaymentMethod(null);
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
    if (isPaymentProcessed) {
      setShowPaymentProcessedOverlay(true);
      setIsLoading(false);
      return;
    }
    
    setShowQRCode(true);
  
    // After 15 seconds, hide QR code and proceed with payment processing
    setTimeout(() => {
      setShowQRCode(false);
      if (!isPaymentProcessed) {
        processPayment('UPI');
      } else {
        setShowPaymentProcessedOverlay(true);
        setIsLoading(false);
      }
    }, 15000);
  };

  const handleUpiMethodClick = (method) => {
    setSelectedPaymentMethod(method);
    setHighlightedPaymentMethod(method);
    handleUpiPayment();
  };

  const handleCardMethodClick = (method) => {
    setIsLoading(true);
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

  const generateReceipt = (grandTotal, paymentType) => {
    const doc = new jsPDF();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Receipt", 10, 10);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Customer Name: ${customerName}`, 10, 20);
    
    doc.text("Order Details:", 10, 30);
    
    let yPosition = 40;
    const maxWidth = 190;
    orderItems.forEach((item, index) => {
      const itemDetails = `${index + 1}. ${item.name} | Quantity: ${item.quantity} | Amount: ₹${item.price.toFixed(2)} | Total: ₹${(item.price * item.quantity).toFixed(2)}`;
      doc.text(itemDetails, 10, yPosition, { maxWidth: maxWidth, align: "left" });
      yPosition += 10;
    });
    
    yPosition += 10;
    doc.text(`Grand Total: ₹${grandTotal.toFixed(2)}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Paid By: ${paymentType}`, 10, yPosition);
    
    doc.save(`receipt_${customerName}_${Date.now()}.pdf`);
  };

  const processPayment = async (paymentType) => {
    if (isPaymentProcessed) {
      setShowPaymentProcessedOverlay(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

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
      
      setShowOrderOverlay(false);
      setIsLoading(false);

      toast.success('Payment processed successfully!', { position: "top-right" });

      setIsPaymentProcessed(true);

      if (paymentType === 'Card') {
        setShowCardDetailsSuccessOverlay(true);
      } else if (paymentType === 'UPI') {
        setShowUpiSuccessOverlay(true);
      } else if (paymentType === 'Cash') {
        setShowCodOverlay(true);
      }

      setReceiptData({
        customerName,
        orderItems,
        grandtotal,
        paymentType,
      });

      setShowReceiptModal(true);

      setTimeout(() => {
        setShowReceiptModal(false);
        navigate('/');
      }, 25000);

    } catch (error) {
      setIsLoading(false);
      toast.error('There was an error processing your order. Please try again.', { position: "top-right" });
    }
  };

  const QRCodeOverlay = () => {
    return (
      <div className="modal-overlay">
        <div className="modal-content qr-code-container">
          <FaTimes className="close-icon" onClick={() => setShowQRCode(false)} />
          <h2>Scan QR Code to Pay</h2>
          <img 
            src={qrcode}
            alt="Payment QR Code" 
            className="qr-code-image"
          />
          <p>Please scan this QR code using your UPI app</p>
          <div className="qr-timer">Time remaining: 15 seconds</div>
        </div>
      </div>
    );
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
       {showQRCode && <QRCodeOverlay />}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="loading-bar">
              <div className="loading-bar-inner" />
            </div>
            <p>Payment Processing</p>
          </div>
        </div>
      )}

      {showReceiptModal && receiptData && (
        <div className="receipt-modal-overlay">
          <div className="receipt-modal">
            <h2>Payment Receipt</h2>
            <div className="receipt-content">
              <p><strong>Customer Name:</strong> {receiptData.customerName}</p>
              <p><strong>Order Summary:</strong></p>
              <ul>
                {receiptData.orderItems.map((item, index) => (
                  <li key={index} className="receipt-item">
                    {item.name} - Quantity: {item.quantity}, Price: ₹{item.price}, Total: ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p className="receipt-total"><strong>Grand Total:</strong> ₹{receiptData.grandtotal.toFixed(2)}</p>
              <p><strong>Paid By:</strong> {receiptData.paymentType || "N/A"}</p>
            </div>
            <div className="button-container">
              <button
                className="download-button"
                onClick={() => generateReceipt(receiptData.grandtotal, receiptData.paymentType)}
              >
                Download Receipt
              </button>
              <button 
                className="close-button"
                onClick={() => setShowReceiptModal(false)}
              >
                Close
              </button>
            </div>
          </div>
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
              onClick={() => handlePaymentMethodClick('upi')}
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
                      handleUpiMethodClick('phonepe');
                    }}
                  />
                  <img
                    src={paytm}
                    alt="Paytm"
                    className="upi-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpiMethodClick('paytm');
                    }}
                  />
                  <img
                    src={googlepay}
                    alt="Google Pay"
                    className="upi-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpiMethodClick('googlepay');
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
                <h3>Credit or Debit Card</h3>
              </div>
              <div className="circular-icon-wrapper">
                <div
                  className={`circular-icon ${highlightedPaymentMethod === 'creditCard' ? 'highlighted' : ''}`}
                  onClick={(e) => { 
                    e.stopPropagation();
                    handleCardMethodClick('creditCard');
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
        <div className="modal-overlay">
          <div className="modal-content">
            <FaTimes className="close-icon-2" onClick={() => setShowUpiSuccessOverlay(false)} />
            <h2>UPI Payment Successful</h2>
            <p>Your payment through UPI has been processed successfully. Thank you!</p>
          </div>
        </div>
      )}

      {showCardDetailsSuccessOverlay && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FaTimes className="close-icon-3" onClick={() => setShowCardDetailsSuccessOverlay(false)} />
            <h2>Card Payment Successful</h2>
            <p>Your card payment has been processed successfully. Thank you for your purchase!</p>
          </div>
        </div>
      )}

      {showPaymentProcessedOverlay && (
        <PaymentProcessedOverlay onClose={() => setShowPaymentProcessedOverlay(false)} />
      )}
    </div>
  );
};

export default PaymentPage;