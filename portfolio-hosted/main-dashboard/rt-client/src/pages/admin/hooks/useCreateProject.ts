
import toast from "react-hot-toast";
import type { ProjectFormValues } from "../../../types";

export default function useCreateProject() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

    const createProject = async(values: ProjectFormValues, onSuccess: () => void ) => {
        try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        // loop through the array and append each tag to the same key "stack"
        if (values.stack && values.stack.length > 0) {
            values.stack.forEach((tag) => {
                formData.append("stack", tag);
            });
        }

        if (!values.imageUrl && !values.fileUpload?.length) {
        toast.error("Please provide an Image URL or Upload a file");
        return;
        }

        if (values.imageUrl && values.fileUpload?.length) {
            throw new Error("Provide either Image URL OR Upload File - Not Both");
        }
        
        if (values.imageUrl) formData.append("imageUrl", values.imageUrl) 
        else if (values.fileUpload?.length) formData.append("fileUpload", values.fileUpload[0]);

        const res = await fetch(`${API_BASE_URL}/api/v1/projects`, {
            method: "POST",
            body: formData,
            credentials: "include",
      });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.msg || "Project creation failed");
        }
        // prevent reset() from being executed after failed try/catch
        // Case: only desc and name being added - results in cleared form and error after 
        // submit but instead should result in img check error
        if(onSuccess) onSuccess();
        toast.success("Project created successfully");
    } catch (error) {
        if (error instanceof Error) toast.error(error.message);
    };
}; return { createProject }; }