"use client";
import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { useRouter, usePathname } from "next/navigation";
import Pagination from "./Pagination";
import COLORS from "@/utils/Color";

const DashboardTable = ({
  headers,
  data,
  setDeleteModal,
  color,
  itemsPerPage = 5,
}: any) => {
  const router = useRouter();
  const pasthname = usePathname();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusColors: any = {
    "New Lead": "bg-[#FEBE2A]",
    Proposal: "bg-[#01B0E9]",
    Booked: "bg-[#14CB95]",
    Done: "bg-green-500",
    Paid: "bg-[#01B0E9]",
    Active: "bg-[#FEBE2A]",
    "On Leave": "bg-[#01B0E9]",
    Completed: "bg-[#14CB95]",
    New: "bg-[#01B0E9]",
    Pending: pasthname == "/payments" ? "bg-[#FEBE2A] " : "bg-gray-100",
    "In Progress": "bg-[#FEBE2A]",
    Overdue: "bg-[#14CB95]",
    Inactive: "bg-gray-200",
    Approved: "bg-green-500",
    Rejected: "bg-red-500",
    Signed: "bg-[#FEBE2A] text-black",
    Draft: "bg-[#13CC95]",
    Upcoming: "bg-[#01B0E9]",
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="w-full mt-2 lg:p-0 h-[460px]  overflow-auto scroller">
        <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
          <table className="min-w-[400px] w-full bg-white table-auto border-collapse text-wrap">
            <thead className="bg-gray-100 text-black border-0 rounded-lg w-full">
              <tr>
                {headers?.map((header: any, index: any) => (
                  <th
                    key={index}
                    className="px-2 py-2 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-600"
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
                    if (pasthname === "/clients") router.push(`/clientProfile`);
                    if (pasthname === "/jobs") router.push(`/jobProfile?id=${rowIndex + 1}`);
                  }}
                  className="text-black hover:bg-[#daf2fa] text-xs sm:text-sm transition-colors duration-200 cursor-pointer border-b border-[#D4D4D8] last:border-0"
                >
                  {headers?.map((header: any, cellIndex: any) => {
                    const key = header.key || header;

                    // Action column
                    if (key === "action" || key === "Action") {
                      return (
                        <td
                          key={cellIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (setDeleteModal) setDeleteModal(true);
                          }}
                          className="py-2 text-center"
                        >
                          <SlOptionsVertical className="w-4 h-4 mx-auto cursor-pointer text-gray-500" />
                        </td>
                      );
                    }

                    // Status column
                    if (
                      key === "status" ||
                      key === "Status"
                    ) {
                      const textColor =
                        row[key] === "New Lead" ||
                          row[key] === "Pending" ||
                          row[key] === "Inactive" ||
                          row[key] === "Signed"
                          ? "text-black"
                          : "text-white";

                      return (
                        <td key={cellIndex} className="py-2 px-1 text-center min-w-[70px]">
                          <span
                            className={`px-2 py-0.5 inline-block rounded-full truncate text-xs sm:text-[13px] font-medium leading-tight ${textColor} ${statusColors[row[key]] || "bg-gray-900"
                              }`}
                          >
                            {row[key]}
                          </span>
                        </td>
                      );
                    }

                    // Default column
                    return (
                      <td key={cellIndex} className="py-2 px-1 sm:px-2 text-center font-medium text-gray-800">
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

      <div className="-mt-0">
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          initialPage={currentPage}
          color={color}
          hoverColor={COLORS.BlueButtonhover}
          disabledColor={COLORS.BlueDisabled}
        />
      </div>
    </>
  );
};

export default DashboardTable;
