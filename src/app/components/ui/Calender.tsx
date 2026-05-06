/** @format */

'use client';

import React, { useState, useMemo } from 'react';
import DateNavBar from '@/app/components/layouts/DateNavbar';
import CalendarDay from '@/app/components/ui/CalendarDay';
import {
  ViewType,
  generateCalendarDays,
  getDateKey
} from '@/utils/CalendarUtils';
import { FilterState } from '@/hooks/useFilterState';
import { useCalendarData } from '@/hooks/useCalendarData';
import { WEEK_LABELS } from '@/config/filterConfig';

interface CalendarProps {
  setOpenFilter: (isOpen: boolean) => void;
  filters: FilterState;
}

export default function Calendar({ setOpenFilter, filters }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('Month');

  const { eventsByDate } = useCalendarData(filters);

  const daysArray = useMemo(() =>
    generateCalendarDays(view, currentDate),
    [view, currentDate]);

  const today = new Date();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <DateNavBar
        onMonthChange={setCurrentDate}
        currentView={view}
        onViewChange={(v) => setView(v as ViewType)}
        setOpenFilter={setOpenFilter}
      />

      {view !== 'Day' && (
        <div className="overflow-x-auto">
          <div className="min-w-[560px] mx-4 sm:mx-6">
            <div className="grid grid-cols-7 mt-4 text-center font-semibold border border-gray-200 bg-[#F4F4F5] rounded-lg overflow-hidden">
              {WEEK_LABELS.map((label, i) => (
                <div
                  key={label}
                  className={`py-3 text-sm uppercase tracking-wide border-gray-200 ${i !== 6 ? 'border-r' : ''}`}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-x-auto">
        <div className={`min-w-[560px] mx-4 sm:mx-6`}>
          <div className={`grid ${view === 'Day' ? 'grid-cols-1' : 'grid-cols-7'}`}>
            {daysArray.map((date) => {
              const dateKey = getDateKey(date.year, date.month, date.day);
              const isToday = date.day === today.getDate() &&
                date.month === today.getMonth() &&
                date.year === today.getFullYear();

              return (
                <CalendarDay
                  key={dateKey}
                  day={date.day}
                  isCurrentMonth={date.isCurrentMonth}
                  isToday={isToday}
                  tags={eventsByDate[dateKey] || []}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
