"use client";

export default function ActiveSessionsCard() {
  const sessions = [
    {
      device: "Chrome - Mac",
      location: "San Francisco",
      lastActive: "2 MIN AGO",
      badgeColor: "bg-yellow-500",
    },
    {
      device: "iPhone App",
      location: "New York",
      lastActive: "YESTERDAY",
      badgeColor: "bg-green-500",
    },
    {
      device: "Chrome - Mac",
      location: "San Francisco",
      lastActive: "YESTERDAY",
      badgeColor: "bg-green-500",
    },
  ];

  return (
<div
  className="
    bg-white
    rounded-2xl
    w-full
    lg:w-1/2
    shrink-0
    border
    border-gray-100
    overflow-hidden
 mt-5
    lg:mt-0
  "
>

      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          Active Sessions & Devices
        </h2>
      </div>

      {/* Horizontal Scroll */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px] text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-sm font-medium text-gray-600">
                Device
              </th>
              <th className="px-2 py-4 text-sm font-medium text-gray-600">
                Location
              </th>
              <th className="px-2 py-4 text-sm font-medium text-gray-600">
                Last Active
              </th>
              <th className="px-4 py-4 text-sm font-medium text-gray-600 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {sessions.map((session, index) => (
              <tr key={index}>
                <td className="px-4 py-5 font-medium text-gray-900">
                  {session.device}
                </td>

                <td className="px-2 py-5 text-gray-600 text-sm">
                  {session.location}
                </td>

                <td className="px-2 py-5">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium text-white ${session.badgeColor}`}
                  >
                    {session.lastActive}
                  </span>
                </td>

                <td className="px-4 py-5 text-right">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Logout
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium underline">
          Logout from all devices
        </button>
      </div>
    </div>
  );
}
