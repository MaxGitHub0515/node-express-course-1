import { FaPatreon, FaCoffee, FaArrowLeft, FaQrcode} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContributionPage = () => {
    return (
        <div className="relative min-h-screen bg-[#E5E5E5] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
            
            {/* Background Blur Accents */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full"></div>

            <div className="relative z-10 w-full max-w-6xl">
                
                {/* Header */}
                <header className="mb-16 text-center">
                    <div className="inline-block px-3 py-1 border border-cyan-600/20 rounded-full mb-4">
                        <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-[0.3em]">
                            System Maintenance // Resource Allocation
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-[#1E1E1E] uppercase tracking-[-0.02em] mb-6">
                        Support the <span className="text-cyan-600">Infrastructure.</span>
                    </h1>
                </header>

                {/* TWO COLUMN GRID: PATREON vs COFFEE */}
                <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* OPTION 1: PATREON (The Membership) */}
                    <div className="bg-[#1E1E1E] rounded-3xl p-10 flex flex-col justify-between shadow-2xl transition-transform hover:scale-[1.01]">
                        <div>
                            <div className="flex justify-between items-start mb-10">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <FaPatreon className="text-[#FF424D] text-3xl" />
                                </div>
                                <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest border border-cyan-500/30 px-2 py-1 rounded">Monthly Tier</span>
                            </div>
                        {/* Content Section */}
                            <div className="flex-grow">
                                <h2 className="text-white text-2xl font-bold uppercase tracking-widest mb-4">
                                    Join the inner circle
                                </h2>
                                <p className="text-gray-400 text-[11px] uppercase tracking-widest leading-loose mb-8">
                                    For those who want to be part of the journey long-term. Your support helps me maintain the infrastructure and gives you a front-row seat to the logs and blueprints.
                                </p>

                                {/* Added Content: Perks List (Fills the gap created by the QR code) */}
                              <ul className="space-y-4 mb-10">
                                <li className="flex items-start gap-3 text-[10px] text-cyan-500/90 uppercase tracking-[0.2em] font-medium leading-tight">
                                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-0.5"></div>
                                    Join the conversation: Post and reply to blog comments
                                </li>
                                <li className="flex items-start gap-3 text-[10px] text-cyan-500/90 uppercase tracking-[0.2em] font-medium leading-tight">
                                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-0.5"></div>
                                    Exclusive access to private engineering & system logs
                                </li>
                                <li className="flex items-start gap-3 text-[10px] text-cyan-500/90 uppercase tracking-[0.2em] font-medium leading-tight">
                                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-0.5"></div>
                                    Early bird access to new architectural modules
                                </li>
                                <li className="flex items-start gap-3 text-[10px] text-cyan-500/90 uppercase tracking-[0.2em] font-medium leading-tight">
                                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-0.5"></div>
                                    Direct uplink for system feedback & feature requests
                                </li>
                            </ul>
                             </div>
                            <h2 className="text-white text-2xl font-bold uppercase tracking-widest mb-4">Patreon Pipeline</h2>
                            <p className="text-gray-400 text-xs uppercase tracking-widest leading-loose mb-8">
                                For long-term stakeholders. Includes access to private dev-logs, system blueprints, and early API beta testing.
                            </p>
                        </div>
                        
                        <a 
                            href="https://patreon.com/your-user"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-[#FF424D] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl text-center hover:bg-[#ff5d66] transition-all shadow-lg shadow-[#FF424D]/20"
                        >
                            Establish Membership
                        </a>
                    </div>

                    {/* BUY ME A COFFEE (The One-Time Tip) && QR CODE */}
                    <div className="bg-white rounded-3xl p-10 flex flex-col justify-between shadow-xl border border-black/5 transition-transform hover:scale-[1.01]">
                        <div>
                            <div className="flex justify-between items-start mb-10">
                                <div className="p-4 bg-yellow-400/10 rounded-2xl border border-yellow-400/20">
                                    <FaCoffee className="text-[#FFDD00] text-3xl" />
                                </div>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest border border-black/5 px-2 py-1 rounded">Single Uplink</span>
                            </div>
                            <h2 className="text-[#1E1E1E] text-2xl font-bold uppercase tracking-widest mb-4">Direct Coffee</h2>
                                <div className="my-8 p-6 bg-[#f8f8f8] border border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-4 group">
                                <div className="relative">
                                    <img 
                                        src="https://res.cloudinary.com/dixiuoxw2/image/upload/v1767064828/qr-code_wfafrc.png" 
                                        alt="Scan to support"
                                        className="w-32 h-32 mix-blend-multiply grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/20 transition-all rounded-lg"></div>
                                </div>
                                <div className="flex items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-[0.3em]">
                                    <FaQrcode size={10} className="text-cyan-600" />
                                    Scan to Send Coffee
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs uppercase tracking-widest leading-loose mb-8">
                                A one-time contribution to fuel current development cycles. Perfect for a quick thank you for specific system features.
                            </p>
                        </div>
                        <a 
                            href="https://buymeacoffee.com/maxpavlovs" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-[#FFDD00] text-[#1E1E1E] text-[11px] font-black uppercase tracking-[0.2em] rounded-xl text-center hover:bg-[#ffea00] transition-all shadow-lg shadow-yellow-400/20"
                        >
                            Buy Me A Coffee
                        </a>
                    </div>

                </div>

                {/* Navigation Back */}
                <div className="mt-16 flex flex-col items-center gap-6">
                    <Link 
                        to="/" 
                        className="flex items-center gap-3 px-8 py-3 bg-white border border-black/5 text-[#1E1E1E] rounded-full hover:shadow-lg transition-all group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Return to System</span>
                    </Link>
                    <div className="text-[9px] text-gray-400 uppercase tracking-[0.5em] font-bold">
                        Vercel_Client_Link // Active
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContributionPage;