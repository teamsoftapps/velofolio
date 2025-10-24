// /** @format */
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// interface PaginationProps {
//   totalPages: number;
//   initialPage?: number;
//   onPageChange?: (page: number) => void;
//   color?: string;
// }
// const Pagination: React.FC<PaginationProps> = ({
//   totalPages,
//   initialPage = 1,
//   color="#14CB95",
//   onPageChange,
// }) => {
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const [bgColor, setbgColor] = useState(color);
//   useEffect(() => {
//     if (onPageChange) onPageChange(currentPage);
//   }, [currentPage, onPageChange]);

//   const handlePrevious = () => {
//     setCurrentPage((prev) => {
//       const newPage = Math.max(prev - 1, 1);

//       return newPage;
//     });
//   };

//   const handleNext = () => {
//     setCurrentPage((prev) => {
//       const newPage = Math.min(prev + 1, totalPages);

//       return newPage;
//     });
//   };

//   return (
//     <div className='flex justify-center items-center w-full max-w-md mx-auto py-8'>
//       <div className='flex justify-between items-center gap-4 text-sm'>
//         <button
//           onClick={handlePrevious}
//           className={`flex items-center gap-1 px-4 py-2 rounded-md bg-white text-gray-800 hover:bg-blue-200 disabled:bg-[${color}] disabled:text-white disabled:cursor-not-allowed`}
//           disabled={currentPage === 1}>
//           <FaChevronLeft className='text-sm' />
//           Previous
//         </button>

//         <span className='text-gray-800'>
//           Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
//         </span>

//         <button
//           onClick={handleNext}
//           className={`flex items-center gap-1 px-4 py-2 rounded-md bg-white text-gray-800 hover:bg-blue-200 disabled:bg-[${color}] disabled:text-white disabled:cursor-not-allowed`}
//           disabled={currentPage === totalPages}>
//           Next
//           <FaChevronRight className='text-sm' />
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

interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  color?: string;       // primary color for disabled state or highlight
  hoverColor?: string;  // optional hover color for active buttons
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  initialPage = 1,
  color = "#14CB95",
  hoverColor = "#12B784",
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);

  useEffect(() => {
    if (onPageChange) onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="flex justify-center items-center w-full max-w-md mx-auto py-8">
      <div className="flex justify-between items-center gap-4 text-sm">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          onMouseEnter={() => setPrevHover(true)}
          onMouseLeave={() => setPrevHover(false)}
          style={{
            backgroundColor: currentPage === 1 ? color : prevHover ? hoverColor : 'white',
            color: currentPage === 1 ? 'white' : '#1F2937', // gray-800
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
          className="flex items-center gap-1 px-4 py-2 rounded-md transition-colors duration-200"
        >
          <FaChevronLeft className="text-sm" />
          Previous
        </button>

        {/* Page Info */}
        <span className="text-gray-800">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          onMouseEnter={() => setNextHover(true)}
          onMouseLeave={() => setNextHover(false)}
          style={{
            backgroundColor:
              currentPage === totalPages ? color : nextHover ? hoverColor : 'white',
            color: currentPage === totalPages ? 'white' : '#1F2937',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
          className="flex items-center gap-1 px-4 py-2 rounded-md transition-colors duration-200"
        >
          Next
          <FaChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
