/** @format */
import { useMemo } from 'react';
import DashboardTable from './DashboardTable';
import COLORS from '@/utils/Color';
import JobData from '@/utils/Job.json';
import { DateValue } from '@internationalized/date';
import { filterByTimeRange } from '@/utils/TableUtils';

interface JobTaskProps {
  timeRange?: string;
  value?: DateValue;
}

const JobTask = ({ timeRange = "All Data", value }: JobTaskProps) => {
  const tableHeaders = [
    { key: 'jobDate', label: 'Job Date' },
    { key: 'jobName', label: 'Job Name' },
    { key: 'jobType', label: 'Job Type' },
    { key: 'status', label: 'Status' },
    { key: 'task', label: 'Next Task' },
  ];

  const jobsData = useMemo(() => {
    const customDate = value ? new Date(value.year, value.month - 1, value.day) : undefined;
    const filtered = filterByTimeRange(JobData, timeRange, customDate);

    return filtered.map(j => ({
      jobDate: j.eventDate || "N/A",
      jobName: <div className="truncate max-w-[90px] sm:max-w-[130px] mx-auto" title={j.name}>{j.name}</div>,
      jobType: <div className="truncate max-w-[80px] sm:max-w-[100px] mx-auto" title={j.jobType}>{j.jobType}</div>,
      status: j.status,
      task: <div className="truncate max-w-[110px] sm:max-w-[160px] mx-auto" title={j.task || 'N/A'}>{j.task || 'N/A'}</div>
    })).sort((a, b) => new Date(a.jobDate).getTime() - new Date(b.jobDate).getTime());
  }, [timeRange, value]);

  return (
    <div className="bg-white p-6 sm:p-8  border border-gray-300 rounded-lg shadow-md h-[650px] w-full lg:min-w-1/2 ">
      <div className="w-full flex flex-row justify-between items-center mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-black">
          Job Tasks With Due Dates
        </h2>
      </div>

      <DashboardTable data={jobsData} headers={tableHeaders} itemsPerPage={10} color={COLORS.headerBlueButtonbg} hoverColor={COLORS.BlueButtonhover} />
    </div>
  );
};

export default JobTask;
