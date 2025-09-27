import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'
import {BrowserRouter} from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
       <AuthContextProvider>
      <SocketContextProvider>
         <App />
      </SocketContextProvider>
       </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
