'use client';

import React, { useState, useEffect } from 'react';
import { HiChevronDown, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import FilterButton from './filterButton';

type ViewType = 'Day' | 'Week' | 'Month';

interface Props {
  onMonthChange: (date: Date) => void;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  setOpenFilter: (isOpen: boolean) => void;
}

export default function DateNavBar({
  onMonthChange,
  currentView,
  onViewChange,
  setOpenFilter,
}: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Format month name like "November 2025"
  const formatMonth = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Format day (for daily view)
  const formatDay = (date: Date) =>
    date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  // Format week (e.g. "Nov 10 - Nov 16, 2025")
  const formatWeek = (date: Date) => {
    const start = new Date(date);
    const end = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday start
    start.setDate(diff);
    end.setDate(start.getDate() + 6);

    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startStr} - ${endStr}`;
  };

  // Navigation functions
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'Month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (currentView === 'Week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
    onMonthChange(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'Month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (currentView === 'Week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
    onMonthChange(newDate);
  };

  // Generate next 12 months based on currentDate’s month
  const getNext12Months = () => {
    const months = [];
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    for (let i = 0; i < 12; i++) {
      const month = new Date(start.getFullYear(), start.getMonth() + i, 1);
      months.push(month);
    }
    return months;
  };

  const handleSelectMonth = (month: Date) => {
    setCurrentDate(month);
    onMonthChange(month);
    setIsDropdownOpen(false);
  };

  // Keep parent in sync on mount/update
  useEffect(() => {
    onMonthChange(currentDate);
  }, [currentDate]);

  // Determine label based on current view
  const getDisplayLabel = () => {
    switch (currentView) {
      case 'Day':
        return formatDay(currentDate);
      case 'Week':
        return formatWeek(currentDate);
      case 'Month':
      default:
        return formatMonth(currentDate);
    }
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border-b border-gray-200 px-4 py-3">
      {/* LEFT SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">

        {/* Navigation Buttons + Month/Week/Day Label */}
        <div className="relative flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors border"
            aria-label="Previous"
          >
            <HiChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              disabled={currentView !== 'Month'} // dropdown only for month view
              className={`flex items-center justify-center gap-1 font-medium text-gray-900 min-w-[160px] sm:min-w-[190px] text-center p-1.5 rounded-lg border transition-colors ${currentView === 'Month' ? 'hover:bg-gray-50' : 'opacity-70 cursor-not-allowed'
                }`}
            >
              <span className="text-sm sm:text-base">{getDisplayLabel()}</span>
              {currentView === 'Month' && (
                <HiChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
              )}
            </button>

            {/* Month Dropdown */}
            {isDropdownOpen && currentView === 'Month' && (
              <div className="absolute left-0 scroller z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {getNext12Months().map((month, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectMonth(month)}
                    className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${month.getMonth() === currentDate.getMonth() &&
                        month.getFullYear() === currentDate.getFullYear()
                        ? 'bg-[#01B0E9]/10 font-medium text-[#01B0E9]'
                        : 'text-gray-800'
                      }`}
                  >
                    {formatMonth(month)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={goToNext}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors border"
            aria-label="Next"
          >
            <HiChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* View Toggle (Day / Week / Month) */}
        <div className="flex bg-gray-100 rounded-lg p-1 w-full border sm:w-auto">
          {(['Day', 'Week', 'Month'] as ViewType[]).map((view) => (
            <button
              key={view}
              onClick={() => {
                onViewChange(view);
                setIsDropdownOpen(false);
              }}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-sm font-medium rounded-md transition-all ${currentView === view
                  ? 'bg-[#01B0E9] text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900'
                }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT SECTION (Filter) */}
      <div className="w-full sm:w-auto">
        <FilterButton setOpenFilter={setOpenFilter} />
      </div>
    </div>
  );
}
