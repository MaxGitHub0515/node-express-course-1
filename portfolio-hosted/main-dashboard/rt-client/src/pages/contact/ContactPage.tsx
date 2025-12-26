

import {Formik, Form, Field, ErrorMessage} from "formik";
import { contactSchema } from "../../validation";
import useContactSubmit from "./hooks/useContactSubmit"; 
import type { ContactFormValues } from "../../types";

export default function ContactPage() {
    const {submitContact} = useContactSubmit();
    const initValues: ContactFormValues  = {
        email: "",
        subject: "",
        message: ""
    }
    return (
    <div className="w-full bg-white flex justify-center px-4 py-12 md:px-10">
    {/* Card Wrapper*/}
    <div className="flex flex-col md:flex-row w-full max-w-6xl bg-[#E5E5E5] rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/40 border border-gray-300/30 mt-4 h-fit">   
        {/* LEFT SIDE (Hidden on mobile, visible on Desktop) */}
        <div className="hidden md:flex md:w-5/12 bg-[#1E1E1E] relative flex-col justify-between p-12 min-h-[650px] overflow-hidden">
            <div className="z-20 opacity-30 text-[10px] text-white uppercase tracking-[0.4em] font-medium">
                Portfolio / Archive_2025
            </div>
            <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white/5 tracking-tighter uppercase leading-[0.8] select-none italic">
                        Available<br/>Available<br/>Available
                    </h2>
                    <div className="pl-2 border-l-2 border-blue-400">
                        <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight">Open for Inquiries.</h1>
                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                            Currently looking for new challenges and creative collaborations.
                        </p>
                    </div>
                </div>
                 {/* ... Status Board Categories ... */}
                 <div className="grid grid-cols-1 gap-8 pl-2">
                    <div className="space-y-1">
                        <span className="text-[10px] text-blue-300 uppercase tracking-[0.3em] font-black">Feedback</span>
                        <p className="text-[10px] md:text-xs text-gray-400">Love the work? Have suggestions? I'm all ears.</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] text-blue-300 uppercase tracking-[0.3em] font-black">Partnerships</span>
                        <p className="text-[10px] md:text-xs text-gray-400">Looking to hire? I'm currently open to full-time or part-time roles.</p>
                    </div>
                </div>
            </div>

             {/* ... Bottom Section ... */}
             <div className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-bold">Direct Line</span>
                    <span className="text-xs md:text-sm text-gray-300 font-medium tracking-wide">illustrates.service@gmail.com</span>
                </div>

                <div className="flex items-center justify-between py-3 md:py-4 px-4 md:px-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
                        <span className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">Response Time</span>
                    </div>
                    <span className="text-[9px] text-green-500 uppercase tracking-[0.2em] font-bold">~24 Hours</span>
                </div>
            </div>
        </div>

        {/* RIGHT SIDE: Contact Form */}
        <div className="w-full md:w-7/12 p-6 md:p-14  flex flex-col justify-center">
            
            <div className="mb-6 md:mb-10">
                <h2 className="text-lg md:text-2xl font-black text-gray-900 tracking-tighter uppercase">
                    Get in Touch
                </h2>
                <div className="h-[3px] w-8 bg-black mt-2"></div>
            </div>

            <Formik initialValues={initValues} validationSchema={contactSchema} onSubmit={submitContact}>
                {({ isSubmitting }) => (
                    <Form className="space-y-5">
                        
                        {/* Email */}
                        <div className="relative pb-8 flex flex-col">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-600 mb-2 ml-1">Email</label>
                            <Field name="email" type="email" placeholder="your@email.com" className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 md:text-base text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 transition-all shadow-sm"/>
                            <ErrorMessage name="email" component="div" className="absolute bottom-0 left-2 text-red-600 text-[10px] font-bold uppercase "/>
                        </div>

                        {/* Subject */}
                        <div className="relative pb-8 flex flex-col">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-600 mb-2 ml-1">Subject</label>
                            <Field name="subject" type="text" placeholder="Project inquiry" className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 md:text-base text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 transition-all shadow-sm"/>
                            <ErrorMessage name="subject" component="div" className="absolute bottom-0 left-2 text-red-600 text-[10px] font-bold uppercase"/>
                        </div>

                        {/* Message */}
                        <div className="relative pb-8 flex flex-col">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-600 mb-2 ml-1">Message</label>
                            <Field name="message" as="textarea" rows="5" placeholder="Write your message..." className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 md:text-base text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 transition-all resize-none shadow-sm"/>
                            <ErrorMessage name="message" component="div" className="absolute bottom-0 left-2 text-red-600 text-[10px] font-bold uppercase"/>
                        </div>

                        <button 
                            disabled={isSubmitting}
                            type="submit" 
                            className={`w-full py-4 rounded-xl mt-4 font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] transition-all shadow-xl active:scale-[0.98] ${
                                isSubmitting
                                ? "bg-gray-400 text-gray-100 cursor-not-allowed" 
                                : "bg-[#1E1E1E] hover:bg-black text-white"
                            }`}
                        >
                            {isSubmitting ? "Sending..." : "Submit Inquiry"}
                        </button>
                    </Form>
                )}
            </Formik> 
        </div>
    </div>
</div>
    );
}






