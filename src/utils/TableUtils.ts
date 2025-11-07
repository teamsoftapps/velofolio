// utils/tableUtils.ts

export interface SortState {
  value: string;
  direction: 'asc' | 'desc';
}

// --- Filter Function ---
export function filterData(data: any[], search: string) {
  if (!search.trim()) return data;
  const lower = search.toLowerCase();
  return data.filter(
    (item: any) =>
      item.name?.toLowerCase().includes(lower) ||
      (item.email && item.email?.toLowerCase().includes(lower))||
      item.client?.toLowerCase().includes(lower)||
      item.leadName?.toLowerCase().includes(lower)
  );
}

// --- Sort Function ---
export function sortData(data: any[], sortBy: SortState) {
  const { value, direction } = sortBy;

  return [...data].sort((a: any, b: any) => {
    // Compare client names
    if (value === 'name') {
      return direction === 'asc'
        ? a?.name?.localeCompare(b.name)
        : b?.name?.localeCompare(a.name) || b?.name?.localeCompare(a.name);
    }

    // Compare dates
    if (['dueDate', 'eventDate', 'createdAt', 'leadCreated'].includes(value)) {
      const aTime = a[value] ? Date.parse(a[value]) : 0;
      const bTime = b[value] ? Date.parse(b[value]) : 0;
      return direction === 'asc' ? aTime - bTime : bTime - aTime;
    }

    return 0;
  });
}

// --- Delete Function ---
export function handleDelete(setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>) {
  console.log('Client deleted');
  setDeleteModal(false);
}
