// /** @format */

// import { useState } from 'react';
// import AddButton from './AddButton';

// /** @format */
// const UpcomingShoots = () => {
//   const [openForm, setOpenForm] = useState(false);
//   const shootsData = [
//     {
//       date: '10 Oct 2025',
//       time: '5 PM',
//       title: 'Demo Portrait Lead',
//       type: 'Lead',
//       task: 'Main Shoot',
//       circleColor: 'bg-orange-400',
//     },
//     {
//       date: '15 Sep 2026',
//       time: 'All Day',
//       title: 'Demo Wedding Job',
//       type: 'Job',
//       task: 'Main Shoot',
//       circleColor: 'bg-pink-400',
//     },
//   ];

//   return (
//     <div className='bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full h-[500px] overflow-y-auto'>
//       <div className=' w-full flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4'>
//         <h2 className='w-5/7 text-lg font-medium text-[20px] sm:text-[22px] lg:text-[24px] text-black'>
//           Upcoming Shoots & Appointments
//         </h2>
//           <div className='lg:w-1/4 md:w-1/4 sm:w-1/2 w-full sm:mt-0 mt-2'>
//         <AddButton setOpenForm={setOpenForm} title="Add New Lead" />
//         </div>
//       </div>
//       <div>
//         {shootsData.map((shoot, index) => (
//           <div
//             key={index}
//             className='flex items-center justify-between py-3 border-b border-gray-300'>
//             <div className='flex items-center'>
//               <span className='font-light text-[14px] sm:text-[16px] lg:text-[17px] mr-2 sm:mr-4 text-black'>
//                 {shoot.date}
//               </span>
//               <span
//                 className={`w-2 sm:w-3 h-2 sm:h-3 ${shoot.circleColor} rounded-full mr-1 sm:mr-2`}></span>
//               <span className='text-[14px] sm:text-[16px] lg:text-[17px] text-black'>
//                 {shoot.time}
//               </span>
//               <span className='ml-1 sm:ml-2 text-[14px] sm:text-[16px] lg:text-[17px] text-black'>
//                 {shoot.title}
//               </span>
//             </div>
//             <div className='flex space-x-1 sm:space-x-2'>
//               <span className='bg-[#FFF1F2] border border-[#FB7185] text-black text-[14px] sm:text-[15px] lg:text-[16px] px-1 sm:px-2 py-0.5 sm:py-1 rounded w-[40px] sm:w-[53px] h-[24px] sm:h-[28px] flex items-center justify-center'>
//                 {shoot.type}
//               </span>
//               <span className='border border-[#D4D4D8] text-black text-[14px] sm:text-[15px] lg:text-[16px] px-1 sm:px-2 py-0.5 sm:py-1 rounded w-auto h-[24px] sm:h-[28px] flex items-center justify-center'>
//                 {shoot.task}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default UpcomingShoots;
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
    <div className="bg-white p-4 sm:p-6 lg:p-8 border border-gray-300 rounded-lg shadow-md w-full h-[450px] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 ">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-black mb-2 sm:mb-0 w-48 xl:w-full">
          Upcoming Shoots & Appointments
        </h2>
        <div className="w-full sm:w-auto lg:w-[45%]  ">
          <AddButton setOpenForm={setOpenForm} title="Add New Shoot"/>
        </div>
      </div>

      {/* Shoots List */}
      <div className="flex flex-col space-y-3">
        {shootsData.map((shoot, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-300"
          >
            {/* Left section: date, time, title */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
              <span className="font-light text-[14px] sm:text-[16px] lg:text-[17px] text-black">
                {shoot.date}
              </span>
              <span
                className={`w-2 sm:w-3 h-2 sm:h-3 ${shoot.circleColor} rounded-full`}
              ></span>
              <span className="text-[14px] sm:text-[16px] lg:text-[17px] text-black">
                {shoot.time}
              </span>
              <span className="text-[14px] sm:text-[16px] lg:text-[17px] text-black">
                {shoot.title}
              </span>
            </div>

            {/* Right section: type, task */}
            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0 mt-2 sm:mt-0">
              <span className="bg-[#FFF1F2] border border-[#FB7185] text-black text-[14px] sm:text-[15px] lg:text-[16px] px-2 py-1 rounded w-[60px] sm:w-[70px] flex items-center justify-center">
                {shoot.type}
              </span>
              <span className="border border-[#D4D4D8] text-black text-[14px] sm:text-[15px] lg:text-[16px] px-2 py-1 rounded w-auto flex items-center justify-center">
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
