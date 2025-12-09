


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination  = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="inline-flex justify-end rounded-md my-1 p-4 gap-2 min-w-[200px] w-full gap-5">
        <div className="rounded-md px-4 py-2 flex gap-2">
        {pages.map((page) => (
            <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`border rounded-lg text-sm px-2.5 py-1 sm:py-1.5 sm:px-3  hover:bg-[#E5E7EB] transition ${
            page === currentPage ? "bg-[#3B82F6] text-white border-[#2196F3]" : ""
            }`}
            aria-current={page === currentPage ? "page" : undefined}
            >
            {page}
            </button>
        ))}

        {totalPages > 3 && (
            <div className="self-end px-2">...</div>
        )}
        </div>
    </div>

    // rewrite and use outlet plus routing like /page/%{page} os similar 
  );
};

export default Pagination;
