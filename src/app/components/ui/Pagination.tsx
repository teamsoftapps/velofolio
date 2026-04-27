
// /** @format */
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// interface PaginationProps {
//   totalPages: number;
//   initialPage?: number;
//   onPageChange?: (page: number) => void;
//   color?: string;       
//   hoverColor?: string;  
// }

// const Pagination: React.FC<PaginationProps> = ({
//   totalPages,
//   initialPage = 1,
//   color = "#14CB95",
//   hoverColor = "#12B784",
//   onPageChange,
// }) => {
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const [prevHover, setPrevHover] = useState(false);
//   const [nextHover, setNextHover] = useState(false);

//   useEffect(() => {
//     if (onPageChange) onPageChange(currentPage);
//   }, [currentPage, onPageChange]);

//   const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

//   return (
//     <div className="flex justify-center items-center w-full max-w-md mx-auto py-8">
//       <div className="flex justify-between items-center gap-4 text-sm">
//         {/* Previous Button */}
//         <button
//           onClick={handlePrevious}
//           disabled={currentPage === 1}
//           onMouseEnter={() => setPrevHover(true)}
//           onMouseLeave={() => setPrevHover(false)}
//           style={{
//             backgroundColor: currentPage === 1 ? color : prevHover ? hoverColor : 'white',
//             color: currentPage === 1 ? 'white' : '#1F2937', 
//             cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//           }}
//           className="flex  items-center gap-1 px-4 py-2 rounded-md transition-colors duration-200"
//         >
//           <FaChevronLeft className="text-sm" />
//        <span className='hidden sm:inline'>  Previous</span> 
//         </button>

//         {/* Page Info */}
//         <span className="text-gray-800">
//           Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
//         </span>

//         {/* Next Button */}
//         <button
//           onClick={handleNext}
//           disabled={currentPage === totalPages}
//           onMouseEnter={() => setNextHover(true)}
//           onMouseLeave={() => setNextHover(false)}
//           style={{
//             backgroundColor:
//               currentPage === totalPages ? color : nextHover ? hoverColor : 'white',
//             color: currentPage === totalPages ? 'white' : '#1F2937',
//             cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//           }}
//           className="flex items-center gap-1 px-4 py-2 rounded-md transition-colors duration-200"
//         >
//          <span className='hidden sm:inline'>  Next</span> 
//           <FaChevronRight className="text-sm" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
/** @format */
'use client';
import React, { useState, useEffect } from 'react';
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  color?: string;
  hoverColor?: string;
  disabledColor?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  initialPage = 1,
  onPageChange,
  // We keep these props in the signature to avoid breaking callers like UserTable,
  // but we prioritize the standardized black theme for consistency.
  color,
  hoverColor,
  disabledColor,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (onPageChange) onPageChange(newPage);
    }
  };

  const renderPageButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        totalPages <= 7 ||
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
              currentPage === i
                ? 'bg-black text-white shadow-md shadow-gray-200'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {i}
          </button>
        );
      } else if (
        (i === 2 && currentPage > 4) ||
        (i === totalPages - 1 && currentPage < totalPages - 3)
      ) {
        pages.push(
          <span key={i} className="px-2 text-gray-400">
            ...
          </span>
        );
      }
    }
    return pages;
  };



  return (
    <div className="flex justify-center w-full py-8">
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-500 hover:text-black'
          }`}
        >
          <HiArrowLongLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-2">
          {renderPageButtons()}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-500 hover:text-black'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <HiArrowLongRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
