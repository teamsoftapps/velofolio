"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
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
import CalenderModal from "./CalenderModal"
import { DateValue, parseDate } from "@internationalized/date";

const DashboardGraph = () => {
  const [jobType, setJobType] = useState("All Job Types");
  const [timeRange, setTimeRange] = useState("7 Days");
  const [selectedTab, setSelectedTab] = useState("Leads");
  const [value, setValue] = useState<DateValue>(parseDate("2025-01-05"));
  const [openCalender, setOpenCalender] = useState(false)

  const getMonthName = (date: DateValue) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toLocaleString("en-US", { month: "long" });
  };
  const handleChangeValue = (newValue: DateValue) => {
    setValue(newValue);
    setOpenCalender(false); // close calendar after selection
  };
  function formatDate(value: DateValue | null) {
    if (!value) return "No date selected";

    return `${String(
      value.day
    ).padStart(2, "0")}-${getMonthName(value)}-${value.year}`;
  }

  const staticData = {
    leads: 1,
    shoots: 0,
    revenue: "$0 ($0)",
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

    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets;
            return datasets.map((dataset: any, i: number) => {
              const isHidden = !chart.isDatasetVisible(i);
              return {
                text: dataset.label,
                fillStyle: dataset.backgroundColor,
                hidden: false, // Disables the strikethrough line
                lineDash: dataset.borderDash,
                lineDashOffset: dataset.borderDashOffset,
                lineWidth: dataset.borderWidth,
                strokeStyle: dataset.borderColor,
                pointStyle: dataset.pointStyle,
                datasetIndex: i,
                fontColor: isHidden ? '#999' : '#000',
                font: {
                  weight: isHidden ? 'normal' : 'bold',
                }
              };
            });
          }
        }
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
    <div className="flex ml-44 w-full ">
      <div className="w-3/6 bg-white p-4 sm:p-6 rounded-lg shadow-md mt-8 sm:mt-15 border border-gray-300">
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
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-black">
              <FiChevronDown className="text-lg" />
            </div>
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-center">
            <div className="flex flex-wrap">
              <button
                className={`px-3 py-2 rounded-l-md border-r border-gray-300 text-sm sm:text-base ${timeRange === "7 Days"
                  ? "bg-[rgb(1,176,233)] text-white"
                  : "bg-gray-200 text-black"
                  }`}
                onClick={() => setTimeRange("7 Days")}
              >
                7 Days
              </button>
              <button
                className={`px-3 py-2 border-r border-gray-300 text-sm sm:text-base ${timeRange === "30 Days"
                  ? "bg-[rgb(1,176,233)] text-white"
                  : "bg-gray-200 text-black"
                  }`}
                onClick={() => setTimeRange("30 Days")}
              >
                30 Days
              </button>
              <button
                className={`px-3 py-2 border-r border-gray-300 text-sm sm:text-base ${timeRange === "Mtd"
                  ? "bg-[rgb(1,176,233)] text-white"
                  : "bg-gray-200 text-black"
                  }`}
                onClick={() => setTimeRange("Mtd")}
              >
                Mtd
              </button>
              <button
                className={`px-3 py-2 rounded-r-md text-sm sm:text-base ${timeRange === "Ytd"
                  ? "bg-[rgb(1,176,233)] text-white"
                  : "bg-gray-200 text-black"
                  }`}
                onClick={() => setTimeRange("Ytd")}
              >
                Ytd
              </button>
            </div>
            <div className="relative w-full sm:w-60">
              {/* <select
                className="appearance-none w-full bg-gray-100 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base"
                defaultValue="26 Aug 2025 - 2 Sep 2025"
              >
                <option>26 Aug 2025 - 2 Sep 2025</option>
                <option>1 Sep 2025 - 30 Sep 2025</option>
              </select> */}
              <button className="appearance-none w-full cursor-pointer bg-gray-100 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base"
                onClick={() => setOpenCalender(!openCalender)}
              >
                {formatDate(value)}</button>
              <div className="relative ">
                {
                  openCalender && (
                    <div className="absolute top-3 black bg-white rounded-2xl border-2 border-gray-200">
                      <CalenderModal value={value} setValue={handleChangeValue} />
                    </div>)
                }

              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-black">
                {openCalender ? <FiChevronUp className="text-lg" /> : <FiChevronDown className="text-lg" />}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-0">
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${selectedTab === "All" ? "bg-white" : "bg-[#f4f4f5]"
              }`}
            onClick={() => setSelectedTab("All")}
          >
            <p className="text-black text-xs sm:text-sm">All</p>
            <p className="text-black text-base sm:text-lg font-semibold">
              All Data
            </p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${selectedTab === "Leads" ? "bg-white" : "bg-[#f4f4f5]"
              }`}
            onClick={() => setSelectedTab("Leads")}
          >
            <p className="text-black text-xs sm:text-sm">Leads</p>
            <p className="text-black text-base sm:text-lg font-semibold">
              {staticData.leads}
            </p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${selectedTab === "Shoots" ? "bg-white" : "bg-[#f4f4f5]"
              }`}
            onClick={() => setSelectedTab("Shoots")}
          >
            <p className="text-black text-xs sm:text-sm">Shoots</p>
            <p className="text-black text-base sm:text-lg font-semibold">
              {staticData.shoots}
            </p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${selectedTab === "Revenue" ? "bg-white" : "bg-[#f4f4f5]"
              }`}
            onClick={() => setSelectedTab("Revenue")}
          >
            <p className="text-black text-xs sm:text-sm">Revenue</p>
            <p className="text-black text-base sm:text-lg font-semibold">
              {staticData.revenue}
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
