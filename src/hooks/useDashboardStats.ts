/** @format */

import { useMemo } from 'react';
import { DateValue } from '@internationalized/date';
import { filterByTimeRange } from '@/utils/TableUtils';
import { DashboardStats, GraphData } from '@/types/dashboard';
import { 
  parseItemDate, 
  parseCurrency, 
  groupItemsByDate, 
  groupItemsByMonth 
} from '@/utils/dashboardUtils';

// Mock data imports
import LeadData from '@/utils/Lead.json';
import JobData from '@/utils/Job.json';
import PaymentData from '@/utils/Payements.json';

export const useDashboardStats = (timeRange: string, value: DateValue) => {
  // 1. Filter Raw Data (O(n))
  const filteredData = useMemo(() => {
    const customDate = timeRange === "Custom" ? new Date(value.year, value.month - 1, value.day) : undefined;
    return {
      leads: filterByTimeRange(LeadData, timeRange, customDate),
      jobs: filterByTimeRange(JobData, timeRange, customDate),
      payments: filterByTimeRange(PaymentData, timeRange, customDate),
      now: customDate || new Date()
    };
  }, [timeRange, value]);

  // 2. Pre-aggregate Data for O(1) lookup in loops
  const aggregated = useMemo(() => {
    const { leads, jobs, payments } = filteredData;
    
    return {
      daily: {
        leads: groupItemsByDate(leads),
        jobs: groupItemsByDate(jobs),
        payments: groupItemsByDate(payments, (p: any) => parseCurrency(p.paid))
      },
      monthly: {
        leads: groupItemsByMonth(leads),
        jobs: groupItemsByMonth(jobs),
        payments: groupItemsByMonth(payments, (p: any) => parseCurrency(p.paid))
      }
    };
  }, [filteredData]);

  // 3. Generate Graph Points (O(m))
  const graphData = useMemo((): GraphData => {
    const { now } = filteredData;
    const labels: string[] = [];
    const leadPoints: number[] = [];
    const jobPoints: number[] = [];
    const paymentPoints: number[] = [];

    if (timeRange === "7 Days" || timeRange === "Custom") {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        const dateKey = d.toDateString();
        
        labels.push(d.toLocaleDateString("en-US", { day: "numeric", month: "short" }));
        leadPoints.push(aggregated.daily.leads[dateKey] || 0);
        jobPoints.push(aggregated.daily.jobs[dateKey] || 0);
        paymentPoints.push(aggregated.daily.payments[dateKey] || 0);
      }
    } else if (timeRange === "30 Days" || timeRange === "Mtd") {
      const days = timeRange === "Mtd" ? now.getDate() : 30;
      const interval = days > 15 ? 3 : 1;
      
      for (let i = days - 1; i >= 0; i -= interval) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        labels.push(d.toLocaleDateString("en-US", { day: "numeric", month: "short" }));
        
        // Interval logic remains O(n) for now but could be further optimized if needed
        // but since it's just 10-30 iterations, it's manageable.
        // For strict O(n+m), we'd pre-calculate the interval buckets.
        const start = new Date(d);
        const end = new Date(d);
        end.setDate(d.getDate() + interval);

        const sumInInterval = (group: Record<string, number>) => {
          let sum = 0;
          for (let day = 0; day < interval; day++) {
            const checkDate = new Date(d);
            checkDate.setDate(d.getDate() + day);
            sum += group[checkDate.toDateString()] || 0;
          }
          return sum;
        };

        leadPoints.push(sumInInterval(aggregated.daily.leads));
        jobPoints.push(sumInInterval(aggregated.daily.jobs));
        paymentPoints.push(sumInInterval(aggregated.daily.payments));
      }
    } else { // Ytd / All Data
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentMonth = timeRange === "All Data" ? 11 : now.getMonth();
      
      for (let i = 0; i <= currentMonth; i++) {
        labels.push(months[i]);
        leadPoints.push(aggregated.monthly.leads[i] || 0);
        jobPoints.push(aggregated.monthly.jobs[i] || 0);
        paymentPoints.push(aggregated.monthly.payments[i] || 0);
      }
    }

    return {
      labels,
      leadPoints,
      jobPoints,
      paymentPoints,
      avgRevenuePoints: paymentPoints.map((r, i) => jobPoints[i] > 0 ? r / jobPoints[i] : 0)
    };
  }, [timeRange, filteredData, aggregated]);

  // 4. Calculate Final Summary
  const summary = useMemo((): DashboardStats => {
    const { leads, jobs, payments } = filteredData;
    const totalPayments = payments.reduce((sum, p) => sum + parseCurrency(p.paid), 0);

    return {
      leads: leads.length,
      jobs: jobs.length,
      payments: totalPayments,
      pending: 2800, // Placeholder or calculated value
      avgRevenue: jobs.length > 0 ? totalPayments / jobs.length : 0,
    };
  }, [filteredData]);

  return { summary, graph: graphData };
};
