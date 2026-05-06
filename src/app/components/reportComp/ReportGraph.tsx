'use client';

import { useState, useMemo } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ReportGraph = ({ selectedView, setSelectedView, selectedTab, setSelectedTab, timeRange, isPrint }: any) => {

  // ==================== DYNAMIC MULTIPLIER BASED ON TIME ====================
  const phaseMultiplier = useMemo(() => {
    switch (timeRange) {
      case '30 Days': return 4.2;
      case 'Mtd': return 3.5;
      case 'Ytd': return 48;
      default: return 1; // 7 Days
    }
  }, [timeRange]);

  // ==================== DYNAMIC CARDS ====================
  const cardsConfig: any = useMemo(() => {
    const m = phaseMultiplier;
    return {
      leads: [
        { key: 'All', label: 'Total Leads', value: Math.floor(22 * m) },
        { key: 'Leads', label: 'Active Leads', value: Math.floor(10 * m) },
        { key: 'Shoots', label: 'Converted Leads', value: Math.floor(10 * m) },
        { key: 'Revenue', label: 'Lost Leads', value: Math.floor(2 * m) },
      ],
      jobs: [
        { key: 'All', label: 'Total Jobs', value: Math.floor(20 * m) },
        { key: 'Leads', label: 'Pending Jobs', value: Math.floor(9 * m) },
        { key: 'Shoots', label: 'Completed Jobs', value: Math.floor(9 * m) },
        { key: 'Revenue', label: 'Cancelled Jobs', value: Math.floor(2 * m) },
      ],
      payments: [
        { key: 'All', label: 'Total Revenue', value: `$${Math.floor(12450 * m).toLocaleString()}` },
        { key: 'Leads', label: 'Paid', value: `$${Math.floor(8200 * m).toLocaleString()}` },
        { key: 'Shoots', label: 'Pending', value: `$${Math.floor(3500 * m).toLocaleString()}` },
        { key: 'Revenue', label: 'Overdue', value: `$${Math.floor(750 * m).toLocaleString()}` },
      ],
    };
  }, [selectedView, phaseMultiplier]);

  const currentCards: any = cardsConfig[selectedView];

  // ==================== DYNAMIC CHART DATA ====================
  const chartDatasets: any = useMemo(() => {
    const m = phaseMultiplier;
    const baseData: any = {
      leads: {
        total: [12, 15, 18, 22, 20, 17, 19, 21].map(v => Math.floor(v * m)),
        second: [5, 6, 8, 10, 9, 7, 8, 10].map(v => Math.floor(v * m)),
        third: [3, 5, 6, 8, 9, 7, 9, 10].map(v => Math.floor(v * m)),
        fourth: [2, 1, 3, 1, 2, 0, 1, 2].map(v => Math.floor(v * m)),
      },
      jobs: {
        total: [3, 4, 4, 3, 3, 3, 3, 20].map(v => Math.floor(v * m)),
        second: [0, 0, 3, 0, 0, 0, 0, 9].map(v => Math.floor(v * m)),
        third: [2, 2, 3, 3, 3, 3, 4, 9].map(v => Math.floor(v * m)),
        fourth: [0, 0, 0, 0, 0, 0, 0, 2].map(v => Math.floor(v * m)),
      },
      payments: {
        total: [1200, 1800, 2200, 2800, 2500, 2100, 2400, 12450].map(v => Math.floor(v * m)),
        second: [900, 1200, 1500, 1800, 1600, 1400, 1700, 8200].map(v => Math.floor(v * m)),
        third: [400, 600, 700, 900, 800, 500, 600, 3500].map(v => Math.floor(v * m)),
        fourth: [100, 150, 200, 250, 180, 120, 80, 750].map(v => Math.floor(v * m)),
      },
    };

    const dataSet: any = baseData[selectedView];

    return [
      {
        label: currentCards[0].label,
        data: dataSet.total,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.18)',
        fill: true,
        tension: 0,
        hidden: selectedTab !== 'All',
      },
      {
        label: currentCards[1].label,
        data: dataSet.second,
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.18)',
        fill: true,
        tension: 0,
        hidden: selectedTab !== 'Leads' && selectedTab !== 'All',
      },
      {
        label: currentCards[2].label,
        data: dataSet.third,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.18)',
        fill: true,
        tension: 0,
        hidden: selectedTab !== 'Shoots' && selectedTab !== 'All',
      },
      {
        label: currentCards[3].label,
        data: dataSet.fourth,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.18)',
        fill: true,
        tension: 0,
        hidden: selectedTab !== 'Revenue' && selectedTab !== 'All',
      },
    ];
  }, [selectedView, selectedTab, currentCards, phaseMultiplier]);

  const graphData = {
    labels: ['26 Aug', '27 Aug', '28 Aug', '29 Aug', '30 Aug', '31 Aug', '1 Sep', '2 Sep'],
    datasets: chartDatasets,
  };

  const options: ChartOptions<'line'> = {
    responsive: !isPrint,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#111',
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#666', font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        min: -0.1,
        // Dynamic max scale based on multiplier
        max: (selectedView === 'payments' ? 15000 : selectedView === 'leads' ? 30 : 25) * phaseMultiplier,
        grid: { color: 'rgba(0,0,0,0.08)' },
        ticks: {
          stepSize: (selectedView === 'payments' ? 3000 : 5) * phaseMultiplier,
          color: '#666',
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <div className={`w-full ${isPrint ? 'p-0' : 'p-2 sm:p-6'}`}>
      <div className={`w-full ${isPrint ? 'p-0 border-none rounded-none shadow-none bg-transparent' : 'rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:p-6'}`}>

        {/* Dropdown - RESTORED ORIGINAL */}
        {!isPrint && (
          <div className="flex justify-end mb-6">
            <select
              value={selectedView}
              onChange={(e) => {
                setSelectedView(e.target.value as 'leads' | 'jobs' | 'payments');
                setSelectedTab('All');
              }}
              className="bg-white border border-gray-300 hover:border-gray-400 px-5 py-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-56"
            >
              <option value="leads">Lead Stats</option>
              <option value="jobs">Job Stats</option>
              <option value="payments">Payments</option>
            </select>
          </div>
        )}

        {/* Cards - hidden in print mode; rendered standalone on page 1 of PDF */}
        {!isPrint && (
          <div className={`w-full grid ${isPrint ? 'grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'} border-l border-t border-gray-200 rounded-lg overflow-hidden`}>
            {currentCards.map((tab: any, index: number) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as 'All' | 'Leads' | 'Shoots' | 'Revenue')}
                className={`p-4 sm:p-6 text-left transition-all border-r border-b border-gray-200 ${selectedTab === tab.key
                  ? 'bg-white'
                  : 'bg-[#F9FAFB] hover:bg-gray-100'
                  }`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{tab.label}</span>
                  <span className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {tab.value}
                  </span>
                </div>
                {selectedTab === tab.key && (
                  <div className="mt-3 h-1.5 w-full rounded-full" style={{ backgroundColor: chartDatasets[index].borderColor }} />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Chart */}
        <div
          className="mt-8"
          style={isPrint ? { width: '100%', height: '520px' } : { width: '100%', height: '320px' }}
        >
          <Line
            data={graphData}
            options={{
              ...options,
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>

        {/* Static Legend — always visible, critical for print readability */}
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 px-1">
          {chartDatasets.map((ds: any) => !ds.hidden && (
            <div key={ds.label} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: ds.borderColor }}
              />
              <span className="text-xs text-gray-600 font-medium">{ds.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportGraph;
