
import PaginationComponent from "./PaginationComponent";
import SearchBarAndFilteringComponent from "./SearchBarAndFilteringComponent";
import MainComponent from "./MainComponent";
import useMain from "../hooks/useMain";
import { Spinner } from "../../../components/UI/Loading";
export default function MainContainer() {
    const {
        totalPages,
        currentPage,
        setCurrentPage,
        projects,
        activeStack,
        handleStackChange,
        setSearchTerm,
        allStacks,
        searchTerm,
        isLoading
    } = useMain();
    return (
        <>
          <div className="mx-auto md:gap-8 max-w-[1280px] md:mt-3 mt-29 bg-[#E5E5E5] drop-shadow-lg drop-shadow-blue-500/50 p-3 overflow-hidden">
            <SearchBarAndFilteringComponent 
            // data pass
            stackOptions={allStacks}
            activeStack={activeStack}
            searchTerm={searchTerm}
            // funcitons pass
            onStackChange={handleStackChange}
            onSearchChange={setSearchTerm}
            />
            {isLoading ? (
               <Spinner />
            ) : ( 
            <MainComponent projects={projects} activeStack={activeStack}/>
            )}
            {projects.length > 0 && (
                <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) => setCurrentPage(page)}
            />
            )}
            
        </div>
        </>
    )
}