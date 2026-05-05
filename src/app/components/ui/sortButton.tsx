/** @format */

'use client';

import React, { useState } from 'react';
import SortModal, { SortOption } from '@/app/components/forms/SortModal';
import { FaSort } from 'react-icons/fa6';

interface SortButtonProps {
  sortBy: { value: string; direction: 'asc' | 'desc' };
  setSortBy: (sort: { value: string; direction: 'asc' | 'desc' }) => void;
  options: SortOption[];
  onSortChange?: (option: SortOption) => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  sortBy,
  setSortBy,
  options,
  onSortChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSortId, setCurrentSortId] = useState(options[0]?.id || '');

  const handleSortChange = (option: SortOption) => {
    setCurrentSortId(option.id);
    setSortBy({ value: option.value, direction: option.direction });
    if (onSortChange) onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
      >
        <FaSort className="text-gray-400" />
        <span className="font-medium">Sort</span>
      </button>

      <SortModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentSort={currentSortId}
        onSortChange={handleSortChange}
        sortBy={sortBy}
        setSortBy={setSortBy as any}
        options={options}
      />
    </div>
  );
};

export default SortButton;