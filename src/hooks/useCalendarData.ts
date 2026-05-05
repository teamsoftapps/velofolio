/** @format */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/types/store';
import { FilterState } from './useFilterState';
import { applyAdvancedFilters } from '@/utils/TableUtils';
import LeadData from '@/utils/Lead.json';
import JobData from '@/utils/JobDetail.json';
import { 
  transformLeadsForFilter, 
  transformJobsForFilter, 
  transformInvoicesForFilter 
} from '@/adapters/calendarAdapters';
import { buildEventsByDateMap } from '@/utils/CalendarUtils';

export const useCalendarData = (filters: FilterState) => {
  const { invoices } = useSelector((state: RootState) => state.persisted.invoiceandQuote);

  // 1. Transform Data
  const normalizedLeads = useMemo(() => transformLeadsForFilter(LeadData), []);
  const normalizedJobs = useMemo(() => transformJobsForFilter(JobData), []);
  const normalizedInvoices = useMemo(() => transformInvoicesForFilter(invoices || []), [invoices]);

  // 2. Filter Data
  const filteredLeads = useMemo(() => 
    applyAdvancedFilters(normalizedLeads, { ...filters, status: filters.leadStatus }), 
  [filters, normalizedLeads]);

  const filteredJobs = useMemo(() => 
    applyAdvancedFilters(normalizedJobs, { ...filters, status: filters.shootStatus }), 
  [filters, normalizedJobs]);

  const filteredInvoices = useMemo(() => 
    applyAdvancedFilters(normalizedInvoices, { ...filters, status: filters.invoiceStatus }), 
  [filters, normalizedInvoices]);

  // 3. Build Events Map
  const eventsByDate = useMemo(() => 
    buildEventsByDateMap(filteredLeads, filteredJobs, filteredInvoices, filters.categories),
  [filters.categories, filteredLeads, filteredJobs, filteredInvoices]);

  return {
    eventsByDate,
    rawCounts: {
      leads: filteredLeads.length,
      jobs: filteredJobs.length,
      invoices: filteredInvoices.length
    }
  };
};
