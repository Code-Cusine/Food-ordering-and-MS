import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import './App.css';
import Footer from './components/Footer/Footer';
import Product from './Pages/Product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import men_banner from './components/assets/banner_mens.png';
import women_banner from './components/assets/banner_women.png';
import kid_banner from './components/assets/banner_kids.png';
import LoginPage from './components/LoginPage/LoginPage';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import PaymentPage from './components/PaymentPage/PaymentPage';

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        {/* Navbar should always be outside Routes */}
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="Drinks" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginPage onClose={() => console.log('Close button clicked')} />} />
          <Route path='/register' element={<Register onClose={() => console.log('Close button clicked')} />} />
          <Route path='/payment' element={<PaymentPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
