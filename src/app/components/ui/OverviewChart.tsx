
/** @format */

import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import Image from 'next/image';
import { colors } from '@/utils/colors';
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
  colorClass = 'bg-[var(--primary-color)]',
  countlabel,
  chartData = [10, 15, 8, 12, 18, 14, 22],
  variant = 'default',
}: LeadCardProps) => {
  const isYellow = colorClass.toLowerCase().includes('yellow') || colorClass.toLowerCase().includes('ffb800');
  const textColor = isYellow ? 'text-gray-900' : 'text-white';
  const pillColor = isYellow ? 'bg-black/10 text-gray-900' : 'bg-gray-50/50 text-white';

  if (variant === 'default') {
    return (
      <div className={`relative overflow-hidden rounded-lg p-5 md:p-7 ${colorClass} ${textColor} shadow-md w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] flex-shrink-0`}>
        <h3 className='relative z-10 text-base md:text-lg font-medium truncate pr-4'>{title}</h3>
        <div className='relative z-10 flex items-end justify-between mt-2'>
          <div className='flex flex-col flex-shrink-0'>
            <span className='text-xl md:text-3xl font-bold min-w-[85px] '>
              {count} <span className='text-sm font-extralight'>{countlabel}</span>
            </span>
            <span className='text-xs flex items-center mt-2 w-max'>
              <span className={`${pillColor} text-sm rounded-sm px-1.5 py-0.5 flex items-center font-medium`}>
                {percentageChange > 0 ? "+" : ""}{percentageChange}% <FiTrendingUp className='w-3 h-3 ml-2 flex-shrink-0' />
              </span>
            </span>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 pointer-events-none object-contain">
          <Image src={'/Diagram.svg'} alt='diagram' width={200} height={100} className='w-[160px] md:w-[180px] h-[70px] md:h-[80px] opacity-90 object-contain object-right-bottom' />
        </div>
      </div>
    );
  }

  const themes = {
    blue: { bgStr: `${colors.primary}15`, pillBg: colors.primary, pillText: colors.white, chartColor: colors.primary },
    yellow: { bgStr: `${colors.warning}20`, pillBg: colors.warning, pillText: colors.gray900, chartColor: colors.warning },
    green: { bgStr: `${colors.success}15`, pillBg: colors.success, pillText: colors.white, chartColor: colors.success },
    gray: { bgStr: `${colors.gray500}15`, pillBg: colors.gray500, pillText: colors.white, chartColor: colors.gray500 },
  };

  const currentTheme = themes[theme];
  const themeSVGs: Record<string, string> = {
    blue: '/bDiagram.svg',
    green: '/greDiagram.svg',
    yellow: '/yDiagram.svg',
    gray: '/gDiagram.svg',
  };

  const diagramSrc = themeSVGs[theme] || '/DiagramBlue.svg';
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
    <div className={`relative overflow-hidden p-5 xl:p-6 rounded-xl border flex flex-col w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] flex-shrink-0 `} style={{ backgroundColor: currentTheme.bgStr, borderColor: 'rgba(255,255,255,0.4)' }}>
      <div className="flex items-center gap-1.5 mb-1 w-full relative z-10">
        <span className="text-gray-900 text-[14px] font-semibold whitespace-nowrap truncate">{title}</span>
        <span className="text-[#9CA3AF] text-[13px] font-normal whitespace-nowrap flex-shrink-0">{subtitle}</span>
      </div>

      <div className="flex justify-between items-end mt-1 w-full flex-1 relative z-10">
        <div className="flex flex-col flex-shrink-0">
          <span className="text-3xl font-semibold text-gray-900 leading-tight">{count}</span>
          <div className={`mt-2 flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold w-max min-w-[80px] justify-between`} style={{ backgroundColor: currentTheme.pillBg, color: currentTheme.pillText }}>
            <span>{percentageChange > 0 ? "+" : ""}{percentageChange.toFixed(2)}%</span>
            {percentageChange >= 0 ? <FiTrendingUp className="w-3 h-3 flex-shrink-0" /> : <FiTrendingDown className="w-3 h-3 flex-shrink-0" />}
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 pointer-events-none">
        <Image src={diagramSrc} alt="diagram" width={200} height={100} className="w-[160px] xl:w-[180px] h-[70px] xl:h-[80px] opacity-90 object-contain object-right-bottom" />
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
    if (t.includes('inactive')) return 'green';
    if (t.includes('new') || t.includes('total') || t.includes('paid') || t.includes('total jobs')) return 'blue';
    if (t.includes('active') || t.includes('pending') || t.includes('unpaid') || t.includes('active jobs')) return 'yellow';
    if (t.includes('converted') || t.includes('overdue') || t.includes('completed')) return 'green';
    if (t.includes('lost') || t.includes('cancelled') || t.includes('upcoming')) return 'gray';
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



