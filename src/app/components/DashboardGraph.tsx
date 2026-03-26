"use client";
import { useEffect, useMemo, useState } from "react";
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
import { DateValue } from "@internationalized/date";
import LeadData from "../../utils/Lead.json";
import JobData from "../../utils/Job.json";
import PaymentData from "../../utils/Payements.json";
import { filterByTimeRange } from "../../utils/TableUtils";

interface DashboardGraphProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  value: DateValue;
  setValue: (value: DateValue) => void;
}

const DashboardGraph = ({ timeRange, setTimeRange, value, setValue }: DashboardGraphProps) => {
  const [jobType, setJobType] = useState("All Job Types");
  const [selectedTab, setSelectedTab] = useState("Leads");
  const [openCalender, setOpenCalender] = useState(false)

  const getMonthName = (date: DateValue) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toLocaleString("en-US", { month: "long" });
  };

  const handleChangeValue = (newValue: DateValue) => {
    setValue(newValue);
    setOpenCalender(false);
    setTimeRange("Custom");
  };

  function formatDate(value: DateValue | null) {
    if (!value) return "No date selected";
    return `${String(value.day).padStart(2, "0")}-${getMonthName(value)}-${value.year}`;
  }

  useEffect(() => {
    if (jobType === "All Job Types") {
      setSelectedTab("All");
    } else {
      setSelectedTab(jobType);
    }
  }, [jobType]);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    if (tab === "All") {
      setJobType("All Job Types");
    } else {
      setJobType(tab);
    }
  };

  // --- Real Data Processing Engine ---
  const dashboardStats = useMemo(() => {
    const customDate = timeRange === "Custom" ? new Date(value.year, value.month - 1, value.day) : undefined;

    let filteredLeads = filterByTimeRange(LeadData, timeRange, customDate);
    let filteredJobs = filterByTimeRange(JobData, timeRange, customDate);
    let filteredPayments = filterByTimeRange(PaymentData, timeRange, customDate);

    const parseItemDate = (item: any) => new Date(item.eventDate || item.leadCreated || item.dateCreated || item.createdAt || item.date || item.dueDate);

    // Grouping for Chart
    let labels: string[] = [];
    let leadPoints: number[] = [];
    let shootPoints: number[] = [];
    let revenuePoints: number[] = [];

    const now = customDate || new Date();

    if (timeRange === "7 Days" || timeRange === "Custom") {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        labels.push(d.toLocaleDateString("en-US", { day: "numeric", month: "short" }));

        leadPoints.push(filteredLeads.filter(l => parseItemDate(l).toDateString() === d.toDateString()).length);
        shootPoints.push(filteredJobs.filter(j => parseItemDate(j).toDateString() === d.toDateString()).length);
        revenuePoints.push(filteredPayments.filter(p => parseItemDate(p).toDateString() === d.toDateString())
          .reduce((sum, p) => sum + parseFloat(p.paid.replace(/[$,]/g, "")), 0));
      }
    } else if (timeRange === "30 Days" || timeRange === "Mtd") {
      const days = timeRange === "Mtd" ? now.getDate() : 30;
      const interval = days > 15 ? 3 : 1;
      for (let i = days - 1; i >= 0; i -= interval) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        labels.push(d.toLocaleDateString("en-US", { day: "numeric", month: "short" }));
        const inInterval = (itemDate: Date) => {
          const diff = (now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);
          return diff >= i && diff < (i + interval);
        };
        leadPoints.push(filteredLeads.filter(l => inInterval(parseItemDate(l))).length);
        shootPoints.push(filteredJobs.filter(j => inInterval(parseItemDate(j))).length);
        revenuePoints.push(filteredPayments.filter(p => inInterval(parseItemDate(p)))
          .reduce((sum, p) => sum + parseFloat(p.paid.replace(/[$,]/g, "")), 0));
      }
    } else if (timeRange === "Ytd" || timeRange === "All Data") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentMonth = timeRange === "All Data" ? 11 : now.getMonth();

      for (let i = 0; i <= currentMonth; i++) {
        labels.push(months[i]);
        leadPoints.push(filteredLeads.filter(l => parseItemDate(l).getMonth() === i).length);
        shootPoints.push(filteredJobs.filter(j => parseItemDate(j).getMonth() === i).length);
        revenuePoints.push(filteredPayments.filter(p => parseItemDate(p).getMonth() === i)
          .reduce((sum, p) => sum + parseFloat(p.paid.replace(/[$,]/g, "")), 0));
      }
    }

    return {
      stats: {
        leads: filteredLeads.length,
        shoots: filteredJobs.length,
        revenue: filteredPayments.reduce((sum, p) => sum + parseFloat(p.paid.replace(/[$,]/g, "")), 0),
      },
      graph: {
        labels,
        leadPoints,
        shootPoints,
        revenuePoints: revenuePoints.map(r => r / 100)
      }
    };
  }, [timeRange, value]);

  const graphData = useMemo(() => {
    const isAll = jobType === "All Job Types";
    return {
      labels: dashboardStats.graph.labels,
      datasets: [
        {
          label: "Leads",
          data: (isAll || jobType === "Leads") ? dashboardStats.graph.leadPoints : [],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Shoots",
          data: (isAll || jobType === "Shoots") ? dashboardStats.graph.shootPoints : [],
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Revenue",
          data: (isAll || jobType === "Revenue") ? dashboardStats.graph.revenuePoints : [],
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [dashboardStats, jobType]);

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
              const isActive = dataset.data.length > 0;
              return {
                text: dataset.label,
                fillStyle: dataset.backgroundColor,
                hidden: false, // Disables the strikethrough decoration
                lineDash: dataset.borderDash,
                lineDashOffset: dataset.borderDashOffset,
                lineWidth: dataset.borderWidth,
                strokeStyle: dataset.borderColor,
                pointStyle: dataset.pointStyle,
                datasetIndex: i,
                fontColor: isActive ? '#000' : '#d1d5db', // Dims inactive labels
                font: { thickness: isActive ? 'bold' : 'normal' }
              };
            });
          }
        }
      },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              if (context.dataset.label === "Revenue") label += '$' + (context.parsed.y * 100).toLocaleString();
              else label += context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: { grid: { display: true, color: "rgba(0, 128, 0, 0.1)" } },
      y: { beginAtZero: true, grid: { display: true, color: "rgba(0, 128, 0, 0.1)" }, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className='flex items-start justify-start lg:ml-44 ml-4'>
      <div className="w-11/12 sm:w-3/5 bg-white p-4 sm:p-6 rounded-lg shadow-md mt-8 sm:mt-15 border border-gray-300">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center mb-4">
          <div className="relative w-full sm:w-80">
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="appearance-none w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black cursor-pointer"
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
              {["7 Days", "30 Days", "Mtd", "Ytd", "All Data"].map((range, index) => (
                <button
                  key={range}
                  className={`px-3 py-2 border-r border-gray-300 text-sm sm:text-base ${index === 0 ? "rounded-l-md" : ""} ${index === 4 ? "rounded-r-md border-r-0" : ""} cursor-pointer transition-colors ${timeRange === range
                    ? "bg-[rgb(1,176,233)] text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-60">
              <button className="appearance-none w-full cursor-pointer bg-gray-100 rounded-md py-2 px-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base text-left border border-gray-300"
                onClick={() => setOpenCalender(!openCalender)}
              >
                {formatDate(value)}</button>
              <div className="relative ">
                {
                  openCalender && (
                    <div className="absolute top-3 right-0 bg-white rounded-2xl border-2 border-gray-200 z-[100] shadow-2xl">
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
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${selectedTab === "All" ? "bg-white border-b-white shadow-sm" : "bg-[#f4f4f5] hover:bg-gray-100"}`}
            onClick={() => handleTabClick("All")}
          >
            <p className="text-black text-xs sm:text-sm">All</p>
            <p className="text-black text-base sm:text-lg font-semibold">{dashboardStats.stats.leads + dashboardStats.stats.shoots} Total</p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${selectedTab === "Leads" ? "bg-white border-b-white shadow-sm" : "bg-[#f4f4f5] hover:bg-gray-100"}`}
            onClick={() => handleTabClick("Leads")}
          >
            <p className="text-black text-xs sm:text-sm">Leads</p>
            <p className="text-black text-base sm:text-lg font-semibold">{dashboardStats.stats.leads}</p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${selectedTab === "Shoots" ? "bg-white border-b-white shadow-sm" : "bg-[#f4f4f5] hover:bg-gray-100"}`}
            onClick={() => handleTabClick("Shoots")}
          >
            <p className="text-black text-xs sm:text-sm">Shoots</p>
            <p className="text-black text-base sm:text-lg font-semibold">{dashboardStats.stats.shoots}</p>
          </div>
          <div
            className={`p-3 border border-gray-300 cursor-pointer text-center sm:text-left ${selectedTab === "Revenue" ? "bg-white border-b-white shadow-sm" : "bg-[#f4f4f5] hover:bg-gray-100"}`}
            onClick={() => handleTabClick("Revenue")}
          >
            <p className="text-black text-xs sm:text-sm">Revenue</p>
            <p className="text-black text-base sm:text-lg font-semibold">${dashboardStats.stats.revenue.toLocaleString()}</p>
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
