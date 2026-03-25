
/** @format */
import { useState } from 'react';
import AddButton from './AddButton';
import COLORS from '@/utils/Color';


const UpcomingShoots = () => {
  const [openForm, setOpenForm] = useState(false);
  const shootsData = [
    {
      date: '10 Oct 2025',
      time: '5 PM',
      title: 'Demo Portrait Lead',
      type: 'Lead',
      task: 'Main Shoot',
      circleColor: 'bg-orange-400',
    },
    {
      date: '15 Sep 2026',
      time: 'All Day',
      title: 'Demo Wedding Job',
      type: 'Job',
      task: 'Main Shoot',
      circleColor: 'bg-pink-400',
    },
  ];

  return (
    <div className=" p-4 sm:p-6 lg:p-8 border border-gray-300 rounded-lg shadow-md w-full lg:min-w-1/2 h-[450px] ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 ">
        <h2 className="text-base sm:text-lg lg:text-xl font-medium text-black mb-2 sm:mb-0 w-48 xl:w-full">
          Upcoming Shoots & Appointments
        </h2>
        <div className="w-full sm:w-auto lg:w-[25%]">
          <AddButton setOpenForm={setOpenForm} title="Add New" />
        </div>
      </div>

      {/* Shoots List */}
      <div className="flex flex-col space-y-3  h-[300px] overflow-y-auto">
        {shootsData.map((shoot, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-300"
          >
            {/* Left section: date, time, title */}
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

            {/* Right section: type, task */}
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
