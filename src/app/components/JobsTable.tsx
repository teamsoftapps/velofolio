"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

const JobsTable = ({
  headers,
  data,
  unit = "Jobs",
  initialItemsPerPage = 8,
}: any) => {
  const router = useRouter();
  const pathname = usePathname();

  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const statusStyles: any = {
    "In Progress": "bg-[#E0F7FF] text-[#00B4FF]",
    "Review": "bg-[#FFF9EB] text-[#F3A530]",
    "Completed": "bg-[#E6F9F0] text-[#14CC95]",
    "Pending": "bg-[#F1F3F9] text-[#7E8494]",
    "On Hold": "bg-[#FFF9EB] text-[#F3A530]",
    "Cancelled": "bg-[#FFF0F0] text-[#FF4D4D]",
    "Upcoming": "bg-[#F1F3F9] text-[#7E8494]",
  };

  const getProgressColor = (value: number, status: string) => {
    if (status === "Completed" || value === 100) return "bg-[#10B981]";
    if (status === "Cancelled") return "bg-[#EF4444]";
    if (status === "On Hold") return "bg-[#FFB800]";
    if (status === "Review") return "bg-[#F59E0B]";
    if (status === "In Progress") return "bg-[#0EA5E9]";
    if (status === "Pending") return "bg-[#8E95A2]";
    return "bg-[#0EA5E9]";
  };

  // Mock avatars for assigned team
  const memberAvatars: any = {
    "John": "https://i.pravatar.cc/150?u=9",
    "Anna": "https://i.pravatar.cc/150?u=12",
    "Lisa": "https://i.pravatar.cc/150?u=6",
    "Chris": "https://i.pravatar.cc/150?u=15",
    "Maria": "https://i.pravatar.cc/150?u=2",
    "Steve": "https://i.pravatar.cc/150?u=11",
    "Sarah": "https://i.pravatar.cc/150?u=5",
  };

  return (
    <div className="w-full mt-4 bg-white border border-gray-200 rounded-lg p-6 mb-10">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full border-separate border-spacing-y-0">
          <thead>
            <tr className="bg-[#F8F9FB]">
              {headers.map((header: any, index: number) => {
                const isFirst = index === 0;
                const isLast = index === headers.length - 1;
                return (
                  <th
                    key={index}
                    className={`py-4 px-4 text-sm font-semibold text-gray-700 border-y border-gray-100 whitespace-nowrap text-left
                      ${isFirst ? "rounded-l-xl border-l" : ""}
                      ${isLast ? "rounded-r-xl border-r" : ""}`}
                  >
                    {header.label}
                  </th>
                );
              })}
            </tr>
            <tr className="h-6">
              <td colSpan={headers.length}></td>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="py-20 text-center text-gray-2000 italic font-medium"
                >
                  No jobs found matching your filters.
                </td>
              </tr>
            ) : (
              paginatedData.map((row: any, rowIndex: number) => (
                <tr
                  key={rowIndex}
                  onClick={() => router.push(`/jobProfile?id=${row.id}`)}
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer group border-b border-black"
                >
                  {headers.map((header: any, cellIndex: number) => {
                    const key = header.key;

                    if (key === "name") {
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200">
                          <span className="text-sm font-semibold text-gray-900 truncate max-w-[150px] block">
                            {row.name}
                          </span>
                        </td>
                      );
                    }

                    if (key === "assignedTeam") {
                      const members = (row.assignedTeam || "").split(",").map((s: string) => s.trim());
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200">
                          <div className="flex items-center -space-x-2">
                            {members.map((m: string, i: number) => (
                              <div key={i} className="group/avatar relative transition-all hover:scale-110 hover:z-40 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden relative">
                                  <Image
                                    src={memberAvatars[m] || `https://ui-avatars.com/api/?name=${m}&background=random&color=fff`}
                                    alt={m}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 invisible group-hover/avatar:opacity-100 group-hover/avatar:visible transition-all duration-200 z-50 pointer-events-none">
                                  <div className="bg-black text-white text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap font-semibold shadow-xl relative">
                                    {m}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] border-t-black"></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-gray-100  flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors ml-1 border-dashed border-gray-300" onClick={(e) => e.stopPropagation()}>
                              <span className="text-sm font-bold">+</span>
                            </div>
                          </div>
                        </td>
                      );
                    }

                    if (key === "progress") {
                      const progressValue = parseInt(row.progress) || 0;
                      const barColor = getProgressColor(progressValue, row.status);
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200 min-w-[180px]">
                          <div className="flex items-center gap-3 w-full">
                            <div className="flex-1 bg-[#F1F3F9] rounded-full h-2.5 relative overflow-hidden">
                              <div
                                className={`absolute left-0 top-0 h-full rounded-full ${barColor} transition-all duration-500`}
                                style={{ width: `${progressValue}%` }}
                              />
                            </div>
                            <span className="text-[12px] font-bold text-gray-700 w-10">
                              {progressValue}%
                            </span>
                          </div>
                        </td>
                      );
                    }

                    if (key === "status") {
                      const statusVal = row.status;
                      const isCompleted = statusVal === "Completed";
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wider inline-flex items-center gap-1.5 ${statusStyles[statusVal] || "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {isCompleted && <FaCheckCircle className="w-3.5 h-3.5" />}
                            {statusVal.toUpperCase()}
                          </span>
                        </td>
                      );
                    }

                    if (key === "action") {
                      return (
                        <td key={cellIndex} className="py-5 px-6 border-b border-gray-200 text-center">
                          <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                            <HiDotsVertical className="w-5 h-5 text-gray-700 font-bold group-hover:text-black transition-colors cursor-pointer" />
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={cellIndex}
                        className="py-5 px-4 border-b border-gray-200 text-sm font-medium text-black whitespace-nowrap"
                      >
                        {row[key]}
                        {key === "eventDate" && (
                          <p className="text-[12px] text-gray-400 font-medium mt-1">(2:20 PM to 4:00 PM)</p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-white py-4 border-t border-gray-100 px-6 gap-4">
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 hover:text-black"
                }`}
            >
              <HiArrowLongLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex items-center gap-1 mx-2">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
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
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${currentPage === pageNum
                        ? "bg-black text-white shadow-md shadow-gray-200"
                        : "text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (
                  (pageNum === 2 && currentPage > 4) ||
                  (pageNum === totalPages - 1 && currentPage < totalPages - 3)
                ) {
                  return (
                    <span key={pageNum} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 hover:text-black"
                }`}
            >
              Next
              <HiArrowLongRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 hidden sm:flex justify-end"></div>
      </div>
    </div>
  );
};

export default JobsTable;
