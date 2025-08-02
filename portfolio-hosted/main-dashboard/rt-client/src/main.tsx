// import { StrictMode } from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'
import routes from './routes';
import { AuthContextProvider } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
      <AuthContextProvider>
        <RouterProvider router={routes} />
      </AuthContextProvider>
   
)
                                                                                                                          