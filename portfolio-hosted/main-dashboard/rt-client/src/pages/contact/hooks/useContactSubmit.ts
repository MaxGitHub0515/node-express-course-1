



import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 
// import {useEffect, useState} from "react";
import type {FormikHelpers} from "formik";
import type { ContactFormValues } from "../../../types";
 
export default function useContactSubmit() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
    const navigate = useNavigate();
    const submitContact = async  (values:ContactFormValues, {resetForm}: FormikHelpers<ContactFormValues>) => {
      try {
          const res = await fetch(`${API_BASE_URL}/api/v1/contact/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
            credentials: 'include' 
        })
        const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || data.msg || 'Submission failed');
                return;
            }
        toast.success("Email was sent successfully")
        navigate('/contact')
        resetForm();
    } catch (error: unknown) {
        console.error("Connection error:", error);
        toast.error("Could not connect to the server.");
        }
    };
    return {submitContact};
}



