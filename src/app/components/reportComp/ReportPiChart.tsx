'use client';

import React, { useMemo } from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Plugin,
  ChartOptions,
} from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip);

const centerDotPlugin: Plugin<'polarArea'> = {
  id: 'centerDot',
  afterDatasetsDraw(chart) {
    const { ctx, chartArea } = chart;
    const cx = (chartArea.left + chartArea.right) / 2;
    const cy = (chartArea.top + chartArea.bottom) / 2;
    const r = Math.min(chartArea.width, chartArea.height) * 0.08;

    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },
};

export default function PaymentsBreakdown({ selectedView, timeRange, isPrint }: any) {
  
  const options: ChartOptions<'polarArea'> = {
    responsive: !isPrint,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: ctx => `$ ${ctx.label}: ${ctx.raw}` },
      },
    },
    scales: { r: { display: false } },
  };

  // ==================== DYNAMIC MULTIPLIER BASED ON TIME ====================
  const phaseMultiplier = useMemo(() => {
    switch (timeRange) {
      case '30 Days': return 4.2;
      case 'Mtd': return 3.5;
      case 'Ytd': return 48;
      default: return 1; // 7 Days
    }
  }, [timeRange]);

  const chartDataMap: any = useMemo(() => {
    const m = phaseMultiplier;
    return {
      leads: {
        labels: ['Active', 'Converted', 'Lost'],
        data: [10 * m, 10 * m, 2 * m].map(Math.floor),
        colors: ['#F59E0B', '#10B981', '#eb6969'],
      },
      jobs: {
        labels: ['Pending', 'Completed', 'Cancelled'],
        data: [9 * m, 9 * m, 2 * m].map(Math.floor),
        colors: ['#FBBF24', '#10B981', '#EF4444'],
      },
      payments: {
        labels: ['Paid', 'Pending', 'Overdue'],
        data: [8200 * m, 3500 * m, 750 * m].map(Math.floor),
        colors: ['#0EA5E9', '#FBBF24', '#6B7280'],
      },
    };
  }, [phaseMultiplier]);

  const current = chartDataMap[selectedView] || chartDataMap.payments;
  
  const data = {
    labels: current.labels,
    datasets: [
      {
        data: current.data,
        backgroundColor: current.colors,
        borderWidth: 0,
      },
    ],
  };

  const total = current.data.reduce((a: number, b: number) => a + b, 0);

  return (
    <div className={`flex items-center justify-center ${isPrint ? 'w-full bg-transparent' : 'md:w-full lg:w-auto flex-grow md:bg-white lg:bg-transparent'}`}>
      <div className={`mb-3 w-full ${isPrint ? 'p-0 shadow-none border-none rounded-none' : 'max-w-sm rounded-lg bg-white p-4 lg:shadow-sm sm:max-w-md sm:p-3 md:max-w-sm'}`}>
        {!isPrint && (
          <h2 className="mb-1 text-center text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl">
            {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)} Breakdown
          </h2>
        )}

        <div className={`mx-auto aspect-square w-full ${isPrint ? 'max-w-[400px]' : 'max-w-xs sm:max-w-sm md:max-w-xs'}`}>
          <PolarArea
            data={data}
            options={options}
            plugins={[centerDotPlugin]}
            width={isPrint ? 400 : undefined}
            height={isPrint ? 400 : undefined}
          />
        </div>

        <div className="mb-2 grid grid-cols-1 gap-3 text-center sm:gap-4">
          {data.labels.map((label: string, i: number) => (
            <div key={label} className="w-full flex items-center justify-between">
              <div className="mb-1 flex items-center justify-center">
                <div
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
                />
                <span className="text-xs text-gray-600 sm:text-sm">{label}</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 sm:text-md">
                {selectedView === 'payments' ? `$${data.datasets[0].data[i].toLocaleString()}` : data.datasets[0].data[i].toLocaleString()}
                <span
                  className="text-sm p-1 sm:text-sm ml-2 rounded"
                  style={{
                    backgroundColor: data.datasets[0].backgroundColor[i],
                    color:
                      data.datasets[0].backgroundColor[i]?.includes("gray") ||
                        data.datasets[0].backgroundColor[i] === "#6B7280"
                        ? "white"
                        : "black",
                  }}
                >
                  + {((current.data[i] / total) * 100).toFixed(1)}%
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}