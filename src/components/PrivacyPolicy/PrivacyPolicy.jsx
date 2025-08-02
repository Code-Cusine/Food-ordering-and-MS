import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <div className="privacy-content">
          <section>
            <h2>Information We Collect</h2>
            <p>
              At Cuisine Code, we collect information you provide directly to us, such as when you create an account, 
              place an order, or contact our customer service.
            </p>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process transactions, 
              and communicate with you about your orders and our services.
            </p>
          </section>

          <section>
            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
              except as described in this privacy policy.
            </p>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at info@cuisinecode.com or 
              call us at +1 (555) 123-4567.
            </p>
          </section>

          <div className="privacy-updated">
            <p><strong>Last updated:</strong> January 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
