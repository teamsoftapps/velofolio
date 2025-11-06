// 'use client';

// import React, { useState } from 'react';
// import { HiChevronDown, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
// import FilterButton from './filterButton';

// type ViewType = 'Day' | 'Week' | 'Month';

// interface Props {
//   /** Called when the month changes – the calendar will receive the new date */
//   onMonthChange: (date: Date) => void;
//   /** Current view (Day / Week / Month) – optional, just for UI */
//   currentView: ViewType;
//   onViewChange: (view: ViewType) => void;
// }

// export default function DateNavBar({
//   onMonthChange,
//   currentView,
//   onViewChange,
// }: Props) {
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   const formatMonth = (date: Date) =>
//     date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

//   const goToPreviousMonth = () => {
//     const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
//     setCurrentMonth(prev);
//     onMonthChange(prev);
//   };

//   const goToNextMonth = () => {
//     const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
//     setCurrentMonth(next);
//     onMonthChange(next);
//   };

//   return (
//     <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
//       {/* LEFT – Month navigation + view toggle */}
//       <div className="flex items-center gap-5">
//         {/* Month selector */}
//         <div className="flex items-center gap-2">
//           <button
//             onClick={goToPreviousMonth}
//             className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer border-1"
//             aria-label="Previous month"
//           >
//             <HiChevronLeft className="w-5 h-5 text-gray-600" />
//           </button>

//           <div className="font-medium text-gray-900 min-w-[190px] text-center flex items-center justify-center gap-4 p-1 cursor-pointer rounded-lg px-2 border-1 hover:bg-gray-50">
//             <span>{formatMonth(currentMonth)}</span>
//             <HiChevronDown className="w-5 h-5 text-gray-600" />
//           </div>

//           <button
//             onClick={goToNextMonth}
//             className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer border-1"
//             aria-label="Next month"
//           >
//             <HiChevronRight className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         {/* View toggle */}
//         <div className="flex bg-gray-100 rounded-lg p-1  border-1">
//           {(['Day', 'Week', 'Month'] as ViewType[]).map((view) => (
//             <button
//               key={view}
//               onClick={() => onViewChange(view)}
//               className={`px-3 py-1 text-sm font-medium rounded-md transition-all cursor-pointer ${
//                 currentView === view ? 'bg-[#01B0E9] text-white' : 'text-black'
//               }`}
//             >
//               {view}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT – Filter */}
//       <FilterButton />
//     </div>
//   );
// }
'use client';

import React, { useState } from 'react';
import { HiChevronDown, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import FilterButton from './filterButton';

type ViewType = 'Day' | 'Week' | 'Month';

interface Props {
  onMonthChange: (date: Date) => void;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
   setOpenFilter: (isOpen: boolean) => void
}

export default function DateNavBar({
  onMonthChange,
  currentView,
  onViewChange,
   setOpenFilter
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatMonth = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const goToPreviousMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    setCurrentMonth(prev);
    onMonthChange(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    setCurrentMonth(next);
    onMonthChange(next);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border-b border-gray-200 px-4 py-3">
      {/* LEFT: Month + View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
        
        {/* Month Navigation */}
        <div className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors  border-1"
            aria-label="Previous month"
          >
            <HiChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button className="flex items-center justify-center gap-1 font-medium  text-gray-900 min-w-[140px] sm:min-w-[190px] text-center p-1.5 rounded-lg hover:bg-gray-50 transition-colors border ">
            <span className="text-sm sm:text-base">{formatMonth(currentMonth)}</span>
            <HiChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          <button
            onClick={goToNextMonth}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors border-1"
            aria-label="Next month"
          >
            <HiChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 w-full  border-1 sm:w-auto  ">
          {(['Day', 'Week', 'Month'] as ViewType[]).map((view) => (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                currentView === view
                  ? 'bg-[#01B0E9] text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Filter */}
      <div className="w-full sm:w-auto">
        <FilterButton  setOpenFilter={setOpenFilter}/>
      </div>
    </div>
  );
}