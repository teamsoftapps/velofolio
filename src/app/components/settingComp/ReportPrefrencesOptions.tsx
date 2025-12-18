import React, { useState } from "react";

/* ============================
   Types
============================ */
export interface ReportOption {
  id: number;
  key: string;
  label: string;
  checked: boolean;
  category: string;
}

/* ============================
   Initial Options
============================ */
export const initialReportOptions: ReportOption[] = [
  // Default Report Period
  {
    id: 1,
    key: "last7",
    label: "Last 7 Days",
    checked: true,
    category: "Default Report Period",
  },
  {
    id: 2,
    key: "last30",
    label: "Last 30 Days",
    checked: false,
    category: "Default Report Period",
  },
  {
    id: 3,
    key: "custom",
    label: "Custom Range",
    checked: false,
    category: "Default Report Period",
  },

  // Summary Reports
  {
    id: 4,
    key: "weekly",
    label: "Send weekly performance summary email",
    checked: true,
    category: "Summary Reports",
  },
  {
    id: 5,
    key: "monthly",
    label: "Send monthly goal progress report",
    checked: true,
    category: "Summary Reports",
  },
    {
    id: 5,
    key: "revenue",
    label: "Revenue goals",
    checked: true,
    category: "Include in Reports",
  },
    {
    id: 5,
    key: "job",
    label: "Job Targets",
    checked: true,
    category: "Include in Reports",
  },
    {
    id: 5,
    key: "team",
    label: "Team Utilization",
    checked: true,
    category: "Include in Reports",
  },
];

/* ============================
   Component
============================ */
const ReportSettings = () => {
  const [options, setOptions] = useState<ReportOption[]>(
    initialReportOptions
  );

  // Get unique categories
  const categories = [...new Set(options.map((o) => o.category))];

  // Toggle checkbox
  const toggleOption = (id: number) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, checked: !opt.checked } : opt
      )
    );
  };

  return (
    <div className=" w-full text-black">


      <div className="bg-[#FAFAFA] space-y-2 rounded-lg">
        {categories.map((category) => {
          const items = options.filter(
            (opt) => opt.category === category
          );

          return (
            <div key={category}>
              <h3 className="text-base font-medium text-[#818181] mb-4">
                {category}
              </h3>

              <div className="space-y-3 pl-1">
                {items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 cursor-pointer select-none text-sm text-gray-700 hover:text-gray-900"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleOption(item.id)}
                      className="w-4 h-4 text-[#01B0E9] rounded border-gray-300 focus:ring-[#01B0E9]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}

        {!options.length && (
          <p className="text-sm text-gray-500 italic">
            No report settings available.
          </p>
        )}
      </div>

      {/* Debug / Preview (optional) */}
      {/* <pre className="mt-6 text-xs bg-gray-100 p-3 rounded">
        {JSON.stringify(options, null, 2)}
      </pre> */}
    </div>
  );
};

export default ReportSettings;
