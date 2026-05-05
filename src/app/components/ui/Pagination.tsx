/** @format */
'use client';

import React from 'react';
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
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
            className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
              currentPage === i
                ? 'bg-black text-white'
                : 'text-gray-400 hover:bg-gray-50'
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
          <span key={i} className="px-2 text-gray-300 font-normal">
            ...
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'text-gray-200 cursor-not-allowed'
            : 'text-gray-400 hover:text-black'
        }`}
      >
        <HiArrowLongLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 mx-4">
        {renderPageButtons()}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
          currentPage === totalPages || totalPages === 0
            ? 'text-gray-200 cursor-not-allowed'
            : 'text-gray-400 hover:text-black'
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <HiArrowLongRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Pagination;
