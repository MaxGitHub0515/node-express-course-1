
import type {FormikHelpers} from "formik"
// form state and handling
import {Formik, Form, Field, ErrorMessage} from "formik";
import type { AuthFormValues } from "../../types";
// form validation
import { logInSchema } from "../../validation";
import useLogin from "./hooks/useLogin";

export default function LoginPage() {
    const {login} = useLogin();
    const initValues: AuthFormValues  = {
        username: "",
        email: "",
        pwd: "",
    }
    
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
                    <Field name="pwd" type="password" autoComplete="new-password" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="pwd" component="div" className="text-red-600 text-sm"/>
                </div>
               
                <button type="submit" className="w-full bg-blue-600 text-gray-100 p-2 rounded hover:bg-blue-700 mt-3">Submit</button>
            </Form>
          </Formik>
       
        </div>
    )
}