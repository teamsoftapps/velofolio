"use client";
// components/DashboardGraph.jsx
import { useState } from "react";
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

// Register ChartJS components
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

  // Static data for the table
  const staticData = {
    leads: 1,
    shoots: 0,
    revenue: "$0 ($0)",
    teamUtilization: "%0",
    eventCount: "0 (Month/Year)",
    avgRevenue: "$0 ($0)",
  };

  // Static graph data
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
      },
      {
        label: "Jobs Accepted",
        data: [0, 0, 0, 0, 0, 1, 1, 1],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
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
    <div className="flex justify-center w-full">
      <div className="w-5/6 bg-white p-2 rounded-lg shadow-md mt-15">
        <div className="flex flex-col md:flex-row justify-between items-center mb-2">
          <div className="relative w-full md:w-auto mb-1 md:mb-0">
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="appearance-none w-full md:w-40 bg-gray-100 border border-gray-300 rounded-md py-1 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option>All Job Types</option>
              <option>Leads</option>
              <option>Shoots</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-black">
              ▼
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <button
              className={`px-2 py-1 rounded-md ${
                timeRange === "7 Days"
                  ? "bg-[rgb(1,176,233)] text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setTimeRange("7 Days")}
            >
              7 Days
            </button>

            <button
              className={`px-2 py-1 rounded-md ${
                timeRange === "30 Days"
                  ? "bg-[rgb(1,176,233)] text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setTimeRange("30 Days")}
            >
              30 Days
            </button>
            <button
              className={`px-2 py-1 rounded-md ${
                timeRange === "Mtd"
                  ? "bg-[rgb(1,176,233)] text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setTimeRange("Mtd")}
            >
              Mtd
            </button>
            <button
              className={`px-2 py-1 rounded-md ${
                timeRange === "Ytd"
                  ? "bg-[rgb(1,176,233)] text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setTimeRange("Ytd")}
            >
              Ytd
            </button>
            <div className="relative w-full md:w-40">
              <select
                className="appearance-none w-full bg-gray-100 border border-gray-300 rounded-md py-1 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                defaultValue="26 Aug 2025 - 2 Sep 2025"
              >
                <option>26 Aug 2025 - 2 Sep 2025</option>
                <option>1 Sep 2025 - 30 Sep 2025</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-black">
                ▼
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          <div className="col-span-1 bg-[#f4f4f5] p-2">
            <p className="text-black text-sm">Leads</p>
            <p className="text-black text-lg font-semibold">
              {staticData.leads}
            </p>
          </div>
          <div className="col-span-1 bg-[#f4f4f5] p-2">
            <p className="text-black text-sm">Shoots</p>
            <p className="text-black text-lg font-semibold">
              {staticData.shoots}
            </p>
          </div>
          <div className="col-span-1 bg-[#f4f4f5] p-2">
            <p className="text-black text-sm">Revenue</p>
            <p className="text-black text-lg font-semibold">
              {staticData.revenue}
            </p>
          </div>
          <div className="col-span-1 bg-[#f4f4f5] p-2">
            <p className="text-black text-sm">Team Utilization</p>
            <p className="text-black text-lg font-semibold">
              {staticData.teamUtilization}
            </p>
          </div>
          <div className="col-span-1 bg-[#f4f4f5] p-2">
            <p className="text-black text-sm">Event Count (Month/Year)</p>
            <p className="text-black text-lg font-semibold">
              {staticData.eventCount}
            </p>
          </div>
          <div className="col-span-2 bg-[#f4f4f5] p-2">
            <p className="text-black text-sm">Average Revenue per Event</p>
            <p className="text-black text-lg font-semibold">
              {staticData.avgRevenue}
            </p>
          </div>
        </div>
        <div className="mt-2 h-115">
          <Line data={graphData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
