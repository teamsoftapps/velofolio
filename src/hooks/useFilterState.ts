/** @format */

import { useState, useCallback } from 'react';
import { TeamMember } from '@/config/filterConfig';

export interface FilterState {
  status: string[];
  leadStatus: string[];
  shootStatus: string[];
  invoiceStatus: string[];
  selectedMembers: TeamMember[];
  leadSource: string[];
  eventType: string[];
  fromDate: string;
  toDate: string;
  paymentStatus: string[];
  categories: string[];
}

export const INITIAL_FILTER_STATE: FilterState = {
  status: [],
  leadStatus: [],
  shootStatus: [],
  invoiceStatus: [],
  selectedMembers: [],
  leadSource: [],
  eventType: [],
  fromDate: '',
  toDate: '',
  paymentStatus: [],
  categories: ['Leads', 'Shoots', 'Invoices'],
};

export const useFilterState = (onApply: (filters: FilterState) => void, onClose: () => void) => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const current = prev[key] as string[];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  }, []);

  const setDateRange = useCallback((from: string, to: string) => {
    setFilters((prev) => ({ ...prev, fromDate: from, toDate: to }));
  }, []);

  const addMember = useCallback((member: TeamMember) => {
    setFilters((prev) => {
      if (prev.selectedMembers.find((m) => m.id === member.id)) return prev;
      return { ...prev, selectedMembers: [...prev.selectedMembers, member] };
    });
    setDropdownOpen(false);
  }, []);

  const removeMember = useCallback((id: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedMembers: prev.selectedMembers.filter((m) => m.id !== id),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTER_STATE);
    onApply(INITIAL_FILTER_STATE);
  }, [onApply]);

  const applyFilters = useCallback(() => {
    onApply(filters);
    onClose();
  }, [filters, onApply, onClose]);

  return {
    filters,
    dropdownOpen,
    setDropdownOpen,
    toggleFilter,
    setDateRange,
    addMember,
    removeMember,
    resetFilters,
    applyFilters,
  };
};
