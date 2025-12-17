
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
        
        <div className="flex flex-col max-w-sm  mx-auto bg-gray-200 p-6 mt-10 rounded-xl shadow justify-center items-center">
          <div className="uppercase font-medium text-2xl mb-6">Log In</div>
          <Formik initialValues={initValues} validationSchema={logInSchema} onSubmit={handleSubmit}>
            <Form className="space-y-4 w-full">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <Field name="username" type="text" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="username" component="div" className="text-red-600 border-red-500 text-sm"/>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Field name="email" type="email" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm"/>
                </div>
                <div>
                    <label htmlFor="pwd" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative flex items-center w-full">
                    <Field 
                    type={showPwd ? "text" : "password"}
                    name="pwd" 
                    autoComplete="current-password"
                    className="w-full px-3 py-2 border rounded "
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if(e.key === " ") {
                        e.preventDefault();
                        togglePwd()
                    }
                   }}
                    />
                    {/* Icon toggle */}
                   <button
                   type="button"
                   aria-pressed={showPwd}
                   className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                   onClick={togglePwd}> 
                   {showPwd ? (
                    <BsEyeSlashFill
                    className="text-blue-300"
                    size={20} />
                   ) : (
                     <BsEyeFill
                    className="text-blue-500"
                    size={20} />
                   )
                }
                 </button>
                </div>
                    <ErrorMessage name="pwd" component="div" className="text-red-600 text-sm"/>
                </div>
=                <button type="submit" className="w-full bg-blue-600 text-gray-100 p-2 rounded hover:bg-blue-700 mt-3">Submit</button>
            </Form>
          </Formik>
       
        </div>
    )
}