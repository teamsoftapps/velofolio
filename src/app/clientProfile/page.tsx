/** @format */

'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaEdit,
  FaEllipsisV,
  FaEnvelope,
  FaFilter,
  FaInstagram,
  FaPhone,
  FaUsers,
} from 'react-icons/fa';
import { FaEllipsis } from 'react-icons/fa6';
import { MdModeEditOutline } from 'react-icons/md';
import SearchComponent from '../components/SearchComponent';
import { CiFilter } from 'react-icons/ci';
import AddButton from '../components/AddButton';
import Contracts from '../components/Contracts';
import ClientProfile from '../components/ClientProfile';

const ClientProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [openForm, setOpenForm] = useState(false);
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

  return (
    <div className='min-h-screen w-full flex flex-col items-start bg-white'>
      <Navbar />
      <div className='w-full max-w-[1400px] mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-4 sm:px-6 md:px-8'>
        <Link
          href='/clients'
          className='flex items-center text-black hover:text-gray-900 text-sm sm:text-base md:text-base lg:text-lg font-medium mb-2 sm:mb-3 md:mb-4 transition-colors duration-200'>
          <FaArrowLeft className='w-4 h-4 sm:w-5 sm:h-5 mr-2' />
          Back to clients
        </Link>
        <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 py-2'>
          {/* Box 1: Client Profile */}
        <ClientProfile  />
          {/* Box 2: Tabs and Content */}
          <div className='w-full lg:w-3/5 xl:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-300'>
            <div className='flex flex-wrap justify-between border-b border-gray-300 mb-3 sm:mb-4 gap-2'>
              {[
                'Overview',
                'Events',
                'Tasks',
                'Contracts & Docs',
                'Invoices & Payments',
              ].map((tab) => (
                <a
                  key={tab}
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab);
                  }}
                  className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 text-xs sm:text-sm md:text-base lg:text-lg font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-[#0B763E] text-black'
                      : 'text-black hover:text-gray-700'
                  }`}>
                  {tab}
                </a>
              ))}
            </div>
            {activeTab === 'Overview' && (
              <div className='flex flex-col gap-4 sm:gap-6'>
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                  <div className='w-full sm:w-1/2 bg-[#F4F4F5] p-4 sm:p-5 rounded-lg'>
                    <span className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black'>
                      Lead Source
                    </span>
                    <div className='flex flex-row justify-between items-center mt-3 sm:mt-4'>
                      <div className='flex flex-row items-center gap-2 sm:gap-3'>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-white p-2 sm:p-3 rounded-full flex justify-center items-center'>
                          <FaInstagram className='text-[#E4405F] text-xl sm:text-2xl' />
                        </div>
                        <span className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
                          Instagram
                        </span>
                      </div>
                      <div className='w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'>
                        <MdModeEditOutline className='text-base sm:text-lg' />
                      </div>
                    </div>
                  </div>
                  <div className='w-full sm:w-1/2 bg-[#F4F4F5] p-4 sm:p-5 rounded-lg'>
                    <span className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black'>
                      Assigned Team
                    </span>
                    <div className='flex flex-row justify-between items-center mt-3 sm:mt-4'>
                      <div className='flex items-center'>
                        <img
                          src='/teampic1.png'
                          alt='team1'
                          className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white -mr-3'
                        />
                        <img
                          src='/teampic2.png'
                          alt='team2'
                          className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white -mr-3'
                        />
                        <img
                          src='/teampic3.png'
                          alt='team3'
                          className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white'
                        />
                      </div>
                      <div className='w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'>
                        <MdModeEditOutline className='text-base sm:text-lg' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full bg-[#F4F4F5] p-4 sm:p-5 rounded-lg flex flex-col gap-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black'>
                      Notes
                    </span>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'>
                      <MdModeEditOutline className='text-base sm:text-lg' />
                    </div>
                  </div>
                  <span className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
                    During our initial consultation, Sarah mentioned that she
                    prefers a pastel color theme for the wedding and wants extra
                    focus on candid shots. She also requested a highlight reel
                    for social media, in addition to the full video package.
                    Need to confirm the exact start time for the reception.
                  </span>
                </div>
              </div>
            )}
            {activeTab === 'Events' && (
              <div className='flex flex-col gap-4 sm:gap-6'>
                <div className='w-full bg-white p-4 sm:p-5 rounded-lg'>
                  <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                    <div className='w-full sm:w-1/2'>
                      <SearchComponent placeHolder='Search Events' />
                    </div>
                    <div className='w-full sm:w-1/2 flex justify-between items-center gap-3'>
                      <div className='flex items-center bg-[#F4F4F5] p-1  gap-1.5 rounded cursor-pointer hover:bg-gray-200 transition duration-200'>
                        <CiFilter className='w-5 h-5 sm:w-6 sm:h-6 text-gray-500' />
                        <span className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
                          Filter
                        </span>
                      </div>
                      <AddButton
                        setOpenForm={setOpenForm}
                        title='Add Event'
                      />
                    </div>
                  </div>
                  <div className='h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-y-auto mt-4 sm:mt-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6'>
                      {eventsData.map((event, index) => (
                        <div
                          key={index}
                          className='bg-[#F4F4F5] p-4 sm:p-5 rounded-lg border border-gray-300'>
                          <div className='flex flex-row justify-between'>
                            <h4 className='text-base sm:text-lg md:text-xl lg:text-2xl text-black font-semibold'>
                              {event.title}
                            </h4>
                            <span className='text-black cursor-pointer'>
                              <FaEllipsis
                                size={18}
                                className='sm:w-5 sm:h-5 md:w-6 md:h-6'
                              />
                            </span>
                          </div>
                          <div className='w-2/3 sm:w-1/2 flex items-center rounded-full py-1 mt-2'>
                            <p
                              className={`text-xs sm:text-sm md:text-sm lg:text-base px-2 sm:px-3 py-1 rounded-full ${
                                event.status === 'COMPLETED'
                                  ? 'text-white bg-[#13CC95]'
                                  : event.status === 'IN PROGRESS'
                                  ? 'text-white bg-[#01B0E9]'
                                  : 'text-white bg-red-500'
                              }`}>
                              {event.status}
                            </p>
                          </div>
                          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-3'>
                            <div className='w-full sm:w-1/2'>
                              <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
                                Location
                              </div>
                              <div className='bg-white flex justify-center py-2 rounded-sm my-1'>
                                <div className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
                                  {event.location}
                                </div>
                              </div>
                            </div>
                            <div className='w-full sm:w-1/2'>
                              <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
                                Date
                              </div>
                              <div className='bg-white flex justify-center p-2  rounded-sm my-1'>
                                <div className='text-sm sm:text-base md:text-base lg:text-lg text-black'>
                                  {event.date}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-3'>
                            <div className='w-full sm:w-1/2'>
                              <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
                                Deliverables
                              </div>
                              <ul className='flex flex-row flex-wrap'>
                                {event.deliverables.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className='text-sm sm:text-base md:text-base lg:text-lg text-black font-semibold'>
                                    {item +
                                      (idx < event.deliverables.length - 1
                                        ? ', '
                                        : '')}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className='w-full sm:w-1/2'>
                              <div className='text-xs sm:text-sm md:text-sm lg:text-base text-gray-600'>
                                Team
                              </div>
                              <div className='flex flex-wrap gap-2 sm:gap-3'>
                                {event.team.map((member, idx) => (
                                  <span
                                    key={idx}
                                    className='flex items-center text-sm sm:text-base md:text-base lg:text-lg text-black font-semibold'>
                                    <img
                                      src={`/teampic${idx + 1}.png`}
                                      alt={member}
                                      className='w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-1 sm:mr-2 object-cover'
                                    />
                                    {member}
                                    {idx < event.team.length - 1 && ', '}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
                  {activeTab === 'Contracts & Docs' && <Contracts/>}
            {activeTab === 'Tasks' && (
              <div className='flex flex-col gap-4 sm:gap-6'>
                <div className='w-full bg-white p-4 sm:p-5 rounded-lg'>
                  <div className='h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-y-auto mt-4 sm:mt-6 flex flex-col items-center justify-start pt-8 sm:pt-12'>
                    <div className='mb-6 sm:mb-8 w-full flex justify-center '>
                      <img
                        src='/images/no-task.png'
                        alt='No tasks'
                        className='w-[100] h-[100]  object-contain'
                      />
                    </div>
                    <div className='text-center mb-6 sm:mb-8 flex justify-center'>
                      <p className='w-5/8 text-sm sm:text-base md:text-lg lg:text-xl text-black'>
                        No tasks yet! Create your first task to keep your
                        workflow on track.
                      </p>
                    </div>
                    <div>
                      <AddButton
                        setOpenForm={setOpenForm}
                        title='Add Task'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;
