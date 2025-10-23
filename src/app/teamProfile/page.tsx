// /** @format */

// 'use client';
// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Link from 'next/link';
// import { FaArrowLeft } from 'react-icons/fa';
// import { PiGenderFemaleBold } from 'react-icons/pi';
// import { HiOutlineLocationMarker } from 'react-icons/hi';
// import Availibility from '../components/Availibility';

// import { FaEllipsis } from 'react-icons/fa6';
// import SearchComponent from '../components/SearchComponent';
// import { CiFilter } from 'react-icons/ci';
// import AddButton from '../components/AddButton';
// import { CiUser } from 'react-icons/ci';
// import { SlCalender } from 'react-icons/sl';
// import WorkloadOverview from '../components/WorkLoad';
// import Table from '../components/Table';

// const ClientProfilePage = () => {
//   const [activeTab, setActiveTab] = useState('Overview');
//   const [openForm, setOpenForm] = useState(false);
//   const TableData = [
//     {
//       task: 'Prepare Client Proposal',
//       job: 'Wedding Shoot - John & Emma',
//       duedate: '2025-11-05',
//       priority: 'High',
//       status: 'Pending',
//       action: 'View',
//     },
//     {
//       task: 'Finalize Contract',
//       job: 'Corporate Gala - BlueTech',
//       duedate: '2025-11-10',
//       priority: 'Medium',
//       status: 'In Progress',
//       action: 'View',
//     },
//     {
//       task: 'Scout Venue Location',
//       job: 'Birthday Event - Sarah',
//       duedate: '2025-11-02',
//       priority: 'Low',
//       status: 'Pending',
//       action: 'View',
//     },
//     {
//       task: 'Edit Photo Album',
//       job: 'Engagement Session - Alex & Mia',
//       duedate: '2025-11-12',
//       priority: 'High',
//       status: 'Completed',
//       action: 'View',
//     },
//     {
//       task: 'Schedule Client Meeting',
//       job: 'Fashion Shoot - Luxe Studio',
//       duedate: '2025-11-08',
//       priority: 'Medium',
//       status: 'Not Started',
//       action: 'View',
//     },
//   ];

//   const TableHeaders = [
//     { key: 'task', label: 'Task' },
//     { key: 'job', label: 'Job' },
//     { key: 'duedate', label: 'Due Date' },
//     { key: 'priority', label: 'Priority' },
//     { key: 'status', label: 'Status' },
//     { key: 'action', label: 'Action' },
//   ];

//   const eventsData = [
//     {
//       title: 'Pre-Wedding Shoot - Sarah & John',
//       status: 'completed',
//       location: 'Toronto City Hall',
//       date: 'Oct 12, 2025, 5:32 AM',
//       deliverables: ['Full Film', 'Teaser', 'RAW Photos'],

//       team: ['Priya', 'Sofia'],
//     },
//     {
//       title: 'Wedding Ceremony - Sarah & John',
//       status: 'IN PROGRESS',
//       location: 'Toronto City Hall',
//       date: 'Oct 12, 2025, 5:32 AM',
//       deliverables: ['Highlight Reel', 'Edited Photos'],
//       team: ['Priya', 'Sofia'],
//     },
//     {
//       title: 'Engagement Party - Sarah & John',
//       status: 'completed',
//       location: 'Vancouver Park',
//       date: 'Nov 5, 2025, 3:00 PM',
//       deliverables: ['Event Coverage', 'Photo Album'],
//       team: ['Priya', 'John'],
//     },
//     {
//       title: 'Reception - Sarah & John',
//       status: 'NOT STARTED',
//       location: 'Toronto Grand Hall',
//       date: 'Dec 15, 2025, 6:00 PM',
//       deliverables: ['Full Video', 'Edited Clips'],
//       team: ['Sofia', 'Mike'],
//     },
//   ];
//   const [statusTab, setStatusTab] = useState('Active');

//   const tabs = ['Active', 'In Active', 'On Leave'];
//   return (
//     <div className='min-h-screen w-full flex flex-col items-start bg-white'>
//       <Navbar />
//       <div className='w-5/6 mx-auto mt-4 sm:mt-8 md:mt-12 px-4 sm:px-6 lg:px-8'>
//         <Link
//           href='/Team'
//           className='flex items-center text-black hover:text-gray-900 text-sm font-medium mb-2 sm:mb-4 transition-colors duration-200'>
//           <FaArrowLeft className='w-4 h-4 mr-2' />
//           Back to Teams
//         </Link>
//         <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 py-2'>
//           {/* Box 1 */}
//       <div
//   className="
//     w-full
//     sm:w-4/5
//     md:w
//     lg:w-1/2
//     p-2 sm:p-4
//     rounded-lg shadow-md border border-gray-300
//     flex flex-col items-center
//   "
// >

//             <div className='flex flex-row  items-start w-full mb-2'>
//               <div className='flex justify-center w-full mb-2'>
//                 <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex justify-center items-center'>
//                   <img
//                     src='/ClientProfileImage.png'
//                     alt='Profile'
//                     className='w-full h-full object-cover'
//                   />
//                 </div>
//               </div>
//               <div className='flex items-center'>
//                 <span className='text-black cursor-pointer'>
//                   <FaEllipsis size={24} />
//                 </span>
//               </div>
//             </div>
//             <h2 className='text-lg sm:text-xl font-semibold text-black'>
//               Sarah Johnson
//             </h2>
//             <div className='flex  flex-col sm:flex-row items-center justify-center mt-1 w-full sm:w-5/6 h-8 sm:h-10'>
//               <button className='px-2 bg-[#01B0E9]/70 text-white text-sm sm:text-base rounded-full'>
//                 Lead Photographer
//               </button>
//             </div>
//             <div className='w-full  flex flex-col justify-center items-center '>
//               <div className=' flex items-center justify-between border-1 border-black px-1 py-1 rounded-3xl w-[75%] my-5 '>
//                 {/* <ul className='list-none flex items-center justify-between text-sm w-full text-black'>
//                   <li className='bg-[#01B0E9] text-white  px-4 rounded-2xl'>
//                     Active
//                   </li>
//                   <li >In Active</li>
//                   <li>On Leave</li>
//                 </ul> */}
//                 <ul className='list-none flex items-center justify-between text-sm w-full text-black'>
//                   {tabs.map((tab) => (
//                     <li
//                       key={tab}
//                       onClick={() => setStatusTab(tab)}
//                       className={`px-4 py-1 rounded-full cursor-pointer transition-all duration-200 ${
//                         statusTab === tab
//                           ? 'bg-[#01B0E9] text-white'
//                           : 'hover:bg-gray-100'
//                       }`}>
//                       {tab}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <p className='text-gray-500 text-sm'> Joined on 01/01/2023</p>
//             </div>
//             <div className='mt-4 sm:mt-6 w-full bg-[#E5F7FD] p-3 overflow-y-auto'>
//               <h3 className='text-md sm:text-md font-bold text-black'>
//                 Personal Details
//               </h3>
//               <div className='flex items-center mt-2 sm:mt-4 gap-4'>
//                 <CiUser className='w-4 sm:w-10 h-4 sm:h-10 text-black bg-white rounded-full p-2' />
//                 <div>
//                   <span className='text-sm sm:text-sm font-medium text-black'>
//                     Full Name
//                   </span>
//                   <p className='text-sm sm:text-base text-black'>Sarah Lee</p>
//                 </div>
//               </div>
//               <div className='flex items-center mt-2 sm:mt-4 gap-4'>
//                 <SlCalender className='w-5 sm:w-9 h-4 sm:h-9 text-black bg-white rounded-full p-2' />
//                 <div>
//                   <span className='text-sm sm:text-sm font-medium text-black'>
//                     Date Of Birth
//                   </span>
//                   <p className='text-sm sm:text-base text-black'> 20-02-1990</p>
//                 </div>
//               </div>
//               <div className='flex items-center mt-2 sm:mt-4 gap-4'>
//                 <PiGenderFemaleBold className='w-4 sm:w-10 h-4 sm:h-10 text-black bg-white rounded-full p-2' />
//                 <div>
//                   <span className='text-sm sm:text-sm font-medium text-black'>
//                     Gender
//                   </span>
//                   <p className='text-sm sm:text-base text-black'> Female</p>
//                 </div>
//               </div>

//               <div className='flex items-center mt-2 sm:mt-4 gap-4'>
//                 <HiOutlineLocationMarker className='w-4 sm:w-10 h-4 sm:h-10 text-black bg-white rounded-full p-2' />
//                 <div>
//                   <span className='text-sm sm:text-sm font-medium text-black'>
//                     Address
//                   </span>
//                   <p className='text-sm sm:text-base text-black'>
//                     {' '}
//                     Toronto City Hall j 23 Street
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Box 2 */}
//           <div className='w-full lg:w-3/4 bg-white p-2 sm:p-4 rounded-lg shadow-md border border-gray-300'>
//             <div className='flex justify-between border-b border-gray-300 mb-2 sm:mb-4 w-full'>
//               <a
//                 href='#'
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setActiveTab('Overview');
//                 }}
//                 className={`px-2 sm:px-4 py-1 sm:py-2 text-[18px] md:text-[18px] sm:text-[14px] text-black font-medium ${
//                   activeTab === 'Overview'
//                     ? 'border-b-2 border-[#0B763E]'
//                     : 'text-black hover:text-gray-700'
//                 }`}>
//                 Overview
//               </a>
//               <a
//                 href='#'
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setActiveTab('Jobs');
//                 }}
//                 className={`px-2 sm:px-4 py-1 sm:py-2 text-[18px] md:text-[18px] sm:text-[14px] text-black font-medium ${
//                   activeTab === 'Jobs'
//                     ? 'border-b-2 border-[#0B763E] text-black font-medium'
//                     : 'text-black hover:text-gray-700'
//                 }`}>
//                 Jobs
//               </a>
//               <a
//                 href='#'
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setActiveTab('Tasks');
//                 }}
//                 className={`px-2 sm:px-4 py-1 sm:py-2 text-[18px] md:text-[18px] sm:text-[14px] text-black font-medium ${
//                   activeTab === 'Tasks'
//                     ? 'border-b-2 border-[#0B763E] text-black font-medium'
//                     : 'text-black hover:text-gray-700'
//                 }`}>
//                 Tasks
//               </a>
//               <a
//                 href='#'
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setActiveTab('Availibity');
//                 }}
//                 className={`px-2 sm:px-4 py-1 sm:py-2 text-[18px] md:text-[18px] sm:text-[14px] text-black font-medium ${
//                   activeTab === 'Availibity'
//                     ? 'border-b-2 border-[#0B763E] text-black font-medium'
//                     : 'text-black hover:text-gray-700'
//                 }`}>
//                 Availibity
//               </a>
//               <a
//                 href='#'
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setActiveTab('Invoices & Payments');
//                 }}
//                 className={`px-2 sm:px-4 py-1 sm:py-2 text-[18px] md:text-[18px] sm:text-[14px] text-black font-medium ${
//                   activeTab === 'Invoices & Payments'
//                     ? 'border-b-2 border-[#0B763E] text-black font-medium'
//                     : 'text-black hover:text-gray-700'
//                 }`}>
//                 Perfomance
//               </a>
//             </div>
//             {activeTab === 'Availibity' && (
//               <div>
//                 <Availibility />
//               </div>
//             )}
//             {activeTab === 'Overview' && (
//               <div>
//                 <WorkloadOverview />
//               </div>
//             )}
//             {activeTab === 'Tasks' && (
//               <div className='w-full h-full '>
//                 <div className=' w-full flex items-center justify-between px-6'>
//                   <div className='flex  bg-[#F4F4F5] p-2 gap-1.5  rounded cursor-pointer hover:bg-gray-200 transition duration-200'>
//                     <CiFilter className='w-5 h-5 text-gray-500' />
//                     <span className='text-black'>Filter</span>
//                   </div>
//                   <div>
//                     <AddButton
//                       setOpenForm={setOpenForm}
//                       title='Add Tasks'
//                     />
//                   </div>
//                 </div>
//                 <Table
//                   headers={TableHeaders}
//                   data={TableData}
//                 />
//               </div>
//             )}
//             {activeTab === 'Jobs' && (
//               // <div className='flex flex-col space-y-4'>
//               //   <div className='w-full bg-white p-4 rounded-lg'>
//               //     <div className='flex items-center justify-between w-full '>
//               //       <div className='w-1/2'>
//               //         <SearchComponent />
//               //       </div>
//               //       <div className='w-[8%]  '>
//               //         <div className='flex  bg-[#F4F4F5] p-2 gap-1.5  rounded cursor-pointer hover:bg-gray-200 transition duration-200'>
//               //           <CiFilter className='w-5 h-5 text-gray-500' />
//               //           <span className='text-black'>Filter</span>
//               //         </div>
//               //         {/* <div>
//               //           <AddButton title='Add Event' />
//               //         </div> */}
//               //       </div>
//               //     </div>
//               //     <div className='flex flex-row flex-wrap gap-4 mt-4'>
//               //       {eventsData.map((event, index) => (
//               //         <div
//               //           key={index}
//               //           className='bg-[#F4F4F5] p-4 rounded-lg w-full sm:w-[48%] border border-gray-300'>
//               //           <div className='w-full  flex flex-row justify-between'>
//               //             {' '}
//               //             <h4 className='text-md  text-black font-semibold'>
//               //               {event.title}
//               //             </h4>
//               //             <span className='text-black cursor-pointer'>
//               //               <FaEllipsis size={20} />
//               //             </span>
//               //           </div>
//               //           <div className=' w-2/6 flex items-center rounded-full py-1 mt-2'>
//               //             <p
//               //               className={
//               //                 event.status === 'completed'
//               //                   ? 'text-white bg-[#13CC95] px-2 py-1 rounded-full'
//               //                   : event.status === 'IN PROGRESS'
//               //                   ? 'text-white bg-[#01B0E9] px-2 py-1 rounded-full'
//               //                   : event.status === 'NOT STARTED'
//               //                   ? 'text-white bg-red-500 px-2 py-1 rounded-full'
//               //                   : ''
//               //               }>
//               //               {event.status}
//               //             </p>
//               //           </div>
//               //           <div className='flex mt-2'>
//               //             <div className='w-5/12'>
//               //               <div className='text-sm text-gray-600'>
//               //                 Location
//               //               </div>
//               //               <div className='w-5/6 bg-white flex justify-center py-2 rounded-sm my-1'>
//               //                 <div className='text-black'>{event.location}</div>
//               //               </div>
//               //             </div>
//               //             <div className='w-1/2'>
//               //               <div className='text-sm text-gray-600'>Date</div>
//               //               <div className='w-5/5 bg-white flex justify-center py-2 rounded-sm my-1'>
//               //                 <div className='text-black'>{event.date}</div>
//               //               </div>
//               //             </div>
//               //           </div>
//               //           <div className='w-full flex flex-row'>
//               //             <div className='w-5/12 mt-2'>
//               //               <div className='text-sm text-gray-600'>
//               //                 Deliverables
//               //               </div>
//               //               <ul className='w-full flex flex-row flex-wrap  pr-2'>
//               //                 {event.deliverables.map((item, idx) => (
//               //                   <li
//               //                     key={idx}
//               //                     className='text-black inline-block font-semibold text-[14px]'>
//               //                     {item +
//               //                       (idx < event.deliverables.length - 1
//               //                         ? ', '
//               //                         : '')}
//               //                   </li>
//               //                 ))}
//               //               </ul>
//               //             </div>
//               //             <div className='w-1/2 mt-2'>
//               //               <div className='text-sm text-gray-600'>Team</div>
//               //               <div className='text-black font-semibold flex items-center flex-wrap gap-2'>
//               //                 {event.team.map((member, idx) => (
//               //                   <span
//               //                     key={idx}
//               //                     className='flex items-center text-[15px]'>
//               //                     <img
//               //                       src={`/team${idx + 1}.png`}
//               //                       alt={member}
//               //                       className='w-10 h-10 rounded-full mr-1 object-cover'
//               //                     />
//               //                     {member}
//               //                     {idx < event.team.length - 1 && ', '}
//               //                   </span>
//               //                 ))}
//               //               </div>
//               //             </div>
//               //           </div>
//               //         </div>
//               //       ))}
//               //     </div>
//               //   </div>
//               // </div>
//               <div className='flex flex-col gap-4 sm:gap-6'>
//                 <div className='w-full bg-white p-4 sm:p-5 rounded-lg'>
//                   <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
//                     <div className='w-full sm:w-1/2'>
//                       <SearchComponent placeHolder='Search' />
//                     </div>
//                     <div className='w-full sm:w-1/2 flex justify-between items-center gap-3'>
//                       <div className='flex items-center bg-[#F4F4F5] p-1  gap-1.5 rounded cursor-pointer hover:bg-gray-200 transition duration-200'>
//                         <CiFilter className='w-5 h-5 sm:w-6 sm:h-6 text-gray-500' />
//                         <span className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
//                           Filter
//                         </span>
//                       </div>
//                       <div className='w-1/3'>
//                         <AddButton
//                           setOpenForm={setOpenForm}
//                           title='Add Event'
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className='h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-y-auto mt-4 sm:mt-6'>
//                     <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6'>
//                       {eventsData.map((event, index) => (
//                         <div
//                           key={index}
//                           className='bg-[#F4F4F5] p-4 sm:p-5 rounded-lg border border-gray-300'>
//                           <div className='flex flex-row justify-between'>
//                             <h4 className='text-base sm:text-lg md:text-xl lg:text-2xl text-black font-semibold'>
//                               {event.title}
//                             </h4>
//                             <span className='text-black cursor-pointer'>
//                               <FaEllipsis
//                                 size={18}
//                                 className='sm:w-5 sm:h-5 md:w-6 md:h-6'
//                               />
//                             </span>
//                           </div>
//                           <div className='w-2/3 sm:w-1/2 flex items-center rounded-full py-1 mt-2'>
//                             <p
//                               className={`text-xs sm:text-sm md:text-sm lg:text-base px-2 sm:px-3 py-1 rounded-full ${
//                                 event.status === 'COMPLETED'
//                                   ? 'text-white bg-[#13CC95]'
//                                   : event.status === 'IN PROGRESS'
//                                   ? 'text-white bg-[#01B0E9]'
//                                   : 'text-white bg-red-500'
//                               }`}>
//                               {event.status}
//                             </p>
//                           </div>
//                           <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-3'>
//                             <div className='w-full sm:w-1/2'>
//                               <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
//                                 Location
//                               </div>
//                               <div className='bg-white flex justify-center py-2 rounded-sm my-1'>
//                                 <div className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
//                                   {event.location}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className='w-full sm:w-1/2'>
//                               <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
//                                 Date
//                               </div>
//                               <div className='bg-white flex justify-center p-2  rounded-sm my-1'>
//                                 <div className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
//                                   {event.date}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-3'>
//                             <div className='w-full sm:w-1/2'>
//                               <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
//                                 Deliverables
//                               </div>
//                               <ul className='flex flex-row flex-wrap'>
//                                 {event.deliverables.map((item, idx) => (
//                                   <li
//                                     key={idx}
//                                     className='text-sm sm:text-base md:text-base lg:text-lg text-black font-semibold'>
//                                     {item +
//                                       (idx < event.deliverables.length - 1
//                                         ? ', '
//                                         : '')}
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                             <div className='w-full sm:w-1/2'>
//                               <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
//                                 Team
//                               </div>
//                               <div className='flex flex-wrap gap-2 sm:gap-3'>
//                                 {event.team.map((member, idx) => (
//                                   <span
//                                     key={idx}
//                                     className='flex items-center text-sm sm:text-base md:text-base lg:text-lg text-black font-semibold'>
//                                     <img
//                                       src={`/teampic${idx + 1}.png`}
//                                       alt={member}
//                                       className='w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-1 sm:mr-2 object-cover'
//                                     />
//                                     {member}
//                                     {idx < event.team.length - 1 && ', '}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientProfilePage;
/** @format */

'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { PiGenderFemaleBold } from 'react-icons/pi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import Availibility from '../components/Availibility';
import { FaEllipsis } from 'react-icons/fa6';
import SearchComponent from '../components/SearchComponent';
import { CiFilter } from 'react-icons/ci';
import AddButton from '../components/AddButton';
import { CiUser } from 'react-icons/ci';
import { SlCalender } from 'react-icons/sl';
import WorkloadOverview from '../components/WorkLoad';
import Table from '../components/Table';

const ClientProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [openForm, setOpenForm] = useState(false);
  
  const TableData = [
    {
      task: 'Prepare Client Proposal',
      job: 'Wedding Shoot - John & Emma',
      duedate: '2025-11-05',
      priority: 'High',
      status: 'Pending',
      action: 'View',
    },
    {
      task: 'Finalize Contract',
      job: 'Corporate Gala - BlueTech',
      duedate: '2025-11-10',
      priority: 'Medium',
      status: 'In Progress',
      action: 'View',
    },
    {
      task: 'Scout Venue Location',
      job: 'Birthday Event - Sarah',
      duedate: '2025-11-02',
      priority: 'Low',
      status: 'Pending',
      action: 'View',
    },
    {
      task: 'Edit Photo Album',
      job: 'Engagement Session - Alex & Mia',
      duedate: '2025-11-12',
      priority: 'High',
      status: 'Completed',
      action: 'View',
    },
    {
      task: 'Schedule Client Meeting',
      job: 'Fashion Shoot - Luxe Studio',
      duedate: '2025-11-08',
      priority: 'Medium',
      status: 'Not Started',
      action: 'View',
    },
  ];

  const TableHeaders = [
    { key: 'task', label: 'Task' },
    { key: 'job', label: 'Job' },
    { key: 'duedate', label: 'Due Date' },
    { key: 'priority', label: 'Priority' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Action' },
  ];

  const eventsData = [
    {
      title: 'Pre-Wedding Shoot - Sarah & John',
      status: 'COMPLETED',
      location: 'Toronto City Hall',
      date: 'Oct 12, 2025, 5:32 AM',
      deliverables: ['Full Film', 'Teaser', 'RAW Photos'],
      team: ['Priya', 'Sofia'],
    },
    {
      title: 'Wedding Ceremony - Sarah & John',
      status: 'IN PROGRESS',
      location: 'Toronto City Hall',
      date: 'Oct 12, 2025, 5:32 AM',
      deliverables: ['Highlight Reel', 'Edited Photos'],
      team: ['Priya', 'Sofia'],
    },
    {
      title: 'Engagement Party - Sarah & John',
      status: 'COMPLETED',
      location: 'Vancouver Park',
      date: 'Nov 5, 2025, 3:00 PM',
      deliverables: ['Event Coverage', 'Photo Album'],
      team: ['Priya', 'John'],
    },
    {
      title: 'Reception - Sarah & John',
      status: 'NOT STARTED',
      location: 'Toronto Grand Hall',
      date: 'Dec 15, 2025, 6:00 PM',
      deliverables: ['Full Video', 'Edited Clips'],
      team: ['Sofia', 'Mike'],
    },
  ];

  const [statusTab, setStatusTab] = useState('Active');
  const tabs = ['Active', 'In Active', 'On Leave'];

  return (
    <div className='min-h-screen w-full flex flex-col bg-white'>
      <Navbar />
      <div className='w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8'>
        {/* Back Link */}
        <Link
          href='/Team'
          className='flex items-center text-black hover:text-gray-900 text-sm font-medium mb-3 sm:mb-4 md:mb-6 transition-colors duration-200'
        >
          <FaArrowLeft className='w-3 h-3 sm:w-4 sm:h-4 mr-2' />
          Back to Teams
        </Link>

        {/* Main Content - Stack on mobile/tablet, side-by-side on desktop */}
        <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8'>
          
          {/* PROFILE CARD - Full width on mobile/tablet, 1/3 on desktop */}
          <div className='w-full lg:w-1/3  flex-shrink-0'>
            <div className='bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-sm border border-gray-200'>
              
              {/* Profile Header */}
              <div className='flex flex-row items-start justify-between w-full mb-3 sm:mb-4'>
                <div className='flex justify-center  w-full'>
                  <div className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto'>
                    <img
                      src='/ClientProfileImage.png'
                      alt='Profile'
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>
                <div className='flex items-center pt-1'>
                  <FaEllipsis size={18} className='text-gray-500 cursor-pointer' />
                </div>
              </div>

              {/* Name */}
              <h2 className='text-base sm:text-lg md:text-xl font-semibold text-black text-center mb-2'>
                Sarah Johnson
              </h2>

              {/* Role Badge */}
              <div className='flex justify-center mb-3 sm:mb-4'>
                <button className='px-3 sm:px-4 py-1.5 bg-[#01B0E9]/70 text-white text-xs sm:text-sm rounded-full'>
                  Lead Photographer
                </button>
              </div>

              {/* Status Tabs */}
       <div className='md:w-1/2 lg:w-full mx-auto mb-4'>
  <div className='flex md:flex-nowrap md:px-1 md:py-0.5  justify-between gap-1 sm:gap-2 border border-gray-300 rounded-full p-1.5 bg-gray-50'>
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setStatusTab(tab)}
        className={`px-3 py-1.5 md:py-1.5 md:px-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-200 font-medium min-w-[70px] sm:min-w-[80px] ${
          statusTab === tab
            ? 'bg-[#01B0E9] text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>

              {/* Joined Date */}
              <p className='text-xs sm:text-sm text-gray-500 text-center mb-4 sm:mb-6'>
                Joined on 01/01/2023
              </p>

              {/* Personal Details */}
              <div className='bg-[#E5F7FD] p-3 sm:p-4 rounded-lg'>
                <h3 className='text-sm sm:text-base font-semibold text-black mb-3 sm:mb-4'>
                  Personal Details
                </h3>
                
                {/* Detail Items */}
                <div className='space-y-2 sm:space-y-3'>
                  {[
                    { icon: CiUser, label: 'Full Name', value: 'Sarah Lee' },
                    { icon: SlCalender, label: 'Date Of Birth', value: '20-02-1990' },
                    { icon: PiGenderFemaleBold, label: 'Gender', value: 'Female' },
                    { icon: HiOutlineLocationMarker, label: 'Address', value: 'Toronto City Hall, 23 Street' },
                  ].map(({ icon: Icon, label, value }, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <Icon className='w-4 h-4 sm:w-8 sm:h-7  text-black bg-white rounded-full p-1.5 flex-shrink-0 mt-0.5' />
                      <div className='min-w-0 flex-1'>
                        <span className='text-xs sm:text-sm font-medium text-gray-700 block'>{label}</span>
                        <p className='text-sm sm:text-base text-black truncate'>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TABS CONTENT  */}
          <div className='w-full lg:w-2/3'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
              
              {/* Tab Navigation  */}
              <div className='flex border-b border-gray-200 bg-gray-50 px-2 sm:px-4'>
                {[
                  { key: 'Overview', label: 'Overview' },
                  { key: 'Jobs', label: 'Jobs' },
                  { key: 'Tasks', label: 'Tasks' },
                  { key: 'Availibity', label: 'Availability' },
                  { key: 'Invoices & Payments', label: 'Performance' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(key);
                    }}
                    className={`flex-1 py-2.5 px-2 sm:px-3 text-center text-xs sm:text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === key
                        ? 'text-[#0B763E] border-b-2 border-[#0B763E]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className='p-3 sm:p-4 md:p-6'>
                
                {activeTab === 'Availibity' && <Availibility />}
                
                {activeTab === 'Overview' && <WorkloadOverview />}
                
                {activeTab === 'Tasks' && (
                  <div className='space-y-4'>
                    <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-start sm:items-center'>
                      <div className='flex items-center bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-200'>
                        <CiFilter className='w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2' />
                        <span className='text-sm sm:text-base text-black'>Filter</span>
                      </div>
                        <div className=' w-full  sm:auto md:w-2/8'>
                        <AddButton setOpenForm={setOpenForm} title='Add Event' />
                        </div>
                    </div>
                    <Table headers={TableHeaders} data={TableData} />
                  </div>
                )}
                
                {activeTab === 'Jobs' && (
                  <div className='space-y-4 sm:space-y-6'>
                    {/* Search & Controls */}
                    <div className='flex flex-col sm:flex-row sm:justify-between  gap-3 sm:gap-4'>
                      <div className='w-full sm:w-1/2'>
                        <SearchComponent placeHolder='Search jobs...' />
                      </div>
                      <div className='flex items-center justify-between w-full sm:w-[40%] gap-3'>
                        <div className='flex items-center bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-200 flex-1 justify-center'>
                          <CiFilter className='w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2' />
                          <span className='text-sm sm:text-base text-black'>Filter</span>
                        </div>
                        <div className=' w-full   md:w-2/3'>
                        <AddButton setOpenForm={setOpenForm} title='Add Event' />
                        </div>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 gap-4 sm:gap-6 max-h-[70vh] overflow-y-auto'>
                      {eventsData.map((event, index) => (
                        <div
                          key={index}
                          className='bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200'
                        >
                          {/* Title & Actions */}
                          <div className='flex flex-row justify-between items-start mb-3'>
                            <h4 className='text-sm sm:text-base md:text-lg font-semibold text-black flex-1 pr-2'>
                              {event.title}
                            </h4>
                            <FaEllipsis size={16} className='text-gray-500 cursor-pointer flex-shrink-0' />
                          </div>

                          {/* Status Badge */}
                          <div className='w-full sm:w-auto mb-3'>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                event.status === 'COMPLETED'
                                  ? 'text-white bg-[#13CC95]'
                                  : event.status === 'IN PROGRESS'
                                  ? 'text-white bg-[#01B0E9]'
                                  : 'text-white bg-red-500'
                              }`}
                            >
                              {event.status}
                            </span>
                          </div>

                          {/* Location & Date  */}
                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4'>
                            <div>
                              <div className='text-xs sm:text-sm text-gray-600 mb-1'>Location</div>
                              <div className='bg-white p-2 sm:p-3 rounded-md'>
                                <p className='text-sm sm:text-base text-black'>{event.location}</p>
                              </div>
                            </div>
                            <div>
                              <div className='text-xs sm:text-sm text-gray-600 mb-1'>Date</div>
                              <div className='bg-white p-2 sm:p-3 rounded-md'>
                                <p className='text-sm sm:text-base text-black'>{event.date}</p>
                              </div>
                            </div>
                          </div>

                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                            <div>
                              <div className='text-xs sm:text-sm text-gray-600 mb-2'>Deliverables</div>
                              <div className='flex flex-wrap gap-1'>
                                {event.deliverables.map((item, idx) => (
                                  <span
                                    key={idx}
                                    className='text-xs sm:text-sm text-black font-medium bg-white px-2 py-1 rounded'
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className='text-xs sm:text-sm text-gray-600 mb-2'>Team</div>
                              <div className='flex flex-wrap gap-2'>
                                {event.team.map((member, idx) => (
                                  <div key={idx} className='flex items-center'>
                                    <img
                                      src={`/teampic${idx + 1}.png`}
                                      alt={member}
                                      className='w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-1 object-cover'
                                    />
                                    <span className='text-sm text-black font-medium'>{member}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;