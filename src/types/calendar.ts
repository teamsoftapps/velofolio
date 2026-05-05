/** @format */

import { BaseEntity, DateString } from './common';

export interface Lead extends Partial<BaseEntity> {
  leadName: string;
  interestedService?: string;
  status: string;
  eventDate: DateString;
}

export interface Job extends Partial<BaseEntity> {
  jobDetails: {
    title: string;
    type: string;
    status: string;
    shootDate: DateString;
    assignedTeam?: string | string[];
    leadSource?: string;
    location?: string;
    progress?: string;
  };
}

export interface Invoice extends BaseEntity {
  id: string;
  sentAt?: DateString;
  packages?: Array<{
    name: string;
    price?: number;
    description?: string;
  }>;
  total?: number;
}

export type CalendarCategory = 'Leads' | 'Shoots' | 'Invoices';
