
/** @format */
'use client';
import React, { useState } from 'react';
import { colors } from "@/utils/colors";
import { SlOptionsVertical } from 'react-icons/sl';
import { FaCircleCheck, FaClock } from 'react-icons/fa6';
import { IoMdRefreshCircle } from 'react-icons/io';
import { useRouter, usePathname } from 'next/navigation';
import Pagination from './Pagination';
import COLORS from '@/utils/Color';
import Image from 'next/image';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { FaFlag } from 'react-icons/fa';
import { HiDotsVertical } from "react-icons/hi";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

const Table = ({
  headers,
  data,
  setDeleteModal,
  color,
  setIsDeleteModalOpen,
  itemsPerPage: initialItemsPerPage = 8,
  sortBy,
  onSort,
  unit = "Items"
}: any) => {
  const router = useRouter();
  const pasthname = usePathname();

  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const availabilityMap: any = {
    Free: { color: 'text-green-500', icon: <FaCircleCheck className="w-4 h-4" /> },
    Busy: { color: colors.primary, icon: <IoMdRefreshCircle className="w-4 h-4" /> },
    'Part-Time': { color: 'text-yellow-500', icon: <FaClock className="w-4 h-4" /> },
  };

  const statusStyles: any = {
    'New Lead': 'bg-[#FFF4E5] text-[#F59E0B]',
    Proposal: 'bg-[#E0F2FE] text-[#0EA5E9]',
    Booked: 'bg-[#DFF6EA] text-[#10B981]',
    Done: 'bg-[#DFF6EA] text-[#10B981]',
    Paid: 'bg-[var(--primary-color)] text-white',
    Active: 'bg-[#FFF4E5] text-[#F59E0B]',
    'On Leave': 'bg-[#E0F2FE] text-[#0EA5E9]',
    Completed: 'bg-[#DFF6EA] text-[#10B981]',
    New: 'bg-[#E0F2FE] text-[#0EA5E9]',
    Pending: 'bg-[#FFC700] text-black',
    pending: 'bg-[#FFC700] text-black',
    'In Progress': 'bg-[#FFF4E5] text-[#F59E0B]',
    Overdue: 'bg-[#FEF2F2] text-[#EF4444]',
    Inactive: 'bg-[#F3F4F6] text-[#9CA3AF]',
    Approved: 'bg-[#DFF6EA] text-[#10B981]',
    Rejected: 'bg-[#FEF2F2] text-[#EF4444]',
    Signed: 'bg-[#FFF4E5] text-[#F59E0B]',
    Draft: 'bg-[#F3F4F6] text-[#9CA3AF]',
    Upcoming: 'bg-[#E0F2FE] text-[#0EA5E9]',
    "Not Started": 'bg-[#F3F4F6] text-[#9CA3AF]',
  };

  const statusIcons: any = {
    Signed: <div className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-black/60" /></div>,
    Draft: <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white/80" /></div>,
    Active: <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />,
    Inactive: <div className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" />,
    'New Lead': <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />,
    Overdue: <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />,
  };

  const priorityStyles: any = {
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
        className={`w-full bg-white ${isProfileOrDashboard ? 'p-0' : 'border border-gray-200 rounded-lg p-6 shadow-sm mb-10'
          }`}
      >
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full border-separate border-spacing-y-0">
            <thead>
              <tr className="bg-[#F3F4F6]">
                {headers?.map((header: any, index: any) => {
                  const isSortable = (header.key === 'dateCreated' || header.key === 'leadCreated') && onSort;
                  const isFirst = index === 0;
                  const isLast = index === headers.length - 1;
                  return (
                    <th
                      key={index}
                      onClick={() => isSortable && onSort(header.key)}
                      className={`
                        py-4 px-4 text-[14px] font-semibold text-gray-800 border-y border-gray-200 whitespace-nowrap
                        ${(header.label === 'Assigned Jobs' || header.key === 'assignedJobs' || header.label === 'Event Count' || header.key === 'eventCount' || header.key === 'jobs' || header.label === 'Jobs' || header.key === 'action' || header.label === 'Action') ? 'text-center' : 'text-left'}
                        ${isFirst ? 'rounded-l-lg border-l' : ''}
                        ${isLast ? 'rounded-r-lg border-r' : ''}
                        ${isSortable ? 'cursor-pointer hover:bg-gray-200 transition-colors' : ''}
                      `}
                    >
                      <div className={`flex items-center gap-2 ${(header.label === 'Assigned Jobs' || header.key === 'assignedJobs' || header.label === 'Event Count' || header.key === 'eventCount' || header.key === 'jobs' || header.label === 'Jobs' || header.key === 'action' || header.label === 'Action') ? 'justify-center' : 'justify-start'}`}>
                        {header.label || header.key || header}
                        {isSortable && sortBy?.value === header.key && (
                          sortBy.direction === 'asc' ? <FiChevronUp className="w-4 h-4 text-gray-400" /> : <FiChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
              {/* Spacer row for padding between header and first cell */}
              <tr className="h-4"><td colSpan={headers?.length}></td></tr>
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
                      if (pasthname === '/clients') router.push(`/clientProfile?id=${row.id}`);
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
                          <td key={cellIndex} className="py-5 px-4 border-b border-gray-200 text-center">
                            <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                              <HiDotsVertical className="w-5 h-5 text-gray-700 font-bold group-hover:text-black cursor-pointer" />
                            </div>
                          </td>
                        );
                      }

                      if (key === 'email' || key === 'Email') {
                        return (
                          <td key={cellIndex} className="py-5 px-4 border-b border-gray-200 lowercase">
                            <a href={`mailto:${row[key]}`} className="text-[14px] font-medium text-gray-800 whitespace-nowrap hover:text-black transition-colors" onClick={(e) => e.stopPropagation()}>
                              {row[key]}
                            </a>
                          </td>
                        );
                      }

                      if (key === 'name' || key === 'Name' || key === 'leadName' || key === 'firstName' || key === 'lastName' || (pasthname === "/payments" && key === "client")) {
                        return (
                          <td key={cellIndex} className="py-5 px-4 border-b border-gray-200">
                            <div className="flex items-center gap-3 justify-start">
                              {(row.avatar || row.Avatar || (pasthname === "/payments" && key === "client")) && (
                                <div className="w-10 h-10 rounded-full bg-[#f0f2f5] overflow-hidden flex-shrink-0 flex items-center justify-center text-[#6B7280] font-bold text-sm border border-gray-100">
                                  {(row.avatar || row.Avatar) ? (
                                    <Image src={row.avatar || row.Avatar} alt={String(row[key] || '').charAt(0).toUpperCase()} width={40} height={40} className="w-full h-full object-cover" />
                                  ) : (
                                    <span>{String(row[key] || '').charAt(0).toUpperCase()}</span>
                                  )}
                                </div>
                              )}
                              <span className={`text-[15px] font-medium text-black truncate max-w-[160px]`}>
                                {row[key]}
                              </span>
                            </div>
                          </td>
                        );
                      }

                      if (key === 'status' || key === 'Status' || key === "paymentStatus" || key === "Payment Status") {
                        const statusVal = row[key];
                        return (
                          <td key={cellIndex} className="py-5 px-4 border-b border-gray-200 text-left">
                            <div className="flex justify-start">
                              <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wide inline-flex items-center justify-center w-fit whitespace-nowrap gap-1.5 ${statusStyles[statusVal] || 'bg-gray-100 text-gray-600'}`}>
                                {statusIcons[statusVal]}
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
                          progressValue === 100 ? colors.accentGreen : colors.primaryHover;

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
                                className={`h-3 -mt-1 relative rounded-full transition-all duration-300 shadow-sm`}
                                style={{ width: `${progressValue}%`, backgroundColor: progressColor }}
                              ></div>
                            </div>
                          </td>
                        );
                      }

                      if (key === 'priority' || key === 'Priority') {
                        const priorityVal = row[key];
                        return (
                          <td
                            key={cellIndex}
                            className="py-5 px-4 border-b border-gray-200 text-left"
                          >
                            <div className="flex justify-start">
                              <span
                                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider w-fit inline-flex items-center gap-1.5 ${priorityStyles[priorityVal] || 'bg-gray-100 text-gray-600'}`}
                              >
                                <FaFlag className="w-3 h-3" />
                                {priorityVal}
                              </span>
                            </div>
                          </td>
                        );
                      }

                      return (
                        <td key={cellIndex} className={`py-5 px-4 border-b border-gray-200 text-[14px] font-medium text-gray-800 whitespace-nowrap ${(header.label === 'Assigned Jobs' || header.key === 'assignedJobs' || header.label === 'Event Count' || header.key === 'eventCount' || header.key === 'jobs' || header.label === 'Jobs') ? 'text-center' : 'text-left'}`}>
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

        {!(pasthname === '/reports' || pasthname === '/clientProfile') && (
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center bg-white py-4 border-t border-gray-100 px-6 gap-4">
            <div className="flex-1 flex justify-center sm:justify-start w-full sm:w-auto">
              <div className="relative flex-shrink-0">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-[#F3F4F6] border-none rounded-lg py-2.5 px-4 pr-10 text-[14px] font-medium text-gray-800 focus:outline-none cursor-pointer w-full"
                >
                  <option value={8}>8 {unit}</option>
                  <option value={15}>15 {unit}</option>
                  <option value={20}>20 {unit}</option>
                  <option value={50}>50 {unit}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <FiChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="flex justify-center w-full sm:w-auto">
              <Pagination 
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>

            <div className="flex-1 hidden sm:flex justify-end"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;


