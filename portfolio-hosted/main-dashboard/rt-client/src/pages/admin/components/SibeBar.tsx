
import {Link} from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineMail, AiOutlinePlus } from 'react-icons/ai';
import { BsGear, BsPerson, BsGraphUp, BsBell } from 'react-icons/bs';
export default function SideBar() {
    const makeResponsiveIcons = "text-1xl md:text-3xl lg:text-5xl"
    return (
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
    )
}