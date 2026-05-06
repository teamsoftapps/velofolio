// import Image from 'next/image'
// import React from 'react'
// import { IoMdArrowRoundUp } from "react-icons/io";

// const PerfomanceSummary = () => {
//   return (
//     <div className='bg-white rounded-2xl p-7 w-2/6 h-80 text-black'>
//         <h1 className='text-xl mb-3'>PerfomanceSummary</h1>
//     <ul>
//         <li className='bg-[#F4F4F5] flex items-center justify-between p-3 rounded-lg border border-[#D4D4D8]'>
//           <div className='flex gap-2 items-center'>
//             <Image src="/revenue-alt.svg" alt="icon-revenue" width={20} height={20} />
//             <h3>Revenue Trend</h3>
//             </div>
//             <div className='flex items-center gap-1'>
//                 <IoMdArrowRoundUp  className='text-[var(--primary-color)] bg-[#DBEDF4] w-5 h-5'/>
//                 <h3 className='text-[var(--primary-color)]'>+12.5%</h3>
//                 <p className='text-sm'>vs last month</p>
//             </div>
//         </li>
//     </ul>
        
        
//         </div>
//   )
// }

// export default PerfomanceSummary
import React from 'react';
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from 'react-icons/io';
import Image from 'next/image';

interface PerformanceItem {
  title: string;
  percentage: number; // can be positive or negative
  comparison: string; // e.g., "vs last month"
}

const performanceData: PerformanceItem[] = [
  {
    title: 'Revenue Trend',

    percentage: 12.5,
    comparison: 'vs last month',
  },
  {
    title: 'Jobs Completed',
    percentage: -5.3,
    comparison: 'Jobs behind target',
  },
  {
    title: 'Payments',
    percentage: 8.7,
    comparison: 'vs last month',
  },
  {
    title: 'Team Productivity',
    percentage: -2.1,
    comparison: 'vs last month',
  },
];

const PerformanceSummary: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-7 w-full lg:max-w-lg shadow-sm border border-gray-100">
      <h1 className="text-xl font-semibold text-gray-900 mb-5">
        Performance Summary
      </h1>

      <ul className="space-y-3">
        {performanceData.map((item, index) => {
          const isPositive = item.percentage > 0;
          const absPercentage = Math.abs(item.percentage);

          return (
            <li
              key={index}
              className="bg-gray-50 flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-6 h-6 flex items-center justify-center bg-gray-100 rounded-lg">
                  <Image
                    src="/revenue-alt.svg"
                    alt={`${item.title} icon`}
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-medium text-gray-800 text-base">{item.title}</h3>
              </div>

              <div className="flex items-center gap-2 text-sm">
                {isPositive ? (
                  <IoMdArrowRoundUp className="text-[#13B5EA] bg-[#13B5EA]/10 w-6 h-6 p-1 rounded" />
                ) : (
                  <IoMdArrowRoundDown className="text-red-500 bg-red-100 w-6 h-6 p-1 rounded" />
                )}

                <span
                  className={`font-semibold ${
                    isPositive ? 'text-[#13B5EA]' : 'text-red-600'
                  }`}
                >
                  {isPositive ? '+' : ''}{absPercentage.toFixed(1)}%
                </span>
                <span className="text-gray-500">{item.comparison}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PerformanceSummary;
