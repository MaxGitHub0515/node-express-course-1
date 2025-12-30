

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import NavLinks from './NavLinks'; 
import type { LinkItem } from '../../types'; 
import { useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import Social Icons


interface HamburgerProps {
    links: LinkItem[]; 
} 
const HamburgerMenu = ({ links }: HamburgerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <div className="md:hidden"> 
            
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="relative z-50 p-2 text-gray-300 hover:text-white transition-colors focus:outline-none"
            >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            <div 
                className={`fixed inset-0 bg-[#1E1E1E] z-40 flex flex-col transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-4 pointer-events-none'
                }`}
            >
                {/* Devider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                {/* MAIN SCROLLABLE CONTENT */}
                <div className="flex-1 overflow-y-auto px-6 pt-28 pb-10 flex flex-col justify-between">
                    <div>
                        <div className="text-right text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                            Menu //
                        </div>

                        <NavLinks 
                            items={links} 
                            onLinkClick={() => setIsOpen(false)}
                            containerStyles="flex flex-col w-full gap-2"
                            // 1. Text Links (Right Aligned)
                            linkStyles="block w-full text-right py-3 text-sm sm:text-base font-bold text-gray-300 hover:text-white border-b border-white/5 uppercase tracking-[0.2em] transition-colors"
                            buttonStyles="block w-full text-center mt-3 py-4 bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white text-sm font-bold uppercase tracking-[0.2em] rounded active:scale-95 transition-all"
                        />
                    </div>

                    {/* B. SOCIAL ICONS (New Section) */}
                    <div className="mt-12">
                        <div className="text-center text-[10px] text-gray-500 uppercase tracking-widest mb-6">
                            Connect
                        </div>
                        <div className="flex items-center justify-center gap-8">
                            {/* GitHub */}
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all p-2 bg-white/5 rounded-full">
                                <FaGithub size={16} />
                            </a>
                            {/* LinkedIn */}
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all p-2 bg-white/5 rounded-full">
                                <FaLinkedin size={16} />
                            </a>
                            {/* Email */}
                            <a href="mailto:contact@illustrates.dev" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all p-2 bg-white/5 rounded-full">
                                <FaEnvelope size={16} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default HamburgerMenu;