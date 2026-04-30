/** @format */

import React, { useMemo } from 'react';
import { FiPlus, FiMinus, FiX } from 'react-icons/fi';
import { Permission, RoleSection } from '@/utils/permissionConstants';

// --- Sub-components ---

interface PermissionRowProps {
  perm: Permission;
  onToggle: () => void;
  disabled?: boolean;
}

export const PermissionRow: React.FC<PermissionRowProps> = ({ perm, onToggle, disabled }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-gray-700 hover:text-gray-900">
    <input
      type="checkbox"
      checked={perm.checked}
      onChange={onToggle}
      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
    />
    <span>{perm.label}</span>
  </label>
);

interface RoleAccordionProps {
  roleKey: string;
  roleData: RoleSection;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onPermissionChange: (index: number) => void;
}

export const RoleAccordion: React.FC<RoleAccordionProps> = ({ 
  roleKey, 
  roleData, 
  isExpanded, 
  onToggleExpand, 
  onPermissionChange 
}) => {
  // Group permissions by category efficiently
  const categories = useMemo(() => {
    const groups: Record<string, { p: Permission; originalIdx: number }[]> = {};
    roleData.permissions.forEach((p, i) => {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push({ p, originalIdx: i });
    });
    return groups;
  }, [roleData.permissions]);

  return (
    <div className="mb-5 bg-[#FAFAFA] rounded-md overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 bg-white cursor-pointer"
        onClick={onToggleExpand}
      >
        <h3 className="text-lg font-semibold text-gray-800">{roleData.title}</h3>
        <div className="flex items-center gap-2">
          {roleKey === 'Super Admin' && (
            <button className="p-1 rounded-full border border-[#19B7EB]">
              <FiX className="w-4 h-4 text-[#19B7EB]" />
            </button>
          )}
          {roleKey !== 'Super Admin' && (
            <button className="p-1 rounded-full border border-black">
              {isExpanded ? <FiMinus className="w-5 h-5 text-black" /> : <FiPlus className="w-5 h-5 text-black" />}
            </button>
          )}
        </div>
      </div>

      {/* Expandable content */}
      {isExpanded && (
        <div className="px-6 pb-5 pt-3 space-y-4 bg-[#FAFAFA]">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
              <div className="space-y-2 pl-1">
                {items.map(({ p, originalIdx }) => (
                  <PermissionRow
                    key={originalIdx}
                    perm={p}
                    onToggle={() => onPermissionChange(originalIdx)}
                  />
                ))}
              </div>
            </div>
          ))}
          
          {roleData.permissions.length === 0 && (
            <p className="text-sm text-gray-500 italic">No permissions assigned.</p>
          )}
        </div>
      )}
    </div>
  );
};
