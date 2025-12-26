
// CLIENT LAYOUT
import { Outlet } from "react-router-dom";
import NavBarComponent from './pages/rt-dashboard/components/NavBar';
import FooterComponent from './pages/rt-dashboard/components/FooterComponent';
import { ScrollRestoration } from 'react-router-dom';
export default function AppLayout() {
    // const matches = useMatches();
    // const isNotFound = matches.length === 0;
    return(
        <div className='flex flex-col min-h-screen bg-[#]'>
            <NavBarComponent />
            <ScrollRestoration />
            {/* <RouteLoader disabled={isNotFound} /> */}
            {/* 2. Main content wrapper - GLOBAL CLIENT SPACING */}
            {/* pt-24 (96px) ensures content starts below the fixed nav */}
            {/* !! IMportant styles page -  mt-2 p-3 !! --> <div className="mx-auto md:gap-8 max-w-[1280px] mt-2 p-3 bg-[#E5E5E5] drop-shadow-lg drop-shadow-blue-500/50  overflow-hidden">*/}
            <main className="flex-grow py-24 md:py-26 ">
                <Outlet />
            </main>
            <FooterComponent />
        </div>
    )
}





