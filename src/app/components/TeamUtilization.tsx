
/** @format */

"use client";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

const teamData = [
  { name: "John Smith", role: "Lead Photographer", utilization: 85, jobs: 12 },
  { name: "Sarah Lee", role: "Videographer", utilization: 70, jobs: 9 },
  { name: "Mark Evans", role: "Project Manager", utilization: 90, jobs: 9 },
  { name: "Alex Turner", role: "Editor", utilization: 70, jobs: 9 },
  { name: "Priya Sharma", role: "Videographer", utilization: 85, jobs: 9 },
];

const TeamUtilization = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-300 shadow-md flex flex-col h-full w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-900 tracking-tight">
          Team Utilization
        </h2>
        <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 transition-colors duration-200 cursor-pointer">
          <span className="whitespace-nowrap">View by Dept</span>
          <FiChevronDown className="text-gray-400 w-4 h-4" />
        </button>
      </div>

      {/* Table Header - Simplified & Aligned */}
      <div className="hidden sm:flex items-center bg-[#F9FAFB] px-5 py-3 rounded-lg mb-4 text-[#6B7280] font-bold text-[10px] uppercase tracking-widest border border-gray-100">
        <span className="flex-1">Team Member / Role</span>
        <span className="w-24 text-center">Utilization</span>
        <span className="w-24 text-right">Jobs</span>
      </div>

      {/* Mobile Header (Visible only on small screens) */}
      <div className="sm:hidden flex justify-between px-2 pb-2 mb-2 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        <span>Member</span>
        <span>Stats</span>
      </div>

      {/* List Items */}
      <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
        {teamData.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0"
          >
            {/* Name & Role */}
            <div className="flex flex-col flex-1 pl-1 min-w-0">
              <span className="text-gray-900 font-medium text-base sm:text-lg truncate tracking-tight">
                {member.name}
              </span>
              <span className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wide">
                {member.role}
              </span>
            </div>

            {/* Utilization */}
            <div className="w-24 flex justify-center flex-shrink-0">
              <span
                className={`inline-flex items-center justify-center w-14 h-8 sm:w-16 sm:h-9 rounded-full text-white text-xs sm:text-sm font-bold shadow-sm ${
                  member.utilization >= 90 ? "bg-[#10B981]" : "bg-[#01B0E9]"
                }`}
              >
                {member.utilization}%
              </span>
            </div>

            {/* Jobs */}
            <div className="w-24 text-right flex-shrink-0 pr-2">
              <span className="text-gray-900 font-bold text-lg sm:text-xl tabular-nums">
                {member.jobs}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamUtilization;