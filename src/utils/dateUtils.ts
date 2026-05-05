/** @format */

import { DateString } from '@/types/common';

/**
 * Robustly extracts a Date object from various possible date field names in an item.
 */
export function getItemDate(item: any): Date | null {
  const dateStr = 
    item.dateCreated || 
    item.leadCreated || 
    item.createdAt || 
    item.date || 
    item.eventDate || 
    item.dueDate ||
    item.shootDate;
  
  if (!dateStr || dateStr === 'N/A' || (typeof dateStr !== 'string' && typeof dateStr !== 'number' && !(dateStr instanceof Date))) {
    return null;
  }
  
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;

  // Fallback to secondary date fields if primary is descriptive (e.g. "Upon Signing")
  const fallbackDate = item.createdAt || item.date || item.eventDate;
  if (fallbackDate) {
    const d2 = new Date(fallbackDate);
    if (!isNaN(d2.getTime())) return d2;
  }
  
  return null;
}

/**
 * Formats a date for display or keys.
 */
export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString();
};
