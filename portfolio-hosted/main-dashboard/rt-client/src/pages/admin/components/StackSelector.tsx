

import { useState, useEffect, useRef } from "react";
import { FiX, FiPlus } from "react-icons/fi";
import type { UseFormSetValue, FieldErrors } from "react-hook-form";
import type { ProjectFormValues, StackOption } from "../../../types"

interface StackSelectorProps {
  allStacks: StackOption[];
  setValue: UseFormSetValue<ProjectFormValues>;
  errors: FieldErrors<ProjectFormValues>;
  initialTags?: string[];
}

export default function StackSelector({ allStacks, setValue, errors, initialTags = [] }: StackSelectorProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync internal state with React Hook Form whenever selectedTags changes
  useEffect(() => {
    setValue("stack", selectedTags, { shouldValidate: true });
  }, [selectedTags, setValue]);

  // Click Outside to close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const addTag = (name: string) => {
    if (!selectedTags.includes(name)) {
      setSelectedTags([...selectedTags, name]);
    }
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const removeTag = (name: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== name));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">Stack (Tags)</label>
      
      <div className="flex flex-wrap gap-2 p-2 border rounded bg-white focus-within:ring-2 focus-within:ring-green-600 min-h-[42px] transition-all">
        {selectedTags.map(tag => (
          <span key={tag} className="flex items-center gap-1 bg-gray-700 text-white px-2 py-1 rounded text-xs">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400">
              <FiX size={14} />
            </button>
          </span>
        ))}
        
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setIsDropdownOpen(true); }}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder={selectedTags.length === 0 ? "e.g. React, Node..." : ""}
          className="flex-grow outline-none text-sm p-1"
        />
      </div>

      {errors.stack && <p className="text-red-600 text-sm mt-1">{errors.stack.message as string}</p>}

      {isDropdownOpen && searchTerm && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded shadow-xl z-50 max-h-40 overflow-y-auto">
          {allStacks
            .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedTags.includes(s.name))
            .map(stack => (
              <button key={stack._id} type="button" onClick={() => addTag(stack.name)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-green-50">
                {stack.name}
              </button>
            ))}

          {!allStacks.some(s => s.name.toLowerCase() === searchTerm.toLowerCase()) && (
           <button 
              type="button" 
              onClick={() => addTag(searchTerm)}
              className="w-full text-left px-4 py-2 text-sm text-green-600 font-bold bg-gray-50 border-t flex items-center gap-2"
            >
              <FiPlus size={16} /> 
              Add new stack "{searchTerm}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}