/** @format */
'use client';
import React from 'react';
import { HiOutlineTrendingUp } from 'react-icons/hi';

interface MiniTableProps {
  headers: { key: string; label: string }[];
  data: Record<string, any>[];
  maxHeight?: string; // scroll height
}

const MiniTable: React.FC<MiniTableProps> = ({ headers, data, maxHeight = '300px' }) => {
  const getUtilizationColor = (value: string) => {
    const num = Number(value.replace('%', '').trim());
    if (num >= 90) return 'bg-[#14CB95] text-white'; // green
    if (num >= 60) return 'bg-[#01B0E9] text-white'; // blue
    return 'bg-gray-300 text-gray-700';
  };

  const getStatusColor = (status: string) => {
    const map: any = {
      Active: 'bg-[#14CB95] text-white',
      'On Hold': 'bg-[#FEBE2A] text-black',
      Completed: 'bg-[#01B0E9] text-white',
      Pending: 'bg-gray-300 text-black',
    };
    return map[status] || 'bg-gray-200 text-gray-700';
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="overflow-y-auto" style={{ maxHeight }}>
        <table className="min-w-full table-auto border-collapse ">
          <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
            <tr>
              {headers.map((h) => (
                <th key={h.key} className="px-3 py-2 text-left whitespace-nowrap">
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="text-sm  text-gray-800 border-b border-gray-200 hover:bg-[#f3faff] transition"
              >
                {headers.map((h) => {
                  const val = row[h.key];

                  // Utilization / Completion with badge color
                  if (h.key === 'utilization' || h.key === 'completion') {
                    return (
                      <td key={h.key} className="px-3 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getUtilizationColor(
                            val
                          )}`}
                        >
                          {val}
                        </span>
                      </td>
                    );
                  }

                  // Status badge
                  if (h.key === 'status') {
                    return (
                      <td key={h.key} className="px-3 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            val
                          )}`}
                        >
                          {val}
                        </span>
                      </td>
                    );
                  }

                  // Default
                  return (
                    <td key={h.key} className="px-3 py-3 whitespace-nowrap">
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MiniTable;
