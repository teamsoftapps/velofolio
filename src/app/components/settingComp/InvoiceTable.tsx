/** @format */
"use client";
import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import Pagination from "../Pagination";
import COLORS from "@/utils/Color";
import { GrDownload } from "react-icons/gr";
interface Invoice {
  name: string;
  date: string;
  amount: string;
  status: string;
  action: string;
}

interface TableProps {
  headers: { key: string; label: string }[];
  data: Invoice[];
  itemsPerPage?: number;
}

const InvoiceTable: React.FC<TableProps> = ({
  headers,
  data,
  itemsPerPage = 6,
}) => {
  const statusColors: Record<string, string> = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Overdue: "bg-red-100 text-red-700",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);
console.log(paginatedData)
  return (
<div className="overflow-x-auto w-full">
  <table className="min-w-[700px] md:min-w-full border-collapse  w-full">
    <thead className="bg-[#F4F4F5] text-black sticky top-0 z-10">
      <tr>
        {headers.map((header, index) => (
          <th
            key={header.key}
            className={`py-3 px-4 text-left text-sm md:text-base font-medium whitespace-nowrap
             "w-[100px]`}
          >
            {header.label}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {paginatedData.map((invoice, index) => (
        <tr
          key={index}
          className="hover:bg-gray-50 transition-colors border-t border-gray-200"
        >
          <td className="py-3 px-4 text-gray-800 font-medium text-sm md:text-base truncate">
            {invoice.name}
          </td>

          <td className="py-3 px-4 text-gray-700 text-sm md:text-base truncate">
            {invoice.date}
          </td>

          <td className="py-3 px-4 text-center">
            <span
              className={`px-2 py-1 text-xs md:text-sm rounded-full ${
                statusColors[invoice.status] || "bg-gray-100 text-gray-800"
              }`}
            >
              {invoice.status}
            </span>
          </td>

          <td className="py-3 px-4 text-gray-900 font-semibold text-sm md:text-base truncate">
            {invoice.amount}
          </td>

          <td className="py-3 px-4 text-center">
            <button
              className="text-blue-600 hover:underline text-sm md:text-base"
              onClick={() => console.log("Download:", invoice.name)}
            >
              <GrDownload className="w-5 h-5 text-black mx-auto cursor-pointer" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default InvoiceTable;
