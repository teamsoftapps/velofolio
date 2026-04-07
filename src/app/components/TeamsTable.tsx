"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { RiLoopRightLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const TeamsTable = ({
  headers,
  data,
  unit = "Team Members",
  initialItemsPerPage = 8,
}: any) => {
  const router = useRouter();
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
    "Active": "bg-[#FFC043] text-black",
    "On Leave": "bg-[#00B1EF] text-white",
    "Inactive": "bg-[#8E8E8E] text-white",
  };

  return (
    <div className="w-full mt-4 bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm mb-10">
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
                    className={`py-4 px-4 text-[13px] font-semibold text-black border-y border-gray-100 whitespace-nowrap text-left
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
                  className="py-20 text-center text-gray-500 italic font-medium"
                >
                  No team members found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row: any, rowIndex: number) => (
                <tr
                  key={rowIndex}
                  onClick={() => router.push(`/teamProfile?id=${row.id || rowIndex + 1}`)}
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer group"
                >
                  {headers.map((header: any, cellIndex: number) => {
                    const key = header.key;

                    if (key === "Name") {
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden relative shadow-sm border-2 border-white">
                              <Image
                                src={`https://i.pravatar.cc/150?u=${row.Name}`}
                                alt={row.Name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-[15px] font-medium text-black whitespace-nowrap">
                              {row.Name}
                            </span>
                          </div>
                        </td>
                      );
                    }

                    if (key === "Email") {
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200 lowercase">
                          <a href={`mailto:${row.Email}`} className="text-[15px] font-medium text-[#14B6EB] underline whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            {row.Email}
                          </a>
                        </td>
                      );
                    }

                    if (key === "Status") {
                      const statusVal = row.Status;
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wider inline-flex items-center ${statusStyles[statusVal] || "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {statusVal.toUpperCase()}
                          </span>
                        </td>
                      );
                    }

                    if (key === "Availability") {
                      const avail = row.Availability;
                      const isFree = avail === "Free";
                      const isBusy = avail === "Busy";
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200">
                          {isFree ? (
                            <span className="text-[15px] font-semibold text-[#14CC95] flex items-center gap-1.5">
                              <IoCheckmarkCircleSharp className="w-5 h-5" />
                              Free
                            </span>
                          ) : isBusy ? (
                            <span className="text-[15px] font-semibold text-[#00B4FF] flex items-center gap-1.5">
                              <RiLoopRightLine className="w-5 h-5" />
                              Busy
                            </span>
                          ) : (
                            <span className="text-[15px] font-medium text-gray-500">N/A</span>
                          )}
                        </td>
                      );
                    }

                    if (key === "Action") {
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200 text-center">
                          <div className="flex justify-center">
                            <HiDotsVertical className="w-5 h-5 text-gray-700 font-bold group-hover:text-black transition-colors" />
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={cellIndex}
                        className="py-5 px-4 border-b border-gray-200 text-[15px] font-medium text-black whitespace-nowrap"
                      >
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

      <div className="relative mt-8 flex justify-center items-center bg-white py-4 border-t border-gray-100">
        <div className="absolute left-6">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="appearance-none bg-gray-50 border border-gray-100 rounded-lg py-2.5 px-6 pr-10 text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer shadow-sm"
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
    </div>
  );
};

export default TeamsTable;
