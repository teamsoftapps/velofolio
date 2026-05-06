import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import { FaChartLine, FaCheckCircle, FaStar } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Performance: React.FC = () => {
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Actual Completed Jobs',
        data: [12, 19, 15, 22, 18, 25, 30],
        borderColor: 'var(--primary-color)',
        backgroundColor: 'rgba(1, 176, 233, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Predicted Jobs (AI)',
        data: [14, 18, 17, 24, 20, 27, 33],
        borderColor: '#13CC95',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className='w-full space-y-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-sm text-gray-500'>Productivity Score</p>
            <FaChartLine className='text-[var(--primary-color)]' />
          </div>
          <p className='text-2xl font-bold text-black'>94%</p>
          <p className='text-xs text-[#13CC95] flex items-center mt-1'>
            +4.2% since last month
          </p>
          <div className='w-full bg-gray-100 rounded-full h-1.5 mt-3'>
            <div className='bg-[var(--primary-color)] h-1.5 rounded-full' style={{ width: '94%' }}></div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-sm text-gray-500'>Client Rating</p>
            <FaStar className='text-[#FEBE2A]' />
          </div>
          <p className='text-2xl font-bold text-black'>4.8/5.0</p>
          <p className='text-xs text-[#13CC95] flex items-center mt-1'>
            Based on 32 reviews
          </p>
          <div className='w-full bg-gray-100 rounded-full h-1.5 mt-3'>
            <div className='bg-[#FEBE2A] h-1.5 rounded-full' style={{ width: '96%' }}></div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-200'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-sm text-gray-500'>On-Time Delivery</p>
            <FaCheckCircle className='text-[#13CC95]' />
          </div>
          <p className='text-2xl font-bold text-black'>100%</p>
          <p className='text-xs text-gray-500 flex items-center mt-1'>
            24 consecutive projects
          </p>
          <div className='w-full bg-gray-100 rounded-full h-1.5 mt-3'>
            <div className='bg-[#13CC95] h-1.5 rounded-full' style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      <div className='bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200'>
        <h3 className='text-lg font-semibold text-black mb-1'>Performance & Projections</h3>
        <p className='text-sm text-gray-500 mb-6'>AI-predicted job completion versus actual historical data</p>
        <div className='h-[300px] w-full'>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
      
      <div className='bg-[#E5F7FD] p-4 rounded-xl border border-blue-100'>
        <h4 className='font-semibold text-black mb-2'>AI Recommendation Insights</h4>
        <ul className='list-disc pl-5 space-y-2 text-sm text-gray-700'>
          <li><strong>Increased Demand Prediction:</strong> AI models indicate a 20% spike in workload for August. Consider increasing availability.</li>
          <li><strong>Skill Synergy:</strong> Recent work in "Wedding Shoot" tags has scored consistently higher. Focusing on these jobs maximizes performance.</li>
          <li><strong>Pacing:</strong> Task delivery is averaging 1.5 days ahead of schedule, placing this team member in the top 5% across the organization.</li>
        </ul>
      </div>
    </div>
  );
};

export default Performance;
