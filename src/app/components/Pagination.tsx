
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
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  color?: string;       // active color
  hoverColor?: string;  // hover color
  disabledColor?: string; // new: color when disabled
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  initialPage = 1,
  color = "#14CB95",
  hoverColor = "#33B9E8",
  disabledColor = "#B3E5FC", // light blue for disabled
  onPageChange,
}) => {
  const pasthname = usePathname();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);

  useEffect(() => {
    if (onPageChange) onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="flex justify-center items-center w-full max-w-md mx-auto py-8">
      <div className="flex justify-between items-center gap-4 text-sm">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={isPrevDisabled}
          onMouseEnter={() => setPrevHover(true)}
          onMouseLeave={() => setPrevHover(false)}
          style={{
            backgroundColor: isPrevDisabled
              ? disabledColor
              : prevHover
              ? hoverColor
              : color,
            color: 'white',
            cursor: isPrevDisabled ? 'not-allowed' : 'pointer',
            opacity: isPrevDisabled ? 0.8 : 1,
          }}
          className="flex items-center gap-1 px-4 py-2 rounded-md transition-colors duration-200"
        >
          <FaChevronLeft className="text-sm" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Info */}
        <span className="text-gray-800">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          onMouseEnter={() => setNextHover(true)}
          onMouseLeave={() => setNextHover(false)}
          style={{
            backgroundColor: isNextDisabled
              ? disabledColor
              : nextHover
              ? hoverColor
              : color,
            color: 'white',
            cursor: isNextDisabled ? 'not-allowed' : 'pointer',
            opacity: isNextDisabled ? 0.8 : 1,
          }}
          className="flex items-center gap-1 px-4 py-2 rounded-md transition-colors duration-200"
        >
          <span className="hidden sm:inline">Next</span>
          <FaChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
