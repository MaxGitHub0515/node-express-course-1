
import {useForm} from "react-hook-form";
// no validation - data is not extremely sensitive
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type {ProjectFormValues} from "../../types";
import useCreateProject from "./hooks/useCreateProject";
import { useEffect } from "react";
import useMain from "../rt-dashboard/hooks/useMain"
import StackSelector from "./components/StackSelector";
export default function ProjectsPage() {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<ProjectFormValues>();
    const { createProject } = useCreateProject();

    const navigate = useNavigate();
    // track live changes like useState 
    // use because we choose either URL OR file — not both
    const fileWatch = watch("fileUpload");
    const urlWatch = watch("imageUrl");
    const {allStacks} = useMain()
    // Important: Register the hidden field in the parent so validation works
    useEffect(() => {
        register("stack", { required: "At least one stack is required" });
    }, [register]);

    const onSubmit = async  (values: ProjectFormValues) => {

    await createProject(values, () => reset());
    }
    return (
    <>
    <div className='flex gap-x-1'>
        <main className='relative w-full p-3 rounded-lg shadow-lg bg-[#F5F5F5]'>
        {/* ARROWS << >> */}
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
        <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* NAME */}
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="e.g. Messera"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        {/* DESCRIPTION */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
            {...register("description", { required: "Description is required" })}
            rows={4}
            placeholder="e.g ProjectName is a ..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>
        {/* STACK DROPDOWN*/}
        <StackSelector 
        allStacks={allStacks} 
        setValue={setValue} 
        errors={errors} 
        />
        {/* PROJECT LOCATION URL*/}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Location</label>
            <input 
            type="url"
            {...register("projectLocUrl")}
            placeholder="Project Location URL"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
        </div>

        {/* IMAGE URL */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
            type="url"
            {...register("imageUrl")}
            disabled={!!fileWatch?.length}
            placeholder="Paste image URL here if not uploading file"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
        </div>

        {/* OR */}
        <div className="flex items-center justify-center my-6">
            <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm md:text-xl font-semibold">
            OR
            </span>
        </div>

        {/* FILE UPLOAD */}
        <div className="flex items-center p-6 border-dashed border-2 border-gray-300 hover:border-green-600 rounded justify-center cursor-pointer">
            <label htmlFor="fileUpload" className="cursor-pointer">
            <input 
                type="file" 
                id="fileUpload"
                {...register("fileUpload")}
                disabled={!!urlWatch}
                className="hidden"
            />
            <FaFileUpload className="sm:text-2xl md:text-3xl lg:text-4xl cursor-pointer"/>
            </label>
        </div>
        <button 
            type="submit"
            className="w-full bg-gray-700 p-2 mt-3 text-gray-100 hover:bg-green-300 
            hover:text-gray-700 rounded transition-all duration-300">
            Submit
        </button>
        </form>
    </div>
    </main>
    </div>
        </>
    );
}


