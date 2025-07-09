

import './App.css'
import {Route, Routes} from 'react-router-dom';
import NotFoundPage from './pages/404/NotFoundPage.tsx';
import MainDashboardPage from './pages/rt-dashboard/MainDashboard.tsx';
import AdminPage from './pages/admin/AdminPage.tsx';
import StatisticsPage from './pages/admin/Statistics.tsx';
import ContactPage from './pages/contact/ContactPage.tsx';
import UserPage from './pages/admin/UserPage.tsx';
import NotifyPage from './pages/admin/NotifyPage.tsx';
import EmailPage from './pages/admin/EmailPage.tsx';
import SettingsPage from './pages/admin/SettingsPage.tsx';
import ProjectsPage from './pages/admin/ProjectsPage.tsx';
import {Toaster} from 'react-hot-toast';


function App() {

  return (
    <>
     <Routes>
        <Route path="/main-dashboard" element={<MainDashboardPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path="/cpanel" element={<AdminPage />} />
        <Route path="/cpanel/stats" element={<StatisticsPage />} />
        <Route path="/cpanel/users" element={<UserPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cpanel/notifications" element={<NotifyPage />} />
        <Route path="/cpanel/email" element={<EmailPage />} />
        <Route path="/cpanel/projects" element={<ProjectsPage />} />
        <Route path="/cpanel/settings" element={<SettingsPage />} />
     </Routes>
     <Toaster />
    </>
  )
}

export default App
