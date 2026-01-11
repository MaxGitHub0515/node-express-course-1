// import { Toaster } from 'react-hot-toast';

import { Navigate, Route, Routes } from 'react-router-dom';
import Toaster from "react-hot-toast";
import { useEffect } from 'react';
// PAGES --<<----->>--
import HomePage from './pages/home/HomePage';
//    PAGE: AUTH
import SignUpPage from './pages/auth/SignUpPage';
import LoginPage from './pages/auth/LoginPage';

import AdminPage from "./pages/admin/AdminPage";
import CategoryPage from "./pages/category/CategoryPage";
import CartPage from './pages/cart/CartPage';
//    PAGE: PAYMENTS
import PurchaseSuccessPage from './pages/payment/PurchaseSuccessPage';
import PaymentCancelPage from './pages/payment/PaymentCancelPage';

import NotFoundPage from './pages/false-request/NotFound.js';
//       --<<----->>--

function App() {

  return (
   <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white ">
     <div className="absolute">...</div>
     <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<HomePage/>} />
          <Route path='/login' element={<HomePage/>} />
          <Route path='/admin-dashboard' element={<HomePage/>} />
          <Route path='/category/:category' element={<HomePage/>} />
          <Route path='/cart' element={} />
          <Route path='/purchase-success' element={} />
          <Route path='/purchase-cancel' element={} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
     </div>
     <Toaster />
   </div>
  )
}

export default App
