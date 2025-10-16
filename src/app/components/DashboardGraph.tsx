"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardGraph = () => {
  const [jobType, setJobType] = useState("All Job Types");
  const [timeRange, setTimeRange] = useState("7 Days");
  const [selectedTab, setSelectedTab] = useState("Leads");

  const staticData = {
    leads: 1,
    shoots: 0,
    revenue: "$0 ($0)",
    teamUtilization: "%0",
    eventCount: "0 (Month/Year)",
    avgRevenue: "$0 ($0)",
  };

  const graphData = {
    labels: [
      "26 Aug",
      "27 Aug",
      "28 Aug",
      "29 Aug",
      "30 Aug",
      "31 Aug",
      "1 Sep",
      "2 Sep",
    ],
    datasets: [
      {
        label: "Leads",
        data: [1, 4, 3, 2, 1, 1, 0, 0],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
        hidden: selectedTab !== "Leads" && selectedTab !== "All",
      },
      {
        label: "Shoots",
        data: [0, 0, 0, 0, 0, 1, 1, 1],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
        hidden: selectedTab !== "Shoots" && selectedTab !== "All",
      },
      {
        label: "Revenue",
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
        hidden: selectedTab !== "Revenue" && selectedTab !== "All",
      },
      {
        label: "Team Utilization (%)",
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
        tension: 0.4,
        hidden: selectedTab !== "TeamUtilization" && selectedTab !== "All",
      },
      {
        label: "Event Count",
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        tension: 0.4,
        hidden: selectedTab !== "EventCount" && selectedTab !== "All",
      },
      {
        label: "Average Revenue per Event",
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(255, 205, 86, 1)",
        backgroundColor: "rgba(255, 205, 86, 0.2)",
        fill: true,
        tension: 0.4,
        hidden: selectedTab !== "AvgRevenue" && selectedTab !== "All",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(0, 128, 0, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0, 128, 0, 0.1)",
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="flex justify-center w-full ">
      <div className="w-5/6 bg-white p-4 sm:p-6 rounded-lg shadow-md mt-8 sm:mt-15 border border-gray-300">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center mb-4">
          <div className="relative w-full sm:w-80">
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="appearance-none w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option>All Job Types</option>
              <option>Leads</option>
              <option>Shoots</option>
              <option>Revenue</option>
              <option>Team Utilization</option>
              <option>Event Count</option>
              <option>Average Revenue per Event</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-black">
              <FiChevronDown className="text-lg" />
            </div>
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-center">
            <div className="flex flex-wrap">
              <button
                className={`px-3 py-2 rounded-l-md border-r border-gray-300 text-sm sm:text-base ${
                  timeRange === "7 Days"
                    ? "bg-[rgb(1,176,233)] text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setTimeRange("7 Days")}
              >
                7 Days
              </button>
              <button
                className={`px-3 py-2 border-r border-gray-300 text-sm sm:text-base ${
                  timeRange === "30 Days"
                    ? "bg-[rgb(1,176,233)] text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setTimeRange("30 Days")}
              >
                30 Days
              </button>
              <button
                className={`px-3 py-2 border-r border-gray-300 text-sm sm:text-base ${
                  timeRange === "Mtd"
                    ? "bg-[rgb(1,176,233)] text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setTimeRange("Mtd")}
              >
                Mtd
              </button>
              <button
                className={`px-3 py-2 rounded-r-md text-sm sm:text-base ${
                  timeRange === "Ytd"
                    ? "bg-[rgb(1,176,233)] text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setTimeRange("Ytd")}
              >
                Ytd
              </button>
            </div>
            <div className="relative w-full sm:w-60">
              <select
                className="appearance-none w-full bg-gray-100 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base"
                defaultValue="26 Aug 2025 - 2 Sep 2025"
              >
                <option>26 Aug 2025 - 2 Sep 2025</option>
                <option>1 Sep 2025 - 30 Sep 2025</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-black">
                <FiChevronDown className="text-lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-0">
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${
              selectedTab === "All" ? "bg-white" : "bg-[#f4f4f5]"
            }`}
            onClick={() => setSelectedTab("All")}
          >
            <p className="text-black text-xs sm:text-sm">All</p>
            <p className="text-black text-base sm:text-lg font-semibold">
              All Data
            </p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${
              selectedTab === "Leads" ? "bg-white" : "bg-[#f4f4f5]"
            }`}
            onClick={() => setSelectedTab("Leads")}
          >
            <p className="text-black text-xs sm:text-sm">Leads</p>
            <p className="text-black text-base sm:text-lg font-semibold">
              {staticData.leads}
            </p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${
              selectedTab === "Shoots" ? "bg-white" : "bg-[#f4f4f5]"
            }`}
            onClick={() => setSelectedTab("Shoots")}
          >
            <p className="text-black text-xs sm:text-sm">Shoots</p>
            <p className="text-black text-base sm:text-lg font-semibold">
              {staticData.shoots}
            </p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${
              selectedTab === "Revenue" ? "bg-white" : "bg-[#f4f4f5]"
            }`}
            onClick={() => setSelectedTab("Revenue")}
          >
            <p className="text-black text-xs sm:text-sm">Revenue</p>
            <p className="text-black text-base sm:text-lg font-semibold">
              {staticData.revenue}
            </p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${
              selectedTab === "TeamUtilization" ? "bg-white" : "bg-[#f4f4f5]"
            }`}
            onClick={() => setSelectedTab("TeamUtilization")}
          >
            <p className="text-black text-xs sm:text-sm">Team Utilization</p>
            <p className="text-black text-base sm:text-lg font-semibold">
              {staticData.teamUtilization}
            </p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${
              selectedTab === "EventCount" ? "bg-white" : "bg-[#f4f4f5]"
            }`}
            onClick={() => setSelectedTab("EventCount")}
          >
            <p className="text-black text-xs sm:text-sm">Event Count</p>
            <p className="text-black text-base sm:text-lg font-semibold">
              {staticData.eventCount}
            </p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${
              selectedTab === "AvgRevenue" ? "bg-white" : "bg-[#f4f4f5]"
            }`}
            onClick={() => setSelectedTab("AvgRevenue")}
          >
            <p className="text-black text-xs sm:text-sm">
              Average Revenue per Event
            </p>
            <p className="text-black text-base sm:text-lg font-semibold">
              {staticData.avgRevenue}
            </p>
          </div>
        </div>
        <div className="mt-4 h-[400px] sm:h-[500px]">
          <Line data={graphData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
