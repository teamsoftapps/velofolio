/** @format */

export interface Permission {
  label: string;
  checked: boolean;
  category: string;
}

export interface RoleSection {
  title: string;
  permissions: Permission[];
}

export const INITIAL_ROLES: Record<string, RoleSection> = {
  'Super Admin': {
    title: 'Super Admin',
    permissions: [
      { label: 'View Clients', checked: true, category: 'Client Access' },
      { label: 'Add / Edit / Delete Clients', checked: true, category: 'Client Access' },
      { label: 'View Payments', checked: true, category: 'Financial Access' },
      { label: 'Manage Payments', checked: true, category: 'Financial Access' },
      { label: 'Create / Edit Jobs', checked: true, category: 'Job Management' },
      { label: 'Assign Team Members', checked: true, category: 'Job Management' },
      { label: 'Add / Remove Users', checked: true, category: 'System Settings' },
      { label: 'Manage Roles', checked: true, category: 'System Settings' },
    ],
  },
  Admin: {
    title: 'Admin',
    permissions: [
      { label: 'View Clients', checked: true, category: 'Client Access' },
      { label: 'Add / Edit Clients', checked: true, category: 'Client Access' },
      { label: 'View Payments', checked: true, category: 'Financial Access' },
      { label: 'Assign Team Members', checked: true, category: 'Job Management' },
      { label: 'Update Status', checked: true, category: 'Job Management' },
      { label: 'Manage Roles', checked: false, category: 'System Settings' },
    ],
  },
  Editor: {
    title: 'Editor',
    permissions: [
      { label: 'View Clients', checked: true, category: 'Client Access' },
      { label: 'Add / Edit / Delete Clients', checked: false, category: 'Client Access' },
      { label: 'Manage Payments', checked: false, category: 'Financial Access' },
      { label: 'Update Tasks', checked: true, category: 'Job Management' },
      { label: 'Manage Roles', checked: false, category: 'System Settings' },
    ],
  },
};
