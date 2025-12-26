
import type {FormikHelpers} from "formik"
// form state and handling
import {Formik, Form, Field, ErrorMessage} from "formik";
import type { AuthFormValues } from "../../types";
import { BsEyeFill, BsEyeSlashFill} from "react-icons/bs";
// form validation
import { logInSchema } from "../../validation";
import useLogin from "./hooks/useLogin";
import { useState } from "react";

export default function LoginPage() {
    const {login} = useLogin();
    const initValues: AuthFormValues  = {
        username: "",
        email: "",
        pwd: "",
    }
    const [showPwd, setShowPwd] = useState<boolean>(false);
    const togglePwd = () => setShowPwd(prev => !prev);
    
    const handleSubmit = async (values:AuthFormValues, actions: FormikHelpers<AuthFormValues>) =>{
      await login(values, actions);
    } 
   
    return ( 
        <div className="w-full bg-white flex justify-center px-4 py-8 md:px-0">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-[#E5E5E5] rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/40 border border-gray-300/30 mt-4 md:mt-10 h-fit">
                
                {/* LEFT SIDE: Image Only */}
                {/* p-0 to let image fill space. */}
                <div className="relative w-full md:w-5/12 h-48 md:h-auto md:min-h-[550px] bg-[#1E1E1E] overflow-hidden p-0 flex items-center justify-center">
                    {/* Thematic Authentication Image */}
                    <img 
                        src="https://res.cloudinary.com/dixiuoxw2/image/upload/v1766686459/Wavy_Gen-01_Single-07_g6zvbz.jpg" 
                        alt="Security Guard"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-black/50 to-black/40 mix-blend-multiply"></div>
                </div>

                {/* RIGHT SIDE: Login Form */}
           
                <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-center">
                    <div className="mb-6 md:mb-8">
                        {/* Slightly smaller headline */}
                        <h2 className="text-lg md:text-xl font-black text-gray-900 tracking-tighter uppercase">
                            Login
                        </h2>
                        <div className="h-[3px] w-8 bg-black mt-2"></div>
                    </div>
                    {/* *FORM* */}
                    <Formik 
                        initialValues={initValues} 
                        validationSchema={logInSchema} 
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div className="relative pb-7 flex flex-col">
                                    <label htmlFor="username" className="text-[10px] uppercase font-bold tracking-widest text-gray-600 mb-2 ml-1">
                                        Username
                                    </label>
                                    <Field 
                                        name="username" 
                                        type="text" 
                                        placeholder="Enter username"
                                        // Reduced padding (py-3 instead of py-3.5) and font size
                                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs md:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 transition-all shadow-sm"
                                    />
                                    <ErrorMessage name="username" component="div" className="absolute bottom-1 left-2 text-red-600 text-[9px] font-bold uppercase"/>
                                </div>

                                {/* Email Field */}
                                <div className="relative pb-7 flex flex-col">
                                    <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-gray-600 mb-2 ml-1">
                                        Email
                                    </label>
                                    <Field 
                                        name="email" 
                                        type="email" 
                                        placeholder="admin@illustrates.dev"
                                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs md:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 transition-all shadow-sm"
                                    />
                                    <ErrorMessage name="email" component="div" className="absolute bottom-1 left-2 text-red-600 text-[9px] font-bold uppercase"/>
                                </div>

                                {/* Password Field */}
                                <div className="relative pb-7 flex flex-col">
                                    <label htmlFor="pwd" className="text-[10px] uppercase font-bold tracking-widest text-gray-600 mb-2 ml-1">
                                        Password
                                    </label>
                                    
                                    <div className="relative flex items-center w-full">
                                        <Field 
                                            type={showPwd ? "text" : "password"}
                                            name="pwd" 
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs md:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 transition-all shadow-sm pr-12"
                                            onKeyDown={(e: React.KeyboardEvent) => {
                                                if(e.key === " ") {
                                                    e.preventDefault();
                                                    togglePwd();
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            aria-pressed={showPwd}
                                            onClick={togglePwd}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer p-1"
                                        > 
                                            {showPwd ? <BsEyeSlashFill size={16} /> : <BsEyeFill size={16} />}
                                        </button>
                                    </div>

                                    <ErrorMessage name="pwd" component="div" className="absolute bottom-1 left-2 text-red-600 text-[9px] font-bold uppercase"/>
                                </div>

                                {/* Submit Btn */}
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 rounded-xl mt-2 font-bold uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl active:scale-[0.98] bg-[#1E1E1E] hover:bg-black text-white"
                                >
                                    {isSubmitting ? "Verifying..." : "Authorize Entry"}
                                </button>
                            </Form>
                        )}
                    </Formik> 
                </div>
            </div>
        </div>
    );
}