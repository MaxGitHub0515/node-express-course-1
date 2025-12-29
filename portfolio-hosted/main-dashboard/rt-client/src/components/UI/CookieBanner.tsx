

import {useState, useEffect} from "react";
import { Link } from "react-router-dom";


const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
        // here below: trigger your Google AdSense Script loading function
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-[100] bg-[#1E1E1E] border-t border-white/10 p-6 md:p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                {/* Text Content */}
                <div className="flex-1">
                    <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-2">Cookie Consent</h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-2xl">
                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
                        By clicking "Accept All", you consent to our use of cookies. 
                        Read our <Link to="/privacy" className="text-white underline hover:text-blue-400">Privacy Policy</Link>.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button 
                        onClick={handleDecline}
                        className="flex-1 md:flex-none px-6 py-3 rounded-lg border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
                    >
                        Reject
                    </button>
                    <button 
                        onClick={handleAccept}
                        className="flex-1 md:flex-none px-8 py-3 rounded-lg bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-lg"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;