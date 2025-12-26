
import {Link} from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineMail, AiOutlinePlus } from 'react-icons/ai';
import { BsGear, BsPerson, BsGraphUp, BsBell } from 'react-icons/bs';
export default function SideBar() {
    return (
          <aside className=''>
            <div className="flex flex-col gap-y-4 p-2.5 bg-[#22C55E] h-auto">
            <div className="">
                <AiOutlineDashboard className="sidebar-icon icon-pulse-on-hover"  title='Go to Main Dashboard' />
            </div>
            <div className="">
                <Link to={"/cpanel/users"}>
                    <BsPerson className="sidebar-icon icon-pulse-on-hover" title='Go to User Manager'/>
                </Link>
            </div>
            <div className="">
                <Link to={"/cpanel/stats"}>
                     <BsGraphUp className="sidebar-icon icon-pulse-on-hover" title='Go to Statistics' />
                </Link>
            </div>
            <div className="">
                <Link to={"/cpanel/projects"}>
                    <AiOutlinePlus className="sidebar-icon icon-pulse-on-hover"  title='Add New Project' />
                </Link>
            </div>
            
           <div className="">
                <Link to={"/cpanel/notifications"}>
                    <BsBell className="sidebar-icon icon-spin-on-hover icon-wiggle-on-hover" title='Notifications' />
                </Link>
           </div>
            <div className="">
                <Link to={"/cpanel/email"}>
                    <AiOutlineMail className="sidebar-icon icon-wiggle-on-hover" title='Emails' />
                </Link>
            </div>
            <div className="">
                <Link to ={"/cpanel/settings"}>
                    <BsGear className="sidebar-icon icon-spin-on-hover" title='Settings' />
                </Link>
            </div>
            </div>
        </aside>
    )
}