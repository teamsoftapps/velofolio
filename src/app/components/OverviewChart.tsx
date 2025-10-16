/** @format */

import { FiArrowUp } from 'react-icons/fi';
import { TbChartLine } from 'react-icons/tb';
import { FaArrowTrendUp } from 'react-icons/fa6';
import Image from 'next/image';
interface LeadCardProps {
  title: string;
  count: number;
  percentageChange: number;
  colorClass: string;
}
const LeadCard = ({
  title,
  count,
  percentageChange,
  colorClass,
}: LeadCardProps) => {
  return (
    <div className={`rounded-lg p-7  ${colorClass} text-white shadow-md  w-84`}>
      <h3 className='text-lg font-medium'>{title}</h3>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col mt-2 w-40  '>
          <span className='text-2xl font-bold'>{count}</span>
          <span className='text-xs flex items-center'>
            <span className='bg-gray-50/50 text-sm  w-16 px-1 flex items-center'>
              +{percentageChange}% <FaArrowTrendUp className='w-3 h-3 ml-2' />
            </span>
          </span>
        </div>

        <Image
          src={'/Diagram.svg'}
          alt='diagram'
          width={100}
          height={100}
          className='w-40'
        />
      </div>
    </div>
  );
};

interface LeadDashboardProps {
  chartData: {
    title: string;
    count: number;
    percentageChange: number;
    colorClass: string;
  }[];
}
const LeadDashboard = ({ chartData }: LeadDashboardProps) => {
  return (
    <div className='w-full flex items-center justify-between'>
      {chartData.map((data, index) => (
        <LeadCard
          key={index}
          title={data.title}
          count={data.count}
          percentageChange={data.percentageChange}
          colorClass={data.colorClass}
        />
      ))}
    </div>
  );
};

export default LeadDashboard;
