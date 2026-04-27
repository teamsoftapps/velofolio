'use client';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import DateNavBar from '@/app/components/layouts/DateNavbar';
import LeadData from '@/utils/Lead.json';
import JobData from '@/utils/JobDetail.json';
import { applyAdvancedFilters } from '@/utils/TableUtils';

type ViewType = 'Day' | 'Week' | 'Month';

export default function Calendar({ setOpenFilter, filters }: any) {
  const today = new Date();
  const { invoices } = useSelector((state: any) => state.persisted.invoiceandQuote);

  // ---- STATE --------------------------------------------------------------
  const [currentDate, setCurrentDate] = useState(today);
  const [view, setView] = useState<ViewType>('Month');
  const [value, setValue] = useState("")

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // -------------------------------------------------------------------------
  const tagsByDate: Record<
    string,
    { label: string; color: string; user: string; DueDate: string }[]
  > = {};

  const addEvent = (rawDate: string, payload: any) => {
    if (!rawDate) return;
    const [y, m, d] = rawDate.split('-').map(Number);
    const key = `${y}-${m}-${d}`;
    if (!tagsByDate[key]) tagsByDate[key] = [];
    if (!tagsByDate[key].some(ext => ext.label === payload.label && ext.DueDate === payload.DueDate)) {
      tagsByDate[key].push(payload);
    }
  };

  // ---- APPLY FILTERS -----------------------------------------------------
  const filteredLeads = useMemo(() => applyAdvancedFilters(LeadData, filters), [filters]);
  const filteredJobs = useMemo(() => applyAdvancedFilters(JobData.map(j => ({
    ...j,
    // Normalize fields for the generic filter helper
    event: j.jobDetails.type,
    status: j.jobDetails.status,
    eventDate: j.jobDetails.shootDate
  })), filters), [filters]);
  const filteredInvoices = useMemo(() => applyAdvancedFilters((invoices || []).map((inv: any) => ({
    ...inv,
    eventDate: inv.createdAt || inv.sentAt,
    status: inv.status
  })), filters), [filters, invoices]);

  // Populate Lead Events — label is the lead's name + interested service
  filteredLeads.forEach((lead) => {
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
  filteredJobs.forEach((job: any) => {
    if (job.eventDate) {
      addEvent(job.eventDate, {
        label: job.jobDetails.title,
        color: 'bg-[#01B0E9]',
        user: `${job.jobDetails.type} · ${job.jobDetails.status}`,
        DueDate: job.eventDate,
      });
    }
  });

  // Populate Invoices from Redux — use sentAt or createdAt as the calendar date
  filteredInvoices.forEach((invoice: any) => {
    const rawDate = invoice.eventDate;
    if (!rawDate) return;
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

  // --- Dynamic daysArray generation based on view ---
  const daysArray = useMemo(() => {
    if (view === 'Month') {
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
      return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    }

    if (view === 'Week') {
      const startOfWeek = new Date(currentDate);
      const day = startOfWeek.getDay();
      startOfWeek.setDate(currentDate.getDate() - day);
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        return {
          day: d.getDate(),
          month: d.getMonth(),
          year: d.getFullYear(),
          isCurrentMonth: true,
        };
      });
    }

    if (view === 'Day') {
      return [{
        day: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        isCurrentMonth: true,
      }];
    }

    return [];
  }, [view, currentDate, daysInCurrentMonth, firstDayOfMonth, lastDayOfMonth, daysInPrevMonth, prevMonth, prevYear, currentMonth, currentYear, nextMonth, nextYear]);

  const weekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 ">
      {/* ---------- NAV BAR ---------- */}
      <DateNavBar
        onMonthChange={setCurrentDate}
        currentView={view}
        onViewChange={(newView) => setView(newView as ViewType)}
        setOpenFilter={setOpenFilter}
      />

      {/* ---------- WEEKDAY LABELS ---------- */}
      {view !== 'Day' && (
        <div className="overflow-x-auto scroller">
          <div className="grid grid-cols-7 mt-4 mx-6 text-center font-semibold border border-gray-200 bg-[#F4F4F5] rounded-lg overflow-hidden min-w-[1000px] lg:min-w-full">
            {weekLabels.map((d, i) => (
              <div
                key={d}
                className={`py-3 text-sm uppercase tracking-wide border-gray-200 ${i !== 6 ? 'border-r' : ''}`}
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------- DATES GRID ---------- */}
      <div className="overflow-x-auto scroller flex-1">
        <div className={`grid ${view === 'Day' ? 'grid-cols-1' : 'grid-cols-7'} mx-6 min-w-[1000px] lg:min-w-full`}>
        {daysArray.map((dateObj, idx) => {
          const { day, month, year, isCurrentMonth } = dateObj;
          const dateKey = `${year}-${month + 1}-${day}`;
          const dayTags = tagsByDate[dateKey] || [];
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

          return (
            <div
              key={idx}
              className={`border border-gray-100 flex flex-col items-start justify-start text-left transition-all ${isToday ? 'bg-blue-100 text-blue-600' : isCurrentMonth ? 'hover:bg-gray-100 bg-white' : 'bg-white text-gray-400'
                }`}
              style={{
                minHeight: '160px',
                height: '170px',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            >
              <div className="text-[15px] font-semibold mb-1 ">{day}</div>

              <div className={`w-full rounded-lg flex-1 overflow-y-auto ${dayTags.length > 0 ? 'bg-[#FFF8E9]' : ''}`}>
                <div className="flex flex-wrap gap-1 p-1">
                  {dayTags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-xs text-white px-2 py-1 rounded-full ${tag.color} whitespace-nowrap`}
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
    </div>
  );
}


