// src/components/PageWrapper/PageWrapper.js
// src/components/PageWrapper/PageWrapper.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import './PageWrapper.css'; // Correct path for PageWrapper styles
import '../Items/combined-item-styles.css'; // Corrected path for combined-item-styles.css

const PageWrapper = ({ children }) => {
  const location = useLocation();

  const getBackgroundClass = () => {
    switch (location.pathname) {
      case '/drinks':
        return 'background-drinks';
      case '/foods':
        return 'background-foods';
      case '/aboutus':
        return 'background-aboutus';
      default:
        return 'background-default';
    }
  };

  return <div className={getBackgroundClass()}>{children}</div>;
};


export default PageWrapper;


