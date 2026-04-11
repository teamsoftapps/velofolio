// "use client";

// import { colors } from "../../utils/colors";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
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

// import CalenderModal from "./CalenderModal"
// import { DateValue } from "@internationalized/date";
// import LeadData from "../../utils/Lead.json";
// import JobData from "../../utils/Job.json";
// import PaymentData from "../../utils/Payements.json";
// import { getItemDate } from "../../utils/TableUtils";

// interface DashboardGraphProps {
//   timeRange: string;
//   setTimeRange: (range: string) => void;
//   value: DateValue;
//   setValue: (value: DateValue) => void;
// }

// const normalizeDate = (item: any) => {
//   const d = getItemDate(item);
//   if (!d) return null;
//   d.setHours(0, 0, 0, 0);
//   return d.getTime();
// };

// const parseCurrency = (val: string) => parseFloat(val.replace(/[$,]/g, "")) || 0;

// const DashboardGraph = ({ timeRange, setTimeRange, value, setValue }: DashboardGraphProps) => {
//   const [selectedTab, setSelectedTab] = useState("Total Revenue");
//   const [openCalender, setOpenCalender] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const t = setTimeout(() => setMounted(true), 200);
//     return () => clearTimeout(t);
//   }, []);

//   useEffect(() => {
//     const listener = (e: PointerEvent) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
//         setOpenCalender(false);
//       }
//     };
//     document.addEventListener("pointerdown", listener);
//     return () => document.removeEventListener("pointerdown", listener);
//   }, []);

//   const handleChangeValue = (newValue: DateValue) => {
//     setValue(newValue);
//     setOpenCalender(false);
//     setTimeRange("Custom");
//   };

//   const handleTabClick = (tab: string) => setSelectedTab(tab);


//   const dataEngine = useMemo(() => {
//     const leadsMap = new Map<number, number>();
//     const jobsMap = new Map<number, number>();
//     const paymentsMap = new Map<number, number>();

//     LeadData.forEach(l => {
//       const ts = normalizeDate(l);
//       if (ts) leadsMap.set(ts, (leadsMap.get(ts) || 0) + 1);
//     });

//     JobData.forEach(j => {
//       const ts = normalizeDate(j);
//       if (ts) jobsMap.set(ts, (jobsMap.get(ts) || 0) + 1);
//     });

//     PaymentData.forEach(p => {
//       const ts = normalizeDate(p);
//       if (ts) {
//         const amt = parseCurrency(p.paid);
//         paymentsMap.set(ts, (paymentsMap.get(ts) || 0) + amt);
//       }
//     });

//     return { leadsMap, jobsMap, paymentsMap };
//   }, []);

//   // --- LAYER 2: VIEW TRANSFORMATION (Fast Lookup) ---
//   const { labels, series, totals } = useMemo(() => {
//     const customDate = timeRange === "Custom" ? new Date(value.year, value.month - 1, value.day) : undefined;
//     const anchor = customDate || new Date();
//     anchor.setHours(0, 0, 0, 0);

//     let start = new Date(anchor);
//     let end = new Date(anchor);
//     end.setHours(23, 59, 59, 999);

//     const labelArr: string[] = [];
//     const leadSeries: number[] = [];
//     const jobSeries: number[] = [];
//     const paymentSeries: number[] = [];

//     // Range-aware aggregation
//     if (timeRange === "7 Days" || timeRange === "Custom") {
//       start.setDate(anchor.getDate() - 6);
//       for (let i = 0; i < 7; i++) {
//         const d = new Date(start);
//         d.setDate(start.getDate() + i);
//         labelArr.push(d.toLocaleDateString("en", { day: 'numeric', month: 'short' }));
//         const ts = d.getTime();
//         leadSeries.push(dataEngine.leadsMap.get(ts) || 0);
//         jobSeries.push(dataEngine.jobsMap.get(ts) || 0);
//         paymentSeries.push(dataEngine.paymentsMap.get(ts) || 0);
//       }
//     } else if (timeRange === "30 Days" || timeRange === "Mtd") {
//       const days = timeRange === "Mtd" ? anchor.getDate() : 30;
//       start.setDate(anchor.getDate() - (days - 1));
//       const interval = days > 15 ? 3 : 1;

//       for (let i = 0; i < days; i += interval) {
//         const chunkStart = new Date(start);
//         chunkStart.setDate(start.getDate() + i);
//         labelArr.push(chunkStart.toLocaleDateString("en", { day: 'numeric', month: 'short' }));

//         let lSum = 0, jSum = 0, pSum = 0;
//         for (let s = 0; s < interval; s++) {
//           const sd = new Date(chunkStart);
//           sd.setDate(chunkStart.getDate() + s);
//           const ts = sd.getTime();
//           lSum += dataEngine.leadsMap.get(ts) || 0;
//           jSum += dataEngine.jobsMap.get(ts) || 0;
//           pSum += dataEngine.paymentsMap.get(ts) || 0;
//         }
//         leadSeries.push(lSum);
//         jobSeries.push(jSum);
//         paymentSeries.push(pSum);
//       }
//     } else if (timeRange === "Ytd" || timeRange === "All Data") {
//       const isAll = timeRange === "All Data";
//       const totalMonths = isAll ? 12 : anchor.getMonth() + 1;
//       const yr = anchor.getFullYear();

//       for (let m = 0; m < totalMonths; m++) {
//         const mDate = new Date(yr, m, 1);
//         labelArr.push(mDate.toLocaleDateString("en", { month: 'short' }));

//         // Sum all days in this month
//         let lSum = 0, jSum = 0, pSum = 0;
//         const daysInMonth = new Date(yr, m + 1, 0).getDate();
//         for (let d = 1; d <= daysInMonth; d++) {
//           const ts = new Date(yr, m, d).getTime();
//           lSum += dataEngine.leadsMap.get(ts) || 0;
//           jSum += dataEngine.jobsMap.get(ts) || 0;
//           pSum += dataEngine.paymentsMap.get(ts) || 0;
//         }
//         leadSeries.push(lSum);
//         jobSeries.push(jSum);
//         paymentSeries.push(pSum);
//       }
//     }

//     // Global totals for the whole dataset (simplified for this app's dashboard view)
//     const totalLeads = Array.from(dataEngine.leadsMap.values()).reduce((a, b) => a + b, 0);
//     const totalJobs = Array.from(dataEngine.jobsMap.values()).reduce((a, b) => a + b, 0);
//     const totalRev = Array.from(dataEngine.paymentsMap.values()).reduce((a, b) => a + b, 0);

//     return {
//       labels: labelArr,
//       series: { leadSeries, jobSeries, paymentSeries },
//       totals: { totalLeads, totalJobs, totalRev }
//     };
//   }, [timeRange, value, dataEngine]);

//   // --- LAYER 3: UI DECOUPLING (Fast Re-render on Tab Switch) ---
//   const chartGradient = useMemo(() => {
//     if (typeof window === "undefined") return colors.primary;
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return colors.primary;
//     const g = ctx.createLinearGradient(0, 0, 0, 400);
//     g.addColorStop(0, "rgba(0, 181, 226, 0.4)");
//     g.addColorStop(1, "rgba(0, 181, 226, 0.0)");
//     return g;
//   }, []);

//   const graphData = useMemo(() => {
//     const tabMap: Record<string, number[]> = {
//       "New Leads": series.leadSeries,
//       "Active Jobs": series.jobSeries,
//       "Total Revenue": series.paymentSeries,
//       "Pending Payments": series.paymentSeries.map(v => v * 0.4), // Mock for UI
//     };

//     return {
//       labels,
//       datasets: [
//         {
//           label: selectedTab,
//           data: tabMap[selectedTab] || [],
//           borderColor: colors.primary,
//           backgroundColor: chartGradient,
//           fill: true,
//           tension: 0.4,
//           pointRadius: 4,
//           pointBackgroundColor: "#fff",
//           pointBorderColor: colors.primary,
//           pointBorderWidth: 2,
//         },
//         {
//           label: "Baseline",
//           data: labels.map(() => 0),
//           borderColor: colors.darkGreen,
//           pointRadius: 0,
//           borderWidth: 1,
//         }
//       ],
//     };
//   }, [labels, series, selectedTab, chartGradient]);

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         mode: 'index' as const,
//         intersect: false,
//         backgroundColor: '#fff',
//         titleColor: '#111',
//         bodyColor: '#666',
//         borderColor: '#eee',
//         borderWidth: 1,
//         padding: 12,
//         cornerRadius: 8,
//       }
//     },
//     hover: { mode: 'index' as const, intersect: false },
//     scales: {
//       x: { grid: { display: true, color: "rgba(0, 0, 0, 0.03)" } },
//       y: { beginAtZero: true, grid: { display: true, color: "rgba(0, 0, 0, 0.03)" }, ticks: { stepSize: 1 } }
//     },
//   };

//   return (
//     <div className="w-full bg-white p-4 sm:p-6 rounded-lg border border-gray-300 transition-shadow hover:shadow-md">
//       {/* Header UI remains identical for visual stability */}
//       <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
//         <div className="flex bg-[#F3F4F6] rounded-lg p-1.5 w-fit border border-gray-100">
//           {["7 Days", "30 Days", "Mtd", "Ytd"].map((range) => (
//             <button
//               key={range}
//               className={`px-5 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer ${timeRange === range
//                 ? "text-white transform scale-[1.02]"
//                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
//                 }`}
//               style={timeRange === range ? { backgroundColor: colors.primary } : {}}
//               onClick={() => setTimeRange(range)}
//             >
//               {range}
//             </button>
//           ))}
//         </div>

//         <div className="relative min-w-[240px]" onClick={(e) => e.stopPropagation()}>
//           <button className="w-full cursor-pointer bg-white border border-gray-200 rounded-lg py-2.5 px-4 pr-10 text-left text-sm text-gray-700 font-semibold focus:ring-2 focus:ring-cyan-500 outline-none"
//             onClick={() => setOpenCalender(!openCalender)}
//           >
//             {timeRange === "Custom" ? `Custom: ${value.day}/${value.month}/${value.year}` : "Select Custom Range"}
//           </button>
//           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
//             {openCalender ? <FiChevronUp /> : <FiChevronDown />}
//           </div>
//           {openCalender && (
//             <div className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-gray-200 z-[100] shadow-2xl" ref={wrapperRef} >
//               <CalenderModal value={value} setValue={handleChangeValue} />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 rounded-md overflow-hidden mb-6">
//         {[
//           { label: "Total Revenue", key: "Total Revenue", value: `$${totals.totalRev.toLocaleString()}`, extra: "($0)" },
//           { label: "Pending Payments", key: "Pending Payments", value: "$31,60", extra: "($0)" },
//           { label: "Active Jobs", key: "Active Jobs", value: totals.totalJobs.toString() },
//           { label: "New Leads", key: "New Leads", value: totals.totalLeads.toString() },
//         ].map((tab) => (
//           <div
//             key={tab.key}
//             className={`p-4 border-r border-gray-200 last:border-r-0 cursor-pointer transition-all duration-300 
//               ${selectedTab === tab.key ? "bg-white border-b-2" : "bg-gray-50/50 hover:bg-gray-100"}`}
//             style={selectedTab === tab.key ? { borderBottomColor: colors.primary } : {}}
//             onClick={() => handleTabClick(tab.key)}
//           >
//             <p className={`text-sm font-semibold mb-1 ${selectedTab === tab.key ? "text-cyan-600" : "text-gray-500"}`}>{tab.label}</p>
//             <p className="text-gray-900 text-2xl font-bold tracking-tight">
//               {tab.value} {(tab as any).extra && <span className="text-gray-400 font-normal text-sm ml-1">{(tab as any).extra}</span>}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="h-[350px] sm:h-[400px] relative">
//         {!mounted ? (
//           <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 rounded-lg translate-y-4 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
//             <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <Line data={graphData} options={options} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardGraph;

"use client";
import { colors } from "../../utils/colors";
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
