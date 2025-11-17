// utils/tableUtils.ts

export interface SortState {
  value: string;
  direction: 'asc' | 'desc';
}

// --- search filter Function ---
export function filterData(data: any[], search: string) {
  if (!search.trim()) return data;
  const lower = search.toLowerCase();
  return data.filter(
    (item: any) =>
      item.name?.toLowerCase()?.includes(lower) ||
    item.Name?.toLowerCase()?.includes(lower) ||
      (item.email && item.email?.toLowerCase()?.includes(lower))||
      item.client?.toLowerCase()?.includes(lower)||
      item.leadName?.toLowerCase()?.includes(lower)
  );
}

// --- Sort Function ---
export function sortData(data: any[], sortBy: SortState) {
  const { value, direction } = sortBy;

  return [...data].sort((a: any, b: any) => {

    if (value === 'name') {
      return direction === 'asc'
        ? a?.name?.localeCompare(b.name)
        : b?.name?.localeCompare(a.name) || b?.name?.localeCompare(a.name);
    }


    if (['dueDate', 'eventDate', 'createdAt', 'leadCreated']?.includes(value)) {
      const aTime = a[value] ? Date.parse(a[value]) : 0;
      const bTime = b[value] ? Date.parse(b[value]) : 0;
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
    if (status?.length && !status?.includes(item.status ||item.Status)) return false;

    // Filter by Assigned Member (assuming item.assignedTo or item.teamMember)
    if (
      selectedMembers?.length &&
      !selectedMembers.some((m) =>
        item.name?.includes(m.name) || item.assignedTeam?.includes(m.name)  
      )
    )
    return false;
    console.log(item.assignedTo, item.teamMember, selectedMembers)

    // Filter by Lead Source
    if (leadSource?.length && !leadSource?.includes(item.leadSource)) return false;

    // Filter by Event Type
    if (eventType?.length && !eventType?.includes(item.event)) return false;

    // Filter by Payment Status
    if (paymentStatus?.length && !paymentStatus?.includes(item.paymentStatus))
      return false;

    // Filter by Date Range
    if (fromDate && item.eventDate || fromDate && item.leadCreated) {
      const itemDate = new Date(item.date);
      const from = new Date(fromDate);
      if (itemDate < from) return false;
    }

    if (toDate && item.date) {
      const itemDate = new Date(item.date);
      const to = new Date(toDate);
      if (itemDate > to) return false;
    }

    return true;
  });
}


export function handleDelete(setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>) {
  console.log('Client deleted');
  setDeleteModal(false);
}
