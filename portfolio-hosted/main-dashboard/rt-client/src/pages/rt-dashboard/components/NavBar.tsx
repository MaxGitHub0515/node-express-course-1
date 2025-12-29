

import { Link } from "react-router-dom";


import { CiLogin } from "react-icons/ci";
export default function NavBarComponent() {
    return (
        <nav className="w-full bg-[#1E1E1E] py-6 px-8 md:px-16 fixed top-0 z-50 border-b border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* Logo - Far Left */}
                <div className="flex-shrink-0">
                    <Link to="/">
                        <img 
                            src="https://res.cloudinary.com/dixiuoxw2/image/upload/v1753813816/logo_prg3wf.svg"
                            alt="Logo"
                            className="w-10 h-10 brightness-200 hover:grayscale opacity-90 "
                        />
                    </Link>
                </div>

                {/* Navigation Links - Far Right */}
                <ul className="flex items-center gap-8 sm:gap-12 md:gap-16">
                    <li>
                        <Link 
                            to="/main-dashboard" 
                            className="text-[10px] md:text-[11px] font-medium text-white/70 tracking-[0.2em] hover:text-white hover:underline transition-colors uppercase"
                        >Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/contact" 
                            className="text-[10px] md:text-[11px] font-medium text-white/70 tracking-[0.2em] hover:text-white hover:underline transition-colors uppercase"
                        >Contact
                        </Link>
                    </li>
                    {/* AUTH */}
                    <li className="flex items-center gap-4 sm:gap-8 md:gap-12"> 
                        {/*  Divider (Hidden on very small screens) */}
                        <div className="h-4 w-[1px] bg-white/20"></div>

                        {/* 2. Auth Icon */}
                        <Link 
                            to="/cpanel" 
                            title="Admin Login"
                            className="text-white/70 hover:text-white transition-colors opacity-80 hover:opacity-100"
                        >
                            <CiLogin size={22} />
                        </Link>
                    </li>
                    {/* !!! AUTH SECTION END !!! */}
                </ul>
             

            </div>
        </nav>
    );
}