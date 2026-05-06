// import { PlayCircleIcon } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'
// import { FaCirclePlay } from "react-icons/fa6";


// const Hero = () => {
//   return (
//     <div className='w-full  h-[65vh] p-4 '>
//        <div className="h-[60vh] flex justify-center flex-col mt-3 p-10 rounded-4xl bg-[url('/images/HeroImage.png')] bg-cover bg-center">

// <div className='w-2/5  '>
//   <div className='mb-10'>
//     <h1 className='text-[55px] leading-18 font-semi-bold'>Simplify Your Studio Workflow – All in One Place</h1>
// <p className='pr-10 text-xl'>Manage clients, jobs, invoices, and your team effortlessly. Take your studio to the next level.</p>
// </div>
// <div className='flex items-center gap-10'>
// <Link
//                 href="/signup"
             
//                 className="px-3 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white font-medium text-center py-3 rounded-full transition-colors"
//               >
//                 Get Started Free
//               </Link>
//     <button className='flex items-center cursor-pointer'> <FaCirclePlay className='mr-2 w-6 h-6 text-white' />
//  Watch Demo</button>

// </div>
    
// </div>
//         </div>

//     </div>
//   )
// }

// export default Heroimport { FaCirclePlay } from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import { FaCirclePlay } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="w-full h-[65vh] p-4">
      <div className="h-[60vh] flex justify-center flex-col mt-3 p-4 sm:p-8 lg:p-10 rounded-4xl bg-[url('/images/HeroImage.png')] bg-cover bg-center">

        <div className="w-full sm:w-full md:w-full lg:w-2/3 max-w-xl lg:max-w-[600px]">
          <div className="mb-4 sm:mb-6 lg:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[65px] leading-snug sm:leading-10 md:leading-snug lg:leading-[4.7rem] font-medium break-words">
              Simplify Your Studio Workflow – All in One Place
            </h1>
            <p className="mt-3 text-base sm:text-lg md:text-xl pr-0 sm:pr-6 lg:pr-10 break-words">
              Manage clients, jobs, invoices, and your team effortlessly. Take your studio to the next level.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Link
              href="/signup"
              className="px-4 sm:px-6 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white font-medium py-2 sm:py-3 rounded-full transition-colors text-center"
            >
              Get Started Free
            </Link>
            <button className="flex items-center cursor-pointer text-white mt-2 sm:mt-0">
              <FaCirclePlay className="mr-2 w-5 sm:w-6 h-5 sm:h-6" /> Watch Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
