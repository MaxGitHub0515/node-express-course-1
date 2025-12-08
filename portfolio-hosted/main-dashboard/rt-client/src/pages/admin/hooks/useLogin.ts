


import type {FormikHelpers} from "formik"
import { useNavigate } from "react-router-dom";
// form state and handling
// import {Formik, Form, Field, ErrorMessage} from "formik";
// form validation
import * as Yup from "yup";
import {toast} from "react-hot-toast"
import { useAuthContext } from "../../../context/AuthContext";
interface FormValues {
    username: string;
    email: string;
    pwd: string;
}


export default function useLogin() {
    // const baseURL = process.env.API_BASE_URL;

    const validSchema = Yup.object({
        username: Yup.string()
         .required("Username is required")
         .min(3, "Username must contain at least 3 characters")
         .max(24),
        pwd: Yup.string()
            .min(12, "Password should be at least 12 characters long")
            .required("Password is required")
            .matches(/\d/, "Password must contain numbers")
            .matches(/^(?=.*[a-z])(?=.*[A-Z]).+$/, "Must contain at least one uppercase and one lowercase letter")
            .matches(/[!@#$%^&*(),.?":{}|<>_\-]/, "Must contain must contain special characters"),
            
        //   confirmPwd: Yup.string()
        //     .oneOf([Yup.ref('pwd'), null], "Passwords must match")
        //     .required("Confirm Password is required"),
        email: Yup.string()
        .email('Invalid Email').required('Email is required')
        .matches( /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Please enter a valid email")

    })

    const useLogin = async (values:FormValues, {resetForm}: FormikHelpers<FormValues>) =>{
        const navigate = useNavigate();
        const {setAuthUser} = useAuthContext();

        // const baseURL = process.env.API_BASE_URL;
        
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
        setAuthUser(data);

        toast.success("Admin logged in yeahh");
        resetForm();  
        // redirect to cpanel if logged in successfully
        // using navigate hook - won't reload the page when manages the redirect
        navigate('/cpanel')
     
        } catch (error) {
            
        if (error instanceof Error) toast.error(error.message);
        else toast.error('Login failed');
        }


        // logout logic here!!!

    } 
    return {validSchema, useLogin};
}