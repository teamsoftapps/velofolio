import React from 'react';
import Image from 'next/image';

const LogoSetting = () => {
  return (
    <div className="mt-10 w-full sm:w-2/3 px-2">
      {/* Flex container – wraps on small screens */}
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full">
        
        {/* Logo image – fixed square, scales down on tiny screens */}
        <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[10px] border-[#EFEFEF] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/logo2.png"
            alt="Logo"
            width={40}
            height={40}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text + buttons – takes remaining space */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-black">Logo</h1>

          {/* Paragraph – responsive line-clamp & text size */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed ">
            Your logo must be at least 300px on the shortest side. Recommended size
            is 900px × 450px (RGB). Acceptable file formats are JPG and PNG. Max
            file size 2 MB and should not exceed 2000px × 2000px.
          </p>

          {/* Buttons – stack on xs, side-by-side on sm+ */}
    <div className='flex items-center gap-3 '>
        <button className='bg-[#01B0E9] p-1 px-3 cursor-pointer rounded-full text-white'>Update </button><button className='cursor-pointer border p-1 px-2 rounded-full border-gray-300 text-black'>Remove</button>
      </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSetting;