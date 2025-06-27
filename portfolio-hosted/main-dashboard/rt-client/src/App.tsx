

import './App.css'
import {Route, Routes} from 'react-router-dom';
import MainDashboard from './pages/main-dashboard.tsx';
function App() {

  return (
    <>
     <Routes>
        <Route path="/main-dashboard/:id" element={<MainDashboard />} />
        {/* <Route path="/" */}
      
     </Routes>
    </>
  )
}

export default App
