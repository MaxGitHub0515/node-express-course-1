

import type {FormikHelpers} from "formik";
import {Formik, Form, Field, ErrorMessage} from "formik";
import toast from "react-hot-toast";
import NavBarComponent from "../rt-dashboard/components/NavBar";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"; 
// import {useEffect, useState} from "react";

interface FormValues {
    email: string;
    subject: string;
    message: string;
}


export default function ContactPage() {
     const navigate = useNavigate();
       const initValues: FormValues  = {
        email: "",
        subject: "",
        message: ""
    }

     const validSchema = Yup.object({
        email: Yup.string()
            .email('Invalid Email').required('Email is required'),
        subject: Yup.string()
            .min(3, 'Subject must be at least 3 characters')
            .max(50, 'Subject cannot exceed 50 characters')
            .required('Subject is required'),
        message: Yup.string()
            .max(2000, 'Message exceeded the amount of allowed characters')
            .required('Message is required')
    });

    const handleContactSubmit = async  (values:FormValues, {resetForm}: FormikHelpers<FormValues>) =>{
        const res = await fetch('/api/v1/contact/send-email', {
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
    return (
       <>
       <NavBarComponent />
       <div className="flex flex-col max-w-md mx-auto bg-gray-200 p-6 mt-29 md:my-6 rounded-xl shadow justify-center items-center">
          <div className="uppercase font-medium text-2xl mb-6">Contact Me</div>
          <Formik initialValues={initValues} validationSchema={validSchema} onSubmit={handleContactSubmit}>
            <Form className="space-y-4 w-full">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Field name="email" type="email" placeholder="E.g. johndoe@example.com" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm"/>
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Field name="subject" type="text" id="theme" placeholder="E.g. portfolio feedback, project inquiry" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="subject" component="div" className="text-red-600 text-sm"/>
                </div>
                <div>
                    <label htmlFor="textarea" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Field name="message"  as="textarea"  rows="4" placeholder="Write your message here..." className="w-full px-3 py-2 border rounded overflow-y-auto  "/>
                    <ErrorMessage name="message" component="div" className="text-red-600 text-sm"/>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-gray-100 p-2 rounded hover:bg-blue-700 mt-3">Submit</button>
            </Form>
          </Formik>
       </div>
        
       </>
    )
}






