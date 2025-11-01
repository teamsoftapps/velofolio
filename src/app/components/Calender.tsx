
'use client';

import { useState } from 'react';
import DateNavBar from './DateNavbar';

type ViewType = 'Day' | 'Week' | 'Month';

export default function Calendar() {
  const today = new Date();

  // ---- STATE --------------------------------------------------------------
  const [currentDate, setCurrentDate] = useState(today);
  const [view, setView] = useState<ViewType>('Month');

  // Derive month/year from currentDate
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // -------------------------------------------------------------------------
  // Example tags – keyed by "YYYY-M-D"
  const tagsByDate: Record<
    string,
    { label: string; color: string; user: string; DueDate: string }[]
  > = {
    [`${currentYear}-${currentMonth + 1}-3`]: [
      { label: 'New Leads', color: 'bg-green-500', user: 'John Doe', DueDate: '10 Oct 2025' },
      { label: 'Tasks', color: 'bg-blue-500', user: 'John Doe', DueDate: '10 Oct 2025' },
    ],
    [`${currentYear}-${currentMonth + 1}-8`]: [
      { label: 'Progress', color: 'bg-yellow-500', user: 'John Doe', DueDate: '10 Oct 2025' },
    ],
    [`${currentYear}-${currentMonth + 1}-15`]: [
      { label: 'Meeting', color: 'bg-purple-500', user: 'John Doe', DueDate: '10 Oct 2025' },
      { label: 'Report', color: 'bg-red-500', user: 'John Doe', DueDate: '10 Oct 2025' },
    ],
  };

  // -------------------------------------------------------------------------
  // Helper functions
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const lastDayOfMonth = new Date(currentYear, currentMonth, daysInCurrentMonth).getDay();

  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  // --- Build days for grid (including previous and next month) ---
  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: daysInPrevMonth - firstDayOfMonth + i + 1,
    month: prevMonth,
    year: prevYear,
    isCurrentMonth: false,
  }));

  const currentMonthDays = Array.from({ length: daysInCurrentMonth }, (_, i) => ({
    day: i + 1,
    month: currentMonth,
    year: currentYear,
    isCurrentMonth: true,
  }));

  const nextMonthDays = Array.from({ length: 6 - lastDayOfMonth }, (_, i) => ({
    day: i + 1,
    month: nextMonth,
    year: nextYear,
    isCurrentMonth: false,
  }));

  const daysArray = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* ---------- NAV BAR ---------- */}
      <DateNavBar
        onMonthChange={setCurrentDate}
        currentView={view}
        onViewChange={setView}
      />

      {/* ---------- WEEKDAY LABELS ---------- */}
      <div className="grid grid-cols-7 mt-4 mx-6 text-center font-semibold border border-gray-200 dark:border-gray-800 bg-[#F4F4F5] dark:bg-gray-950 rounded-lg overflow-hidden">
  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
    <div
      key={d}
      className={`py-3 text-sm uppercase tracking-wide border-gray-200 dark:border-gray-800
        ${i !== 6 ? 'border-r' : ''}  // add vertical divider except for last column
      `}
    >
      {d}
    </div>
  ))}
</div>


      {/* ---------- DATES GRID ---------- */}
      <div className="grid grid-cols-7 flex-1 mx-6">
        {daysArray.map((dateObj, idx) => {
          const { day, month, year, isCurrentMonth } = dateObj;

          const dateKey = `${year}-${month + 1}-${day}`;
          const dayTags = tagsByDate[dateKey] || [];

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={idx}
              className={`border border-gray-100 dark:border-gray-800 flex flex-col items-start justify-start text-left transition-all 
                ${
                  isToday
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : isCurrentMonth
                    ? 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'bg-white dark:bg-gray-950 text-gray-400'
                }`}
              style={{
                minHeight: '120px',
                height: '120px',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            >
              <div className="text-lg font-semibold mb-1 ">{day}</div>

              <div
                className={`w-full rounded-lg flex-1 overflow-y-auto ${
                  dayTags.length > 0 ? 'bg-[#FFF8E9]' : ''
                }`}
              >
                <div className="flex flex-wrap gap-1 p-1">
                  {dayTags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-xs text-white px-1 py-0.5 rounded-full ${tag.color}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>

                {dayTags.length > 0 && (
                  <div className="mt-1 px-1">
                    <p className="text-sm font-medium text-gray-800">
                      {dayTags[0].user}
                    </p>
                    <p className="text-xs text-gray-500">
                      {dayTags[0].DueDate}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
