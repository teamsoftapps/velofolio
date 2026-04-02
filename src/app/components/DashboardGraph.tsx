
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [jobType, setJobType] = useState("Leads");
  const [selectedTab, setSelectedTab] = useState("Leads");
  const [openCalender, setOpenCalender] = useState(false)

  const getMonthName = (date: DateValue) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toLocaleString("en-US", { month: "long" });
  };
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpenCalender(false);
      }
    };
    document.addEventListener("pointerdown", listener);
    return () => document.removeEventListener("pointerdown", listener);
  }, []);
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
    setJobType(tab);
  };

  const dashboardStats = useMemo(() => {
    const customDate = timeRange === "Custom" ? new Date(value.year, value.month - 1, value.day) : undefined;
    let filteredLeads = filterByTimeRange(LeadData, timeRange, customDate);
    let filteredJobs = filterByTimeRange(JobData, timeRange, customDate);
    let filteredPayments = filterByTimeRange(PaymentData, timeRange, customDate);
    const parseItemDate = (item: any) => new Date(item.eventDate || item.leadCreated || item.dateCreated || item.createdAt || item.date || item.dueDate);
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
        jobs: filteredJobs.length,
        payments: filteredPayments.reduce((sum, p) => sum + parseFloat(p.paid.replace(/[$,]/g, "")), 0),
        utilization: 64, // Mock overall utilization
        events: filteredJobs.length,
        avgRevenue: filteredJobs.length > 0 ? (filteredPayments.reduce((sum, p) => sum + parseFloat(p.paid.replace(/[$,]/g, "")), 0) / filteredJobs.length) : 0,
      },
      graph: {
        labels,
        leadPoints,
        jobPoints: shootPoints,
        paymentPoints: revenuePoints,
        utilizationPoints: shootPoints.map(p => Math.min(100, p * 20)),
        avgRevenuePoints: revenuePoints.map((r, i) => shootPoints[i] > 0 ? r / shootPoints[i] : 0)
      }
    };
  }, [timeRange, value]);

  const graphData = useMemo(() => ({
    labels: dashboardStats.graph.labels,
    datasets: [
      {
        label: "Leads",
        data: (selectedTab === "Leads" || selectedTab === "All") ? dashboardStats.graph.leadPoints : [],
        borderColor: "#90C0A4",
        backgroundColor: "#90C0A4",
        fill: false,
        tension: 0.1,
        pointRadius: 4,
        pointBackgroundColor: "#90C0A4",
      },
      {
        label: "Jobs Accepted",
        data: (selectedTab === "Jobs" || selectedTab === "All") ? dashboardStats.graph.jobPoints : [],
        borderColor: "#0E7D4B",
        backgroundColor: "#0E7D4B",
        fill: false,
        tension: 0.1,
        pointRadius: 4,
        pointBackgroundColor: "#0E7D4B",
      },
      {
        label: "Payments",
        data: (selectedTab === "Payments") ? dashboardStats.graph.paymentPoints : [],
        borderColor: "#01B0E9",
        backgroundColor: "#01B0E9",
        fill: false,
        tension: 0.1,
        pointRadius: 4,
        pointBackgroundColor: "#01B0E9",
      },
      {
        label: "Utilization",
        data: (selectedTab === "Team Utilization") ? dashboardStats.graph.utilizationPoints : [],
        borderColor: "#FEBE2A",
        backgroundColor: "#FEBE2A",
        fill: false,
        tension: 0.1,
        pointRadius: 4,
        pointBackgroundColor: "#FEBE2A",
      },
      {
        label: "Event Count",
        data: (selectedTab === "Event Count") ? dashboardStats.graph.jobPoints : [],
        borderColor: "#A855F7",
        backgroundColor: "#A855F7",
        fill: false,
        tension: 0.1,
        pointRadius: 4,
        pointBackgroundColor: "#A855F7",
      },
      {
        label: "Avg Revenue",
        data: (selectedTab === "Average Revenue") ? dashboardStats.graph.avgRevenuePoints : [],
        borderColor: "#EC4899",
        backgroundColor: "#EC4899",
        fill: false,
        tension: 0.1,
        pointRadius: 4,
        pointBackgroundColor: "#EC4899",
      },
    ],
  }), [dashboardStats, selectedTab]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: { x: { grid: { display: true, color: "rgba(0, 0, 0, 0.05)" } }, y: { beginAtZero: true, grid: { display: true, color: "rgba(0, 0, 0, 0.05)" }, ticks: { stepSize: 1 } } },
  };

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-lg  border border-gray-300">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div className="relative w-full xl:w-72">
          <select
            value={jobType}
            onChange={(e) => { setJobType(e.target.value); setSelectedTab(e.target.value); }}
            className="appearance-none w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 cursor-pointer text-sm font-medium"
          >
            <option>Leads</option>
            <option>Jobs</option>
            <option>Payments</option>
            <option>Team Utilization</option>
            <option>Event Count</option>
            <option>Average Revenue</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            <FiChevronDown className="text-lg" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
            {["7 Days", "30 Days", "Mtd", "Ytd", "All Data"].map((range) => (
              <button
                key={range}
                className={`px-3 py-2 text-xs md:text-sm font-medium border-r border-[#E5E7EB] last:border-0 cursor-pointer transition-colors ${timeRange === range
                  ? "bg-[#01B0E9] text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="relative min-w-[180px] flex-1" onClick={(e) => e.stopPropagation()}>
            <button className="w-full cursor-pointer bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 pr-10 text-left text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              onClick={() => setOpenCalender(!openCalender)}
            >
              {formatDate(value)}
            </button>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              {openCalender ? <FiChevronUp className="text-lg" /> : <FiChevronDown className="text-lg" />}
            </div>
            {openCalender && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-gray-200 z-[100] shadow-2xl" ref={wrapperRef} >
                <CalenderModal value={value} setValue={handleChangeValue} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar mb-6">
        {[
          { label: "Leads", key: "Leads", value: dashboardStats.stats.leads, extra: "" },
          { label: "Jobs", key: "Jobs", value: dashboardStats.stats.jobs, extra: "" },
          { label: "Payments", key: "Payments", value: `$${dashboardStats.stats.payments.toLocaleString()}`, extra: "($0)" },
          { label: "Utilization", key: "Team Utilization", value: `%${dashboardStats.stats.utilization}`, extra: "" },
          { label: "Event Count", key: "Event Count", value: "3.5", extra: "" },
          { label: "Avg Revenue", key: "Average Revenue", value: `$${dashboardStats.stats.avgRevenue.toFixed(0)}`, extra: "($0)" },
        ].map((tab) => (
          <div
            key={tab.key}
            className={`min-w-[120px] flex-1 p-3 border-r border-gray-100 cursor-pointer transition-all duration-200 
              ${selectedTab === tab.key ? "bg-white border-t-2 border-t-[#01B0E9]" : "bg-[#F9FAFB] border-t-2 border-t-transparent hover:bg-gray-50"}`}
            onClick={() => handleTabClick(tab.key)}
          >
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-tight">{tab.label}</p>
            <p className="text-gray-900 text-base sm:text-xl font-bold">
              {tab.value} <span className="text-gray-400 font-normal text-xs">{tab.extra}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="h-[350px] sm:h-[400px]">
        <Line data={graphData} options={options} />
      </div>

      <div className="flex justify-center gap-80 mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-3.5 h-3.5 bg-[#90C0A4] rounded-sm"></div>
          <span className="text-gray-500 text-sm font-medium">Leads</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3.5 h-3.5 bg-[#0E7D4B] rounded-sm"></div>
          <span className="text-gray-900 text-sm font-bold">Jobs Accepted</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
