

import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import type  { LinkItem } from "../../../types";
import NavLinks from "../../../components/UI/NavLinks";
import HamburgerMenu from "../../../components/UI/HamburgerMenu";
export default function NavBarComponent() {
    const navItems: LinkItem[] = [
        { label: "Blog", path: "/blog" },
        { label: "Dashboard", path: "/main-dashboard" },
        { label: "Contact", path: "/contact" },
    ];
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
                    {/* IF TO CREATE BLOG: FOLLOWS THE CREATION OF HANMBURGER as REUSABLE COMPONENT */}
                    {/* REUSABLE COMPONENT: FOR HAMBURGER & FOOTER & NAVBAR */}
                    {/* 2. DESKTOP ONLY SECTION (Hidden on Mobile) */}
                <div className="hidden md:flex items-center gap-12">
                    <NavLinks 
                        items={navItems}
                        // replacing ul on div here
                        containerStyles="flex items-center gap-8 sm:gap-12 md:gap-16"
                        linkStyles="text-[10px] md:text-[11px] font-medium text-white/70 tracking-[0.2em] hover:text-white hover:underline transition-colors uppercase"
                    />
                      
                    {/* AUTH */}
                    {/* replacing li on div */}
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-12"> 
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
                    </div>
            </div>
            {/* C. MOBILE VIEW (Hidden on Desktop) */}
                {/* We pass the links PLUS the login button since the icon is hidden on mobile */}
                <HamburgerMenu 
                    links={[
                        ...navItems, 
                        { label: "Login", path: "/cpanel", isButton: true } 
                    ]} 
                />
                </div>
        </nav>
    );
}