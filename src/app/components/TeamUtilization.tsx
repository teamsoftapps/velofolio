"use client";
import React from "react";
import { colors } from "../../utils/colors";
import { FiChevronDown } from "react-icons/fi";

const teamData = [
  { name: "John Smith", role: "Editor", utilization: 85, jobs: 12 },
  { name: "Sarah Lee", role: "Videographer", utilization: 70, jobs: 9 },
  { name: "Mark Evans", role: "Project Manager", utilization: 90, jobs: 9 },
  { name: "Alex Turner", role: "Editor", utilization: 70, jobs: 9 },
  { name: "Priya Sharma", role: "Videographer", utilization: 85, jobs: 9 },
];

const TeamUtilization = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDept, setSelectedDept] = React.useState("Department");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col h-full w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Team Utilization
        </h2>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#F9FAFB] rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer capitalize"
          >
            <span>View by {selectedDept}</span>
            <FiChevronDown className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
              {["Department", "Role", "Team"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedDept(option);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer hover:text-gray-900 transition-colors border-b border-gray-50 last:border-0"
                >
                  View by {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table Header */}
      <div className="flex items-center bg-[#F9FAFB] px-4 py-3 rounded-xl mb-2 text-[#4B5563] font-medium text-[13px]">
        <span className="flex-1">Team Member</span>
        <span className="w-24 text-center">Utilization</span>
        <span className="w-32 text-right">Jobs Assigned</span>
      </div>

      {/* List Items */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {teamData.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
          >
            {/* Name & Role */}
            <div className="flex flex-col flex-1">
              <span className="text-gray-950 font-medium text-[15px]">
                {member.name}
              </span>
              <span className="text-gray-400 text-[13px] font-normal">
                {member.role}
              </span>
            </div>

            {/* Utilization */}
            <div className="w-24 flex justify-center flex-shrink-0">
              <span
                className={`inline-flex items-center justify-center w-14 h-8 rounded-full text-white text-[13px] font-bold`}
                style={{ backgroundColor: member.utilization >= 90 ? '#10B981' : '#01B0E9' }}
              >
                {member.utilization}%
              </span>
            </div>

            {/* Jobs */}
            <div className="w-32 text-center flex-shrink-0">
              <span className="text-gray-900 font-medium text-[15px]">
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