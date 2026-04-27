

"use client";
import { colors } from "@/utils/colors";
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

import CalenderModal from "@/app/components/forms/CalenderModal"
import { DateValue } from "@internationalized/date";
import LeadData from "@/utils/Lead.json";
import JobData from "@/utils/Job.json";
import PaymentData from "@/utils/Payements.json";
import { filterByTimeRange } from "@/utils/TableUtils";

interface DashboardGraphProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  value: DateValue;
  setValue: (value: DateValue) => void;
}

const DashboardGraph = ({ timeRange, setTimeRange, value, setValue }: DashboardGraphProps) => {
  const [selectedTab, setSelectedTab] = useState("Total Revenue");
  const [openCalender, setOpenCalender] = useState(false);

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

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const dashboardStats = useMemo(() => {
    const customDate = timeRange === "Custom" ? new Date(value.year, value.month - 1, value.day) : undefined;
    let filteredLeads = filterByTimeRange(LeadData, timeRange, customDate);
    let filteredJobs = filterByTimeRange(JobData, timeRange, customDate);
    let filteredPayments = filterByTimeRange(PaymentData, timeRange, customDate);
    const parseItemDate = (item: any) => new Date(item.eventDate || item.leadCreated || item.dateCreated || item.createdAt || item.date || item.dueDate);
    const parseCurrency = (val: string) => parseFloat(String(val).replace(/[^\d.-]/g, "")) || 0;

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

        avgRevenue: filteredJobs.length > 0 ? (filteredPayments.reduce((sum, p) => sum + parseFloat(p.paid.replace(/[$,]/g, "")), 0) / filteredJobs.length) : 0,
      },
      graph: {
        labels,
        leadPoints,
        jobPoints: shootPoints,
        paymentPoints: revenuePoints,
        avgRevenuePoints: revenuePoints.map((r, i) => shootPoints[i] > 0 ? r / shootPoints[i] : 0)
      }
    };
  }, [timeRange, value]);

  const graphData = useMemo(() => {
    let gradient: CanvasGradient | string = colors.primary;
    if (typeof window !== "undefined") {
      const ctx = document.createElement("canvas").getContext("2d");
      if (ctx) {
        gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(0, 181, 226, 0.4)");
        gradient.addColorStop(1, "rgba(0, 181, 226, 0.0)");
      }
    }

    let currentData = dashboardStats.graph.paymentPoints;
    if (selectedTab === "Active Jobs") currentData = dashboardStats.graph.jobPoints;
    if (selectedTab === "New Leads") currentData = dashboardStats.graph.leadPoints;

    return {
      labels: dashboardStats.graph.labels,
      datasets: [
        {
          label: selectedTab,
          data: currentData,
          borderColor: colors.primary,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#fff",
          pointBorderColor: colors.primary,
          pointBorderWidth: 2,
          pointHoverRadius: 6,
        },
        {
          label: "Baseline",
          data: dashboardStats.graph.labels.map(() => 0),
          borderColor: colors.darkGreen,
          backgroundColor: colors.darkGreen,
          borderWidth: 1,
          pointRadius: 3,
          pointBackgroundColor: colors.darkGreen,
          tension: 0,
        }
      ],
    };
  }, [dashboardStats, selectedTab]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: { x: { grid: { display: true, color: "rgba(0, 0, 0, 0.05)" } }, y: { beginAtZero: true, grid: { display: true, min: 0, color: "rgba(0, 0, 0, 0.05)" }, ticks: { stepSize: 1 } } },
  };

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-lg  border border-gray-300">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
          {["7 Days", "30 Days", "Mtd", "Ytd"].map((range) => (
            <button
              key={range}
              className={`px-4 py-2 text-sm font-medium border-r border-gray-200 last:border-0 cursor-pointer transition-colors ${timeRange === range
                ? "text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
              style={timeRange === range ? { backgroundColor: colors.primary, borderColor: colors.primary } : {}}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]" onClick={(e) => e.stopPropagation()}>
          <button className="w-full cursor-pointer bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 pr-10 text-left text-sm text-gray-900 font-medium focus:outline-none"
            onClick={() => setOpenCalender(!openCalender)}
          >
            26 Aug 2025 - 2 Sep 2025
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

      <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar mb-6">
        {[
          { label: "Total Revenue", key: "Total Revenue", value: `$${dashboardStats.stats.payments.toLocaleString()}`, extra: "($0)" },
          { label: "Pending Payments", key: "Pending Payments", value: "$2800", extra: "($0)" },
          { label: "Active Jobs", key: "Active Jobs", value: dashboardStats.stats.jobs, extra: "" },
          { label: "New Leads", key: "New Leads", value: dashboardStats.stats.leads, extra: "" },
        ].map((tab) => (
          <div
            key={tab.key}
            className={`min-w-[160px] flex-1 p-4 border-r border-gray-200 last:border-r-0 cursor-pointer transition-all duration-200 
              ${selectedTab === tab.key ? "bg-white border-t-[3px]" : "border-t-[3px] border-t-transparent hover:bg-gray-100 bg-gray-50"}`}
            style={selectedTab === tab.key ? { borderTopColor: colors.primary } : {}}
            onClick={() => handleTabClick(tab.key)}
          >
            <p className="text-gray-900 text-sm font-medium mb-1">{tab.label}</p>
            <p className="text-gray-900 text-xl font-semibold">
              {tab.value} {tab.extra && <span className="text-gray-400 font-normal text-sm">{tab.extra}</span>}
            </p>
          </div>
        ))}
      </div>

      <div className="h-[350px] sm:h-[400px]">
        <Line data={graphData} options={options} />
      </div>
    </div>
  );
};

export default DashboardGraph;

