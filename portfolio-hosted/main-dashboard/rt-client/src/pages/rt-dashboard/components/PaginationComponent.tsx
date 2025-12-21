

import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination  = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Hide if there's only 1 page (or 0)
  if (totalPages <= 1) return null;
  //page numbers with ellipses (e.g., 1 ... 4 5 6 ... 10)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (currentPage > 3) pages.push("...");
        
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        
        for (let i = start; i <= end; i++) pages.push(i);

        if (currentPage < totalPages - 2) pages.push("...");
        pages.push(totalPages);
    }
    return pages;
  };
  return (
    <div className="inline-flex justify-end rounded-md my-1 p-4 gap-2 min-w-[200px] w-full gap-5">
       {/* PREVIOUS BUTTON */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
      >
        <MdOutlineKeyboardArrowLeft size={24} />
      </button>
    {/* PAGE NUMBERS */}
      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === "..."}
            className={`
              px-3 py-1 rounded-md text-sm font-medium transition-all border
              ${page === currentPage 
                ? "bg-blue-600 text-white border-blue-600 shadow-sm" 
                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"}
              ${page === "..." ? "border-none cursor-default hover:bg-transparent" : ""}
            `}
          >
            {page}
          </button>
        ))}
      </div>
       {/* NEXT BUTTON */}
        <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
      >
        <MdOutlineKeyboardArrowRight size={24} />
      </button>
        </div>


    // rewrite and use outlet plus routing like /page/%{page} os similar 
  );
};

export default Pagination;
