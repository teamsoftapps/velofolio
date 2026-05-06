

import React from 'react';
import { FaArrowTrendUp } from 'react-icons/fa6';

const WorkloadOverview: React.FC = () => {
  const colorMap: Record<string, string> = {
    'blue-500': 'text-blue-500',
    'orange-500': 'text-orange-500',
    'green-500': 'text-green-500',
    'red-500': 'text-red-500',
  };

  const workloadStats = [
    { label: 'Total Jobs', value: '20', trend: '+15%', icon: <FaArrowTrendUp className='w-3 h-3 sm:w-4 sm:h-4 ml-1' />, valueColor: 'blue-500' },
    { label: 'Ongoing Jobs', value: '08', trend: '+15.0%', icon: <FaArrowTrendUp className='w-3 h-3 sm:w-4 sm:h-4 ml-1' />, valueColor: 'orange-500' },
    { label: 'Completed', value: '05', trend: '+15.0%', icon: <FaArrowTrendUp className='w-3 h-3 sm:w-4 sm:h-4 ml-1' />, valueColor: 'green-500' },
    { label: 'Pending Tasks', value: '0', trend: '+15.0%', icon: <FaArrowTrendUp className='w-3 h-3 sm:w-4 sm:h-4 ml-1' />, valueColor: 'red-500' },
  ];

  return (
    <div className='w-full'>
      {/* Workload Cards */}
      <div className='w-full bg-gray-100 p-3 sm:p-4 md:p-5 rounded-lg mb-4 sm:mb-6'>
        <h2 className='text-base sm:text-lg md:text-xl font-semibold text-black mb-3 sm:mb-4'>Workload Overview</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
          {workloadStats.map((item, index) => (
            <div key={index} className='bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200'>
              <p className={`text-xs sm:text-sm ${colorMap[item.valueColor]}`}>{item.label}</p>
              <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${colorMap[item.valueColor]} mt-1`}>{item.value}</p>
              <div className='text-xs sm:text-sm flex items-center mt-2'>
                <span
                  className={`bg-${item.valueColor} text-white px-2 py-0.5 rounded flex items-center text-[10px] sm:text-xs font-medium`}
                >
                  {item.trend} {item.icon}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className='w-full sm:w-[80%]  md:w-full  bg-gray-100 p-3 sm:p-4 md:p-5 rounded-lg shadow-sm'>
        <h2 className='text-base sm:text-lg md:text-xl font-semibold text-black mb-3 sm:mb-4'>Recent Activity</h2>
        <div className='space-y-3 sm:space-y-4'>
          {[
            { text: 'Completed editing for Job #245', time: 'Now' },
            { text: 'Assigned to Wedding - March 22', time: '3 hours ago' },
            { text: 'Uploaded contract document', time: '6 hours ago' },
          ].map((activity, index) => (
            <div key={index} className='flex items-center border-b border-gray-200 pb-2 sm:pb-3'>
              <img
                src='/ClientProfileImage.png'
                alt='User'
                className='w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 flex-shrink-0'
              />
              <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full'>
                <p className='text-gray-800 text-sm sm:text-base truncate'>{activity.text}</p>
                <p className='text-gray-500 text-xs sm:text-sm mt-1 sm:mt-0 sm:ml-2'>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkloadOverview;
