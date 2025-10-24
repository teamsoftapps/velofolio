/** @format */

import { useState } from 'react';
import AddButton from './AddButton';

/** @format */
const UpcomingPayements = () => {
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
    <div className='bg-white p-8 border border-gray-300 rounded-lg shadow-md w-full h-[450px] overflow-y-auto'>
      <div className=' w-full flex flex-row justify-between items-center mb-4'>
        <h2 className=' text-lg font-medium text-[20px] sm:text-[22px] lg:text-[24px] text-black'>
         Overdue & Upcoming Payments
        </h2>
   
      </div>
      <div className='bg-[#F4F4F5] w-full h-[160px] mx-auto mt-12 text-center p-4 flex flex-col justify-center items-center'>
       No Invoices and Payments Record Found
      </div>
    </div>
  );
};
export default UpcomingPayements;
