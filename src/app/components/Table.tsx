
/** @format */
'use client';
import React, { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import { FaCircleCheck, FaClock } from 'react-icons/fa6';
import { IoMdRefreshCircle } from 'react-icons/io';
import { useRouter, usePathname } from 'next/navigation';
import Pagination from './Pagination';
import COLORS from '@/utils/Color';
import Image from 'next/image';

const Table = ({
  headers,
  data,
  setDeleteModal,
  color,
  setIsDeleteModalOpen,
  itemsPerPage=8,
}: any) => {
  const router = useRouter();
  // const itemsPerPage = 8;
  const pasthname = usePathname();
  
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const availabilityMap: any = {
    Free: { color: 'text-green-500', icon: <FaCircleCheck className="w-4 h-4" /> },
    Busy: { color: 'text-[#01B0E9]', icon: <IoMdRefreshCircle className="w-4 h-4" /> },
    'Part-Time': { color: 'text-yellow-500', icon: <FaClock className="w-4 h-4" /> },
  };

  const statusColors: any = {
    'New Lead': 'bg-[#FEBE2A]',
    Proposal: 'bg-[#01B0E9]',
    Booked: 'bg-[#14CB95]',
    Done: 'bg-green-500',
    Paid: 'bg-[#01B0E9]',
    Active: 'bg-[#FEBE2A]',
    'On Leave': 'bg-[#01B0E9]',
    Completed: 'bg-[#14CB95]',
    New: 'bg-[#01B0E9]',
    Pending:pasthname=="/payments"? "bg-[#FEBE2A] ":"bg-gray-100",
    'In Progress': 'bg-[#FEBE2A]',
    Overdue:"bg-[#14CB95]",
    Inactive:"bg-gray-200",
    Approved:'bg-green-500',
    Rejected:'bg-red-500',
     Signed: 'bg-[#FEBE2A] text-black',
     Draft : 'bg-[#13CC95]',
     Upcoming:"bg-[#01B0E9]"

  };

  const priorityColors: any = {
    High: 'bg-[#F7631C] text-white',
    Medium: 'bg-[#01B0E9] text-white',
    Low: 'bg-[#FEBE2A] text-white',
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
 <div
  className={`w-full mt-4 md:p-3 
    ${
      pasthname === '/teamProfile' || pasthname === '/dashboard' || pasthname === '/clientProfile'|| pasthname === '/reports'
        ? 'lg:p-0'
        : 'lg:p-7 border-1 border-gray-300 rounded-2xl'
    }
    ${pasthname === '/dashboard' ? 'h-[230px] overflow-auto' : ''}
  `}
>

        <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
          <table className="min-w-[450px] sm:min-w-[850px] md:min-w-[1000px] lg:min-w-full bg-white table-auto border-collapse text-wrap">
            <thead className="bg-gray-200 text-black border-0 rounded-lg w-full">
              <tr>
                {headers?.map((header: any, index: any) => (
                  <th
                    key={index}
                    className={`px-2 ${pasthname === '/teamProfile' ? "lg:px-5  w-full" :"md:px-6"} sm:px-4  py-1 sm:py-2 md:py-3 text-center text-xs sm:text-sm md:text-base font-semibold`}
                  >
                    {header.label || header.key || header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((row: any, rowIndex: any) => (
                <tr
                  key={rowIndex}
                  onClick={() => {
                    if (pasthname === '/clients') router.push(`/clientProfile`);
                     if (pasthname === '/jobs') router.push(`/jobProfile?id=${rowIndex+1}`);
                    if (pasthname === '/team') router.push(`/teamProfile`);
                    if (pasthname === '/payments') router.push(`/invoice?id=${rowIndex+1}`);
                  }}
                  className="text-black hover:bg-[#daf2fa] text-xs sm:text-sm md:text-base transition-colors duration-200 cursor-pointer"
                >
                  {headers?.map((header: any, cellIndex: any) => {
                    const key = header.key || header;

                    // Action column
                    if (key === 'action' || key === 'Action') {
                      return (
                        <td
                          key={cellIndex}
                          onClick={(e) => {
    e.stopPropagation(); // Prevent row click
    // setIsDeleteModalOpen(true);
    setDeleteModal(true); // Open your modal
  }}
                          className="py-2 sm:py-3 md:py-4 text-center border-b border-[#D4D4D8] "
                        >
                          <SlOptionsVertical className="w-5 h-5 sm:w-6 sm:h-6 mx-auto cursor-pointer" />
                        </td>
                      );
                    }
                 
                       if (key === 'task' || key === 'Task') {
                      return (
                        <td
                          key={cellIndex}
                          onClick={() => setIsDeleteModalOpen(true)}
                          className="py-2 sm:py-3 md:py-4 text-center border-b border-[#D4D4D8]  sm:min-w-[120px]"
                        >
                          {row[key]}
                        </td>
                      );
                    }
if (pasthname === "/payments") {
  if (key === "client") {
    return (
      <td
        key={cellIndex}
        className="py-2 sm:py-3 md:py-4 text-center border-b border-[#D4D4D8] min-w-[120px] sm:min-w-[120px] md:min-w-[140px] lg:w-[160px]"
      >
        <div className="flex items-center justify-center gap-2">
          <Image
            src={row.avatar || "./images/teampic1.png"}
            alt={row.client || "client"}
            width={32}
            height={32}
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-800 truncate max-w-[100px]">
            {row.client}
          </span>
        </div>
      </td>
    );
  }
if (key === "paymentMethod") {
  return (
    <td
      key={cellIndex}
      className="py-2 sm:py-3 md:py-4 text-center border-b border-[#D4D4D8] min-w-[120px] sm:min-w-[120px] md:min-w-[140px] lg:w-[190px]"
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-medium text-gray-800 truncate max-w-[100px]">
          {row[key]}
        </span>
        <SlOptionsVertical className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-gray-600 hover:text-gray-800" />
      </div>
    </td>
  );
}

}

                    // Status column
       if (key === 'status' || key === 'Status' || key==="paymentStatus" || key==="Payment Status") {
          
  const textColor =
    row[key] === 'New Lead' || row[key] === 'Pending' || row[key] === 'Inactive' || row[key] === 'Signed' ? 'text-black' : 'text-white';

  return (
    <td
      key={cellIndex}
      className="py-2 sm:py-3 md:py-2 text-center border-b border-[#D4D4D8] min-w-[80px] sm:min-w-[80px] md:min-w-[100px] lg:w-[140px]"
    >
      <span
        className={`p-1 px-2 sm:px-2 max-w-[120px] lg:p-0.5 inline-block rounded-2xl w-full ${textColor} ${
          statusColors[row[key]] || 'bg-gray-900'
        }`}
      >
        {row[key]}
      </span>
    </td>
  );
}



                    // Priority column
                    if (key === 'priority' || key === 'Priority') {
                      return (
                        <td
                          key={cellIndex}
                          className="py-2 sm:py-3 md:py-4 text-center border-b border-[#D4D4D8]"
                        >
                          <span
                            className={`p-1 px-2 sm:px-3 rounded-2xl text-black ${
                              priorityColors[row[key]] || 'bg-gray-200'
                            }`}
                          >
                            {row[key]}
                          </span>
                        </td>
                      );
                    }

                    // Email column
                    if (key === 'Email') {
                      return (
                        <td
                          key={cellIndex}
                          className="py-2 sm:py-3 md:py-4 text-center border-b border-[#D4D4D8] text-[#1796c0]"
                        >
                          <span className="p-1 px-2 sm:px-3 rounded-2xl">
                            {row[key]}
                          </span>
                        </td>
                      );
                    }

                    // Availability column
                    if (key === 'Availability' || key === 'availability') {
                      const avail = availabilityMap[row[key]] || { color: 'text-gray-500', icon: null };
                      return (
                        <td
                          key={cellIndex}
                          className="py-2 sm:py-3 md:py-4 text-center border-b border-[#D4D4D8]"
                        >
                          <span
                            className={`p-1  px-2 sm:px-3 rounded-2xl flex items-center justify-center gap-1 sm:gap-2 md:gap-3 ${avail.color}`}
                          >
                            {avail.icon}
                            {row[key]}
                          </span>
                        </td>
                      );
                    }

                    // Progress column
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
                          className="py-2 sm:py-3 md:py-4 text-center border-b border-[#D4D4D8]"
                        >
                          <div className="w-full bg-gray-200 rounded-full h-3 relative p-2 pb-3 border-1">
                            <p className="text-[10px] sm:text-xs md:text-sm absolute inset-0 flex items-center justify-center z-20">
                              {progressValue}%
                            </p>
                            <div
                              className={`h-3 -mt-1 relative rounded-full ${progressColor} transition-all duration-300`}
                              style={{ width: `${progressValue}%` }}
                            ></div>
                          </div>
                        </td>
                      );
                    }

                    // Default column
                    return (
                      <td
                        key={cellIndex}
                        className="py-2 sm:py-3 md:py-4 px-2 sm:px-4 md:px-6 sm:min-w-[110px] text-center border-b border-[#D4D4D8]"
                      >
                        {row[key]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     {!(pasthname === '/reports' || pasthname === '/clientProfile') && (
  <Pagination
    totalPages={totalPages}
    onPageChange={handlePageChange}
    initialPage={currentPage}
    color={color}
    hoverColor={pasthname === '/dashboard' ? COLORS.BlueButtonhover : COLORS.greenHover}
    disabledColor={pasthname === '/dashboard' ? COLORS.BlueDisabled : COLORS.GreenDisabled}
  />
)}

    </>
  );
};

export default Table;
