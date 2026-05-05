/** @format */

export interface TeamMember {
  id: string;
  name: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Sarah Johnson' },
  { id: '2', name: 'Anna David' },
  { id: '3', name: 'Mike Chen' },
  { id: '4', name: 'Emma Wilson' },
  { id: 't4', name: 'Marketing' },
  { id: 't5', name: 'Emma Wilson' },
];

export const LEAD_SOURCES = ['Website', 'Referral', 'Instagram', 'Facebook', 'Walk-in'];

export const PAYMENT_STATUSES = ['Paid', 'Pending', 'Overdue', 'Booked', 'Archived'];

export const CATEGORY_OPTIONS = ['Leads', 'Shoots', 'Invoices'];

export const WEEK_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getStatusesByPath = (pathname: string, mode?: string): string[] => {
  if (mode === 'contracts') return ['Draft', 'Signed', 'Pending'];
  if (pathname === '/leads') return ['Active', 'Inactive', 'New Lead'];
  if (pathname === '/jobs') return ['In Progress', 'Upcoming', 'Completed', 'Pending', 'Active'];
  if (pathname === '/payments') return ['Paid', 'Pending', 'Overdue'];
  if (pathname === '/calendar') {
    return ['Active', 'Lead', 'Booked', 'In Progress', 'Upcoming', 'Completed', 'Paid', 'Pending', 'Overdue'];
  }
  return ['Active', 'Inactive', 'Lead', 'Archived', 'Booked', 'New Lead'];
};

export const getEventTypesByPath = (pathname: string): string[] => {
  if (pathname === '/jobs') return ['Wedding', 'Portrait', 'Engagement', 'Commercial', 'Other'];
  if (pathname === '/calendar') return ['Wedding', 'Portrait', 'Engagement', 'Corporate', 'Commercial', 'Other'];
  return ['Wedding', 'Corporate', 'Pre-wedding', 'Birthday', 'Other'];
};

export const CALENDAR_STATUS_GROUPS = [
  { label: 'Lead Status', options: ['Active', 'Lead', 'New Lead'], stateKey: 'leadStatus' as const },
  { label: 'Shoot Status', options: ['In Progress', 'Upcoming', 'Completed', 'Pending', 'Booked'], stateKey: 'shootStatus' as const },
  { label: 'Invoice Status', options: ['Paid', 'Pending', 'Overdue'], stateKey: 'invoiceStatus' as const },
];
