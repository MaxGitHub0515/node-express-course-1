import { useState } from "react";
import { FaSlidersH } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
// import { Suggestions, SuggestProjectName } from "../mockData/data";
// import {Stack, stacksMock} from "../mockData/data";


interface Stack {
  id: string;
  label: string;
}
// mock data for stacks, later be added from db 

const stacksMock: Stack[] = [
  { id: "mern", label: "MERN" },
  { id: "mevn", label: "MEVN" },
  { id: "lamp", label: "LAMP" },
];

// projects name suggestions



export default function SearchBarAndFilteringComponent(): React.ReactElement {
  const [isOpen, setOpen] = useState<boolean>(false);

  // Set mern checked by default
  const [selectedStack, setSelectedStack] = useState<Record<string, boolean>>({
    mern: true,
    mevn: false,
    lamp: false,
  });

  const toggleDropdown = (): void => setOpen((prev) => !prev);
  
  function toggleStack(id: string): void {
    setSelectedStack((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }





  return (
    <div className="relative flex sm:flex-row flex-col 
    sm:justify-between sm:items-center
    gap-y-2 gap-x-6 bg-blue-300 sm:bg-blue-200 sm:p-4 p-3">
    <div className="">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2
         px-2 py-1.5 sm:px-4 sm:py-1.5 text-sm  border-1 rounded-md 
         focus:outline-none focus:ring-2 focus:ring-blue-500 
         sm:hover:bg-gray-100 sm:focus:bg-transparent focus:bg-gray-100
         transition-colors duration-300 ease-in-out

         "
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
      >
        <FaSlidersH />
        <span>Filter Stack</span>
      </button>
        </div>
   
      {isOpen && (
        <div className="absolute top-full mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
          <form className="p-3">
            {stacksMock.map(({ id, label }) => (
              <label
                key={id}
                className={`flex items-center gap-2 mb-2 cursor-pointer ${
                  selectedStack[id] ? "text-green-600 font-semibold" : "text-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedStack[id]}
                  onChange={() => toggleStack(id)}
                  className="accent-green-600"
                />
                {label}
              </label>
            ))}
          </form>
        </div>
      )}
        <div className="flex-1 sm:max-w-md">
          <div className="flex sm:flex-row flex-row-reverse gap-2 items-center ">
            <button
            type="button"
            onClick={() => console.log("Search clicked")}
            className="
            cursor-pointer
            border-1  rounded-md sm:p-1.5 p-2
            focus:outline-none focus:ring-2 focus:ring-blue-500
            sm:hover:bg-gray-100 focus:bg-gray-100 sm:focus:bg-transparent
            transition-colors duration-200 ease-in-out 
           
            "
            aria-label="Search"
            > 
              <FiSearch className="sm:w-[30px] sm:h-[30px] " />

            </button>
            <input
                type="text"
                placeholder="Search projects..."
                className="w-full text-sm placeholder-gray-700 sm:placeholder-gray-500 
                tracking-wider px-4 py-1.5 sm:py-1.5 border-1 rounded-md
                focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-300 ease-in-out 
                
                "
            />
          </div>
           
        </div>
    </div>
  );





}

