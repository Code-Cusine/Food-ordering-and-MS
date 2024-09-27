import React, { useState } from 'react';
import './PaymentPage.css';
import phonepe from '../assets/phonepe-logo-icon.svg';
import paytm from '../assets/paytm-icon_1.png';
import googlepay from '../assets/google-pay-icon.webp';
import { FaTimes,FaMoneyBillAlt, FaAmazonPay, FaCreditCard, FaUniversity } from 'react-icons/fa';

/* State control variables for various functionalities */
const PaymentPage = () => {
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
       // Reset showCodOverlay to false when deselecting Cash on Delivery
    }
  } else {
    setSelectedPaymentMethod(method);
    setHighlightedPaymentMethod(method);
    if (method === 'creditCard') {
      setShowCardDetailsModal(true);
    } else if (method === 'netBanking') {
      setShowNetBankingOptions(!showNetBankingOptions);
    } else if (method === 'cashOnDelivery') {
      setShowCodOverlay(true);
      // Set showCodOverlay to true when selecting Cash on Delivery
    }else if (['phonepe', 'paytm', 'googlepay'].includes(method)) {
        setUpiId('');
        setIsValidUpiId(true);
        setUpiInputPlaceholder(`Enter ${method === 'phonepe' ? 'PhonePe' : method === 'paytm' ? 'Paytm' : 'Google Pay'} UPI ID`);
      }
   
     
    
  }
};


  /*UPI ID type checking*/ 
  const handleUpiIdChange = (e) => {
    const enteredUpiId = e.target.value;
    const isValid = /^[0-9]{10}@[a-z]{3,}$/.test(enteredUpiId);
    setIsValidUpiId(isValid);
    setUpiId(enteredUpiId);
  };
  
  /*Successful Submission of UPI ID */
  const handleUpiIdSubmit = (e) => {
    e.preventDefault();
    if (/^[0-9]{10}@[a-z]{3,}$/.test(upiId)) {
     setShowUpiSuccessOverlay(true);     
      setUpiId('');
    } else {
      alert('Invalid UPI ID');
    }
  };

  const handleCloseUpiSuccessOverlay = () => {
    setShowUpiSuccessOverlay(false);
  };

  
  
  /*Conditional displaying of  credit/debit card overlay */
  const handleCloseCardDetailsModal = () => {
    setShowCardDetailsModal(false);
    setHighlightedPaymentMethod(null);
  };

  

  /*Selection of net Banking option */
  const handleNetBankingOptionChange = (e) => {
    setSelectedNetBankingOption(e.target.value);
  };

   /*Successful alert message for net banking */
  const handleContinueNetBanking = () => {
    if (selectedNetBankingOption && selectedNetBankingOption !== 'Select a option') {
    setShowNetBankingSuccessOverlay(true);
    } else {
      alert('Please select a Net Banking option.');
    }
   
  };

  const handleCloseNetBankingSuccessOverlay = () => {
    setShowNetBankingSuccessOverlay(false);
    setHighlightedPaymentMethod(null);
  };

  /*Handling successful CVV Submit for Credit/Debit Card */
  const handleCvvSubmit = (cvv) => {
    if (cvv) {
      setShowCardDetailsSuccessOverlay(true);
      setShowCvvModal(false);
      setHighlightedPaymentMethod(null);
    } else {
      alert('Please enter the CVV');
    }
  };

  /*Closing of CVV Overlay */
  const handleCloseCvvModal = () => {
    setShowCvvModal(false);
    //setHighlightedPaymentMethod(null);
  };

  const handleCloseCardDetailsSuccessOverlay = () => {
    setShowCardDetailsSuccessOverlay(false);
   
  };  


  return (
    <div className="payment-page-container">
      <div className="payment-page">
        <div className="payment-container">

          <div className="recommended-container">
          {/* Recommended Section for Cash on Delivery Logic */}
            <h2>RECOMMENDED</h2>
            <div className="payment-method">
              <div className="payment-icon">

                {/*Below represents COD icon */}
                 <FaMoneyBillAlt />
              </div>
              <div className="payment-info">
                <h3>Cash on Delivery/Pay on Delivery</h3>
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
            <h2>Cash on Delivery Selected</h2>
            <p>Your order will be shipped to your registered address where you can pay by Cash/Card/UPI etc</p>
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

          {/* Payment Method section for UPI ID submission Logic */}
          <div className="amazon-pay-container">
            <h2>PAYMENT METHODS</h2>
            <div
              className="payment-method"
              onClick={() => handlePaymentMethodClick("upi")}
            >
              <div className="payment-icon">

                {/*Below Represents Pay Icon*/}
                <FaAmazonPay />
              </div>
              <div className="payment-info">
                <h3>Other UPI Apps</h3>
                
                <div className="icon-container">
                  <img
                    src={phonepe}
                    alt=""
                    onClick={() => handlePaymentMethodClick("phonepe")}
                  />
                  <img
                    src={paytm}
                    alt=""
                    onClick={() => handlePaymentMethodClick("paytm")}
                  />
                  <img
                    src={googlepay}
                    alt=""
                    onClick={() => handlePaymentMethodClick("googlepay")}
                  />
                </div>
                <div className="circular-icon-wrapper">
                <div
                className={`circular-icon ${highlightedPaymentMethod === 'upi' ? 'highlighted' : ''}`}
                onClick={() => handlePaymentMethodClick('upi')}
              >
                <div className="inner-icon blue"></div>
              </div>
              </div>
            </div>
            </div>
          </div>
          <div className="payment-info">
  {(selectedPaymentMethod === "upi" || selectedPaymentMethod === "phonepe" || selectedPaymentMethod === "paytm" || selectedPaymentMethod === "googlepay") && (
              <div>
                <form onSubmit={handleUpiIdSubmit}>
                  <input
                    type="text"
                    placeholder={upiInputPlaceholder}
                    className={`upi-input ${isValidUpiId ? '' : 'invalid-input'}`}
                    value={upiId}
                    onChange={handleUpiIdChange}
                  />
        <button
          className="proceed-button"
          onClick={handleUpiIdSubmit}
          disabled={!isValidUpiId}
        >
          Proceed
        </button>
        {!isValidUpiId && (
          <p className="upi-error-message">
            Please enter a valid UPI ID (e.g:1234567890@bankname)
          </p>
        )}
      </form>
    </div>
  )}
 
</div>
          

          {/* More Ways to Pay Section for Credit Card/Debit Card Payment options*/}
          <div className="other-payment-container">
            <h2>MORE WAYS TO PAY</h2>
            <div
              className="payment-method"
              onClick={() => handlePaymentMethodClick("creditCard")}
            >
              <div className="payment-icon">

                {/*Credit Card Icon below*/}
                 <FaCreditCard />
              </div>
              <div className="payment-info">
                <h3>Credit or debit card</h3>
                <div className="circular-icon-wrapper">
                 <div
                className={`circular-icon ${highlightedPaymentMethod === 'creditCard' ? 'highlighted' : ''}`}
                onClick={() => handlePaymentMethodClick('creditCard')}
              >
                <div className="inner-icon blue"></div>
              </div>
              </div>
            </div>
            </div>

            {/*Net Banking Payment Method */}
            <div className="payment-method">
              <div className="payment-icon">
                {/* Net Banking Icon*/}
                 <FaUniversity />
              </div>
              <div className="payment-info">
                <h3>Net Banking</h3>
                
               {showNetBankingOptions && (
                <div className='net-banking-options'>
                  <select onChange={handleNetBankingOptionChange}>
                    <option>Select a option</option>
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
              <div className="circular-icon-container">
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
      </div>

      {/* Handling the overlay displays of credit card and cvv methods */}
      {showCardDetailsModal && <CardDetailsModal onClose={handleCloseCardDetailsModal} setShowCardDetailsModal={setShowCardDetailsModal} setShowCvvModal={setShowCvvModal}  />}
      {showCvvModal && <CvvModal onSubmit={handleCvvSubmit} onClose={handleCloseCvvModal} />}
      {showUpiSuccessOverlay && (
        <UpiSuccessOverlay onClose={handleCloseUpiSuccessOverlay}  selectedPaymentMethod={selectedPaymentMethod}  />
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

const UpiSuccessOverlay = ({ onClose,selectedPaymentMethod }) => {
 let paymentMethodName;
  if (selectedPaymentMethod === 'phonepe') {
    paymentMethodName = 'PhonePe';
  } else if (selectedPaymentMethod === 'paytm') {
    paymentMethodName = 'Paytm';
  } else if (selectedPaymentMethod === 'googlepay') {
    paymentMethodName = 'Google Pay';
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className="close-icon-2" onClick={onClose} />
        <h2>UPI ID Verified</h2>
        <p>Kindly proceed the payment through the chosen UPI App {paymentMethodName}    
        </p>
      </div>
    </div>
  );
};

const CardDetailsSuccessOverlay = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className="close-icon-3" onClick={onClose} />
        <h2>Card Details Verified</h2>
        <p>Kindly proceed with the payment</p>
      </div>
    </div>
  );
};

const NetBankingSuccessOverlay = ({ onClose, selectedNetBankingOption }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className="close-icon-4" onClick={onClose} />
        <h2>Net Banking Selected</h2>
        <p>You will be securely directed to the {selectedNetBankingOption} portal to enter your password and complete your purchase.</p>
      </div>
    </div>
  );
};


const CardDetailsModal = ({ onClose, setShowCardDetailsModal, setShowCvvModal }) => {
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
      // Card number validation
      const isValid = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/.test(value);
      setIsValidCardNumber(isValid);
    }
    setCardDetails((prevCardDetails) => ({
      ...prevCardDetails,
      [name]: value,
    }));
  };

  /*Card details User Input Logic */ 
  const handleEnterCardDetails = () => {
    if (cardDetails.name === '' || cardDetails.number === '' || cardDetails.expiryMonth === '' || cardDetails.expiryYear === '') {
      alert('All fields are required.');
    }
    else if (!isValidCardNumber) {
      alert('Please enter a valid card number.');
    } else {
      setShowCardDetailsModal(false);
      setShowCvvModal(true);
    }
  };

  /* Display of the Credit Card Overlay */
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className='cvv-close-icon' onClick={onClose} />
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
          required className={isValidCardNumber ? '' : 'invalid-input'}
        />
       
        <div className="expiry-date">
          <select
            name="expiryMonth"
            value={cardDetails.expiryMonth}
            onChange={handleCardDetailsChange} 
            required
          >
            <option value="">Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select
            name="expiryYear"
            value={cardDetails.expiryYear}
            onChange={handleCardDetailsChange}
          >
            <option value="">Year</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>
        </div>
        <button className="enter-card-details" onClick={handleEnterCardDetails}>Enter Card Details</button>
          {!isValidCardNumber && <p className="error-message">Please enter a valid card number in the format "1234 5678 9012 3456"</p>}
      </div>
    </div>
  );
};

/* Defining CVV Validation Logic */
const CvvModal = ({ onSubmit,onClose }) => {
  const  [cvv, setCvv] = useState('');
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
    }
  };

  /* CVV Overlay display */
  return (
    <div className="modal-overlay">
      <div className="modal-content">
         <FaTimes className='cvv-close-icon' onClick={onClose} />
        <h2>Enter CVV</h2>
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={handleCvvChange} className={isValidCvv ? '' : 'invalid-input'}
        />
        {!isValidCvv && <p className="error-message">Please enter a valid 3-digit CVV</p>}
        <button className="proceed-button" onClick={handleSubmit} disabled={!isValidCvv}>Proceed</button>
      </div>
    </div>
  );
};

export default PaymentPage; 