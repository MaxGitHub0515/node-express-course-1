

import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg"
export default function NavBarComponent() {
    return (
          <div className="w-screen  bg-[#1E1E1E] p-8 flex items-center justify-center gap-8 md:gap-48 sm:gap-x-6 ">
            <div className="flex items-center ">
                   <Link to={"/main-dashboard"} >
                    <img src={logo}
                        alt=""
                        className="w-10 h-10 inline-block  "
                        color="#F5F5F5"
                     />
                 </Link>
            </div>
           <ul className="flex items-center gap-8 sm:gap-12 md:gap-x-24 ">
            
            <li className="">
                <Link to={"/main-dashboard"}  className="text-xs sm:text-sm md:text-base text-[#F5F5F5] tracking-wider  hover:underline">Main Dashboard</Link>
            </li>
            <li className="">
                <Link to={"/contact"} className="text-xs sm:text-sm md:text-base text-[#F5F5F5] tracking-widest hover:underline">Contact</Link>
            </li>

           </ul>

        
        </div>
    )
}