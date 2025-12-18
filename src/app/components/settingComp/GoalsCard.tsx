import React from 'react';
import Image from 'next/image';
interface GoalCardProps {
  title: string;
  percentage: number;
  current?: number;
  target: number;
  extra?: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ title, percentage, current, target, extra }) => {
  // Determine bar color based on percentage
  const barColor =
    percentage < 71 ? 'bg-red-500' :
    percentage > 71 && percentage < 74 ? 'bg-yellow-500' :
    percentage > 73 && percentage < 95 ? 'bg-[#01B0E9]' :
    percentage > 95 ? 'bg-green-500' :
    'bg-green-500';

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };


  const getIcon = () => {
    if (title.includes('Revenue')) return <div className="w-12 h-12 bg-[#E5F7FD] rounded-full flex items-center justify-center  text-xl"> <Image src="/revenue-alt.svg" alt="Revenue" width={24} height={24} /></div>;
    if (title.includes('Jobs')) return <div className="w-12 h-12 bg-[#FFF8E9] rounded-full flex items-center justify-center text-orange-600 text-xl"><Image src="/briefcase.svg" alt="Jobs" width={24} height={24} /></div>;
    if (title.includes('Payment')) return <div className="w-12 h-12 bg-[#E7FAF4] rounded-full flex items-center justify-center text-teal-600 text-xl"><Image src="/credit-card.svg" alt="Payment" width={24} height={24} /></div>;
    if (title.includes('Team')) return <div className="w-12 h-12 bg-[#E5E5E5] rounded-full flex items-center justify-center text-gray-600 text-xl"><Image src="/users-alt.svg" alt="Team" width={24} height={24} /></div>;
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6  flex flex-col gap-4 border  border-[#D4D4D8]">
      <div className="flex items-start flex-col gap-4">
        {getIcon()}
        <h3 className="text-black font-medium">{title}</h3>
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <span className="text-3xl font-medium text-gray-900">
          {percentage > 100 ? 100 : percentage}% <span >{extra && <span className=" text-base">{extra}</span>}</span>
        </span>
        {current !== undefined ? (
          <span className="text-lg text-[#818181]">
          {title.includes('Payment') || title.includes('Revenue')
              ?<><span className='font-semibold text-black'>{formatCurrency(current)} </span>/ {formatCurrency(target)}</>
              :<><span className='font-semibold text-black'>{current}</span>/ ${target}</>}
          </span>
        ) : (
          <span className="text-lg text-gray-600">
            
            Target: {target}%
          </span>
        )}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500 rounded-full`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default GoalCard;