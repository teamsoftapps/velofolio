
import React from 'react';

const LeftHeaderCard = () => {
  return (
    <div className='leftcard p-4 sm:p-6 border-2 text-white rounded-2xl w-full lg:w-1/2 h-auto lg:h-44 flex flex-col sm:flex-row justify-between items-start lg:items-center bg-[url("/baner.svg")] bg-cover bg-center'>
      
      {/* Left Section */}
      <div className="left flex flex-col gap-2 sm:gap-3 w-full sm:w-3/5">
        <div>
          <span className='bg-[#FEBE2A] px-2 py-1 text-black rounded-lg text-xs sm:text-sm'>PRO STUDIO</span> Plan
        </div>
        <p className='text-sm sm:text-base'>
          20 Team Members, 200GB Storage, Unlimited Jobs
        </p>
        <p className='text-sm sm:text-base'>12 of 20 members</p>

        {/* Progress Bar */}
        <div className='w-full sm:w-1/2 border border-white p-1 rounded-full'>
          <div className='w-2/3 bg-white h-2 rounded-full'></div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right flex flex-col gap-2 sm:gap-4 w-full sm:w-1/2 justify-start sm:justify-end items-start sm:items-end mt-4 sm:mt-0">
        <div className='flex items-end relative px-2'>
          <span className='absolute top-0 left-0 text-sm sm:text-base'>$</span>
          <h1 className='text-4xl sm:text-6xl font-bold'>49</h1>
          <span className='text-sm sm:text-base ml-1'>/month</span>
        </div>

        <div className='flex flex-wrap gap-2'>
          <button className='p-2 cursor-pointer border border-white rounded-full text-sm sm:text-base'>
            View Plans
          </button>
          <button className='p-2 cursor-pointer rounded-full text-black bg-[#FEBE2A] text-sm sm:text-base'>
            Upgrade Plan
          </button>
        </div>
      </div>

    </div>
  );
};

export default LeftHeaderCard;
