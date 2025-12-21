

// import ReactMarkdown from "react-markdown";
import type { Project } from "../../../types";
export default function MainComponent({projects}: {projects: Project[]}) {
    return (
        /* Projects dynamically via admin console later - hardcoded data removed*/
            <main className="flex flex-col sm:flex-row  mx-auto sm:items-start items-center flex-wrap gap-4 h-full">
               <header className=" w-full ">
                    <div className="text-xl uppercase tracking-wide font-semibold px-1 mt-4 sm:text-start text-center"> Stack Projects</div>
                </header>
                {projects.map((project) => (
                <div key={project._id} className="flex-grow flex-[1_1_0%] max-w-sm sm:mx-auto space-y-8">
                    <div className="relative aniamte-gradient-border">
                    {/* projectUrl */}
                    <a
                    href={project.projectLocUrl}
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
        
    )
}