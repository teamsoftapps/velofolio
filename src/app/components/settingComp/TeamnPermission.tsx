
import React from 'react';
import OverviewChart from '@/app/components/ui/OverviewChart';
import TeamChartData from '@/utils/TeamChart.json';
import UserTable from './UserTable';
import Permissions from './Permissions';

const tableHeaders = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'lastActive', label: 'Last Active' },
  { key: 'action', label: 'Action' },
];

const tableData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "/teampic1.png",
    role: "Super Admin",
    status: "Active",
    lastActive: "2025-11-06",
    action: "View Profile"
  },
  {
    name: "Sarah Connor",
    email: "sarah.connor@example.com",
    image: "/teampic2.png",
    role: "Admin",
    status: "Inactive",
    lastActive: "2025-10-30",
    action: "View Profile"
  },
  {
    name: "Michael Smith",
    email: "michael.smith@example.com",
    image: "/teampic3.png",
    role: "Editor",
    status: "Active",
    lastActive: "2025-11-07",
    action: "View Profile"
  },
  {
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    image: "/user1.png",
    role: "Editor",
    status: "Active",
    lastActive: "2025-11-05",
    action: "View Profile"
  },
  {
    name: "Robert Brown",
    email: "robert.brown@example.com",
    image: "/teampic1.png",
    role: "Editor",
    status: "On Leave",
    lastActive: "2025-10-25",
    action: "View Profile"
  }
];

const TeamnPermission = () => {
  return (
    <div className="container mx-auto bg-[#FAFAFA] w-full mt-10 px-4 md:px-6">
      <OverviewChart chartData={TeamChartData} variant="sparkline" />


      <div className="w-full mt-5 flex flex-col lg:flex-row gap-5 justify-between items-start">
        {/* User Table */}
        <div className="w-full lg:w-3/4 bg-white rounded-xl p-3 h-auto overflow-x-auto">
          <UserTable headers={tableHeaders} data={tableData} />
        </div>

        {/* Permissions */}
        <div className="w-full lg:w-2/5 h-auto rounded-xl">
          <Permissions />
        </div>
      </div>
    </div>
  );
};

export default TeamnPermission;


