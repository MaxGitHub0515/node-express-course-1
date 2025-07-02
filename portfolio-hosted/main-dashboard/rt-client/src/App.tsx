

import './App.css'
import {Route, Routes} from 'react-router-dom';
import NotFoundPage from './pages/404/NotFoundPage.tsx';
import MainDashboard from './pages/rt-dashboard/MainDashboard.tsx';
import {Toaster} from 'react-hot-toast';

function App() {

  return (
    <>
     <Routes>
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path='*' element={<NotFoundPage />} />
     </Routes>
     <Toaster />
    </>
  )
}

export default App
