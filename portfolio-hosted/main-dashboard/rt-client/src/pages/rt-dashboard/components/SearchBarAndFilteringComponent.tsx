import { FaSlidersH } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import type { SearchBarProps } from "../../../types";

// projects name suggestions
export default function SearchBarAndFilteringComponent({stackOptions, onStackChange, activeStack, searchTerm, onSearchChange } : SearchBarProps)  {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // ------- DETECT CLICKS outside dropdown and close it if clicked elsewhere -----
  // FOR MOBILE
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
  e.preventDefault(); 
  onSearchChange(searchTerm); // Force the search immediately
};


// ----------------

  return (
    <div className="relative flex sm:flex-row flex-col 
    sm:justify-between sm:items-center 
    gap-y-2 gap-x-6 bg-blue-300 sm:bg-blue-200 sm:p-4 p-3 rounded-md"
    >

    {/* Filter stack hover dropdown*/}
    {/* 'group' enables hover on desktop. 'ref' enables click-outside on mobile */}
    <div className="relative inline-block group pb-2" ref={filterRef}>
      <button
        className="flex items-center gap-2
         px-2 py-1.5 sm:px-4 sm:py-1.5 text-sm border rounded-md 
         focus:outline-none focus:ring-2 focus:ring-blue-500 
         sm:hover:bg-gray-100 focus:bg-gray-100
         transition-colors duration-300"
        onClick={() => setFilterOpen(!isFilterOpen)}
        aria-haspopup="true"
        type="button">
        <FaSlidersH />
        <span>Filter Stacks</span>
      </button>
      
     {/* Filter dropdown menu  */}
        <div className={`absolute top-full w-40 bg-white 
        rounded-md  z-10 shadow-md
        opacity-0 pointer-events-none
        transition-all 
        sm:hidden sm:group-hover:block ${isFilterOpen ? 'block' : 'hidden'}
        sm:group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
      `}>
       <form className="p-3">
        {/* 1. THE "ALL" CHECKBOX */}
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={activeStack.length === 0} // "All" is active if nothing else is ticked
                  onChange={() => onStackChange("All")}
                  className="accent-blue-700 size-4 rounded"
                />
                <span className={`text-sm tracking-wide ${activeStack.length === 0 ? "text-blue-700 font-bold" : "text-gray-700"}`}>
                All
              </span>
            </label>
            <hr className="border-gray-100" />
          {/*  DYNAMIC CHECKBOXES FROM DB */ }
            {stackOptions?.map((stack) => {
              const isTicked = activeStack.includes(stack.name);
              return (
              <label
                key={stack._id}
                role="menuitemcheckbox"
                className={`flex items-center gap-2 mb-2 cursor-pointer tracking-wider ${
                  isTicked ? "text-blue-200 font-semibold" : "text-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isTicked}
                  onChange={() => onStackChange(stack.name)}
                  className="accent-blue-700 size-4 rounded"
                />
                <span className={activeStack.includes(stack.name) ? "text-blue-600 font-bold" : "text-gray-700"}>
                  {stack.name}
                </span>
              </label>
            );
          })}
          
          </form>
        </div>
      </div>
      {/* ------------------------------- */}
     {/* SEARCH BAR*/}
        <form onSubmit={handleSearchSubmit} className="flex-1 sm:max-w-md">
          <div className="relative flex sm:flex-row flex-row-reverse gap-2 items-center">
            <button
              type="submit"
              value=""
              onClick={() => {}}
              className="
              cursor-pointer border
              rounded-md p-1.5 md:p-2
              focus:outline-none focus:ring-2 focus:ring-blue-500
              sm:hover:bg-gray-100 focus:bg-gray-100 sm:focus:bg-transparent
              transition-colors duration-200 
              "
              aria-label="Submit Search"
            > 
              <FiSearch className="size-4 md:size-5" />
            </button>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search projects..."
                className="w-full text-sm placeholder-gray-700 sm:placeholder-gray-500 
                tracking-wider px-4 py-1.5 sm:py-1.5 border rounded-md
                focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-300 
                "
            />
            
      </div>
    </form>
  </div> 
  );
}

// 208