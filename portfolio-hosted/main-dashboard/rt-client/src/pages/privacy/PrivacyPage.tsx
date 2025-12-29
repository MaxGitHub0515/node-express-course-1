

export default function PrivacyPage() {
    return (
       <div className="w-full bg-[#F5F5F7] min-h-screen py-24 px-6 md:px-12 flex justify-center">
            <div className="max-w-4xl w-full bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-200">
                
                {/* Header */}
                <div className="mb-12 border-b border-gray-100 pb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-[#1E1E1E] tracking-tighter uppercase mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                {/* Content - Prose for readability */}
                <div className="prose prose-sm md:prose-base text-gray-600 space-y-8 max-w-none">
                    
                    <section>
                        <h2 className="text-xl font-bold text-[#1E1E1E] uppercase tracking-wide">1. Introduction</h2>
                        <p>
                            At <strong>illustrates.dev</strong> ("we", "our", or "us"), we are committed to protecting your personal information and your right to privacy. 
                            This Privacy Policy explains how we collect, use, and share your information when you visit our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1E1E1E] uppercase tracking-wide">2. Information We Collect</h2>
                        <p>We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.</p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li><strong>Log Data:</strong> Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data").</li>
                            <li><strong>Cookies:</strong> We use cookies to store information about your preferences and to record user-specific information on visits to pages.</li>
                        </ul>
                    </section>

                    {/* !!! CRITICAL GOOGLE ADSENSE CLAUSE !!! */}
                    <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h2 className="text-xl font-bold text-blue-900 uppercase tracking-wide">3. Advertising & Google AdSense</h2>
                        <p className="mt-2 text-blue-800">
                            We use third-party advertising companies to serve ads when you visit our Web site. These companies may use aggregated information (not including your name, address, email address or telephone number) about your visits to this and other Web sites in order to provide advertisements about goods and services of interest to you.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-blue-800">
                            <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
                            <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                            <li>
                                Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="underline font-bold">Google Ads Settings</a>.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1E1E1E] uppercase tracking-wide">4. GDPR Rights (EU Users)</h2>
                        <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. illustrates.dev aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li>The right to access, update or to delete the information we have on you.</li>
                            <li>The right of rectification.</li>
                            <li>The right to object.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1E1E1E] uppercase tracking-wide">5. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us via our <a href="/contact" className="text-blue-600 underline">Contact Page</a>.</p>
                    </section>

                </div>
            </div>
        </div>
    );
}