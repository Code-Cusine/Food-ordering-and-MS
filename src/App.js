// src/App.js

import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import './App.css';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Register from './components/Register/Register';
import PaymentPage from './components/PaymentPage/PaymentPage';
import OrderOverlay from './components/Items/OrderOverlay'; // Correct path
import Aboutus from './components/Aboutus/Aboutus';

function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Navbar />
        <OrderOverlay />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/drinks' element={<ShopCategory category="Drinks" />} />
          <Route path='/foods' element={<ShopCategory  category="Food" />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/aboutus' element={<Aboutus />}/>
          {/*<Route path='/login' element={<LoginPage onClose={() => console.log('Close button clicked')} />} />
          <Route path='/register' element={<Register onClose={() => console.log('Close button clicked')} />} />*/}
          <Route path='/payment' element={<PaymentPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
