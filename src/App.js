// src/App.js

import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Footer from './components/Footer/Footer';
import DatabaseStatus from './components/DatabaseStatus/DatabaseStatus';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaymentPage from './components/PaymentPage/PaymentPage';
import OrderOverlay from './components/Items/OrderOverlay';
import Aboutus from './components/Aboutus/Aboutus';
import PageWrapper from './components/PageWrapper/PageWrapper'; // Import PageWrapper component
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import './App.css';
import './modern-utils.css'; // Import modern utilities

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <OrderOverlay />
          <DatabaseStatus />
          
          {/* Main Content Area */}
          <main className="main-content">
            <PageWrapper>
              <Routes>
                <Route path='/' element={<Shop />} />
                <Route path='/drinks' element={<ShopCategory category="Drinks" />} />
                <Route path='/foods' element={<ShopCategory category="Food" />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/aboutus' element={<Aboutus />} />
                <Route path='/payment' element={<PaymentPage />} />
              </Routes>
            </PageWrapper>
          </main>

          <Footer />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
