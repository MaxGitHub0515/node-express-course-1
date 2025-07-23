
import {Link} from 'react-router-dom';

// MAIN Admin Dashboard Sidebar 
import SideBar from './components/SibeBar';
// Line Chart 
import LineChartComponent from './components/LineChart';

export default function AdminPage() {
    return (
        <>
    <div className='flex gap-x-1'>
        <SideBar/>
        <main className='lg:w-full md:w-full p-3 pounded=lg shadow-lg bg-[#F5F5F5]'>
          <div className='flex justify-between'>
            {/* Header */}
            <div className='text-1xl font-bold text-gray-800'>Admin Dashboard</div>
            
            <div className='flex gap-x-6 tracking-wide'>
                <div className='flex flex-col items-center'>
                    <span className='text-xs font-bold text-gray-400 uppercase font-medium'>version </span>
                    <span className='text-xs'>1.0.0</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-xs text-gray-400 uppercase font-medium'>Last updated</span>
                    <span className='text-xs'>10/7/2025</span>
                </div>
            </div>
          </div>
          {/* MAIN Admin Dashboard Management */}
          <div className='flex gap-x-4'>
            <aside>
                <ul className='flex flex-col gap-y-0.5 text-xs min-w-32 min-h-96 px-3 py-2 overflow-y-scroll border border-gray-300' >
                    <li>
                        <Link to={"/cpanel/dashboard/maintenance"} className='text-gray-700 hover:text-green-600 transition-colors duration-200' title='Maintance Mode Switch'>Maintenance</Link>
                    </li>
                    <li>
                        <Link to={"/cpanel/users"} className='text-gray-700 hover:text-green-600 transition-colors duration-200' title="Manual Action Queue">Task Runner</Link>
                    </li>
                    <li>
                        <Link to={"/cpanel/users"} className='text-gray-700 hover:text-green-600 transition-colors duration-200'>System Health</Link>
                    </li>
                  
                    <li>
                    <Link to={"/cpanel/users"} className='text-gray-700 hover:text-green-600 transition-colors duration-200' title='Admin Sessions'>Logs Review</Link>
                    </li>
                </ul>
            </aside>
          <LineChartComponent/>
        </div>
        </main>
       </div>
        </>
    )



}