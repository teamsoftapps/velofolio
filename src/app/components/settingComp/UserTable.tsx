/** @format */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";
import Pagination from "@/app/components/ui/Pagination";
import COLORS from "@/utils/Color";
interface User {
  name: string;
  email: string;
  image: string;
  role: string;
  status: string;
  lastActive: string;
  action: string;
}

interface TableProps {
  headers: { key: string; label: string }[];
  data: User[];
  itemsPerPage?: number;
}

const UserTable: React.FC<TableProps> = ({ headers, data, itemsPerPage = 6 }) => {
  const statusColors: Record<string, string> = {
    Active: "bg-[#FEBE2A] text-black",
    Inactive: "bg-gray-200 text-black",
    "On Leave": "bg-[var(--primary-color)] text-white",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  return (
    <div className="w-full p-3 overflow-hidden rounded-2xl bg-white">
     
      <div className="overflow-x-auto w-full">
        <table className="min-w-[700px] md:min-w-full border-collapse table-auto">
          <thead className="bg-[#F4F4F5] text-black sticky top-0 z-10">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={header.key}
                  className={`py-3 px-4 text-left text-sm md:text-base font-medium whitespace-nowrap ${
                    index === 0 ? "min-w-[180px]" : "min-w-[120px]"
                  }`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors border-t"
              >
               
                <td className="py-3 px-4 flex items-center gap-3 min-w-[180px]">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium text-gray-800 text-sm md:text-base truncate">
                      {user.name}
                    </span>
                    <span className="text-gray-500 text-xs md:text-sm truncate">
                      {user.email}
                    </span>
                  </div>
                </td>

                <td className="py-3 px-4 text-gray-700 text-sm md:text-base min-w-[120px] truncate">
                  {user.role}
                </td>

            
                <td className="py-3 px-4 text-center min-w-[100px]">
                  <span
                    className={`px-2 py-1 text-xs md:text-sm rounded-full ${
                      statusColors[user.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

               
                <td className="py-3 px-4 text-center text-black text-sm md:text-base min-w-[120px] truncate">
                  {user.lastActive}
                </td>

                {/* Action */}
                <td className="py-3 px-4 text-center min-w-[80px]">
                  <SlOptionsVertical className="w-5 h-5 text-black mx-auto cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

 
      <div className="mt-4">
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage}
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default UserTable;
