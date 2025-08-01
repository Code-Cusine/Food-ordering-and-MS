// src/App.js

import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Footer from './components/Footer/Footer';
import DatabaseStatus from './components/DatabaseStatus/DatabaseStatus';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Register from './components/Register/Register';
import PaymentPage from './components/PaymentPage/PaymentPage';
import OrderOverlay from './components/Items/OrderOverlay';
import Aboutus from './components/Aboutus/Aboutus';
import PageWrapper from './components/PageWrapper/PageWrapper'; // Import PageWrapper component
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <OrderOverlay />
        <DatabaseStatus />
        
        {/* Wrapping Routes in PageWrapper for custom backgrounds */}
        <PageWrapper>
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/drinks' element={<ShopCategory category="Drinks" />} />
            <Route path='/foods' element={<ShopCategory category="Food" />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/aboutus' element={<Aboutus />} />
            {/* Uncomment these when you need to use them */}
            {/* 
            <Route path='/login' element={<LoginPage onClose={() => console.log('Close button clicked')} />} />
            <Route path='/register' element={<Register onClose={() => console.log('Close button clicked')} />} /> 
            */}
            <Route path='/payment' element={<PaymentPage />} />
          </Routes>
        </PageWrapper>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
