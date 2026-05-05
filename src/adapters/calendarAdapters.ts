/** @format */

import { Lead, Job, Invoice } from '@/types/calendar';
import { normalizeLeadType } from '@/utils/CalendarUtils';

export const transformLeadsForFilter = (leads: Lead[]) => {
  return leads.map((l) => ({
    ...l,
    event: normalizeLeadType(l.interestedService || ''),
  }));
};

export const transformJobsForFilter = (jobs: Job[]) => {
  return jobs.map((j) => ({
    ...j,
    event: j.jobDetails.type,
    status: j.jobDetails.status,
    eventDate: j.jobDetails.shootDate,
    assignedTeam: j.jobDetails.assignedTeam,
    leadSource: j.jobDetails.leadSource,
  }));
};

export const transformInvoicesForFilter = (invoices: Invoice[]) => {
  return invoices.map((inv) => ({
    ...inv,
    eventDate: inv.createdAt || inv.sentAt,
    status: inv.status,
    paymentStatus: inv.status,
  }));
};
