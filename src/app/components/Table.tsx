/** @format */
'use client';
import React, { useState } from 'react';

import { SlOptionsVertical } from 'react-icons/sl';

import { FaCircleCheck, FaCircleXmark, FaClock } from 'react-icons/fa6';
import { IoMdRefreshCircle } from 'react-icons/io';

import Pagination from './Pagination';

const Table = ({ headers, data }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // adjust as needed

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice data based on current page
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

    // add more statuses as needed
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
  };

  return (
    <div className='table  border-2 w-full  mt-4 rounded-2xl p-7 overflow-y-hidden'>
      <table className='w-full bg-white'>
        <thead className='bg-gray-200 text-black border-1 border-[#D4D4D8] rounded-lg w-full'>
          <tr>
            {headers.map((header: any, index: any) => (
              <th
                key={index}
                className='px-6 py-2 text-center'>
                {header.label || header.key || header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row: any, rowIndex: any) => (
            <tr
              key={rowIndex}
              className='text-black hover:bg-[#daf2fa] transition-colors duration-200'>
              {headers.map((header: any, cellIndex: any) => {
                const key = header.key || header; // use key from header object or string
                if (key === 'action') {
                  return (
                    <td
                      key={cellIndex}
                      className='py-5 text-center border-b-1 border-[#D4D4D8]'>
                      <SlOptionsVertical className='w-6 h-6 mx-auto cursor-pointer' />
                    </td>
                  );
                }

                if (key === 'status' || key === 'Status') {
                  return (
                    <td
                      key={cellIndex}
                      className='py-5 text-center border-b-1 border-[#D4D4D8]'>
                      <span
                        className={`p-1 px-2 rounded-2xl text-black ${
                          statusColors[row[key]] || 'bg-gray-200'
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

      <Pagination
        totalPages={totalPages}
        onPageChange={handlePageChange}
        initialPage={currentPage}
      />
    </div>
  );
};

export default Table;
