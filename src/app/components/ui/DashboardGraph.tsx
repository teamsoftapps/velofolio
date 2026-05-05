/** @format */

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

import CalenderModal from "@/app/components/forms/CalenderModal"
import { DateValue } from "@internationalized/date";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { getDashboardTabs } from "@/config/dashboardConfig";
import { DashboardGraphProps } from "@/types/dashboard";

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

const DashboardGraph = ({ timeRange, setTimeRange, value, setValue }: DashboardGraphProps) => {
  const [selectedTab, setSelectedTab] = useState("Total Revenue");
  const [openCalender, setOpenCalender] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { summary: stats, graph } = useDashboardStats(timeRange, value);

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

  const getMonthName = (date: DateValue) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toLocaleString("en-US", { month: "short" });
  };

  const getDisplayDate = () => {
    if (timeRange === "Custom") {
      return `${value.day} ${getMonthName(value)} ${value.year}`;
    }

    const now = new Date();
    const start = new Date(now);
    if (timeRange === "7 Days") start.setDate(now.getDate() - 7);
    else if (timeRange === "30 Days") start.setDate(now.getDate() - 30);
    else if (timeRange === "Mtd") start.setDate(1);
    else if (timeRange === "Ytd") start.setMonth(0, 1);
    else return timeRange;

    const formatDate = (d: Date) => `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
    return `${formatDate(start)} - ${formatDate(now)}`;
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

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

    let currentData = graph.paymentPoints;
    if (selectedTab === "Active Jobs") currentData = graph.jobPoints;
    if (selectedTab === "New Leads") currentData = graph.leadPoints;

    return {
      labels: graph.labels,
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
          data: graph.labels.map(() => 0),
          borderColor: colors.darkGreen,
          backgroundColor: colors.darkGreen,
          borderWidth: 1,
          pointRadius: 3,
          pointBackgroundColor: colors.darkGreen,
          tension: 0,
        }
      ],
    };
  }, [graph, selectedTab]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: { x: { grid: { display: true, color: "rgba(0, 0, 0, 0.05)" } }, y: { beginAtZero: true, grid: { display: true, min: 0, color: "rgba(0, 0, 0, 0.05)" }, ticks: { stepSize: 1 } } },
  };

  const tabConfig = useMemo(() => getDashboardTabs(stats), [stats]);

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
            {getDisplayDate()}
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
        {tabConfig.map((tab) => (
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
