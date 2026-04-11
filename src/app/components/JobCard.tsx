import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

const JobCard = () => (
  <div className='bg-[#F7F8FA] border border-gray-200 rounded-lg p-5 w-full flex-1 min-w-[340px] max-w-[45%] flex flex-col justify-between'>
    <div>
      <div className='flex justify-between items-center mb-4'>
        <span className='px-4 py-1 rounded-full border border-gray-300 text-[13px] font-medium text-gray-500'>Wedding</span>
        <BsThreeDots className='text-gray-400 cursor-pointer' size={24} />
      </div>
      <h4 className='text-lg font-semibold text-gray-900 mb-2'>Pre-Wedding Shoot</h4>
      <p className='text-[14px] text-gray-800 mb-8 leading-relaxed line-clamp-2'>
        Full Edited Video (3 hours), Social<br />Media Teasers (3 clips)
      </p>
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-[14px] font-medium text-gray-500'>Progress</span>
          <span className='text-[14px] font-bold text-gray-900'>75%</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2.5'>
          <div className='bg-[#00B5E2] h-2.5 rounded-full' style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
    <div className='flex justify-between items-center'>
      <div>
        <p className='text-[14px] font-medium text-gray-900 mb-3'>Date: Oct 12, 2025, 5:32 AM</p>
        <div className='flex -space-x-2'>
          {['/teampic1.png', '/teampic2.png', '/teampic3.png'].map((img, i) => (
            <img key={i} src={img} alt='Team' className='w-8 h-8 rounded-full border-2 border-white object-cover' />
          ))}
        </div>
      </div>
      <span className='px-4 py-1.5 mb-8 bg-[#00B5E2] text-white text-[13px] font-semibold rounded-full'>In Progress</span>
    </div>
  </div>
);

export default JobCard;
