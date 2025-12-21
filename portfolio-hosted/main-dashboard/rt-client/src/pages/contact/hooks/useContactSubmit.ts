



import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 
// import {useEffect, useState} from "react";
import type {FormikHelpers} from "formik";
interface FormValues {
    email: string;
    subject: string;
    message: string;
}


export default function ContactPage() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
    const navigate = useNavigate();
    const useContactSubmit = async  (values:FormValues, {resetForm}: FormikHelpers<FormValues>) =>{
        // const initValues: FormValues  = {
        // email: "",
        // subject: "",
        // message: ""
        // }
        const res = await fetch(`${API_BASE_URL}/api/v1/contact/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
            credentials: 'include' // sending cookies httpOnly
        })
        const getParsedJSON = await res.json();
        if (!res.ok) {
            throw new Error(getParsedJSON.msg || 'Contact form submission failed');
        }
        toast.success("Email was sent successfully")
        navigate('/contact')
        resetForm();
    }
    return {useContactSubmit};
}



