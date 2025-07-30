
import {Formik, Form, Field, ErrorMessage} from "formik";

interface FormValues {
    email: string;
    subject: string;
    message: string;
}


export default function ContactPage() {
       const initValues: FormValues  = {
        email: "",
        subject: "",
        message: ""
    }

    const handleContactSUbmit = function() {

    }
    return (
       <>
       <div className="flex flex-col max-w-md  mx-auto bg-gray-200 p-6 mt-10 rounded-xl shadow justify-center items-center">
          <div className="uppercase font-medium text-2xl mb-6">Contact Me</div>
          <Formik initialValues={initValues}  onSubmit={handleContactSUbmit}>
            <Form className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Field name="email" type="email" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm"/>
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Field name="subject" type="text" id="theme" placeholder="E.g. portfolio feedback, project inquiry" className="w-full px-3 py-2 border rounded "/>
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm"/>
                </div>
                <div>
                    <label htmlFor="textarea" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Field name="message"  as="textarea"  rows="4" placeholder="Write your message here..." className="w-full px-3 py-2 border roundedsm:w-80 md:w-96  overflow-y-auto  "/>
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm"/>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-gray-100 p-2 rounded hover:bg-blue-700 mt-3">Submit</button>
            </Form>
          </Formik>
       
       </div>
        
       </>
    )


}


        <div className="flex flex-col max-w-md  mx-auto bg-gray-200 p-6 mt-10 rounded-xl shadow justify-center items-center"></div>





