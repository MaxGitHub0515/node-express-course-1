
import type {FormikHelpers} from "formik"
import { useNavigate } from "react-router-dom";
// form state and handling
import {Formik, Form, Field, ErrorMessage} from "formik";
// form validation
import * as Yup from "yup";
import {toast} from "react-hot-toast"
import { useAuthContext } from "../../context/AuthContext";
interface FormValues {
    username: string;
    email: string;
    pwd: string;
}


export default function LoginPage() {
    const navigate = useNavigate();
    const {setAuthUser} = useAuthContext();
    const initValues: FormValues  = {
        username: "",
        email: "",
        pwd: "",
    }
    const validSchema = Yup.object({
        username: Yup.string()
         .required("Username is required"),
        pwd: Yup.string()
            .min(6)
            .required("Password is required"),
        email: Yup.string()
            .email('Invalid Email').required('Email is required')

    })

    const handleSubmit = async (values:FormValues, {resetForm}: FormikHelpers<FormValues>) =>{
        try {
        // call my API here (await) !!!!! ALter here!!
        // add authcontorller jsonwebtoken bcryptjs model for user = DONE
        // auth route with post method posdt(/login)
            const res = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
            credentials: 'include' // for sending cookies httpOnly

        });
        const data = await res.json(); 
        if (!res.ok) {
            throw new Error(data.msg || 'Login failed');
        }
        localStorage.setItem("authUser", JSON.stringify(data));
        // Storing only  user data (not JWT) in context
        setAuthUser(data); // e.g., { _id, username, email }

        toast.success("Admin logged in yeahh");
        resetForm();  
        // redirect to cpanel if logged in successfully
        // using navigate hook - won't reload the page when manages the redirect
        navigate('/cpanel')
     
        } catch (error) {

        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("Login failed");
        }
        }


        // logout logic here!!!
        

    } 
    return ( 
        <div className="flex flex-col max-w-md  mx-auto bg-gray-200 p-6 mt-10 rounded-xl shadow justify-center items-center">
          <div className="uppercase font-medium text-2xl mb-6">Log In</div>
          <Formik initialValues={initValues} validationSchema={validSchema} onSubmit={handleSubmit}>
            <Form className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <Field name="username" type="text" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="username" component="div" className="text-red-600 text-sm"/>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Field name="email" type="email" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm"/>
                </div>
                <div>
                    <label htmlFor="pwd" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <Field name="pwd" type="password" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="pwd" component="div" className="text-red-600 text-sm"/>
                </div>
               
                <button type="submit" className="w-full bg-blue-600 text-gray-100 p-2 rounded hover:bg-blue-700">Submit</button>
            </Form>
          </Formik>
       
        </div>
    )
}