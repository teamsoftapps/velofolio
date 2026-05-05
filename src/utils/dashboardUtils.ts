/** @format */

import { FilterableItem } from '@/types/filters';

/**
 * Parses various date fields into a stable Date object.
 */
export const parseItemDate = (item: any): Date => {
  return new Date(
    item.eventDate || 
    item.leadCreated || 
    item.dateCreated || 
    item.createdAt || 
    item.date || 
    item.dueDate || 
    item.shootDate
  );
};

/**
 * Parses currency strings like "$2,800" into numbers.
 */
export const parseCurrency = (val: any): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  return parseFloat(String(val).replace(/[$,]/g, "")) || 0;
};

/**
 * Groups items by their date string for O(1) lookup during graph generation.
 */
export function groupItemsByDate<T>(items: T[], getValue: (item: T) => number = () => 1) {
  return items.reduce((acc, item) => {
    const dateKey = parseItemDate(item).toDateString();
    acc[dateKey] = (acc[dateKey] || 0) + getValue(item);
    return acc;
  }, {} as Record<string, number>);
}

/**
 * Groups items by month (0-11) for YTD/All Data views.
 */
export function groupItemsByMonth<T>(items: T[], getValue: (item: T) => number = () => 1) {
  return items.reduce((acc, item) => {
    const month = parseItemDate(item).getMonth();
    acc[month] = (acc[month] || 0) + getValue(item);
    return acc;
  }, {} as Record<number, number>);
}
