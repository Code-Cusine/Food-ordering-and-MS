// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopProvider from './context/ShopContext';
import { OrderProvider } from './context/OrderContext'; // Correct path

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShopProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </ShopProvider>
  </React.StrictMode>
);
