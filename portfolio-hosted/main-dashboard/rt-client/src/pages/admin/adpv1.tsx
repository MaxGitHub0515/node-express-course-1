
import {Link} from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineMail, AiOutlinePlus } from 'react-icons/ai';
import { BsGear, BsPerson, BsGraphUp, BsBell } from 'react-icons/bs';
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';


export default function AdminPage() {
    //dummy data for charts
const makeResponsiveIcons = "text-1xl md:text-3xl lg:text-5xl"
 const data = [
  { month: 'Jan', users: 400, sales: 2400 },
  { month: 'Feb', users: 600, sales: 3200 },
  { month: 'Mar', users: 800, sales: 2900 },
  { month: 'Apr', users: 700, sales: 3600 },
  { month: 'May', users: 900, sales: 4100 },
];
const MoreData = [
  { month: 'Jan', visits: 400 },
  { month: 'Feb', visits: 600 },
  { month: 'Mar', visits: 800 },
  { month: 'Apr', visits: 700 },
  { month: 'May', visits: 900 },
  { month: 'Jun', visits: 1100 },
  { month: 'Jul', visits: 1000 },
  { month: 'Aug', visits: 1200 },
  { month: 'Sep', visits: 950 },
  { month: 'Oct', visits: 1150 },
  { month: 'Nov', visits: 1300 },
  { month: 'Dec', visits: 1050 },
];

    return (
        <>
    <div className='flex gap-x-1'>
        <aside className=''>
            <div className="flex flex-col gap-y-4 p-2.5 bg-[#22C55E] h-auto ">
            <div className="">

                <AiOutlineDashboard className={`${makeResponsiveIcons} icon-pulse-on-hover`} color="#333"  title='Go to Main Dashboard' />
            </div>
            <div className="">
                <Link to={"/cpanel/users"}>
                    <BsPerson className={`${makeResponsiveIcons} icon-pulse-on-hover`} color="#333" title='Go to User Manager'/>
                </Link>
            </div>
            
            <div className="">
                <Link to={"/cpanel/stats"}>
                     <BsGraphUp className={`${makeResponsiveIcons} icon-pulse-on-hover`}  color="#333" title='Go to Statistics' />
                </Link>
            </div>
            <div className="">
                <Link to={"/cpanel/projects"}>
                    <AiOutlinePlus className={`${makeResponsiveIcons} icon-pulse-on-hover`} color="#333" title='Add New Project' />
                </Link>
            </div>
           <div className="">
                <Link to={"/cpanel/notifications"}>
                    <BsBell className={`${makeResponsiveIcons} icon-spin-on-hover icon-wiggle-on-hover`}   color="#333" title='Notifications' />
                </Link>
           </div>
            <div className="">
                <Link to={"/cpanel/email"}>
                    <AiOutlineMail className={`${makeResponsiveIcons} icon-wiggle-on-hover `} color="#333" title='Emails' />
                </Link>
            </div>
            <div className="">
                <Link to ={"/cpanel/settings"}>
                    <BsGear className={`${makeResponsiveIcons} icon-spin-on-hover`} color="#333" title='Settings' />
                </Link>
            </div>
        
            </div>
        </aside>

        <main className='w-full p-3 pounded=lg shadow-lg bg-[#F5F5F5]'>
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
          {/* Admin Dashboard Management */}
          <div className='flex gap-x-4'>
            <aside>
                <ul className='flex flex-col gap-y-0.5 text-xs min-w-32 min-h-96 px-3 py-2 overflow-y-scroll border border-gray-300' >
                    <li>
                        <Link to={"/cpanel/users"} className='text-gray-700 hover:text-green-600 transition-colors duration-200' title='Maintance Mode Switch'>Maintenance</Link>
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
               {/* Urgent charts for Admin Page
               Area chart Bar chart  Line Chart */}
            <div className='flex gap-x-4 mt-1.5'>
                      {/* Line Charts */}
                <div className="bg-white p-4 rounded-2xl shadow flex flex-col justify-center items-center max-h-64">
                <div className="text-lg font-medium uppercase mb-2 text-center">User Growth</div>
                <ResponsiveContainer width={500} height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="users" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
                </ResponsiveContainer>
               </div>
               
                <div className="bg-white p-4 rounded-2xl shadow flex flex-col justify-center items-center max-h-64">
                <div className="text-lg font-medium uppercase mb-2 text-center">Logs Growth</div>
                <ResponsiveContainer width={500} height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="users" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
                </ResponsiveContainer>
               </div>


        
       

      
            
            
            </div>
        </div>
        </main>
       </div>
        </>
    )



}