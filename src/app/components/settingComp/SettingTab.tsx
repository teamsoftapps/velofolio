// components/Tabs.tsx
'use client';

import { useState } from 'react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabList = [
  'Company Info',
  'Team & Permissions',
  'Payments & Billing',
  'Email & Notifications',
  'Goals & Reports',
  'Branding & Customization',
  'Security & Password',
  'System Preferences',
];

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide bg-white rounded-lg border border-gray-200 p-1 scroller inter">
      <div className="flex gap-1 min-w-max items-center justify-between">
        {tabList.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab
                ? 'bg-[#19b7eb] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}