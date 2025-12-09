import {Formik, Form, Field, ErrorMessage} from "formik";
import type {FormikHelpers} from "formik";
import {useForm} from "react-hook-form";
// no validation - data is not extremely sensitive
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
interface FormValues {
    name: string;
    description: string;
    imageUrl : string;
    fileUpload: File | null; // at least one of them be fullfilled either url or file
}

 const handleContactSubmit = async  (values:FormValues, {resetForm}: FormikHelpers<FormValues>) =>{
        console.log(values, resetForm);
    }


export default function ProjectsPage() {
     const initValues: FormValues  = {
        name: "",
        description: "",
        imageUrl: "",
        fileUpload: null,
    }
    const navigate = useNavigate();

    return (
    <>
    <div className='flex gap-x-1'>
        <main className='relative w-full p-3 rounded-lg shadow-lg bg-[#F5F5F5]'>
        {/* Header */}
        {/* <div className='text-1xl font-bold text-gray-800 '>Projects</div> */}
          <div className='absolute top-[300px] left-0 right-0 flex justify-between items-center px-5'>
             <button
                onClick={() => navigate(-1)}>
                <MdOutlineKeyboardDoubleArrowLeft 
                className="sm:text-2xl md:text-3xl lg:text-4xl ml-2 hover:text-green-600"/>    
            </button>
            <button
            onClick={() => navigate(1)}>
            <MdOutlineKeyboardDoubleArrowRight className="sm:text-2xl md:text-3xl lg:text-4xl ml-2 hover:text-green-600"/>
            </button>
          </div>
           <div className="flex flex-col max-w-md mx-auto bg-gray-200 p-6 mt-29 md:my-6 rounded-xl shadow justify-center items-center">
          <div className="uppercase font-medium text-2xl mb-6">Modify Project</div>
          <Formik initialValues={initValues} onSubmit={handleContactSubmit}>
            <Form className="space-y-4 w-full">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <Field name="name" type="text" placeholder="e.g. Messera" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 "/>
                    <ErrorMessage name="name" component="div" className="text-red-600 text-sm"/>
                </div>
                <div>
                    <label htmlFor="textarea" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Field name="description"  as="textarea"  rows="4" placeholder="e.g ProjectName is a ..." className="w-full px-3 py-2 border rounded overflow-y-auto  focus:outline-none focus:ring-2 focus:ring-green-600  "/>
                    <ErrorMessage name="description" component="div" className="text-red-600 text-sm"/>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    <Field name="imageUrl"  placeholder="Paste the img url here or upload it" className="w-full px-3 py-2 border rounded overflow-y-auto focus:outline-none focus:ring-2 focus:ring-green-600 "/>
                    <ErrorMessage name="imageUrl" component="div" className="text-red-600 text-sm"/>
                </div>
                <div className="flex items-center justify-center my-6">
                <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm md:text-xl font-semibold">
                 OR
                </span>
                </div>

                {/* FILE UPLOAD - FORMIK DOES NOT SUPPORT FILE UPLOAD*/}
                <div className="flex items-center p-6 border-dashed border-2 border-gray-300 hover:border-green-600 rounded justify-center cursor-pointer">
                    <label htmlFor="fileUpload" className="cursor-pointer">
                    <input type="file" id="fileUpload" name="fileUpload" className="hidden"/>
                    <FaFileUpload className="sm:text-2xl md:text-3xl lg:text-4xl cursor-pointer"/>
                    </label>
                </div>
                <button type="submit" className="w-full text-gray-100 bg-gray-700 p-2 mt-3 text-gray-100
                hover:bg-green-300 hover:text-gray-700 rounded transition-all duration-300
                 ">Submit</button>
            </Form>
          </Formik>
       </div>
        </main>
       </div>
        </>
    );
}


