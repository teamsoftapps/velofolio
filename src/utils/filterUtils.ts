/** @format */

import { getItemDate } from './dateUtils';
import { FilterableItem, AdvancedFilters } from '@/types/filters';


/**
 * Performs a broad text search across common searchable fields.
 */
export function filterBySearch<T extends FilterableItem>(data: T[], search: string): T[] {
  if (!search.trim()) return data;
  const lower = search.toLowerCase();
  
  return data.filter((item) => {
    const searchFields = [
      item.firstName, item.lastName, item.email, item.Email,
      item.phone, item.Phone, item.client, item.leadName,
      item.name, item.Name, item.Role
    ];
    
    return searchFields.some(field => 
      String(field || '').toLowerCase().includes(lower)
    );
  });
}

/**
 * Applies complex filters including status, date ranges, and members.
 */
export function applyAdvancedFilters<T extends FilterableItem>(
  data: T[],
  filters: AdvancedFilters
): T[] {
  const {
    status,
    selectedMembers,
    leadSource,
    eventType,
    fromDate,
    toDate,
    paymentStatus,
  } = filters;

  return data.filter((item) => {
    // 1. Status Filter
    if (status?.length && !status.includes(item.status || item.Status || '')) return false;

    // 2. Assigned Member Filter
    if (selectedMembers?.length) {
      const itemMembers = String(item.name || item.assignedTeam || '');
      const hasMatch = selectedMembers.some(m => itemMembers.includes(m.name));
      if (!hasMatch) return false;
    }

    // 3. Lead Source Filter
    if (leadSource?.length && !leadSource.includes(item.leadSource || '')) return false;

    // 4. Event Type Filter
    const type = item.event || item.jobType || '';
    if (eventType?.length && !eventType.includes(type)) return false;

    // 5. Payment Status Filter
    if (paymentStatus?.length) {
      const currentStatus = (item.paymentStatus || "").toLowerCase();
      const hasMatch = paymentStatus.some(s => s.toLowerCase() === currentStatus);
      if (!hasMatch) return false;
    }

    // 6. Date Range Filter
    const itemDate = getItemDate(item);
    if (fromDate) {
      const from = new Date(fromDate);
      from.setHours(0, 0, 0, 0);
      if (!itemDate || itemDate < from) return false;
    }
    if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      if (!itemDate || itemDate > to) return false;
    }

    return true;
  });
}

/**
 * Dashboard-specific time range filtering.
 */
export function filterByTimeRange<T extends FilterableItem>(
  data: T[], 
  range: string, 
  customDate?: Date
): T[] {
  const now = customDate || new Date();
  let startTime = new Date(now);
  let endTime = new Date(now);

  startTime.setHours(0, 0, 0, 0);
  endTime.setHours(23, 59, 59, 999);

  switch (range) {
    case '7 Days':
    case 'Custom':
      startTime.setDate(now.getDate() - 7);
      break;
    case '30 Days':
      startTime.setDate(now.getDate() - 30);
      break;
    case 'Mtd':
      startTime = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'Ytd':
      startTime = new Date(now.getFullYear(), 0, 1);
      break;
    case 'All Data':
      return data;
    default:
      break;
  }

  return data.filter(item => {
    const d = getItemDate(item);
    return d && d >= startTime && d <= endTime;
  });
}
