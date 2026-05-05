/** @format */

// Facade for modularized utilities to maintain backward compatibility
export * from './dateUtils';
export * from './filterUtils';
export * from './sortUtils';

import { filterBySearch } from './filterUtils';

/**
 * @deprecated Use filterBySearch from filterUtils instead.
 * Provided for backward compatibility.
 */
export const filterData = filterBySearch;

/**
 * Utility for handling UI-based deletion flows.
 */
export function handleDelete(setDeleteModal: (isOpen: boolean) => void) {
  console.log('Item deleted');
  setDeleteModal(false);
}
