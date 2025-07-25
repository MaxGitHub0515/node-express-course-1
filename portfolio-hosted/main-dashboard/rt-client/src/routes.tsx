
import './App.css'
import {createBrowserRouter, Navigate} from 'react-router-dom';
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
// import LoginPage from './pages/admin/LoginPage.tsx';
import AppLayout from './AppLayout.tsx';
import ProtectedLayout from './context/ProtectedLayout.tsx';
import RedirectIfAuthenticated from './context/RedirectIfAuthenticated.tsx';




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
