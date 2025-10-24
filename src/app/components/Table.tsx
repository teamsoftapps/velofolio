/** @format */
'use client';
import React, { useState } from 'react';

import { SlOptionsVertical } from 'react-icons/sl';

import { FaCircleCheck, FaClock } from 'react-icons/fa6';
import { IoMdRefreshCircle } from 'react-icons/io';

import { useRouter, usePathname } from 'next/navigation';
import Pagination from './Pagination';

const Table = ({
  headers,
  data,
  setDeleteModal,
  color,
  setIsDeleteModalOpen,
}: any) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
  const pasthname = usePathname();

  const totalPages = Math.ceil(data.length / itemsPerPage);

  
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const availabilityMap: any = {
    Free: {
      color: 'text-green-500',
      icon: <FaCircleCheck className='w-4 h-4' />,
    },
    Busy: {
      color: '#01B0E9',
      icon: <IoMdRefreshCircle className='w-4 h-4' />,
    },
    'Part-Time': {
      color: 'text-yellow-500',
      icon: <FaClock className='w-4 h-4' />,
    },

  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const statusColors: any = {
    'New Lead': 'bg-[#FEBE2A]',
    Proposal: 'bg-[#01B0E9]',
    Booked: 'bg-[#14CB95]',
    Done: 'bg-green-500',
    Active: 'bg-[#FEBE2A]',
    'On Leave': 'bg-[#01B0E9]',
    Completed: 'bg-[#14CB95]',
    New: 'bg-[#01B0E9]',
    'In Progress': 'bg-[#FEBE2A]',
  };
  const priorityColors:any = {
  'High': 'bg-red-300',
  'Medium': 'bg-orange-200',
  'Low': 'bg-green-200',
};

  return (
  <div
  className={`w-full mt-4 rounded-2xl  md:p-3 ${
    pasthname === '/teamProfile '||"/" ? '' : 'border-2'
  }
  ${pasthname==="/" ? "":"lg:p-7"}
  
  `}
>
         <div className="overflow-x-auto">
     <table className='text-wrap w-full bg-white table-auto border-collapse '>

        <thead className='bg-gray-200 text-black border-0 border-[#D4D4D8] rounded-lg w-full '>
          <tr>
            {headers.map((header: any, index: any) => (
              <th
                key={index}
                className='px-6 py-2 text-center text-sm sm:text-lg font-medium'>
                {header.label || header.key || header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row: any, rowIndex: any) => (
            <tr
              onClick={() => {
                if (pasthname === '/clients') {
                  router.push(`/clientProfile`);
                }
                if (pasthname === '/team') {
                  router.push(`/teamProfile`);
                }
              }}
              key={rowIndex}
              className='text-black hover:bg-[#daf2fa] transition-colors duration-200'>
              {headers.map((header: any, cellIndex: any) => {
                const key = header.key || header; 
                if (key === 'action') {
                  return (
                    <td
                      key={cellIndex}
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                      }}
                      className='py-5 text-center border-b-1 border-[#D4D4D8]'>
                      <SlOptionsVertical className='w-6 h-6 mx-auto cursor-pointer' />
                    </td>
                  );
                }

                if (key === 'status' || key === 'Status') {
                  return (
                    <td
                      key={cellIndex}
                      className='py-2 text-center border-b-1 border-[#D4D4D8]'>
                      <span
                        className={`p-1 px-1.5 rounded-2xl text-black ${
                          statusColors[row[key]] || 'bg-gray-200'
                        }`}>
                        {row[key]}
                      </span>
                    </td>
                  );
                }
                     if (key === 'priority' || key === 'Priority') {
                  return (
                    <td
                      key={cellIndex}
                      className='py-2 text-center border-b-1 border-[#D4D4D8]'>
                      <span
                        className={`p-1 px-3 rounded-2xl text-black ${
                          priorityColors[row[key]] || 'bg-gray-200'
                        }`}>
                        {row[key]}
                      </span>
                    </td>
                  );
                }
                if (key === 'Email') {
                  return (
                    <td
                      key={cellIndex}
                      className='py-5 text-center border-b-1  text-[#1796c0] border-[#D4D4D8]'>
                      <span className='p-1 px-2 rounded-2xl '>{row[key]}</span>
                    </td>
                  );
                }
                if (key === 'Availability' || key === 'availability') {
                  const avail = availabilityMap[row[key]] || {
                    color: 'text-gray-500',
                    icon: null,
                  };

                  return (
                    <td
                      key={cellIndex}
                      className='py-5 text-center border-b border-[#D4D4D8]'>
                      <span
                        className={`p-1 px-2 rounded-2xl flex items-center gap-2 ${avail.color}`}>
                        {avail.icon}
                        {row[key]}
                      </span>
                    </td>
                  );
                }

                if (key === 'Action' || key === 'action') {
                  return (
                    <td
                      className='py-5 text-center border-b-1 border-[#D4D4D8]'
                      key={cellIndex}>
                      <SlOptionsVertical className='w-6 h-6 mx-auto cursor-pointer' />
                    </td>
                  );
                }
                if (key === 'progress') {
                  const progressValue = Math.min(
                    100,
                    Math.max(0, Number(String(row[key]).replace('%', '')) || 0)
                  );
                  const progressColor =
                    progressValue === 100 ? 'bg-[#14CB95]' : 'bg-[#00A4DD]';

                  return (
                    <td
                      key={cellIndex}
                      className='py-5 text-center border-b border-[#D4D4D8]'>
                      <div className='w-full bg-gray-200 rounded-full h-3 relative p-2 pb-3 border-1'>
                        <p className='text-sm absolute inset-0 flex items-center justify-center z-20'>
                          {progressValue}%
                        </p>
                        <div
                          className={`h-3 -mt-1  relative rounded-full ${progressColor} transition-all duration-300`}
                          style={{ width: `${progressValue}%` }}></div>
                      </div>
                    </td>
                  );
                }
                return (
                  <td
                    key={cellIndex}
                    className='py-5 pl-5 text-center border-b-1 border-[#D4D4D8]'>
                    {row[key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <Pagination
        totalPages={totalPages}
        onPageChange={handlePageChange}
        initialPage={currentPage}
        color={color}
      />
    </div>
  );
};

export default Table;
