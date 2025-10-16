/** @format */
'use client';
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  initialPage = 1,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  useEffect(() => {
    if (onPageChange) onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePrevious = () => {
    setCurrentPage((prev) => {
      const newPage = Math.max(prev - 1, 1);

      return newPage;
    });
  };

  const handleNext = () => {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev + 1, totalPages);

      return newPage;
    });
  };

  return (
    <div className='flex justify-center items-center w-full max-w-md mx-auto py-8'>
      <div className='flex justify-between items-center gap-4 text-sm'>
        <button
          onClick={handlePrevious}
          className='flex items-center gap-1 px-4 py-2 rounded-md bg-white text-gray-800 hover:bg-blue-200 disabled:bg-[#14CB95] disabled:text-white disabled:cursor-not-allowed'
          disabled={currentPage === 1}>
          <FaChevronLeft className='text-sm' />
          Previous
        </button>

        <span className='text-gray-800'>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          onClick={handleNext}
          className='flex items-center gap-1 px-4 py-2 rounded-md bg-white text-gray-800 hover:bg-blue-200 disabled:bg-[#14CB95] disabled:text-white disabled:cursor-not-allowed'
          disabled={currentPage === totalPages}>
          Next
          <FaChevronRight className='text-sm' />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
