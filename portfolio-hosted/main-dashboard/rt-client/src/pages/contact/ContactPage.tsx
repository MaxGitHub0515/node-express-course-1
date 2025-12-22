

import {Formik, Form, Field, ErrorMessage} from "formik";
import NavBarComponent from "../rt-dashboard/components/NavBar";
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
       <>
       <NavBarComponent />
       <div className="flex flex-col max-w-md mx-auto bg-gray-200 p-6 mt-29 md:my-6 rounded-xl shadow justify-center items-center">
          <div className="uppercase font-medium text-2xl mb-6">Contact Me</div>
          <Formik initialValues={initValues} validationSchema={contactSchema} onSubmit={submitContact}>
            {({ isSubmitting }) => (
            <Form className="space-y-4 w-full">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Field name="email" type="email" id="email" placeholder="E.g. johndoe@example.com" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm"/>
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Field name="subject" type="text" id="subject" placeholder="E.g. portfolio feedback, project inquiry" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="subject" component="div" className="text-red-600 text-sm"/>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Field name="message"  as="textarea" id="message"  rows="4" placeholder="Write your message here..." className="w-full px-3 py-2 border rounded overflow-y-auto  "/>
                    <ErrorMessage name="message" component="div" className="text-red-600 text-sm"/>
                </div>
                <button 
                disabled={isSubmitting}
                type="submit" 
                className={`w-full p-2 rounded mt-3 transition-all ${isSubmitting
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 text-gray-100"
                }`}>
                    {isSubmitting ? "Sending..." : "Submit"}
                </button>
            </Form>
            )}
          </Formik> 
       </div>
        
       </>
    )
}






