
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaCreditCard, FaBolt, FaReact, FaNodeJs, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiSocketdotio, SiStripe } from 'react-icons/si';

const LandingPage = () => {
    return (
        // Main page background is #E5E5E5 as requested
        <div className="w-full bg-[#E5E5E5] font-sans text-[#1E1E1E]">
            
            {/* 1. HERO SECTION */}
            {/* pt-32 ensures content starts below the fixed #1E1E1E navbar */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                
                {/* Background Decoration (Cyan Blob) */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                    
                    {/* Left: Text Content */}
                    <div className="order-2 md:order-1">
                        {/* Tag: Cyan highlights */}
                        <div className="inline-block px-3 py-1 mb-6 border border-cyan-600/30 rounded-full bg-cyan-100/50 text-cyan-700 text-[10px] font-bold tracking-widest uppercase">
                            Full Stack Developer
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6 text-[#1E1E1E]">
                            Building Scalable <br/>
                            {/* Gradient: Blue to Cyan */}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
                                MERN Applications
                            </span>
                        </h1>
                        
                        <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-lg mb-8 font-medium">
                            Hi, I'm Maksym Pavlovskyi. I architect and deploy robust web solutions using the MERN stack. From secure payments to real-time communication, I build systems that perform.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Primary Button: Cyan/Blue Dark */}
                            <Link to="/main-dashboard" className="px-8 py-4 bg-[#1E1E1E] text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl">
                                View Projects
                            </Link>
                            {/* Secondary Button: Border only */}
                            <Link to="/contact" className="px-8 py-4 border-2 border-[#1E1E1E]/10 text-[#1E1E1E] font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[#1E1E1E]/5 transition-colors text-center">
                                Contact Me
                            </Link>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-6 mt-10 text-gray-400">
                            <a href="https://github.com/MaxGitHub0515" target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors"><FaGithub size={24}/></a>
                            <a href="https://www.linkedin.com/in/maksym-pavlovskyi-536647267/" target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors"><FaLinkedin size={24}/></a>
                            <a href="mailto:maxpavlovskyi.acco@gmail.com" target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors"><FaEnvelope size={24}/></a>
                        </div>
                    </div>

                    {/* Right: Profile Image */}
                    <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
                        {/* Decorative Gradient behind image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-20 transform scale-90"></div>
                        
                        {/* Image Container */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-gray-200 shadow-2xl overflow-hidden bg-gray-200">
                            <img 
                                // CLOUDINARY: Auto-format to JPG/WebP
                                src="https://res.cloudinary.com/dixiuoxw2/image/upload/v1766811031/_ph-me_ffjkj2.svg" 
                                alt="Profile"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. STATS BANNER: "Grey on Black" Preference */}
            <div className="bg-[#1E1E1E] border-y border-white/5 py-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white">100%</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Type Safety</p>
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white">SSR/CSR</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Hybrid Rendering</p>
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white">REST</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">API Standards</p>
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white">CI/CD</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Automated Deploy</p>
                    </div>
                </div>
            </div>

            {/* 3. SYSTEM ARCHITECTURE (White Cards on #E5E5E5) */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#1E1E1E] uppercase tracking-tighter">
                            System Implementation
                        </h2>
                        {/* Cyan Underline */}
                        <div className="w-12 h-1 bg-cyan-500 mx-auto mt-4"></div>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto font-medium">
                            My applications go beyond basic CRUD. I implement industry-standard architecture for security, payments, and real-time data.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1: Security */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-300/50 border border-white hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                                <FaShieldAlt size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-[#1E1E1E] mb-3">Secure Auth & Encryption</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Full authentication system using <strong>JWT</strong> and HTTP-only cookies. Passwords are hashed via <strong>Bcrypt</strong> to ensure maximum security compliance.
                            </p>
                        </div>

                        {/* Feature 2: Real-time (Cyan Icon) */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-300/50 border border-white hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 text-cyan-600">
                                <FaBolt size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-[#1E1E1E] mb-3">Real-Time Communication</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Integrated <strong>Socket.io</strong> for bi-directional event-based communication. Enables instant chat messaging and dynamic dashboard updates.
                            </p>
                        </div>

                        {/* Feature 3: Payments (Green/Teal Icon) */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-300/50 border border-white hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 text-teal-600">
                                <FaCreditCard size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-[#1E1E1E] mb-3">Payment Infrastructure</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Seamless payment processing using the <strong>Stripe API</strong>. Includes secure checkout sessions and webhook handling for order verification.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. TECH STACK (White Background Block) */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                    
                    <div className="md:w-1/2">
                        <span className="text-cyan-600 font-bold tracking-widest uppercase text-xs">The Toolkit</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#1E1E1E] mt-2 mb-6 tracking-tighter">
                            MERN Ecosystem
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            I leverage the unified JavaScript stack to build consistent, maintainable, and high-performance applications.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-sm text-gray-700 font-bold">
                                <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                                Client: React.js + Tailwind CSS
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700 font-bold">
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                Server: Node.js + Express
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700 font-bold">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Database: MongoDB Atlas
                            </li>
                        </ul>
                    </div>

                    {/* Logos Grid */}
                    <div className="md:w-1/2 grid grid-cols-3 gap-6">
                        {/* React */}
                        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-cyan-50 transition-colors group">
                            <FaReact size={40} className="text-gray-400 group-hover:text-[#61DAFB] transition-colors mb-2" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-gray-600">React</span>
                        </div>
                        {/* Node */}
                        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-green-50 transition-colors group">
                            <FaNodeJs size={40} className="text-gray-400 group-hover:text-[#339933] transition-colors mb-2" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-gray-600">Node.js</span>
                        </div>
                        {/* Mongo */}
                        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors group">
                            <SiMongodb size={40} className="text-gray-400 group-hover:text-[#47A248] transition-colors mb-2" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-gray-600">MongoDB</span>
                        </div>
                        {/* Tailwind */}
                        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-cyan-50 transition-colors group">
                            <SiTailwindcss size={40} className="text-gray-400 group-hover:text-[#06B6D4] transition-colors mb-2" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-gray-600">Tailwind</span>
                        </div>
                        {/* Socket */}
                        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-200 transition-colors group">
                            <SiSocketdotio size={40} className="text-gray-400 group-hover:text-black transition-colors mb-2" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-gray-600">Socket.io</span>
                        </div>
                        {/* Stripe */}
                        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-indigo-50 transition-colors group">
                            <SiStripe size={40} className="text-gray-400 group-hover:text-[#635BFF] transition-colors mb-2" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-gray-600">Stripe</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CTA Section */}
            <section className="bg-[##161616] py-20 px-6 text-center border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black text-[#1E1E1E] uppercase tracking-tighter mb-6">
                        Have a project in mind?
                    </h2>

                    <p className="text-gray-600 mb-10 text-sm md:text-base font-medium">
                        Let's discuss how we can build a secure, scalable solution for your business.
                    </p>
                    <Link 
                        to="/contact"
                        className="inline-block px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg hover:shadow-cyan-500/30"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>

        </div>
    );
};
export default LandingPage;