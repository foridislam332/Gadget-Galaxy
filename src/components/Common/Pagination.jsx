import { useMemo } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination = ({ page, setPage, pageCount }) => {
    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < pageCount) setPage(page + 1);
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const paginationRange = useMemo(() => {
        const totalPageNumbers = 7;
        const pages = [];

        if (pageCount <= totalPageNumbers) {
            for (let i = 1; i <= pageCount; i++) {
                pages.push(i);
            }
        } else {
            let startPage = Math.max(1, page - 2);
            let endPage = Math.min(pageCount, page + 2);

            if (startPage <= 2) {
                endPage = 5;
                startPage = 1;
            } else if (endPage >= pageCount - 1) {
                startPage = pageCount - 4;
                endPage = pageCount;
            }

            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) pages.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < pageCount) {
                if (endPage < pageCount - 1) pages.push('...');
                pages.push(pageCount);
            }
        }

        return pages;
    }, [page, pageCount]);

    return (
        <div className="flex items-center justify-center relative scale-75 sm:scale-100">
            <button
                className={`relative inline-flex items-center rounded-s-md px-2 py-2 text-gray hover:text-white ring-1 ring-inset duration-200 ${page === 1 ? 'bg-gray/20 hover:bg-gray/20' : 'hover:bg-primary'}`}
                onClick={handlePrevPage}
                disabled={page === 1}
            >
                <IoIosArrowBack className="h-5 w-5" />
            </button>

            {paginationRange.map((p, index) => (
                <button
                    key={index}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 duration-300 ${page === p ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'} ${p === '...' ? 'disabled' : ''}`}
                    onClick={() => p !== '...' && handlePageClick(p)}
                    disabled={p === '...'}
                >
                    {p}
                </button>
            ))}

            <button
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray hover:text-white ring-1 ring-inset hover:bg-primary duration-200 ${page === pageCount ? 'bg-gray/20 hover:bg-gray/20' : ''}`}
                onClick={handleNextPage}
                disabled={page === pageCount}
            >
                <IoIosArrowForward className="h-5 w-5" />
            </button>
        </div>
    );
};

export default Pagination;