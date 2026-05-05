/** @format */

import { DashboardStats } from '@/types/dashboard';

/**
 * Defines the static and dynamic configuration for Dashboard Stats Tabs.
 * This centralizes the labels, keys, and display logic.
 */
export const getDashboardTabs = (stats: DashboardStats) => [
  { 
    label: "Total Revenue", 
    key: "Total Revenue", 
    value: `$${stats.payments.toLocaleString()}`, 
    extra: "($0)" 
  },
  { 
    label: "Pending Payments", 
    key: "Pending Payments", 
    value: `$${(stats.pending || 0).toLocaleString()}`, 
    extra: "($0)" 
  },
  { 
    label: "Active Jobs", 
    key: "Active Jobs", 
    value: stats.jobs.toString(), 
    extra: "" 
  },
  { 
    label: "New Leads", 
    key: "New Leads", 
    value: stats.leads.toString(), 
    extra: "" 
  },
];
