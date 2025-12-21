

// import ReactMarkdown from "react-markdown";
import type { Project } from "../../../types";
import ReactMarkdown from "react-markdown";

interface MainComponentProps {
    projects: Project[];
    activeStack: string[]; // Receive the active filters
}

export default function MainComponent({projects, activeStack}: MainComponentProps) {
    //  dynamic header title
    // If empty or "All" -> "All Projects"
    // If ["React"] -> "React Projects"
    // If ["React", "Node"] -> "React & Node Projects"
    const headerTitle = activeStack.length === 0 
        ? "All Projects" 
        : `${activeStack.join(" & ")} Projects`;

    return (
        /* Projects dynamically via admin console later - hardcoded data removed*/
            <main className="flex flex-col sm:flex-row  mx-auto sm:items-start items-center flex-wrap gap-4 h-full">
               <header className=" w-full ">
                    <div className="text-xl uppercase tracking-wide font-semibold px-1 mt-4 sm:text-start text-center">{headerTitle}</div>
                </header>
                {projects.map((project) => (
                <div key={project._id} className="flex-grow flex-[1_1_0%] max-w-sm sm:mx-auto space-y-8">
                    {/* IMAGE CARD */}
                    <div className="relative aniamte-gradient-border">
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
                        <div className="text-lg text-medium uppercase text-center my-4 underline underline-offset-4 tracking-widest">
                        {/* app name */}
                        {project.name}
                        </div>
                        {/*  DESCRIPTION & KEY FEATURES (From Markdown) */}
                       <ReactMarkdown
                            components={{
                                    ul: ({ ...props }) => (
                                        <ul className="list-disc pl-5 space-y-2 tracking-wide" {...props} />
                                    ),
                                    li: ({ ...props }) => (
                                        <li className="leading-relaxed" {...props} />
                                    ),
                                    // This styles "**Key Features**" or "**MESSERA**"
                                    strong: ({ ...props }) => (
                                        <span className="font-bold text-black" {...props} />
                                    )
                            }}
                            >
                            {project.description}
                        </ReactMarkdown>
                    </section>
                    </div>
                </div>
                ))}
            </main>
        
    )
}