
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
    Busy: { color: 'text-[#01B0E9]', icon: <IoMdRefreshCircle className="w-4 h-4" /> },
    'Part-Time': { color: 'text-yellow-500', icon: <FaClock className="w-4 h-4" /> },
  };

  const statusStyles: any = {
    'New Lead': 'bg-[#FFF9E5] text-[#D97706]',
    Proposal: 'bg-[#E0F2FE] text-[#0284C7]',
    Booked: 'bg-[#DCFCE7] text-[#15803D]',
    Done: 'bg-[#DCFCE7] text-[#15803D]',
    Paid: 'bg-[#E0F2FE] text-[#0284C7]',
    Active: 'bg-[#FFF9E5] text-[#D97706]',
    'On Leave': 'bg-[#E0F2FE] text-[#0284C7]',
    Completed: 'bg-[#DCFCE7] text-[#15803D]',
    New: 'bg-[#E0F2FE] text-[#0284C7]',
    Pending: 'bg-[#F3F4F6] text-[#6B7280]',
    pending: 'bg-[#F3F4F6] text-[#6B7280]',
    'In Progress': 'bg-[#FFF9E5] text-[#D97706]',
    Overdue: 'bg-[#FEE2E2] text-[#EF4444]',
    Inactive: 'bg-[#F3F4F6] text-[#6B7280]',
    Approved: 'bg-[#DCFCE7] text-[#15803D]',
    Rejected: 'bg-[#FEE2E2] text-[#EF4444]',
    Signed: 'bg-[#FFF9E5] text-[#D97706]',
    Draft: 'bg-[#F3F4F6] text-[#6B7280]',
    Upcoming: 'bg-[#E0F2FE] text-[#0284C7]',
    "Not Started": 'bg-[#F3F4F6] text-[#6B7280]',
  };

  const statusIcons: any = {
    Signed: <div className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center mr-2"><div className="w-1.5 h-1.5 rounded-full bg-black/60" /></div>,
    Draft: <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center mr-2"><div className="w-1.5 h-1.5 rounded-full bg-white/80" /></div>,
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
        className={`w-full mt-4 bg-white ${isProfileOrDashboard ? 'p-0' : 'border border-gray-200 rounded-[24px] p-6 shadow-sm mb-10'
          }`}
      >
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full border-separate border-spacing-y-0">
            <thead>
              <tr className="bg-[#F8F9FB]">
                {headers?.map((header: any, index: any) => {
                  const isSortable = (header.key === 'dateCreated' || header.key === 'leadCreated') && onSort;
                  const isFirst = index === 0;
                  const isLast = index === headers.length - 1;
                  return (
                    <th
                      key={index}
                      onClick={() => isSortable && onSort(header.key)}
                      className={`
                        py-4 px-4 text-sm font-semibold text-gray-700 border-y border-gray-100 whitespace-nowrap
                        ${(header.label === 'Assigned Jobs' || header.key === 'assignedJobs' || header.label === 'Event Count' || header.key === 'eventCount') ? 'text-center' : 'text-left'}
                        ${isFirst ? 'rounded-l-xl border-l' : ''}
                        ${isLast ? 'rounded-r-xl border-r' : ''}
                        ${isSortable ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}
                      `}
                    >
                      <div className={`flex items-center gap-2 ${(header.label === 'Assigned Jobs' || header.key === 'assignedJobs' || header.label === 'Event Count' || header.key === 'eventCount') ? 'justify-center' : 'justify-start'}`}>
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
                          <td key={cellIndex} className="py-5 px-4 border-b border-gray-50 text-center">
                            <div className="flex justify-center">
                              <HiDotsVertical className="w-5 h-5 text-gray-700 font-bold group-hover:text-black" />
                            </div>
                          </td>
                        );
                      }

                      if (key === 'Name' || key === 'leadName' || key === 'firstName' || key === 'lastName' || key === 'email' || (pasthname === "/payments" && key === "client")) {
                        return (
                          <td key={cellIndex} className="py-5 px-4 border-b border-gray-50">
                            <div className="flex items-center gap-3 justify-start">
                              {(row.avatar || row.Avatar) && (
                                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                                  <Image src={row.avatar || row.Avatar} alt="v" width={40} height={40} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <span className="text-sm font-medium text-gray-700 truncate max-w-[160px]">
                                {row[key]}
                              </span>
                            </div>
                          </td>
                        );
                      }

                      if (key === 'status' || key === 'Status' || key === "paymentStatus" || key === "Payment Status") {
                        const statusVal = row[key];
                        return (
                          <td key={cellIndex} className="py-5 px-4 border-b border-gray-50 text-left">
                            <div className="flex justify-start">
                              <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center w-fit whitespace-nowrap ${statusStyles[statusVal] || 'bg-gray-100 text-gray-600'}`}>
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

                      if (key === 'priority' || key === 'Priority') {
                        const priorityVal = row[key];
                        return (
                          <td
                            key={cellIndex}
                            className="py-5 px-4 border-b border-gray-50 text-left"
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
                        <td key={cellIndex} className={`py-5 px-4 border-b border-gray-50 text-sm font-medium text-gray-700 whitespace-nowrap ${(header.label === 'Assigned Jobs' || header.key === 'assignedJobs' || header.label === 'Event Count' || header.key === 'eventCount') ? 'text-center' : 'text-left'}`}>
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
          <div className="relative mt-4 flex justify-center items-center bg-white py-4 border-t border-gray-100 px-4">
            <div className="absolute left-6 mb-4 sm:mb-0">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none bg-gray-50 border border-gray-100 rounded-lg py-2.5 px-6 pr-10 text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value={8}>8 {unit}</option>
                <option value={15}>15 {unit}</option>
                <option value={20}>20 {unit}</option>
                <option value={50}>50 {unit}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <FiChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-black'}`}
              >
                <HiArrowLongLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex items-center gap-1 mx-2">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Simple pagination logic for brevity: show first 3, last 2, and current around dots
                  if (
                    totalPages <= 7 ||
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${currentPage === pageNum ? 'bg-black text-white shadow-md shadow-gray-200' : 'text-gray-500 hover:bg-gray-50'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  if (
                    (pageNum === 2 && currentPage > 4) ||
                    (pageNum === totalPages - 1 && currentPage < totalPages - 3)
                  ) {
                    return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-black'}`}
              >
                Next
                <HiArrowLongRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
