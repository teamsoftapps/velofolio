/** @format */

'use client';

import React from 'react';
import { CalendarEvent } from '@/utils/CalendarUtils';

interface CalendarDayProps {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  tags: CalendarEvent[];
}

const CalendarDay = ({
  day,
  isCurrentMonth,
  isToday,
  tags
}: CalendarDayProps) => (
  <div
    className={`border border-gray-100 flex flex-col items-start justify-start text-left transition-all ${
      isToday ? 'bg-blue-100 text-blue-600' : isCurrentMonth ? 'hover:bg-gray-100 bg-white' : 'bg-white text-gray-400'
    }`}
    style={{ minHeight: '120px', height: '140px', padding: '8px' }}
  >
    <div className="text-[15px] font-semibold mb-1">{day}</div>
    <div className={`w-full rounded-lg flex-1 overflow-y-auto ${tags.length > 0 ? 'bg-[#FFF8E9]' : ''}`}>
      <div className="flex flex-wrap gap-1 p-1">
        {tags.map((tag, i) => (
          <span key={i} className={`text-xs text-white px-2 py-1 rounded-full ${tag.color} whitespace-nowrap`}>
            {tag.label}
          </span>
        ))}
      </div>
      {tags.length > 0 && (
        <div className="mt-1 px-1">
          <p className="text-sm font-medium text-gray-800">{tags[0].user}</p>
          <p className="text-xs text-gray-500">{tags[0].dueDate}</p>
        </div>
      )}
    </div>
  </div>
);

export default CalendarDay;
