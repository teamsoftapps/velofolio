// utils/tableUtils.ts

export interface SortState {
  value: string;
  direction: 'asc' | 'desc';
}

// --- helper to get date correctly from different item types ---
export function getItemDate(item: any): Date | null {
  // Prioritize eventDate as requested, then fall back to creation/due dates
  const dateStr = item.eventDate || item.leadCreated || item.dateCreated || item.createdAt || item.date || item.dueDate;
  
  if (!dateStr || dateStr === 'N/A' || typeof dateStr !== 'string' && typeof dateStr !== 'number' && !(dateStr instanceof Date)) return null;
  
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

// --- search filter Function ---
export function filterData(data: any[], search: string) {
  if (!search.trim()) return data;
  const lower = search.toLowerCase();
  return data.filter(
    (item: any) =>
      item.firstName?.toLowerCase()?.includes(lower) ||
      item.lastName?.toLowerCase()?.includes(lower) ||
      item.email?.toLowerCase()?.includes(lower) ||
      item.phone?.includes(lower) ||
      item.client?.toLowerCase()?.includes(lower) ||
      item.leadName?.toLowerCase()?.includes(lower) ||
      item.name?.toLowerCase()?.includes(lower)
  );
}

// --- Sort Function ---
export function sortData(data: any[], sortBy: SortState) {
  const { value, direction } = sortBy;

  return [...data].sort((a: any, b: any) => {
    if (['name', 'firstName', 'lastName', 'email', 'phone', 'status', 'event', 'leadName', 'client', 'jobType', 'task'].includes(value)) {
      const aVal = String(a[value] || '');
      const bVal = String(b[value] || '');
      return direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (['dueDate', 'eventDate', 'createdAt', 'leadCreated', 'dateCreated', 'date'].includes(value)) {
      const aTime = getItemDate(a)?.getTime() || 0;
      const bTime = getItemDate(b)?.getTime() || 0;
      return direction === 'asc' ? aTime - bTime : bTime - aTime;
    }

    return 0;
  });
}

// --- Advanced Filter Function ---
export function applyAdvancedFilters(
  data: any[],
  filters: {
    status?: string[];
    selectedMembers?: { id: string; name: string }[];
    leadSource?: string[];
    eventType?: string[];
    fromDate?: string;
    toDate?: string;
    paymentStatus?: string[];
  }
) {
  return data.filter((item) => {
    const {
      status,
      selectedMembers,
      leadSource,
      eventType,
      fromDate,
      toDate,
      paymentStatus,
    } = filters;

    // Filter by Status
    if (status?.length && !status?.includes(item.status || item.Status)) return false;

    // Filter by Assigned Member
    if (
      selectedMembers?.length &&
      !selectedMembers.some((m) =>
        item.name?.includes(m.name) || item.assignedTeam?.includes(m.name)
      )
    )
      return false;

    // Filter by Lead Source
    if (leadSource?.length && !leadSource?.includes(item.leadSource)) return false;

    // Filter by Event Type
    const type = item.event || item.jobType;
    if (eventType?.length && !eventType?.includes(type)) return false;

    // Filter by Payment Status
    if (paymentStatus?.length && !paymentStatus?.includes(item.paymentStatus))
      return false;

    // Filter by Date Range (using robust getItemDate)
    const itemDate = getItemDate(item);
    if (fromDate) {
      const from = new Date(fromDate);
      from.setHours(0, 0, 0, 0);
      if (!itemDate || itemDate < from) return false;
    }
    if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      if (!itemDate || itemDate > to) return false;
    }

    return true;
  });
}

// --- Dashboard Time Range Filter ---
export function filterByTimeRange(data: any[], range: string, customDate?: Date) {
  const now = customDate || new Date();
  let startTime = new Date(now);
  startTime.setHours(0, 0, 0, 0);
  
  let endTime = new Date(now);
  endTime.setHours(23, 59, 59, 999);

  if (range === "7 Days") {
    startTime.setDate(now.getDate() - 7);
  } else if (range === "30 Days") {
    startTime.setDate(now.getDate() - 30);
  } else if (range === "Mtd") {
    startTime = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (range === "Ytd") {
    startTime = new Date(now.getFullYear(), 0, 1);
  } else if (range === "All Data") {
    return data;
  } else if (range === "Custom") {
    // Already set to the start/end of customDay via startTime/endTime initials
  }

  return data.filter(item => {
    const d = getItemDate(item);
    return d && d >= startTime && d <= endTime;
  });
}

export function handleDelete(setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>) {
  console.log('Item deleted');
  setDeleteModal(false);
}
