

import './App.css'
import {Route, Routes, Navigate} from 'react-router-dom';
// import { useMatches } from 'react-router-dom';
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
import MaintenancePage from './pages/admin/MaintenancePage.tsx';
import LoginPage from './pages/admin/LoginPage.tsx';
import {Toaster} from 'react-hot-toast';
import VisitLogger from "./pages/admin/components/VisitLogger.tsx"
import { useAuthContext } from './context/AuthContext.tsx';
import ProtectedLayout from './context/ProtectedLayout.tsx';
import RouteLoader from './components/UI/RouteLoader.tsx';
function App() {
  const {authUser} = useAuthContext();
  // will not work without createBrowserRouter()
  // mounting routeloader globally to disabled-{}, doing it locally in notfoundpage wont help
//   const matches = useMatches();
//   const isNotFound = matches.length === 0;
// console.log("Matches:", matches);
  return (
    <>
    <VisitLogger />
    <RouteLoader />
    {/* <RouteLoader disabled={isNotFound}/> */}
     <Routes>
        <Route path="/main-dashboard" element={<MainDashboardPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/login" element={authUser ? <Navigate to="/cpanel" replace /> : <LoginPage />} />
        {/* restricting access to all the routes  */}
        <Route path="/cpanel" element={<ProtectedLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="stats" element={<StatisticsPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="notifications" element={<NotifyPage />} />
        <Route path="email" element={<EmailPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="dashboard/maintenance" element={<MaintenancePage />} />
        </Route>
       
     </Routes>
     
     <Toaster />
    </>
  )
}

export default App
