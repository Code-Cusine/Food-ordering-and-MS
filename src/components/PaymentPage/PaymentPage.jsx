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
import qrcode from "../assets/qrcodeimage.png"

const CardDetailsModal = ({ onClose, onSubmit }) => {
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
  });

  const [isValidCardNumber, setIsValidCardNumber] = useState(true); 

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    if (name === 'number') {
      const isValid = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/.test(value);
      setIsValidCardNumber(isValid);
    }
    setCardDetails((prevCardDetails) => ({
      ...prevCardDetails,
      [name]: value,
    }));
  };

  const handleEnterCardDetails = () => {
    if (cardDetails.name === '' || cardDetails.number === '' || cardDetails.expiryMonth === '' || cardDetails.expiryYear === '') {
      toast.error('All fields are required.', { position: "top-right" });
      return;
    }
    
    if (!isValidCardNumber) {
      toast.error('Please enter a valid card number.', { position: "top-right" });
      return;
    }

    onSubmit(cardDetails);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className='cvv-close-icon1' onClick={onClose} />
        <h2>Enter Card Details</h2>
        <p>Please ensure your card is enabled for online transactions.</p>
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={cardDetails.name}
          onChange={handleCardDetailsChange}
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          value={cardDetails.number}
          onChange={handleCardDetailsChange}
          required 
          className={isValidCardNumber ? '' : 'invalid-input'}
        />
       
        <div className="expiry-date">
          <select
            name="expiryMonth"
            value={cardDetails.expiryMonth}
            onChange={handleCardDetailsChange} 
            required
          >
            <option value="">Month</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 
              'July', 'August', 'September', 'October', 'November', 'December']
              .map((month, index) => (
                <option key={month} value={String(index + 1).padStart(2, '0')}>
                  {month}
                </option>
              ))
            }
          </select>
          <select
            name="expiryYear"
            value={cardDetails.expiryYear}
            onChange={handleCardDetailsChange}
            required
          >
            <option value="">Year</option>
            {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <button 
          className="enter-card-details" 
          onClick={handleEnterCardDetails}
        >
          Enter Card Details
        </button>
        {!isValidCardNumber && <p className="error-message">Please enter a valid card number in the format "1234 5678 9012 3456"</p>}
      </div>
    </div>
  );
};

const CvvModal = ({ onSubmit, onClose }) => {
  const [cvv, setCvv] = useState('');
  const [isValidCvv, setIsValidCvv] = useState(true);

  const handleCvvChange = (e) => {
    const enteredCvv = e.target.value;
    const isValid = /^\d{3}$/.test(enteredCvv);
    setIsValidCvv(isValid);
    setCvv(enteredCvv);
  };

  const handleSubmit = () => {
    if (/^\d{3}$/.test(cvv)) {
      onSubmit(cvv);
    } else {
      setIsValidCvv(false);
      toast.error('Please enter a valid 3-digit CVV', { position: "top-right" });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className='close-icon1' onClick={onClose} />
        <h2>Enter CVV</h2>
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={handleCvvChange} 
          className={isValidCvv ? '' : 'invalid-input'}
        />
        {!isValidCvv && <p className="error-message">Please enter a valid 3-digit CVV</p>}
        <button 
          className="proceed-button" 
          onClick={handleSubmit} 
          disabled={!isValidCvv}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const {
    orderItems,
    customerName,
    phoneNumber,
    setShowOrderOverlay
  } = useOrder();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [highlightedPaymentMethod, setHighlightedPaymentMethod] = useState(null);
  const [showCardDetailsModal, setShowCardDetailsModal] = useState(false);
  const [showCvvModal, setShowCvvModal] = useState(false);
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
    setIsLoading(false);
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
    if (isPaymentProcessed) {
      setShowPaymentProcessedOverlay(true);
      setIsLoading(false);
      return;
    }
    setSelectedPaymentMethod(method);
    setHighlightedPaymentMethod(method);
    setShowCardDetailsModal(true);

  };

  const handleCardDetailsSubmit = (cardDetails) => {
    // Here you can add additional validation if needed
    setShowCardDetailsModal(false);
    setShowCvvModal(true);
  };

  const handleCvvSubmit = async (cvv) => {
    try {
      setIsLoading(true);
      setShowCvvModal(false);
      
      // Process card payment with stored card details
      await processPayment('Card');
      
    
    } catch (error) {
      toast.error('Payment processing failed', { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCashPayment = () => {
    processPayment('Cash');
  };

  const handleCardPayment = () => {
    processPayment('Card');
  };

  const generateReceipt = (grandTotal, paymentType) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Receipt", 10, 10);
    
    // Set normal font for all other content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    // Customer name
    doc.text(`Customer Name: ${customerName}`, 10, 20);
    
    // Order details header
    doc.text("Order Details:", 10, 30);
    
    // Order items with proper formatting and line breaks
    let yPosition = 40;
    const lineHeight = 7; // Reduced line height for better spacing
    const maxWidth = 180; // Slightly reduced max width to ensure margins
    
    orderItems.forEach((item, index) => {
        // Split item details into multiple parts for better control
        const itemNumber = `${index + 1}.`;
        const itemName = item.name;
        const quantity = `Quantity: ${item.quantity}`;
        const amount = `Amount: ₹${item.price.toFixed(2)}`;
        const total = `Total: ₹${(item.price * item.quantity).toFixed(2)}`;
        
        // Calculate positions for each part
        doc.text(itemNumber, 10, yPosition);
        doc.text(itemName, 20, yPosition);
        doc.text(quantity, 10, yPosition + lineHeight);
        doc.text(amount, 80, yPosition + lineHeight);
        doc.text(total, 150, yPosition + lineHeight);
        
        yPosition += lineHeight * 2; // Move to next item with spacing
    });
    
    // Grand total and payment method
    yPosition += lineHeight;
    doc.text(`Grand Total: ₹${grandTotal.toFixed(2)}`, 10, yPosition);
    yPosition += lineHeight;
    doc.text(`Paid By: ${paymentType}`, 10, yPosition);
    
    doc.save(`receipt_${customerName}_${Date.now()}.pdf`);
};

  const processPayment = async (paymentType) => {
    if (isPaymentProcessed) {
      setShowPaymentProcessedOverlay(true);
      setIsLoading(false);
      return;
    }

    // Show loading toast
    const loadingToastId = toast.loading('Processing your payment...', { 
      position: "top-center",
      autoClose: false 
    });

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

      // Update loading toast
      toast.update(loadingToastId, { 
        render: 'Creating order...', 
        type: "info",
        isLoading: true 
      });

      const orderResponse = await axios.post('http://localhost:5000/api/orders', orderData);
      const { custid, orderid } = orderResponse.data;

      const paymentData = {
        orderid,
        custid,
        grandtotal,
        paymenttype: paymentType,
        paymentstatus: 'Completed',
      };

      // Update loading toast
      toast.update(loadingToastId, { 
        render: 'Finalizing payment...', 
        type: "info",
        isLoading: true 
      });

      await axios.post('http://localhost:5000/api/payments', paymentData);
      
      setShowOrderOverlay(false);
      setIsLoading(false);

      // Update toast to success
      toast.update(loadingToastId, {
        render: 'Payment processed successfully!',
        type: "success",
        isLoading: false,
        autoClose: 3000
      });

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
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }, 7000);

    } catch (error) {
      setIsLoading(false);
      
      // Update toast to error
      toast.update(loadingToastId, {
        render: 'Payment failed. Please try again.',
        type: "error",
        isLoading: false,
        autoClose: 5000
      });
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
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          zIndex: 99999
        }}
      />
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

       {/* Existing overlays and modals */}
       {showCardDetailsModal && (
        <CardDetailsModal 
          onClose={() => {
            setShowCardDetailsModal(false);
            setHighlightedPaymentMethod(null);
          }}
          onSubmit={handleCardDetailsSubmit}
        />
      )}

      {showCvvModal && (
        <CvvModal 
          onClose={() => {
            setShowCvvModal(false);
            setHighlightedPaymentMethod(null);
          }}
          onSubmit={handleCvvSubmit}
        />
      )}


      {showPaymentProcessedOverlay && (
        <PaymentProcessedOverlay onClose={() => setShowPaymentProcessedOverlay(false)} />
      )}
    </div>
  );
};

export default PaymentPage;