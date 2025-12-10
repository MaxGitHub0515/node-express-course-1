
import toast from "react-hot-toast";
import type { ProjectFormValues } from "../../../types";

export default function useCreateProject() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

    const createProject = async(values: ProjectFormValues) => {
        try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);

        if (values.imageUrl && values.fileUpload?.length) {
        throw new Error("Provide either Image URL OR Upload File, not both");
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
        toast.success("Project created successfully");
    } catch (error) {
        if (error instanceof Error) toast.error(error.message);
    };
}; return { createProject }; }