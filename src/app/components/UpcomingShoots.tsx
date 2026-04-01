
/** @format */
import { useMemo, useState } from 'react';
import AddButton from './AddButton';
import LeadData from '@/utils/Lead.json';
import JobData from '@/utils/Job.json';
import { DateValue } from '@internationalized/date';
import { filterByTimeRange } from '@/utils/TableUtils';
import AddShootModal from '../components/AddShootModal';

interface UpcomingShootsProps {
  timeRange?: string;
  value?: DateValue;
}

const UpcomingShoots = ({ timeRange = "All Data", value }: UpcomingShootsProps) => {
  const [isShootModalOpen, setIsShootModalOpen] = useState(false);

  const shootsData = useMemo(() => {
    const customDate = value ? new Date(value.year, value.month - 1, value.day) : undefined;
    const filteredLeads = filterByTimeRange(LeadData, timeRange, customDate);
    const filteredJobs = filterByTimeRange(JobData, timeRange, customDate);

    const leads = filteredLeads.map(l => ({
      date: l.eventDate || l.dateCreated || "N/A",
      time: "All Day",
      title: l.leadName,
      type: 'Lead' as const,
      task: l.interestedService || 'Inquiry',
    }));

    const jobs = filteredJobs.map(j => ({
      date: j.eventDate || "N/A",
      time: "All Day",
      title: j.name,
      type: 'Job' as const,
      task: j.jobType || 'Photography',
    }));

    return [...leads, ...jobs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [timeRange, value]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 border border-gray-300 rounded-lg shadow-md w-full h-[450px] bg-white">
      <AddShootModal
        isOpen={isShootModalOpen}
        onClose={() => setIsShootModalOpen(false)}
        onAddShoot={(data) => console.log('New shoot:', data)}
        people={[
          { id: '1', name: 'Sarah Johnson', image: '/teampic1.png', role: 'Lead Photographer' },
          { id: '2', name: 'David P.', image: '/teampic2.png', role: 'Photographer' },
        ]}
      />
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex-1">
          Upcoming Shoots & Appointments
        </h2>
        <div className="w-auto min-w-fit">
          <AddButton setOpenForm={setIsShootModalOpen} title="Add New" />
        </div>
      </div>

      <div className="flex flex-col space-y-3 h-[300px] overflow-y-auto no-scrollbar">
        {shootsData.length === 0 ? (
          <div className="text-gray-500 text-center py-10 italic text-sm">No shoots found in this range</div>
        ) : shootsData.map((shoot, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-100 last:border-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
              <span className="font-medium text-[11px] sm:text-xs text-gray-400 uppercase tracking-tight">
                {shoot.date}
              </span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 ${shoot.type === 'Lead' ? 'bg-red-500' : 'bg-[#10B981]'} rounded-full`}></span>
                <span className="text-sm font-semibold text-gray-900">{shoot.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${shoot.type === 'Lead' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                {shoot.type}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-50 border border-gray-200 text-gray-600 uppercase">
                {shoot.task}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingShoots;
