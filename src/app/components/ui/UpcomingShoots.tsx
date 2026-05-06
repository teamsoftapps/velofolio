
/** @format */
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddButton from './AddButton';
import LeadData from '@/utils/Lead.json';
import JobData from '@/utils/Job.json';
import { DateValue } from '@internationalized/date';
import { filterByTimeRange } from '@/utils/TableUtils';
import AddShootModal from '@/app/components/forms/AddShootModal';

interface UpcomingShootsProps {
  timeRange?: string;
  value?: DateValue;
}

const UpcomingShoots = ({ timeRange = "All Data", value }: UpcomingShootsProps) => {
  const router = useRouter();
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

    return [...leads, ...jobs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 6);
  }, [timeRange, value]);

  return (
    <div className="p-6 sm:p-8 border border-gray-200 rounded-lg w-full flex flex-col h-[650px] bg-white">
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
        <h2 className="text-xl font-semibold text-gray-900 flex-1">
          Upcoming Job
        </h2>
        <div className="w-auto min-w-fit">
          <AddButton setOpenForm={setIsShootModalOpen} title="Add New" />
        </div>
      </div>

      <div className="flex-1 overflow-x-auto no-scrollbar">
        <div className="min-w-[420px]">
          {shootsData.length === 0 ? (
            <div className="text-gray-500 text-center py-10 italic text-sm">No shoots found in this range</div>
          ) : shootsData.map((shoot, index) => (
            <div
              key={index}
              className="flex items-center gap-4 py-5 border-b border-gray-100 last:border-0"
            >
              {/* Title */}
              <div className="flex-[2] min-w-0">
                <span className="text-[14px] sm:text-[15px] font-medium text-gray-900 block truncate" title={shoot.title}>
                  {shoot.title}
                </span>
              </div>

              {/* Date & Time Group */}
              <div className="flex-[2.5] flex items-center justify-between gap-4">
                <div className="flex-1 min-w-fit">
                  <span className="text-[14px] sm:text-[15px] font-medium text-gray-900">
                    {index === 0 ? "Today" : index === 1 ? "Tomorrow" : shoot.date}
                  </span>
                </div>

                <div className="flex-1 flex items-center gap-2 min-w-fit">
                  <span className={`w-2.5 h-2.5 rounded-full border border-gray-100 flex-shrink-0 ${index % 2 === 0 ? 'bg-[#F97316]' : 'bg-[#FB7185]'}`}></span>
                  <span className="text-[14px] sm:text-[15px] font-medium text-gray-900 whitespace-nowrap">
                    {index % 2 === 0 ? "5 PM" : "All Day"}
                  </span>
                </div>
              </div>

              {/* Task Pill */}
              <div className="flex-1 flex justify-end">
                <span className={`px-3 py-1 rounded-[4px] text-[12px] font-medium text-gray-900 border truncate max-w-[120px] text-center ${index % 2 === 0 ? 'bg-orange-50 border-orange-300' : 'bg-[#F0FDF4] border-[#10B981]'
                  }`}
                  title={shoot.task}
                >
                  {shoot.task}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Jobs Button */}
      <div className="mt-4 pt-2">
        <button 
          onClick={() => router.push('/jobs')}
          className="w-full py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          View Jobs
        </button>
      </div>
    </div>
  );
};

export default UpcomingShoots;


