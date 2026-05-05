import { DateValue } from "@internationalized/date";

export interface DashboardStats {
  leads: number;
  jobs: number;
  payments: number;
  pending: number;
  avgRevenue: number;
}

export interface GraphData {
  labels: string[];
  leadPoints: number[];
  jobPoints: number[];
  paymentPoints: number[];
  avgRevenuePoints: number[];
}

export interface DashboardGraphProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  value: DateValue;
  setValue: (value: DateValue) => void;
}

export type DashboardTab = 'Total Revenue' | 'Pending Payments' | 'Active Jobs' | 'New Leads';
