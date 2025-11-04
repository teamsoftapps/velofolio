// "use client";
// import { useState } from "react";
// import { FiChevronDown } from "react-icons/fi";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
//     ChartOptions,
    
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const DashboardGraph = () => {
//   const [jobType, setJobType] = useState("All Job Types");
//   const [timeRange, setTimeRange] = useState("7 Days");
//   const [selectedTab, setSelectedTab] = useState("Leads");

//   const staticData = {
//     leads: 1,
//     shoots: 0,
//     revenue: "$0 ($0)",
//     teamUtilization: "%0",
//     eventCount: "0 (Month/Year)",
//     avgRevenue: "$0 ($0)",
//   };

//    const data = {
//     labels: ['26 Aug', '27 Aug', '28 Aug', '29 Aug', '30 Aug', '31 Aug', '1 Sep', '2 Sep'],
//     datasets: [
//       {
//         label: 'Activity',
//         data: [2, 1.6, 2.2, 3.3, 2.7, 1.2, 1.8, 2.6],
//         fill: true,
//         backgroundColor: 'rgba(1, 176, 233, 0.2)', // light blue fill
//         borderColor: '#01B0E9', // bright blue border
//         borderWidth: 2,
//         tension: 0, // smooth curve
//         pointRadius: 0, // hide main data points
//         pointHitRadius: 10,
//       },
//  {
 
//   data: new Array(8).fill(0), // anchor at y = 0
//   pointRadius: 4,
//   pointBackgroundColor: '#2E7D32', // dark green
//   borderWidth: 2,
//   showLine: true, // only show dots, no connecting line
//   clip: false, // ensure visible even at chart edges
// },
//     ],
//   };

//    const options: ChartOptions<'line'> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: { mode: 'index', intersect: false },
//     },
//     scales: {
//       x: {
//         grid: { display: false,  },
//         ticks: {
//               padding: 5, // moves labels down from chart
//           color: '#666',
//           font: { size: 11 },
          
//         },
//       },
//       y: {
//        min: -0.1,
//         grid: {
//           color: 'rgba(0, 0, 0, 0.09)',
          
//         },
//         ticks: {
//           stepSize: 1,
//           color: '#666',
//           font: { size: 11 },
//         },
//         grace: '5%',
//       },
//     },
//   };

//   return (
//     <div className="flex  p-3  ">
//       <div className="w-full bg-white sm:p-6 rounded-lg shadow-md mt-8 sm:mt-15 border border-gray-300">
      
//         <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-4 gap-2 sm:gap-0">
//           <div
//             className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${
//               selectedTab === "All" ? "bg-white" : "bg-[#f4f4f5]"
//             }`}
//             onClick={() => setSelectedTab("All")}
//           >
//             <p className="text-black text-xs sm:text-sm">Total Revenue</p>
//             <p className="text-black text-base sm:text-lg font-semibold">
//               {staticData.revenue}
//             </p>
//           </div>
//           <div
//             className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${
//               selectedTab === "Leads" ? "bg-white" : "bg-[#f4f4f5]"
//             }`}
//             onClick={() => setSelectedTab("Leads")}
//           >
//             <p className="text-black text-xs sm:text-sm">Pending Payements</p>
//             <p className="text-black text-base sm:text-lg font-semibold">
//               {staticData.revenue}
//             </p>
//           </div>
//           <div
//             className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${
//               selectedTab === "Shoots" ? "bg-white" : "bg-[#f4f4f5]"
//             }`}
//             onClick={() => setSelectedTab("Shoots")}
//           >
//             <p className="text-black text-xs sm:text-sm">Jobs Completed</p>
//             <p className="text-black text-base sm:text-lg font-semibold">
//               {staticData.shoots}/{staticData.leads}
//             </p>
//           </div>
//           <div
//             className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${
//               selectedTab === "Revenue" ? "bg-white" : "bg-[#f4f4f5]"
//             }`}
//             onClick={() => setSelectedTab("Revenue")}
//           >
//             <p className="text-black text-xs sm:text-sm">New Leads This Month</p>
//             <p className="text-black text-base sm:text-lg font-semibold">
//               {staticData.leads}
//             </p>
//           </div>

//         </div>
//         <div className="mt-4 h-[200px] sm:h-[300px]">
//           <Line data={data} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardGraph;
'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
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
  ChartOptions,
} from 'chart.js';

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
  const [selectedTab, setSelectedTab] = useState('Leads');

  const staticData = {
    leads: 1,
    shoots: 0,
    revenue: '$0 ($0)',
    teamUtilization: '%0',
    eventCount: '0 (Month/Year)',
    avgRevenue: '$0 ($0)',
  };

  const data = {
    labels: ['26 Aug', '27 Aug', '28 Aug', '29 Aug', '30 Aug', '31 Aug', '1 Sep', '2 Sep'],
    datasets: [
      {
        label: 'Activity',
        data: [2, 1.6, 2.2, 3.3, 2.7, 1.2, 1.8, 2.6],
        fill: true,
        backgroundColor: 'rgba(1, 176, 233, 0.2)',
        borderColor: '#01B0E9',
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHitRadius: 10,
      },
      {
        data: new Array(8).fill(0),
        pointRadius: 5,
        pointBackgroundColor: '#2E7D32',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        showLine: false,
        clip: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#666',
          font: { size: 11 },
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        min: -0.1,
        max: 4,
        grid: { color: 'rgba(0, 0, 0, 0.08)' },
        ticks: {
          stepSize: 1,
          color: '#666',
          font: { size: 11 },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
  };

  const tabs = [
    { key: 'All', label: 'Total Revenue', value: staticData.revenue },
    { key: 'Leads', label: 'Pending Payments', value: staticData.revenue },
    { key: 'Shoots', label: 'Jobs Completed', value: `${staticData.shoots}/${staticData.leads}` },
    { key: 'Revenue', label: 'New Leads This Month', value: staticData.leads },
  ];

  return (
    <div className="w-full p-2 sm:p-6">
      <div className="w-full rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:p-6">
        {/* Responsive Grid: 1 col → 2 col → 4 col */}
        <div className="w-full  grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`border br-1 border-white p-3 text-left transition-all ${
                selectedTab === tab.key
                  ? 'border-blue-500 border-t-[#CCEFFB] bg-white '
                  : 'border-gray-300 bg-gray-200 hover:bg-gray-100'
              }`}
            >
              <p className="text-xs text-gray-600 sm:text-sm">{tab.label}</p>
              <p className="mt-1 text-base font-semibold text-gray-900 sm:text-lg">
                {tab.value}
              </p>
            </button>
          ))}
        </div>

        {/* Chart Container - Responsive Height */}
        <div className="mt-6 w-full h-64 sm:h-72 lg:h-80">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;