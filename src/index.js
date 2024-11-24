import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import ShopProvider from './context/ShopContext';
import { OrderProvider } from './context/OrderContext'; // Correct path

// Initialize the root React app
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

// Spotlight setup
function initializeSpotlight() {
  const spotlight = document.createElement("div");
  spotlight.className = "spotlight";
  document.body.appendChild(spotlight);

  // Update spotlight position based on cursor movement
  document.addEventListener("mousemove", (e) => {
    const spotlight = document.querySelector(".spotlight");
    spotlight.style.left = `${e.clientX}px`;  // X position at the cursor tip
    spotlight.style.top = `${e.clientY}px`;   // Y position at the cursor tip
  });

  // Optionally, hide the spotlight when the mouse leaves the viewport
  document.addEventListener("mouseleave", () => {
    spotlight.style.opacity = "0"; // Hide spotlight
  });
  document.addEventListener("mouseenter", () => {
    spotlight.style.opacity = "1"; // Show spotlight
  });
}

// Call the function to initialize the spotlight
initializeSpotlight();
