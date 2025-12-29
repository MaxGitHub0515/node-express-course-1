// import RouteLoader from './components/UI/RouteLoader';
import {Toaster} from 'react-hot-toast';
import VisitLogger from "./pages/admin/hooks/useVisitLogger"
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import CookieBanner from './components/UI/CookieBanner';
export default function AppLayout() {
    // const matches = useMatches();
    // const isNotFound = matches.length === 0;
    return(
        <div className='flex flex-col min-h-screen bg-[]'>
            {/* FOR NOW - VisitLogger runs everywhere, even on 404s and Admin - CHANGE ITS FUNC..TY LATER */}
            <VisitLogger />
            {/* <RouteLoader disabled={isNotFound} /> */}
            {/* render either PublicLayout or ProtectedLayout */} 
            <Outlet />
            <Toaster/>
            <CookieBanner />
            {/* Vercel */}
            <Analytics />
        </div>
    )
}