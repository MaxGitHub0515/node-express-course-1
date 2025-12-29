

import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; 
// Helper function for now - footerlink component later if amound of links grow
// !! DOES NOT FULL SOLVES THE PROBLEM: BUGS!!
export default function FooterComponent() {
    const handleFooterLinkClick = (e: React.MouseEvent, path: string) => {
    // If the user is already on the target page
    if (window.location.pathname === path) {
        e.preventDefault(); // Stop the "jump"
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
    // Mobile
        // Wait 100ms (enough for address bar to start moving) and force it again
        if (window.innerWidth < 768) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 150);
        }
    
    // If the path is different, the default <Link> behavior takes over 
    // and <ScrollRestoration /> will handle the instant snap to top.
};

    return (
        <footer className="w-full bg-[#1E1E1E] md:py-12 py-8 px-8 md:px-16 mt-auto border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12">
                
                {/* Top Section: Logo left, Links right */}
                <div className="flex flex-col md:flex-row justify-between items-center md:gap-6 gap-8">
                    
                    {/* Logo - Far Left */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img 
                                src="https://res.cloudinary.com/dixiuoxw2/image/upload/v1753813816/logo_prg3wf.svg"
                                alt="Logo"
                                className="md:w-10 md:h-10 h-8 h-8 brightness-200 grayscale opacity-90 hover:grayscale-0"
                            /> 
                        </Link>
                    </div>

                    {/* Navigation and Socials - Far Right */}
                    <div className="flex flex-col items-center md:items-end gap-5 md:gap-6">
                        <ul className="flex items-center gap-8 md:gap-12">
                            <li>
                                <Link to="/main-dashboard" 
                                onClick={(e) => handleFooterLinkClick(e, '/main-dashboard')}
                                className="text-[10px] font-medium text-white/70 tracking-[0.2em] hover:text-white transition-colors uppercase hover:underline">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" 
                                onClick={(e) => handleFooterLinkClick(e, '/contact')}
                                className="text-[10px] font-medium text-white/70 tracking-[0.2em] hover:text-white hover:underline transition-colors uppercase">
                                    Contact
                                </Link>
                            </li>
                        </ul>

                        {/* Social Icons Section */}
                        <div className="flex items-center gap-5 md:gap-6 items-center text-white/50">
                            <a href="https://github.com/MaxGitHub0515" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="GitHub">
                                <FaGithub size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/maksym-pavlovskyi-536647267/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                                <FaLinkedin size={18} />
                            </a>
                            <a href="mailto:illustrates.service@gmail.com" className="hover:text-white transition-colors" title="Email">
                                <FaEnvelope size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Divider and Copyright */}
                <div className="flex flex-col gap-5 md:gap-6">
                    <div className="w-full h-[1px] bg-white/10"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                        <p className="text-[9px] text-white/60 tracking-[0.15em] uppercase font-light hover:text-white text-center md:text-left" >
                            © {new Date().getFullYear()} illustrates.dev • Stuttgart, Germany
                        </p>
                        <p className="text-[9px] text-white/60 hover:text-white tracking-wider uppercase font-light">
                            Built with MERN 
                            <span className="ml-2">&hearts;</span> 
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}