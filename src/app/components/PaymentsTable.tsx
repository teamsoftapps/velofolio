"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

const PaymentsTable = ({
  headers,
  data,
  unit = "Payments",
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
    paid: "bg-[#01B0E9] text-white",
    pending: "bg-[#FFC700] text-black",
    overdue: "bg-[#4B5563] text-white", // Solid gray for payment overdue as per earlier requests
    unpaid: "bg-[#FEF2F2] text-[#EF4444]",
  };

  return (
    <div className="w-full mt-4 bg-white border border-gray-200 rounded-lg p-6 mb-10 shadow-sm">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full border-separate border-spacing-y-0">
          <thead>
            <tr className="bg-[#F3F4F6]">
              {headers.map((header: any, index: number) => {
                const isFirst = index === 0;
                const isLast = index === headers.length - 1;
                return (
                  <th
                    key={index}
                    className={`py-4 px-4 text-[14px] font-semibold text-gray-800 border-y border-gray-200 whitespace-nowrap text-left
                      ${isFirst ? "rounded-l-lg border-l" : ""}
                      ${isLast ? "rounded-r-lg border-r" : ""}`}
                  >
                    {header.label}
                  </th>
                );
              })}
            </tr>
            <tr className="h-4">
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
                  No payments found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row: any, rowIndex: number) => (
                <tr
                  key={rowIndex}
                  onClick={() => router.push(`/viewInvoice?InvoiceId=${row.invoiceNumber}`)}
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer group"
                >
                  {headers.map((header: any, cellIndex: number) => {
                    const key = header.key;

                    if (key === "client") {
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#f0f2f5] overflow-hidden flex-shrink-0 flex items-center justify-center text-[#6B7280] font-bold text-sm border border-gray-100">
                              {row.avatar ? (
                                <Image
                                  src={row.avatar}
                                  alt={String(row.client).charAt(0)}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span>{String(row.client).charAt(0).toUpperCase()}</span>
                              )}
                            </div>
                            <span className="text-[15px] font-medium text-black truncate max-w-[160px]">
                              {row.client}
                            </span>
                          </div>
                        </td>
                      );
                    }

                    if (key === "paymentStatus") {
                      const statusVal = String(row.paymentStatus || "").toLowerCase();
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wide inline-flex items-center justify-center w-fit whitespace-nowrap ${
                              statusStyles[statusVal] || "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {statusVal.toUpperCase()}
                          </span>
                        </td>
                      );
                    }

                    if (key === "amount" || key === "paid" || key === "balance") {
                      const val = row[key];
                      const displayVal = typeof val === 'number' ? `$${val.toLocaleString()}` : (String(val).startsWith('$') ? val : `$${val}`);
                      return (
                        <td key={cellIndex} className="py-5 px-4 border-b border-gray-200 text-[14px] font-semibold text-gray-900">
                          {displayVal}
                        </td>
                      );
                    }

                    return (
                      <td
                        key={cellIndex}
                        className="py-5 px-4 border-b border-gray-200 text-[14px] font-medium text-gray-800 whitespace-nowrap"
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

      {/* Standardized Centered Footer */}
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
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${
                currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-black"
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
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                        currentPage === pageNum
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
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${
                currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-black"
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

export default PaymentsTable;
