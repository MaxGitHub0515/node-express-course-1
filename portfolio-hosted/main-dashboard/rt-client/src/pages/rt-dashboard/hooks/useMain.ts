
import { useEffect, useState, useCallback, useMemo } from "react"; // <--- Import useMemo
import { useSearchParams } from "react-router-dom";
import type { Project, StackOption } from "../../../types";
import toast from "react-hot-toast";

export default function useMain() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading ] = useState<boolean>(true)
    const [projects, setProjects] = useState<Project[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [allStacks, setAllStacks] = useState<StackOption[]>([]);
    
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

    const currentPage = Number(searchParams.get("page")) || 1;
    const searchTerm = searchParams.get("search") || "";
    const stackParam = searchParams.get("stack");
    // This creates a stable reference for activeStack. 
    // It only recreates the array when 'stackParam' string changes.
    const activeStack = useMemo(() => {
        return (stackParam && stackParam !== "All") 
            ? stackParam.split(",") 
            : [];
    }, [stackParam]);

    useEffect(() => {
        const getProjects = async () => {
            setIsLoading(true)
            try {
                const stackQueryValue = activeStack.length > 0 ? activeStack.join(",") : "All";
                
                const query = new URLSearchParams({
                    stack: stackQueryValue,
                    page: currentPage.toString(),
                    search: searchTerm
                });

                const res = await fetch(`${API_BASE_URL}/api/v1/projects?${query.toString()}`);
                if (!res.ok) throw new Error("Failed fetching projects");
                
                const data = await res.json();
                setProjects(data.projects);
                setTotalPages(data.totalPages);

                if (data.totalPages > 0 && currentPage > data.totalPages) {
                    setSearchParams(prev => {
                        prev.set("page", data.totalPages.toString());
                        return prev;
                    });
                }
            } catch (error) {
                console.error(error);
                setProjects([]);
                toast.error("Error loading projects");
            } finally {
                setIsLoading(false)
            }
        };

        const timeoutId = setTimeout(() => {
            getProjects();
        }, 500);

        return () => clearTimeout(timeoutId);
        
    // Because we used useMemo above, this won't cause an infinite loop.
    }, [currentPage, activeStack, searchTerm, API_BASE_URL, setSearchParams]); 

    // ... (Keep the rest of your handlers: setCurrentPage, setSearchTerm, handleStackChange, refetchStacks) ...
    
    // For completeness, here are the handlers again so you don't lose them:
    const setCurrentPage = (page: number) => {
        setSearchParams(prev => {
            prev.set("page", page.toString());
            return prev;
        });
    };

    const setSearchTerm = (term: string) => {
        setSearchParams(prev => {
            if (term) prev.set("search", term);
            else prev.delete("search");
            prev.set("page", "1"); 
            return prev;
        });
    };

    const handleStackChange = (stackName: string) => {
        setSearchParams(prev => {
            const currentRaw = prev.get("stack");
            const currentList = (currentRaw && currentRaw !== "All") 
                ? currentRaw.split(",") 
                : [];

            let newStacks: string[];

            if (stackName === "All") {
                newStacks = []; 
            } else {
                if (currentList.includes(stackName)) {
                    newStacks = currentList.filter(s => s !== stackName);
                } else {
                    newStacks = [...currentList, stackName];
                }
            }

            if (newStacks.length === 0) {
                prev.delete("stack"); 
            } else {
                prev.set("stack", newStacks.join(","));
            }
            prev.set("page", "1"); 
            return prev;
        });
    };

    const refetchStacks = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/projects/stacks`, {
                headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
            });
            const data = await res.json();
            setAllStacks(data);
        } catch (error) {
            console.error("Failed to get stack", error);
        }
    }, [API_BASE_URL]);

    useEffect(() => {
        refetchStacks();
    }, [refetchStacks]);

    return {
        projects, 
        isLoading,
        activeStack,
        currentPage,
        totalPages, 
        handleStackChange,
        searchTerm, 
        setSearchTerm,
        setCurrentPage,
        allStacks,
        refetchStacks
    };
}