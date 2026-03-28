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
  const [openForm, setOpenForm] = useState(false);
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
    <div className=" p-4 sm:p-6 lg:p-8 border border-gray-300 rounded-lg shadow-md w-full lg:min-w-1/2 h-[450px] ">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 ">
        <AddShootModal
          isOpen={isShootModalOpen}
          onClose={() => setIsShootModalOpen(false)}
          onAddShoot={(data) => {
            console.log('New shoot:', data);
            // data includes: title, date, isAllDay, startTime, endTime, personId, type, category, status, notes
          }}
          people={[
            { id: '1', name: 'Sarah Johnson', image: '/teampic1.png', role: 'Lead Photographer' },
            { id: '2', name: 'David P.', image: '/teampic2.png', role: 'Photographer' },
          ]}
        />
        <h2 className="text-base sm:text-lg lg:text-xl font-medium text-black mb-2 sm:mb-0 w-48 xl:w-full">
          Upcoming Shoots & Appointments
        </h2>
        <div className="w-full sm:w-auto lg:w-[25%]">
          <AddButton setOpenForm={setIsShootModalOpen} title="Add New" />
        </div>
      </div>

      <div className="flex flex-col space-y-3  h-[300px] overflow-y-auto">
        {shootsData.length === 0 ? (
          <div className="text-gray-500 text-center py-10 italic">No shoots found in this range</div>
        ) : shootsData.map((shoot, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
              <span className="font-light text-xs sm:text-sm text-black">
                {shoot.date}
              </span>
              <span
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${shoot.type === 'Lead' ? 'bg-red-500' : 'bg-green-500'} rounded-full`}
              ></span>
              <span className="text-xs sm:text-sm text-black">
                {shoot.time}
              </span>
              <span className="text-xs sm:text-sm font-medium text-black">
                {shoot.title}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
              <span className={`border text-xs sm:text-sm px-2 py-0.5 rounded min-w-[50px] sm:min-w-[60px] flex items-center justify-center ${shoot.type === 'Lead' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'}`}>
                {shoot.type}
              </span>
              <span className="border border-gray-300 text-gray-700 text-xs sm:text-sm px-2 py-0.5 rounded w-auto flex items-center justify-center bg-gray-50">
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
