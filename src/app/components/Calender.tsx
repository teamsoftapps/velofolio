
'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import DateNavBar from './DateNavbar';
import LeadData from '../../utils/Lead.json';
import JobData from '../../utils/JobDetail.json';

type ViewType = 'Day' | 'Week' | 'Month';

export default function Calendar({setOpenFilter}:any) {
  const today = new Date();
  // Pull real invoice data from Redux store
  const { invoices } = useSelector((state: any) => state.persisted.invoiceandQuote);

  // ---- STATE --------------------------------------------------------------
  const [currentDate, setCurrentDate] = useState(today);
  const [view, setView] = useState<ViewType>('Month');
const [value,setValue]=useState("")
  // Derive month/year from currentDate
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // -------------------------------------------------------------------------
  // Example tags – keyed by "YYYY-M-D"
  const tagsByDate: Record<
    string,
    { label: string; color: string; user: string; DueDate: string }[]
  > = {};

  const addEvent = (rawDate: string, payload: any) => {
    if (!rawDate) return;
    // Parse date parts directly from ISO string (YYYY-MM-DD) to avoid
    // timezone offset shifting the day when Date() interprets as UTC midnight
    const [y, m, d] = rawDate.split('-').map(Number);
    const key = `${y}-${m}-${d}`;
    if (!tagsByDate[key]) tagsByDate[key] = [];
    
    // De-duplication check: same label on the same date = skip
    const isDuplicate = tagsByDate[key].some(
      (existing) =>
        existing.label === payload.label &&
        existing.DueDate === payload.DueDate
    );
    
    if (!isDuplicate) {
      tagsByDate[key].push(payload);
    }
  };

  // Populate Lead Events — label is the lead's name + interested service
  LeadData.forEach((lead) => {
    if (lead.eventDate) {
      addEvent(lead.eventDate, {
        label: lead.leadName as string,
        color: 'bg-[#FF9800]',
        user: lead.interestedService || 'Lead',
        DueDate: lead.eventDate,
      });
    }
  });

  // Populate Production / Job Shoot Dates — label is the job title
  JobData.forEach((job) => {
    if (job.jobDetails?.shootDate) {
      addEvent(job.jobDetails.shootDate, {
        label: job.jobDetails.title,
        color: 'bg-[#01B0E9]',
        user: `${job.jobDetails.type} · ${job.jobDetails.status}`,
        DueDate: job.jobDetails.shootDate,
      });
    }
  });

  // Populate Invoices from Redux — use sentAt or createdAt as the calendar date
  (invoices || []).forEach((invoice: any) => {
    // createdAt = user-selected issue date (preferred); sentAt = when sent to client
    const rawDate = invoice.createdAt || invoice.sentAt;
    if (!rawDate) return;
    // ISO date strings — extract YYYY-MM-DD part only to avoid time/timezone shift
    const datePart = rawDate.split('T')[0];
    const firstPackage = invoice.packages?.[0];
    addEvent(datePart, {
      label: `INV-${invoice.id?.slice(-4)?.toUpperCase() || invoice.id}`,
      color: invoice.status === 'PAID'
        ? 'bg-green-500'
        : invoice.status === 'OVERDUE'
        ? 'bg-red-500'
        : 'bg-purple-500',
      user: firstPackage?.name || invoice.status || 'Invoice',
      DueDate: datePart,
    });
  });

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
    <div className="min-h-screen flex flex-col bg-white  text-gray-900 ">
      {/* ---------- NAV BAR ---------- */}
      <DateNavBar
        onMonthChange={setCurrentDate}
        currentView={view}
        onViewChange={setView}
        setOpenFilter={setOpenFilter}
      />

      {/* ---------- WEEKDAY LABELS ---------- */}
      <div className="grid grid-cols-7 mt-4 mx-6 text-center font-semibold border border-gray-200  bg-[#F4F4F5]  rounded-lg overflow-hidden">
  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
    <div
      key={d}
      className={`py-3 text-sm uppercase tracking-wide border-gray-200 
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
              className={`border border-gray-100   flex flex-col items-start justify-start text-left transition-all 
                ${
                  isToday
                    ? 'bg-blue-100  text-blue-600'
                    : isCurrentMonth
                    ? 'hover:bg-gray-100 '
                    : 'bg-white  text-gray-400'
                }`}
              style={{
                minHeight: '160px',
                height: '170px',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            >
              <div className="text-[15px] font-semibold mb-1 ">{day}</div>

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
