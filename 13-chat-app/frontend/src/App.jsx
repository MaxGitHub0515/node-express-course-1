import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {Home} from './pages/home/Home.jsx';
import {Login} from './pages/login/Login.jsx';
import {SignUp} from './pages/signup/SignUp.jsx';

import { Route, Routes } from 'react-router-dom';
import SideBar from './components/sidebar/SideBar.jsx';
import NotFound from './pages/404/NotFound.jsx';

function App() {
  return (
   <div className="p-4 min-h-screen flex items-center justify-center">
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/sidebar" element={<SideBar />} />
    <Route path="*" element={<NotFound />} />
    </Routes>
   <Toaster />
   </div>
  )
}

export default App
