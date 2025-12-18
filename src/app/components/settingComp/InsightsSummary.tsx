import React from 'react';
import { TbBulbFilled } from 'react-icons/tb';

interface Insight {
  message: string;
}

const insightsData: Insight[] = [
  {
    message: 'You need $6,800 more to reach your revenue goal this month.',
  },
 
  {
    message: 'Payment collection exceeded goal by $1,400 this month. Great job!',
  },
  {
    message: '6 jobs remaining to hit your monthly target of 20.',
  },
];

const InsightsSummary: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-7  w-full lg:max-w-lg shadow-sm border border-gray-100 min-h-86">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Insights Summary
      </h1>

      <ul className="space-y-3">
        {insightsData.map((insight, index) => (
          <li
            key={index}
            className="bg-[#E5F7FD] flex items-start gap-4 p-2 rounded-xl transition-all hover:shadow-sm"
          >
            <div className="flex-shrink-0 mt-0.5">
              <TbBulbFilled className="text-black w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-800 leading-relaxed">
              {insight.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InsightsSummary;