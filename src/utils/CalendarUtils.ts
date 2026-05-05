/** @format */

export type ViewType = 'Day' | 'Week' | 'Month';

export interface CalendarEvent {
  label: string;
  color: string;
  user: string;
  dueDate: string;
}

export interface DayObject {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
}

export const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

export const getDateKey = (year: number, month: number, day: number) => `${year}-${month + 1}-${day}`;

export const generateCalendarDays = (
  view: ViewType,
  currentDate: Date
): DayObject[] => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  if (view === 'Month') {
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfMonth = new Date(currentYear, currentMonth, daysInCurrentMonth).getDay();

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

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
    startOfWeek.setDate(currentDate.getDate() - startOfWeek.getDay());
    
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

  return [{
    day: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
    isCurrentMonth: true,
  }];
};

export const normalizeLeadType = (interestedService: string): string => {
  const service = interestedService?.toLowerCase() || '';
  if (service.includes('wedding')) return 'Wedding';
  if (service.includes('portrait')) return 'Portrait';
  if (service.includes('engagement')) return 'Engagement';
  if (service.includes('corporate')) return 'Corporate';
  if (service.includes('commercial')) return 'Commercial';
  return 'Other';
};

export const mapLeadToCalendarEvent = (lead: any): CalendarEvent => ({
  label: lead.leadName,
  color: lead.status === 'Active' ? 'bg-orange-500' : lead.status === 'New Lead' ? 'bg-red-400' : 'bg-gray-400',
  user: lead.interestedService || 'Lead',
  dueDate: lead.eventDate
});

export const mapJobToCalendarEvent = (job: any): CalendarEvent => ({
  label: job.jobDetails.title,
  color: job.jobDetails.status === 'Completed' ? 'bg-green-600' : 
         job.jobDetails.status === 'In Progress' ? 'bg-[#01B0E9]' : 
         job.jobDetails.status === 'Upcoming' ? 'bg-purple-500' : 'bg-yellow-500',
  user: `${job.jobDetails.type} · ${job.jobDetails.status}`,
  dueDate: job.eventDate
});

export const mapInvoiceToCalendarEvent = (invoice: any): CalendarEvent => {
  const date = invoice.eventDate?.split('T')[0];
  return {
    label: `INV-${invoice.id?.slice(-4)?.toUpperCase() || invoice.id}`,
    color: invoice.status === 'PAID' ? 'bg-green-500' : invoice.status === 'OVERDUE' ? 'bg-red-500' : 'bg-purple-500',
    user: invoice.packages?.[0]?.name || invoice.status || 'Invoice',
    dueDate: date || ''
  };
};

export const buildEventsByDateMap = (
  leads: any[],
  jobs: any[],
  invoices: any[],
  categories: string[]
): Record<string, CalendarEvent[]> => {
  const map: Record<string, CalendarEvent[]> = {};
  
  const addEvent = (date: string, event: CalendarEvent) => {
    if (!date) return;
    const [y, m, d] = date.split('T')[0].split('-').map(Number);
    const key = `${y}-${m}-${d}`;
    if (!map[key]) map[key] = [];
    map[key].push(event);
  };

  if (categories.includes('Leads')) {
    leads.forEach(l => addEvent(l.eventDate, mapLeadToCalendarEvent(l)));
  }

  if (categories.includes('Shoots')) {
    jobs.forEach(j => addEvent(j.eventDate, mapJobToCalendarEvent(j)));
  }

  if (categories.includes('Invoices')) {
    invoices.forEach(inv => addEvent(inv.eventDate, mapInvoiceToCalendarEvent(inv)));
  }

  return map;
};
