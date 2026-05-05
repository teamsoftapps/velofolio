/** @format */

export interface FilterableItem {
  id?: string | number;
  status?: string;
  Status?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  Email?: string;
  phone?: string;
  Phone?: string;
  client?: string;
  leadName?: string;
  Name?: string;
  Role?: string;
  assignedTeam?: string | string[];
  leadSource?: string;
  event?: string;
  jobType?: string;
  paymentStatus?: string;
  [key: string]: any;
}

export interface AdvancedFilters {
  status?: string[];
  leadStatus?: string[];
  shootStatus?: string[];
  invoiceStatus?: string[];
  selectedMembers?: { id: string | number; name: string }[];
  leadSource?: string[];
  eventType?: string[];
  fromDate?: string;
  toDate?: string;
  paymentStatus?: string[];
  categories?: string[];
}
