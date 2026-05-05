/** @format */

'use client';

import React, { useState } from 'react';
import Calendar from '@/app/components/ui/Calender';
import CalenderHeader from '@/app/components/layouts/CalenderHeader';
import FilterModal from '@/app/components/forms/FilterModal';
import { INITIAL_FILTER_STATE, FilterState } from '@/hooks/useFilterState';

const CalendarPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  
  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="w-full bg-[#FAFAFA]">
      <FilterModal
        isOpen={isFilterOpen}
        isVisible={isFilterVisible}
        setIsVisible={setIsFilterVisible}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />

      <div className="min-h-screen w-full flex flex-col items-start bg-[#FAFAFA] pb-10 lg:w-[94%] xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto w-full h-full">
          <CalenderHeader />
          <Calendar 
            setOpenFilter={setIsFilterOpen} 
            filters={filters} 
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
