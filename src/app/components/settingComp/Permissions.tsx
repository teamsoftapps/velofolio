
import React, { useState } from 'react';
import { FiPlus, FiMinus, FiX } from 'react-icons/fi';

interface Permission {
  label: string;
  checked: boolean;
  category: string;
}

interface RoleSection {
  title: string;
  permissions: Permission[];
}

const Permissions: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Admin: true,
    Manager: false,
    Editor: false,
  });

  const [roles, setRoles] = useState<Record<string, RoleSection>>({
  Admin: {
    title: 'Admin',
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
  Manager: {
    title: 'Manager',
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
  });



  const toggleExpand = (role: string) =>
    setExpanded(prev => ({ ...prev, [role]: !prev[role] }));

  const togglePermission = (role: string, index: number) => {
    setRoles(prev => {
      const perms = [...prev[role].permissions];
      perms[index] = { ...perms[index], checked: !perms[index].checked };
      return { ...prev, [role]: { ...prev[role], permissions: perms } };
    });
  };

  const renderPermission = (perm: Permission, role: string, idx: number) => (
    <label
      key={idx}
      className="flex items-center gap-3 cursor-pointer select-none text-sm text-gray-700 hover:text-gray-900"
    >
      <input
        type="checkbox"
        checked={perm.checked}
        onChange={() => togglePermission(role, idx)}
        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
      />
      <span>{perm.label}</span>
    </label>
  );

  const renderSection = (roleKey: string) => {
    const { title, permissions } = roles[roleKey];
    const isExpanded = expanded[roleKey];

    // Unique categories for this role
    const categories = Array.from(new Set(permissions.map(p => p.category)));

    return (
      <div key={roleKey} className="mb-5 bg-[#FAFAFA]  rounded-md overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 bg-white cursor-pointer"
          onClick={() => toggleExpand(roleKey)}
        >
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <div className="flex items-center gap-2">
            {roleKey === 'Admin' && (
              <button className="p-1 rounded-full border border-[#19B7EB]">
                <FiX className="w-4 h-4 text-[#19B7EB]" />
              </button>
            )}
            {roleKey !== 'Admin' && (
              <button className="p-1 rounded-full border border-black">
                {isExpanded ? <FiMinus className="w-5 h-5 text-black" /> : <FiPlus className="w-5 h-5 text-black" />}
              </button>
            )}
          </div>
        </div>

        {/* Expandable content */}
        {isExpanded && (
          <div className="px-6 pb-5 pt-3 space-y-4 bg-[#FAFAFA]">
            {categories.map(cat => {
              const perms = permissions.filter(p => p.category === cat);
              return (
                <div key={cat}>
                  <h4 className="font-medium text-gray-700 mb-2">{cat}</h4>
                  <div className="space-y-2 pl-1">
                    {perms.map((p, i) => renderPermission(p, roleKey, permissions.indexOf(p)))}
                  </div>
                </div>
              );
            })}

            {permissions.length === 0 && (
              <p className="text-sm text-gray-500 italic">No permissions assigned.</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return <div className="w-full h-full py-2 overflow-hidden scroller lg:overflow-y-scroll">{Object.keys(roles).map(renderSection)}</div>;
};

export default Permissions;
