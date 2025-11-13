import React, { useState } from "react";

export interface Permission {
  id: number;
  label: string;
  checked: boolean;
  category: string;
}

export const initialPermissions: Permission[] = [
  { id: 1, label: "Job Assigned", checked: true, category: "Client Access" },
  { id: 2, label: "Task Due Reminder", checked: true, category: "Client Access" },
  { id: 3, label: "Job Completed Notification", checked: false, category: "Client Access" },

  { id: 4, label: "New Lead Added", checked: true, category: "Clients & Leads" },
  { id: 5, label: "Payment Received", checked: true, category: "Clients & Leads" },
  { id: 6, label: "Client Feedback Received", checked: false, category: "Clients & Leads" },

  { id: 7, label: "New Member Joined", checked: true, category: "Team Activity" },
  { id: 8, label: "Mentioned in Comment", checked: true, category: "Team Activity" },

  { id: 9, label: "Weekly Summary Email", checked: true, category: "System Updates" },
  { id: 10, label: "Product Announcements", checked: false, category: "System Updates" },
];

const EmailNotificationn = () => {
  const [permissions, setPermissions] = useState(initialPermissions);

  const categories = [...new Set(permissions.map((p) => p.category))];

  const togglePermission = (id: number) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p))
    );
  };

  return (
    <div className="text-black">
      <h1 className="text-lg font-semibold mb-2 mt-5">Notification Preferences</h1>

      <div className=" pb-5 pt-3 space-y-4 bg-[#FAFAFA] rounded-lg">
        {categories.map((cat) => {
          const items = permissions.filter((p) => p.category === cat);

          return (
            <div key={cat} className="mb-3">
              <h4 className="font-medium text-gray-700 mb-2">{cat}</h4>

              <div className="space-y-2 pl-1">
                {items.map((perm) => (
                  <label
                    key={perm.id}
                    className="flex items-center gap-3 cursor-pointer select-none text-sm text-gray-700 hover:text-gray-900"
                  >
                    <input
                      type="checkbox"
                      checked={perm.checked}
                      onChange={() => togglePermission(perm.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span>{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}

        {!permissions.length && (
          <p className="text-sm text-gray-500 italic">No permissions assigned.</p>
        )}
      </div>
    </div>
  );
};

export default EmailNotificationn;
