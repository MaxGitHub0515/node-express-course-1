import { useState } from "react";
import { FaSlidersH } from "react-icons/fa";
// import { FiSearch } from "react-icons/fi";

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
    <div className="relative flex sm:flex-row flex-col sm:items-center gap-y-2 items-start justify-between bg-blue-200 gap-x-6 rounded-lg sm:p-4 p-3">
    <div className="">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-sm  border-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 "
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
        <div className="flex-1 max-w-md  w-full">
            {/* <button className="flex items-end"> 
              <FaSlidersH />

            </button> */}
            <input
                type="text"
                placeholder="Search projects..."
                className="w-full text-sm placeholder-gray-500 tracking-wider  px-4 py-1.5 sm:py-2 border-1 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <FiSearch className="" /> */}
        </div>
    </div>
  );




  
}

