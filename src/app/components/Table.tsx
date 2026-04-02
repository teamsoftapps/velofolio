
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
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

const Table = ({
  headers,
  data,
  setDeleteModal,
  color,
  setIsDeleteModalOpen,
  itemsPerPage = 8,
  sortBy,
  onSort,
}: any) => {
  const router = useRouter();
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
    Pending: pasthname == "/payments" ? "bg-[#FEBE2A] " : "bg-[#71717A]",
    pending: pasthname == "/payments" ? "bg-[#FEBE2A] " : "bg-[#71717A]",
    'In Progress': 'bg-[#FEBE2A]',
    Overdue: "bg-[#14CB95]",
    Inactive: "bg-gray-200",
    Approved: 'bg-green-500',
    Rejected: 'bg-red-500',
    Signed: 'bg-[#FFB800]',
    Draft: 'bg-[#10B981]',
    Upcoming: "bg-[#01B0E9]",
    "Not Started": "bg-[#71717A]",
  };

  const statusIcons: any = {
    Signed: <div className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center mr-2"><div className="w-1.5 h-1.5 rounded-full bg-black/60" /></div>,
    Draft: <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center mr-2"><div className="w-1.5 h-1.5 rounded-full bg-white/80" /></div>,
  };

  const priorityColors: any = {
    High: 'bg-[#EF4444] text-white',
    Medium: 'bg-[#FBBF24] text-white',
    Low: 'bg-[#22C55E] text-white',
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const isProfileOrDashboard = pasthname === '/teamProfile' || pasthname === '/dashboard' || pasthname === '/clientProfile' || pasthname === '/reports' || pasthname.includes('/jobProfile');

  return (
    <>
      <div
        className={`w-full mt-4 bg-white ${isProfileOrDashboard ? 'p-0' : 'border border-gray-200 rounded-[24px] p-6 shadow-sm mb-10'
          }`}
      >
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full border-separate border-spacing-y-0">
            <thead>
              <tr className="bg-[#F4F5F7]">
                {headers?.map((header: any, index: any) => {
                  const isSortable = header.key === 'dateCreated' && onSort;
                  const isFirst = index === 0;
                  const isLast = index === headers.length - 1;
                  return (
                    <th
                      key={index}
                      onClick={() => isSortable && onSort(header.key)}
                      className={`
                        py-4 px-4 text-base font-medium text-black border-y border-gray-200 whitespace-nowrap
                        ${(header.label === 'Assigned Jobs' || header.key === 'assignedJobs' || header.label === 'Event Count' || header.key === 'eventCount') ? 'text-center' : 'text-left'}
                        ${isFirst ? 'rounded-l-lg border-l' : ''}
                        ${isLast ? 'rounded-r-lg border-r' : ''}
                        ${isSortable ? 'cursor-pointer hover:bg-gray-200 transition-colors' : ''}
                      `}
                    >
                      <div className={`flex items-center gap-1 ${(header.label === 'Assigned Jobs' || header.key === 'assignedJobs' || header.label === 'Event Count' || header.key === 'eventCount') ? 'justify-center' : 'justify-start'}`}>
                        {header.label || header.key || header}
                        {isSortable && sortBy?.value === header.key && (
                          sortBy.direction === 'asc' ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
              {/* Spacer row for padding between header and first cell */}
              <tr className="h-6"><td colSpan={headers?.length}></td></tr>
            </thead>

            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={headers?.length || 1} className="py-20 text-center text-gray-500 italic">
                    No records found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row: any, rowIndex: any) => (
                  <tr
                    key={rowIndex}
                    onClick={() => {
                      if (pasthname === '/clients') router.push(`/clientProfile`);
                      if (pasthname === '/jobs') router.push(`/jobProfile?id=${rowIndex + 1}`);
                      if (pasthname === '/team') router.push(`/teamProfile`);
                      if (pasthname === '/payments') router.push(`/viewInvoice?InvoiceId=${row.invoiceNumber}`);
                    }}
                    className="hover:bg-[#F9FAFB] transition-colors cursor-pointer group"
                  >
                    {headers?.map((header: any, cellIndex: any) => {
                      const key = header.key || header;

                      if (key === 'action' || key === 'Action') {
                        return (
                          <td key={cellIndex} className="py-4 text-center border-b border-gray-200 px-4">
                            <div className="flex justify-center">
                              <SlOptionsVertical className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                            </div>
                          </td>
                        );
                      }

                      if (key === 'Name' || (pasthname === "/payments" && key === "client")) {
                        return (
                          <td key={cellIndex} className="py-4 px-4 border-b border-gray-200">
                            <div className="flex items-center gap-3 justify-start">
                              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                {row.avatar ? (
                                  <Image src={row.avatar} alt="v" width={40} height={40} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">
                                    {(row.client || row.Name || "U")[0]}
                                  </div>
                                )}
                              </div>
                              <span className="text-sm font-medium text-black truncate max-w-[140px]">
                                {row.client || row.Name}
                              </span>
                            </div>
                          </td>
                        );
                      }

                      if (key === 'status' || key === 'Status' || key === "paymentStatus" || key === "Payment Status") {
                        const statusVal = row[key];
                        const needsBlackText = [
                          'New Lead', 'Inactive', 'InActive', 'Signed',
                          'Active', 'In Progress', 'Draft'
                        ].includes(statusVal);

                        const textColor = needsBlackText ? 'text-black' : 'text-white';
                        const icon = statusIcons[statusVal];

                        return (
                          <td key={cellIndex} className="py-4 text-left border-b border-gray-200 px-4">
                            <div className="flex justify-start">
                              <span className={`px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wide inline-flex items-center justify-center w-fit whitespace-nowrap ${textColor} ${statusColors[statusVal] || 'bg-gray-100'}`}>
                                {icon && icon}
                                {statusVal}
                              </span>
                            </div>
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
                            className="py-4 px-4 text-center border-b border-gray-100 min-w-[120px]"
                          >
                            <div className="w-full bg-gray-200 rounded-full h-3 relative p-2 pb-3 border-1">
                              <p className="text-[10px] sm:text-xs md:text-sm absolute inset-0 flex items-center justify-center z-20 font-bold">
                                {progressValue}%
                              </p>
                              <div
                                className={`h-3 -mt-1 relative rounded-full ${progressColor} transition-all duration-300 shadow-sm`}
                                style={{ width: `${progressValue}%` }}
                              ></div>
                            </div>
                          </td>
                        );
                      }

                      // Priority column
                      if (key === 'priority' || key === 'Priority') {
                        const priorityVal = row[key];
                        return (
                          <td
                            key={cellIndex}
                            className="py-4 text-left border-b border-gray-200 px-4"
                          >
                            <div className="flex justify-start">
                              <span
                                className={`px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wide w-fit text-center ${priorityColors[priorityVal] || 'bg-gray-200 text-gray-700'}`}
                              >
                                {priorityVal}
                              </span>
                            </div>
                          </td>
                        );
                      }

                      return (
                        <td key={cellIndex} className={`py-4 px-4 border-b border-gray-200 text-base font-medium text-black whitespace-nowrap ${(header.label === 'Assigned Jobs' || header.key === 'assignedJobs' || header.label === 'Event Count' || header.key === 'eventCount') ? 'text-center' : 'text-left'}`}>
                          {row[key]}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
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
