import { projectPaginationRange } from './paginationRangeProjection';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = projectPaginationRange(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center gap-2 mt-8 py-4 border-t border-neutral-800">
      {pages.map((page, idx) => {
        if (page === '...') {
          return (
            <span key={`dots-${idx}`} className="px-3 text-neutral-500">
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`
              w-10 h-10 rounded-md transition-colors font-medium
              ${
                isActive
                  ? 'bg-indigo-700 text-white'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100'
              }
            `}
          >
            {page}
          </button>
        );
      })}
    </nav>
  );
}
