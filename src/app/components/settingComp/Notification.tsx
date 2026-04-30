import React, { useState } from "react";

export interface Permission {
  id: number;
  label: string;
  checked: boolean;
  category: string;
}


export const initialPermissions: Permission[] = [
  // Job Notifications
  { id: 1, label: "Job Assigned to You", checked: true, category: "Job Notifications" },
  { id: 2, label: "Job Deadline Approaching", checked: true, category: "Job Notifications" },
  { id: 3, label: "Job Marked as Completed", checked: false, category: "Job Notifications" },

  // Client & Lead Notifications
  { id: 4, label: "New Lead Added", checked: true, category: "Client & Lead Notifications" },
  { id: 5, label: "Lead Assigned to You", checked: true, category: "Client & Lead Notifications" },
  { id: 6, label: "Client Updated Their Info", checked: false, category: "Client & Lead Notifications" },

  // Payment Notifications
  { id: 7, label: "New Payment Received", checked: true, category: "Payment Notifications" },
  { id: 8, label: "Payment Overdue", checked: true, category: "Payment Notifications" },
  { id: 9, label: "Payment Reminder Sent", checked: false, category: "Payment Notifications" },

  // System Alerts
  { id: 10, label: "New Comment Tagging You", checked: true, category: "System Alerts" },
  { id: 11, label: "Weekly Summary Report", checked: false, category: "System Alerts" },
  { id: 12, label: "System Maintenance Updates", checked: false, category: "System Alerts" },
];
const Notification = () => {
  const [permissions, setPermissions] = useState(initialPermissions);

  const categories = [...new Set(permissions.map((p) => p.category))];

  const togglePermission = (id: number) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p))
    );
  };

  return (
    <div className="text-black max-w-3xl  p-8">
      <h1 className="text-2xl  mb-8">Notification Settings</h1>

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

export default Notification;
