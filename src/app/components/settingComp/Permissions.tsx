/** @format */

import React, { useState } from 'react';
import { INITIAL_ROLES, RoleSection } from '@/utils/permissionConstants';
import { RoleAccordion } from './RoleAccordion';

const Permissions = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'Super Admin': true,
    Admin: false,
    Editor: false,
  });

  const [roles, setRoles] = useState<Record<string, RoleSection>>(INITIAL_ROLES);

  const toggleExpand = (role: string) => {
    setExpanded(prev => ({ ...prev, [role]: !prev[role] }));
  };

  const handlePermissionToggle = (roleKey: string, index: number) => {
    setRoles(prev => {
      const newPermissions = [...prev[roleKey].permissions];
      newPermissions[index] = {
        ...newPermissions[index],
        checked: !newPermissions[index].checked
      };
      return {
        ...prev,
        [roleKey]: { ...prev[roleKey], permissions: newPermissions }
      };
    });
  };

  return (
    <div className="w-full h-full py-4 overflow-y-auto scroller px-1">
      <div className="flex flex-col gap-1">
        {Object.entries(roles).map(([key, roleData]) => (
          <RoleAccordion
            key={key}
            roleKey={key}
            roleData={roleData}
            isExpanded={!!expanded[key]}
            onToggleExpand={() => toggleExpand(key)}
            onPermissionChange={(idx) => handlePermissionToggle(key, idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Permissions;
