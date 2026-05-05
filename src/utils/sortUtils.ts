/** @format */

import { getItemDate } from './dateUtils';
import { FilterableItem } from '@/types/filters';

export interface SortState {
  value: string;
  direction: 'asc' | 'desc';
}

/**
 * Generic sorting utility for table data.
 */
export function sortData<T extends FilterableItem>(data: T[], sortBy: SortState): T[] {
  const { value, direction } = sortBy;

  return [...data].sort((a, b) => {
    // 1. String sorting
    const stringFields = [
      'name', 'firstName', 'lastName', 'email', 'phone', 'status', 
      'event', 'leadName', 'client', 'job', 'jobType', 'task', 
      'Name', 'Role', 'Email', 'Phone', 'Status', 'Assigned Jobs', 
      'invoiceNumber', 'paymentStatus', 'paymentMethod'
    ];

    if (stringFields.includes(value)) {
      const aVal = String(a[value] || '');
      const bVal = String(b[value] || '');
      return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    // 2. Numeric sorting
    const numericFields = ['amount', 'paid', 'balance'];
    if (numericFields.includes(value)) {
      const cleanNumber = (val: any) => {
        if (typeof val === 'number') return val;
        if (!val) return 0;
        const cleaned = String(val).replace(/[^\d.-]/g, '');
        return parseFloat(cleaned) || 0;
      };
      
      const aNum = cleanNumber(a[value]);
      const bNum = cleanNumber(b[value]);
      return direction === 'asc' ? aNum - bNum : bNum - aNum;
    }

    // 3. Date sorting
    const dateFields = ['dueDate', 'eventDate', 'createdAt', 'leadCreated', 'dateCreated', 'date'];
    if (dateFields.includes(value)) {
      const aTime = getItemDate(a)?.getTime() || 0;
      const bTime = getItemDate(b)?.getTime() || 0;
      return direction === 'asc' ? aTime - bTime : bTime - aTime;
    }

    return 0;
  });
}
