
/** @format */

import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import { Line } from 'react-chartjs-2';
import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

interface LeadCardProps {
  title: string;
  subtitle?: string;
  count: number | string;
  percentageChange: number;
  theme?: 'blue' | 'yellow' | 'green' | 'gray';
  colorClass?: string;
  countlabel?: string;
  chartData?: number[];
  variant?: 'default' | 'sparkline';
}

const LeadCard = ({
  title,
  subtitle = "(This Week)",
  count,
  percentageChange,
  theme = 'blue',
  colorClass = 'bg-[#01B0E9]',
  countlabel,
  chartData = [10, 15, 8, 12, 18, 14, 22],
  variant = 'default',
}: LeadCardProps) => {
  const isYellow = colorClass.toLowerCase().includes('yellow') || colorClass.toLowerCase().includes('ffb800');
  const textColor = isYellow ? 'text-gray-900' : 'text-white';
  const pillColor = isYellow ? 'bg-black/10 text-gray-900' : 'bg-gray-50/50 text-white';

  if (variant === 'default') {
    return (
      <div className={`rounded-lg p-5 md:p-7 ${colorClass} ${textColor} shadow-md w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] flex-shrink-0`}>
        <h3 className='text-base md:text-lg font-medium'>{title}</h3>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col mt-2 w-auto'>
            <span className='text-xl md:text-3xl font-bold min-w-[85px] '>
              {count} <span className='text-sm font-extralight'>{countlabel}</span>
            </span>
            <span className='text-xs flex items-center mt-1'>
              <span className={`${pillColor} text-sm rounded-sm px-1.5 py-0.5 flex items-center font-medium`}>
                {percentageChange > 0 ? "+" : ""}{percentageChange}% <FaArrowTrendUp className='w-3 h-3 ml-2' />
              </span>
            </span>
          </div>
          <Image src={'/Diagram.svg'} alt='diagram' width={100} height={100} className='w-20 md:w-28 lg:w-40' />
        </div>
      </div>
    );
  }

  const themes = {
    blue: { bg: 'bg-[#DEF5FF]', pillBg: 'bg-[#01B0E9]', pillText: 'text-white', chartColor: '#01B0E9' },
    yellow: { bg: 'bg-[#FFF4D1]', pillBg: 'bg-[#FFB800]', pillText: 'text-gray-900', chartColor: '#FFB800' },
    green: { bg: 'bg-[#E4F9F2]', pillBg: 'bg-[#10B981]', pillText: 'text-white', chartColor: '#10B981' },
    gray: { bg: 'bg-[#F2F4F7]', pillBg: 'bg-[#6B7280]', pillText: 'text-white', chartColor: '#6B7280' },
  };

  const currentTheme = themes[theme];

  const data = {
    labels: chartData.map((_, i) => i),
    datasets: [
      {
        data: chartData,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, currentTheme.chartColor + '66');
          gradient.addColorStop(1, currentTheme.chartColor + '00');
          return gradient;
        },
        borderColor: currentTheme.chartColor,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div className={`p-6 ${currentTheme.bg} rounded-xl border border-white/40 flex flex-col w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] flex-shrink-0 shadow-sm`}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-gray-900 text-[14px] font-semibold">{title}</span>
        <span className="text-[#9CA3AF] text-[14px] font-normal">{subtitle}</span>
      </div>

      <div className="flex justify-between items-end mt-1">
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-gray-900 leading-tight">{count}</span>
          <div className={`mt-2 flex items-center justify-between gap-2 px-2 py-1 ${currentTheme.pillBg} ${currentTheme.pillText} rounded-md text-[11px] font-bold w-full min-w-[80px]`}>
            <span>{percentageChange > 0 ? "+" : ""}{percentageChange.toFixed(2)}%</span>
            {percentageChange >= 0 ? <FaArrowTrendUp className="w-3 h-3" /> : <FaArrowTrendDown className="w-3 h-3" />}
          </div>
        </div>

        <div className="w-24 h-14 sm:w-28 sm:h-18 lg:w-32 lg:h-20 ml-2">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

interface LeadDashboardProps {
  chartData: {
    title: string;
    count: number | string;
    percentageChange: number;
    colorClass?: string;
    countlabel?: string;
    subtitle?: string;
    chartPoints?: number[];
  }[];
  variant?: 'default' | 'sparkline';
}

const OverviewChart = ({ chartData, variant = 'default' }: LeadDashboardProps) => {
  const getTheme = (title: string): 'blue' | 'yellow' | 'green' | 'gray' => {
    const t = title.toLowerCase();
    if (t.includes('new') || t.includes('total') || t.includes('paid')) return 'blue';
    if (t.includes('active') || t.includes('unpaid')) return 'yellow';
    if (t.includes('converted') || t.includes('pending')) return 'green';
    return 'gray';
  };

  const mockCharts = [
    [10, 15, 8, 12, 18, 14, 22],
    [5, 8, 12, 7, 10, 15, 12],
    [2, 5, 4, 8, 12, 10, 10],
    [0, 2, 1, 3, 2, 0, 0],
  ];

  return (
    <div className='w-full flex flex-wrap gap-4 justify-between lg:justify-start my-6'>
      {chartData.map((data, index) => (
        <LeadCard
          key={index}
          title={data.title}
          subtitle={data.subtitle}
          count={data.count}
          percentageChange={data.percentageChange}
          colorClass={data.colorClass}
          countlabel={data.countlabel}
          theme={getTheme(data.title)}
          chartData={data.chartPoints || mockCharts[index] || [0, 0, 0, 0, 0, 0, 0]}
          variant={variant}
        />
      ))}
    </div>
  );
};

export default OverviewChart;
