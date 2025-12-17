

import PaginationComponent from "./PaginationComponent"
import SearchBarAndFilteringComponent from "./SearchBarAndFilteringComponent";
import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
import type { Project } from "../../../types";
export default function MainComponent() {
    // paginatiion
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
    useEffect(() => {
        async function fetchProjects() {
            const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
            try {
            const res = await fetch(`${API_BASE_URL}/api/v1/projects?page=${currentPage}`);
            if (!res.ok) throw new Error("Failed fetching projects for pagination");
            const data = await res.json();
            setProjects(data.projects);
            setTotalPages(data.totalPages);
            } catch (error) {
                console.error(error);
                setProjects([]);
            }

    } fetchProjects();
    }, [currentPage]);

    return (
    /* Projects dynamically via admin console later - hardcoded data removed*/
        <div className="mx-auto md:gap-8 max-w-[1280px] md:mt-3 mt-29 bg-[#E5E5E5] drop-shadow-lg drop-shadow-blue-500/50 p-3">
            <SearchBarAndFilteringComponent />
            <main className="flex flex-col sm:flex-row  mx-auto sm:items-start items-center flex-wrap gap-4 h-full">
                <header className=" w-full ">
                    <div className="text-xl uppercase tracking-wide font-semibold px-1 mt-4 sm:text-start text-center">Mern Stack Projects</div>
                </header>
                {projects.map((project) => (
                <div key={project._id} className="flex-grow flex-[1_1_0%] max-w-sm sm:mx-auto space-y-8">
                    <div className="relative aniamte-gradient-border">
                    {/* projectUrl */}
                    <a
                    href={project.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <img
                    src={project.image}
                    alt={project.name}
                    className="
                        cursor-pointer
                        w-full h-auto rounded-xl
                        bg-gradient-to-br from-gray-800 to-gray-700
                        border-2 border-indigo-700
                        transition-transform duration-300 ease-in-out
                        hover:scale-110 block
                        animate-gradient-border
                        "                       
                    />
                    </a> 
                    </div>
                    <div className="space-y-3 border border-[#addbff] rounded-lg p-2 mb-4 ">
                    <section>
                        <div className="text-lg text-medium uppercase text-center my-4 
                        underline underline-offset-4 tracking-widest">
                        {/* app name */}
                        {project.name}
                        </div>
                        <ul className="list-disc pl-5 tracking-wider text-sm">
                            <li className="">
                                <span className="uppercase font-medium decoration-2 drop-shadow-xs">{project.name}</span> 
                                <span className="mx-2">—</span>
                                {project.description}
                            </li>
                        </ul>
                    </section>
                    </div>
                </div>
                ))}
            </main>
             <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) => setCurrentPage(page)}
            />
        </div>
        
    )
}