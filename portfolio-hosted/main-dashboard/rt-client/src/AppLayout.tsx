import RouteLoader from './components/UI/RouteLoader.tsx';
import {Toaster} from 'react-hot-toast';
import VisitLogger from "./pages/admin/components/VisitLogger.tsx"
import { Outlet, useMatches } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
export default function AppLayout() {
    const matches = useMatches();
    const isNotFound = matches.length === 0;
    return(
        <>
        <VisitLogger />
        <RouteLoader disabled={isNotFound} />
        <Outlet />
        <Toaster/>
        {/* Vercel */}
        <Analytics />
        </>
    )
}