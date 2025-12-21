
// import toast from "react-hot-toast";
import type { Project, StackOption } from "../../../types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function useMain() {
    // 1. URL Params 
    const [searchParams, setSearchParams] = useSearchParams();
    // paginatiion
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [projects, setProjects] = useState<Project[]>([]);
    // dropdown filter
    const [activeStack, setActiveStack] = useState<string[]>(['MERN']);
    const [allStacks, setAllStacks] = useState<StackOption[]>([]);
    // search filter
    const [searchTerm, setSearchTerm ] = useState("");
    // const [loading, setLoading] = useState(false);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    useEffect(() => {
        const getProjects = async () => {
            try {
                const query = new URLSearchParams({
                    stack: activeStack.join(','),
                    page: currentPage.toString(),
                    search: searchTerm
                })
                const res = await fetch(`${API_BASE_URL}/api/v1/projects?${query.toString()}`);
                if (!res.ok) throw new Error("Failed fetching projects for pagination");
                const data = await res.json();
                setProjects(data.projects);
                setTotalPages(data.totalPages);
                // SAFETY CLAMP
                // If we are on Page 5, but results only have 3 pages, force go to Page 3. etc
                if (data.totalPages > 0 && currentPage > data.totalPages) {
                    setCurrentPage(data.totalPages);
                }
            } catch (error) {
                console.error(error);
                setProjects([]);
                toast.error("Error loading projects")
            }
        };
        // DEBOUNCE
        // Wait 500ms after user stops typing/clicking before fetching
        const timeoutId = setTimeout(() => {
            getProjects();
        }, 500)
        // Cleanup: If user types again before 500ms, cancel the previous timer
            return () => clearTimeout(timeoutId);
        }, [currentPage, activeStack, searchTerm, API_BASE_URL]);

        const handleStackChange = (stackName: string) => {
        // reset to page 1 when filter changes
        setCurrentPage(1);
        if(stackName === "All") {
        // Ticking "All" clears all specific filters
        setActiveStack([]); 
        return;
        };
        setActiveStack((prev) => 
        prev.includes(stackName) 
            ? prev.filter(s => s !== stackName) // Untick
            : [...prev, stackName]              // Tick
        );
        }

    useEffect(() => {
        const getStacks = async() => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/projects/stacks`, {
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
                });
                const data = await res.json();
                // backend returns: array: [{_id: "1", name: "MERN" ..
                setAllStacks(data);
            } catch (error) {
                console.error("Failed to get stack", error)
            }
        };
        getStacks();
    }, [API_BASE_URL]);

    return {
        projects, 
        activeStack,
        currentPage,
        totalPages, 
        handleStackChange,
        searchTerm, 
        setSearchTerm,
        setCurrentPage,
        setActiveStack,
        allStacks
    };
}
