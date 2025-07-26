
import './App.css'
import {createBrowserRouter, Navigate} from 'react-router-dom';
// import { useMatches } from 'react-router-dom';
import NotFoundPage from './pages/404/NotFoundPage';
import MainDashboardPage from './pages/rt-dashboard/MainDashboard';
import AdminPage from './pages/admin/AdminPage';
import StatisticsPage from './pages/admin/Statistics';
import ContactPage from './pages/contact/ContactPage';
import UserPage from './pages/admin/UserPage';
import NotifyPage from './pages/admin/NotifyPage';
import EmailPage from './pages/admin/EmailPage';
import SettingsPage from './pages/admin/SettingsPage';
import ProjectsPage from './pages/admin/ProjectsPage';
import MaintenancePage from './pages/admin/MaintenancePage';
// import LoginPage from './pages/admin/LoginPage.tsx';
import AppLayout from './AppLayout';
import ProtectedLayout from './context/ProtectedLayout';
import RedirectIfAuthenticated from './context/RedirectIfAuthenticated';




const routes = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
        {
            path: "/main-dashboard",
            element: <MainDashboardPage />
        },

        {
            path: "/contact",
            element: <ContactPage />
        },

        {
            path: "/auth/login",
            element: <RedirectIfAuthenticated />
        },

        {
        path: "/cpanel",
        element: <ProtectedLayout />,
        children: [
            // adding navigate temporarilt
          {index:true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminPage />,
            children: [
                {path: "maintenance", element: <MaintenancePage />},
                // {path: "task-runner", element: <TaskRunerPage />},
                // {path: "system",  element: <SystemHealthPage />},
                // {path: "logs", element: <LogsReview />}

            ],
          },  
          { path: "stats", element: <StatisticsPage /> },
          { path: "users", element: <UserPage /> },
          { path: "notifications", element: <NotifyPage /> },
          { path: "email", element: <EmailPage /> },
          { path: "projects", element: <ProjectsPage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
        },

        {
            path: "*",
            element: <NotFoundPage />,
        },
    ],
        
    },
]);

export default routes;
