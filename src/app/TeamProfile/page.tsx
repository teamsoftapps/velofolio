/** @format */

'use client';
import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
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
import SearchComponent from '../Components/SearchComponent';
import { CiFilter } from 'react-icons/ci';
import AddButton from '../Components/AddButton';
import { CiUser } from 'react-icons/ci';

const ClientProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Overview');

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
      <div className='w-5/6 mx-auto mt-4 sm:mt-8 md:mt-12 px-4 sm:px-6 lg:px-8'>
        <Link
          href='/Team'
          className='flex items-center text-black hover:text-gray-900 text-sm font-medium mb-2 sm:mb-4 transition-colors duration-200'>
          <FaArrowLeft className='w-4 h-4 mr-2' />
          Back to Teams
        </Link>
        <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 py-2'>
          {/* Box 1 */}
          <div className='w-full lg:w-3/12 bg-white p-2 sm:p-4 rounded-lg shadow-md border border-gray-300 flex flex-col items-center'>
            <div className='flex flex-row  items-start w-full mb-2'>
              <div className='flex justify-center w-full mb-2'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex justify-center items-center'>
                  <img
                    src='/ClientProfileImage.png'
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
              <div className='flex items-center'>
                <span className='text-black cursor-pointer'>
                  <FaEllipsis size={24} />
                </span>
              </div>
            </div>
            <h2 className='text-lg sm:text-xl font-semibold text-black'>
              Sarah Johnson
            </h2>
            <div className='flex  flex-col sm:flex-row items-center justify-center mt-1 w-full sm:w-5/6 h-8 sm:h-10'>
              <button className='px-2 bg-[#01B0E9]/70 text-white text-sm sm:text-base rounded-full'>
                Lead Photographer
              </button>
            </div>
            <div className='w-full  flex flex-col justify-center items-center '>
              <div className=' flex items-center justify-between border-1 border-black px-1 py-1 rounded-3xl w-[65%] my-5 '>
                <ul className='list-none flex items-center justify-between text-sm w-full text-black'>
                  <li className='bg-[#01B0E9] text-white  px-4 rounded-2xl'>
                    Active
                  </li>
                  <li>In Active</li>
                  <li>On Leave</li>
                </ul>
              </div>
              <p className='text-gray-500 text-sm'> Joined on 01/01/2023</p>
            </div>
            <div className='mt-4 sm:mt-6 w-full bg-red-500 overflow-y-auto'>
              <h3 className='text-md sm:text-lg font-bold text-black'>
                Personal Details
              </h3>
              <div className='flex items-center mt-2 sm:mt-4 gap-4'>
                <CiUser className='w-4 sm:w-10 h-4 sm:h-10 text-black bg-white rounded-full p-2' />
                <div>
                  <span className='text-sm sm:text-base font-bold text-black'>
                    Full Name
                  </span>
                  <p className='text-sm sm:text-base text-black'>Sarah</p>
                </div>
              </div>
              <div className='flex items-center mt-2 sm:mt-4'>
                <span className='w-7 sm:w-9 h-7 sm:h-9 border-2 border-[#D4D4D8] bg-[#F4F4F5] rounded-full flex items-center justify-center mr-2 sm:mr-3'>
                  <img
                    src='/phone_outline.png'
                    alt='Phone'
                    className='w-2 sm:w-3 h-2 sm:h-3 object-center'
                  />
                </span>
                <div>
                  <span className='text-sm sm:text-base font-bold text-black'>
                    Phone
                  </span>
                  <p className='text-sm sm:text-base text-black'>
                    +1(514) 550-3281
                  </p>
                </div>
              </div>
              <div className='flex items-center mt-2 sm:mt-4'>
                <span className='w-7 sm:w-9 h-7 sm:h-9 border-2 border-[#D4D4D8] bg-[#F4F4F5] rounded-full flex items-center justify-center mr-2 sm:mr-3'>
                  <img
                    src='/team.png'
                    alt='Address'
                    className='w-3 sm:w-4 h-2 sm:h-3 object-center'
                  />
                </span>
                <div>
                  <span className='text-sm sm:text-base font-bold text-black'>
                    Address
                  </span>
                  <p className='text-sm sm:text-base text-black'>
                    225 Cherry Street #24, New York, NY
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Box 2 */}
          <div className='w-full lg:w-3/4 bg-white p-2 sm:p-4 rounded-lg shadow-md border border-gray-300'>
            <div className='flex justify-between border-b border-gray-300 mb-2 sm:mb-4 w-full'>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('Overview');
                }}
                className={`px-2 sm:px-4 py-1 sm:py-2 text-[18px] md:text-[18px] sm:text-[14px] text-black font-medium ${
                  activeTab === 'Overview'
                    ? 'border-b-2 border-[#0B763E]'
                    : 'text-black hover:text-gray-700'
                }`}>
                Overview
              </a>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('Events');
                }}
                className={`px-2 sm:px-4 py-1 sm:py-2 text-[18px] md:text-[18px] sm:text-[14px] text-black font-medium ${
                  activeTab === 'Events'
                    ? 'border-b-2 border-[#0B763E] text-black font-medium'
                    : 'text-black hover:text-gray-700'
                }`}>
                Events
              </a>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('Tasks');
                }}
                className={`px-2 sm:px-4 py-1 sm:py-2 text-[18px] md:text-[18px] sm:text-[14px] text-black font-medium ${
                  activeTab === 'Tasks'
                    ? 'border-b-2 border-[#0B763E] text-black font-medium'
                    : 'text-black hover:text-gray-700'
                }`}>
                Tasks
              </a>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('Contracts & Docs');
                }}
                className={`px-2 sm:px-4 py-1 sm:py-2 text-[18px] md:text-[18px] sm:text-[14px] text-black font-medium ${
                  activeTab === 'Contracts & Docs'
                    ? 'border-b-2 border-[#0B763E] text-black font-medium'
                    : 'text-black hover:text-gray-700'
                }`}>
                Contracts & Docs
              </a>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('Invoices & Payments');
                }}
                className={`px-2 sm:px-4 py-1 sm:py-2 text-[18px] md:text-[18px] sm:text-[14px] text-black font-medium ${
                  activeTab === 'Invoices & Payments'
                    ? 'border-b-2 border-[#0B763E] text-black font-medium'
                    : 'text-black hover:text-gray-700'
                }`}>
                Invoices & Payments
              </a>
            </div>
            {activeTab === 'Overview' && (
              <div className='flex flex-col space-y-4'>
                <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
                  <div className='w-full flex flex-col sm:w-1/2 bg-[#F4F4F5] p-4 rounded-lg'>
                    <span className='text-black font-semibold text-[20px]'>
                      Lead Source
                    </span>
                    <div className='w-full flex flex-row justify-between items-center mt-4'>
                      <div className='flex flex-row justify-between items-center w-2/5'>
                        <div className='w-12 h-12 bg-white p-3 rounded-full flex justify-center items-center'>
                          <FaInstagram className='text-[#E4405F] text-[28px]' />{' '}
                          {/* Instagram pink + size */}
                        </div>
                        <span className='text-black text-[20px]'>
                          Instagram
                        </span>
                      </div>
                      <div className='w-10 h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'>
                        <MdModeEditOutline className='text-[18px]' />
                      </div>
                    </div>
                  </div>
                  <div className='w-full flex flex-col sm:w-1/2 bg-[#F4F4F5] p-4 rounded-lg'>
                    <span className='text-black font-semibold text-[20px]'>
                      Assigned Team
                    </span>
                    <div className='w-full flex flex-row justify-between items-center mt-4'>
                      <div className='flex items-center'>
                        <img
                          src='/Team1.png'
                          alt='team1'
                          className='w-12 h-12 rounded-full border-2 border-white -mr-3'
                        />
                        <img
                          src='/team2.png'
                          alt='team2'
                          className='w-12 h-12 rounded-full border-2 border-white -mr-3'
                        />
                        <img
                          src='/team3.png'
                          alt='team3'
                          className='w-12 h-12 rounded-full border-2 border-white'
                        />
                      </div>

                      <div className='w-10 h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'>
                        <MdModeEditOutline className='text-[18px]' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full bg-[#F4F4F5] p-4 rounded-lg flex flex-col gap-2 '>
                  <div className='flex justify-between items-center'>
                    <span className='text-black font-semibold text-[20px]'>
                      Notes
                    </span>
                    <div className='w-10 h-10 flex justify-center items-center rounded-full border border-black text-black cursor-pointer hover:bg-black hover:text-white transition duration-200'>
                      <MdModeEditOutline className='text-[18px]' />
                    </div>
                  </div>

                  <span className='text-black text-[16px]'>
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
              <div className='flex flex-col space-y-4'>
                <div className='w-full bg-white p-4 rounded-lg'>
                  <div className='flex flex-row gap-2'>
                    <div className='w-1/2'>
                      <SearchComponent />
                    </div>
                    <div className='w-1/2 flex justify-between items-center '>
                      <div className='flex flex-row justify-around align-items-center bg-[#F4F4F5] p-2 gap-1.5  rounded cursor-pointer hover:bg-gray-200 transition duration-200'>
                        <CiFilter className='w-5 h-5 text-gray-500' />
                        <span className='text-black'>Filter</span>
                      </div>
                      <div>
                        <AddButton title='Add Event' />
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row flex-wrap gap-4 mt-4'>
                    {eventsData.map((event, index) => (
                      <div
                        key={index}
                        className='bg-[#F4F4F5] p-4 rounded-lg w-full sm:w-[48%] border border-gray-300'>
                        <div className='w-full  flex flex-row justify-between'>
                          {' '}
                          <h4 className='text-md  text-black font-semibold'>
                            {event.title}
                          </h4>
                          <span className='text-black cursor-pointer'>
                            <FaEllipsis size={20} />
                          </span>
                        </div>
                        <div className=' w-2/6 flex items-center rounded-full py-1 mt-2'>
                          <p
                            className={
                              event.status === 'COMPLETED'
                                ? 'text-white bg-[#13CC95] px-2 py-1 rounded-full'
                                : event.status === 'IN PROGRESS'
                                ? 'text-white bg-[#01B0E9] px-2 py-1 rounded-full'
                                : event.status === 'NOT STARTED'
                                ? 'text-white bg-red-500 px-2 py-1 rounded-full'
                                : ''
                            }>
                            {event.status}
                          </p>
                        </div>
                        <div className='flex mt-2'>
                          <div className='w-5/12'>
                            <div className='text-sm text-gray-600'>
                              Location
                            </div>
                            <div className='w-5/6 bg-white flex justify-center py-2 rounded-sm my-1'>
                              <div className='text-black'>{event.location}</div>
                            </div>
                          </div>
                          <div className='w-1/2'>
                            <div className='text-sm text-gray-600'>Date</div>
                            <div className='w-5/5 bg-white flex justify-center py-2 rounded-sm my-1'>
                              <div className='text-black'>{event.date}</div>
                            </div>
                          </div>
                        </div>
                        <div className='w-full flex flex-row'>
                          <div className='w-5/12 mt-2'>
                            <div className='text-sm text-gray-600'>
                              Deliverables
                            </div>
                            <ul className='w-full flex flex-row flex-wrap  pr-2'>
                              {event.deliverables.map((item, idx) => (
                                <li
                                  key={idx}
                                  className='text-black inline-block font-semibold text-[15px]'>
                                  {item +
                                    (idx < event.deliverables.length - 1
                                      ? ', '
                                      : '')}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className='w-1/2 mt-2'>
                            <div className='text-sm text-gray-600'>Team</div>
                            <div className='text-black font-semibold flex items-center flex-wrap gap-2'>
                              {event.team.map((member, idx) => (
                                <span
                                  key={idx}
                                  className='flex items-center text-[15px]'>
                                  <img
                                    src={`/team${idx + 1}.png`}
                                    alt={member}
                                    className='w-10 h-10 rounded-full mr-1 object-cover'
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;
