
/** @format */

import { FaArrowTrendUp } from 'react-icons/fa6';
import Image from 'next/image';

interface LeadCardProps {
  title: string;
  count: number|string;
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
    <div
      className={`rounded-lg p-5 md:p-7 ${colorClass} text-white shadow-md
       w-[94%] sm:w-[48%] md:w-[48%] lg:w-[24%]`}
    >
      <h3 className='text-base md:text-lg font-medium'>{title}</h3>

      <div className='flex items-center justify-between'>
        <div className='flex flex-col mt-2 w-auto'>
          <span className='text-xl md:text-2xl font-bold'>{count}</span>
          <span className='text-xs flex items-center mt-1'>
            <span className='bg-gray-50/50 text-sm rounded-sm px-1 flex items-center'>
              +{percentageChange}% <FaArrowTrendUp className='w-3 h-3 ml-2' />
            </span>
          </span>
        </div>

        <Image
          src={'/Diagram.svg'}
          alt='diagram'
          width={100}
          height={100}
          className='w-20 md:w-28 lg:w-48'
        />
      </div>
    </div>
  );
};

interface LeadDashboardProps {
  chartData: {
    title: string;
    count: number|string;
    percentageChange: number;
    colorClass: string;
  }[];
}

const LeadDashboard = ({ chartData }: LeadDashboardProps) => {
  return (
    <div className='w-full flex flex-wrap gap-4 lg:flex-nowrap mx-2 md:mx-0 md:px-2'>
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
