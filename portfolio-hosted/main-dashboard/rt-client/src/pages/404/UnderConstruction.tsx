
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaArrowLeft } from 'react-icons/fa';

interface UnderConstructionProps {
    title?: string;       // Custom title (e.g., "Projects")
    message?: string;     // Custom message
}

interface UnderConstructionProps {
    title?: string;
    message?: string;
}

const UnderConstruction = ({ 
    title = "System Module", 
    message = "This section is currently under active development." 
}: UnderConstructionProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 bg-[#E5E5E5] text-center">
            
            {/* 1. Animated Icon Container */}
            <div className="relative mb-8 group">
                {/* Subtle Cyan Glow */}
                <div className="absolute inset-0 bg-cyan-400/30 blur-2xl rounded-full animate-pulse"></div>
                
                {/* Icon Circle - Inverted to White/Light for contrast */}
                <div className="relative w-24 h-24 bg-white border border-black/5 rounded-full flex items-center justify-center shadow-xl">
                    <FaLaptopCode className="text-4xl text-cyan-600 opacity-90" />
                </div>
            </div>

            {/* 2. System Status Text */}
            <div className="space-y-4 max-w-lg">
                {/* Main Heading: Dark Charcoal for Light Theme */}
                <h1 className="text-3xl md:text-5xl font-black text-[#1E1E1E] uppercase tracking-[0.2em]">
                    In Development
                </h1>
                
                {/* Decorative Line */}
                <div className="w-24 h-[1px] bg-cyan-600/40 mx-auto"></div>

                {/* Subtitle: High-Contrast Cyan */}
                <h2 className="text-xs md:text-sm font-bold text-cyan-700 uppercase tracking-[0.3em]">
                    // {title} //
                </h2>

                <p className="text-gray-600 text-xs md:text-sm leading-relaxed uppercase tracking-widest font-medium">
                    {message} <br />
                    <span className="opacity-60">Please verify system status later.</span>
                </p>
            </div>

            {/* 3. Progress Bar Aesthetic (Light Version) */}
            <div className="w-64 h-1.5 bg-black/5 rounded-full mt-10 overflow-hidden border border-black/5">
                <div className="h-full bg-cyan-600 w-2/3 animate-[pulse_2s_infinite]"></div>
            </div>

            {/* 4. Action Button (Dark Text / Light Background) */}
            <Link 
                to="/" 
                className="mt-12 flex items-center gap-3 px-8 py-3 bg-white border border-black/5 hover:border-cyan-600/50 hover:shadow-md rounded-lg group transition-all duration-300 shadow-sm"
            >
                <FaArrowLeft className="text-gray-400 group-hover:text-cyan-600 group-hover:-translate-x-1 transition-all" size={14} />
                <span className="text-xs text-[#1E1E1E] font-bold uppercase tracking-[0.2em]">
                    Return Landing Page
                </span>
            </Link>

            {/* Bottom Version Tag */}
            <div className="mt-20 text-[10px] text-gray-400 uppercase tracking-[0.4em] font-bold">
                Status: compiling...
            </div>

        </div>
    );
};

export default UnderConstruction;
