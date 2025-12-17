import { useState } from "react";
import { FaSlidersH } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";

// import { Suggestions, SuggestProjectName, Stack, stacksMock } from "../mockData/data";



interface Stack {
  id: string;
  label: string;
}
interface SuggestProjectName {
    _id: string;
    name: string;
    stack: string
    slug: string
}
// mock data for stacks, later be added from db 

const stacksMock: Stack[] = [
  { id: "mern", label: "MERN" },
  { id: "mevn", label: "MEVN" },
  { id: "lamp", label: "LAMP" },
];

export const Suggestions: SuggestProjectName[] = [
  { _id: "1", name: "Messera", slug: "54f4t4fdf45ds454fr", stack: "mern" },
  { _id: "2", name: "BooklyStore", slug: "jfj53454fd343dgf4g", stack: "mern" },
  { _id: "3", name: "Modaily", slug: "kcf3t4fdf45ds454fa", stack: "mern" },
  { _id: "4", name: "Project", slug: "942ft4fdf45ds454fb", stack: "mern" },
  { _id: "5", name: "Project", slug: "76f4t4fdf45ds454fc", stack: "lamp" },
];

// projects name suggestions
export default function SearchBarAndFilteringComponent(): React.ReactElement {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Set mern checked by default
  const [selectedStack, setSelectedStack] = useState<Record<string, boolean>>({
    mern: true,
    mevn: false,
    lamp: false,
  });

  const [isAutocompleteOpen, setAutocompleteOpen] = useState(false); 
  const containerRef = useRef<HTMLDivElement>(null); 
  function toggleStack(id: string): void {
    setSelectedStack((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

   // Detect clicks outside dropdown and close it if clicked elsewhere
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setAutocompleteOpen(false); // close autocomplete dropdown
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

      // Filter stacks for the filter dropdown based on searchTerm
      // Filter stacks dropdown options based on searchTerm (optional)
      const filteredStacks = stacksMock.filter(({ label }) =>
        label.toLowerCase().startsWith(searchTerm.toLowerCase())
      );

      // SEARCH AUTOCOMPLETE: filter all projects matching search term, regardless of stack filters
      const filteredProjects = Suggestions.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );


   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
     if (e.target.value.trim() !== "") {
    setAutocompleteOpen(true);
    } else {
    setAutocompleteOpen(false);
  }
  };
  
  // When clicking a suggestion label, toggle its checkbox
  const handleSuggestionClick = (project: SuggestProjectName) => {
    setAutocompleteOpen(false);
    // Navigate to detailed page with query params: search term, stack, and page=1
    navigate(
      `/main-dashboard/projects/${project.slug}?search=${encodeURIComponent(
        searchTerm
      )}&stack=${project.stack}&page=1`
    );
  };

  return (
    <div className="relative flex sm:flex-row flex-col 
    sm:justify-between sm:items-center 
    gap-y-2 gap-x-6 bg-blue-300 sm:bg-blue-200 sm:p-4 p-3 rounded-md"
    >

    {/* Filter stack hover dropdown*/}
    <div className="relative inline-block group pb-2" ref={containerRef}>
      <button
        className="flex items-center gap-2
         px-2 py-1.5 sm:px-4 sm:py-1.5 text-sm border rounded-md 
         focus:outline-none focus:ring-2 focus:ring-blue-500 
         sm:hover:bg-gray-100 focus:bg-gray-100
         transition-colors duration-300"
        aria-haspopup="true"
        type="button">
        <FaSlidersH />
        <span>Filter Stack</span>
      </button>
      
     {/* Filter dropdown menu  */}
        <div className={`absolute top-full w-40 bg-white 
        rounded-md  z-10 shadow-md
        opacity-0 pointer-events-none
        transition-all duration-300 ease-in-out
        group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
      `}>
       <form className="p-3">
            {filteredStacks.map(({ id, label }) => (
              <label
                key={id}
                role="menuitemcheckbox"
                className={`flex items-center gap-2 mb-2 cursor-pointer tracking-wider ${
                  selectedStack[id] ? "text-blue-200 font-semibold" : "text-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedStack[id]}
                  onChange={() => toggleStack(id)}
                  className="accent-blue-700 size-4 rounded"
                />
                {label}
              </label>
            ))}
          </form>
        </div>
      </div>
      {/* ------------------------------- */}
     {/* Search bar with autocomplete */}
        <div className="flex-1 sm:max-w-md">
          <div className="relative flex sm:flex-row flex-row-reverse gap-2 items-center">
            <button
              type="button"
              value=""
              onClick={() => {}}
              className="
              cursor-pointer border
              rounded-md p-1.5 md:p-2
              focus:outline-none focus:ring-2 focus:ring-blue-500
              sm:hover:bg-gray-100 focus:bg-gray-100 sm:focus:bg-transparent
              transition-colors duration-200 
              "
              aria-label="Search"
            > 
              <FiSearch className="size-4 md:size-5" />
            </button>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onFocus={() => setAutocompleteOpen(true)}
                placeholder="Search projects..."
                className="w-full text-sm placeholder-gray-700 sm:placeholder-gray-500 
                tracking-wider px-4 py-1.5 sm:py-1.5 border rounded-md
                focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-300 
                "
            />
              {/* Autocomplete dropdown */}
           {isAutocompleteOpen && filteredProjects.length > 0 && (
                <ul
                className="absolute top-full left-0 right-0 z-10 mt-2 max-h-60 overflow-auto 
                bg-white rounded-md shadow-md
                transition-opacity duration-300 ease-in-out opacity-100"
                style={{ animation: "fadeIn 0.3s ease forwards" }}
                >
      {filteredProjects.map(({ _id, name, slug, stack }) => (
        <li
          key={_id}
          onClick={() => handleSuggestionClick({ _id, name, slug, stack })}
          className="cursor-pointer px-4 py-2 hover:bg-blue-100"
        >
          {name} <span className="text-xs text-gray-500">({stack.toUpperCase()})</span>
        </li>
      ))}
     </ul>
        )}
      </div>
    </div>
  </div> 
  );
}