/** @format */
import { useMemo } from 'react';
import DashboardTable from './DashboardTable';
import AddButton from './AddButton';
import COLORS from '@/utils/Color';
import LeadData from '@/utils/Lead.json';
import { DateValue } from '@internationalized/date';
import { filterByTimeRange } from '@/utils/TableUtils';

interface RecentLeadsProps {
  setOpenForm: (open: boolean) => void;
  timeRange?: string;
  value?: DateValue;
}

const RecentLeads = ({ setOpenForm, timeRange = "All Data", value }: RecentLeadsProps) => {
  const tableHeaders = [
    { key: 'dateCreated', label: 'Lead Created' },
    { key: 'leadName', label: 'Lead Name' },
    { key: 'status', label: 'Status' },
    { key: 'task', label: 'Next Task' },
  ];

  const leadsData = useMemo(() => {
    const customDate = value ? new Date(value.year, value.month - 1, value.day) : undefined;
    const filtered = filterByTimeRange(LeadData, timeRange, customDate);

    return filtered.map(l => ({
      dateCreated: l.dateCreated || l.eventDate || "N/A",
      leadName: l.leadName,
      status: l.status,
      task: l.interestedService || 'Inquiry',
    })).sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
  }, [timeRange, value]);

  return (
    <div className="bg-white p-6 sm:p-8  border border-gray-300 rounded-lg shadow-md w-full lg:min-w-1/2 h-[450px]  ">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex-1">
          Recent Leads
        </h2>
        <div className="w-auto min-w-fit">
          <AddButton setOpenForm={setOpenForm} title="Add Lead" />
        </div>
      </div>

      <DashboardTable
        data={leadsData}
        headers={tableHeaders}
        color={COLORS.headerBlueButtonbg}
        itemsPerPage={5}
        hoverColor={COLORS.BlueButtonhover}
      />
    </div>
  );
};

export default RecentLeads;
