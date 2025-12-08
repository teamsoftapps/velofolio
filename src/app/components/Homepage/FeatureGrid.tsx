// // components/FeaturesGrid.tsx
// 'use client';

// import { BsArrowUpRightCircle } from "react-icons/bs";

// export default function FeaturesGrid() {
//   return (
//    <div className='h-full mt-20 p-3 text-white'>
//     <div className=' w-full h-full flex  justify-between gap-10'>
//         <div className='w-[63%] h-[70vh] flex flex-col justify-between p-1'>
//         <div className='w-full flex justify-end flex-col p-7 h-80  rounded-3xl bg-[url("/images/col11.png")] bg-cover'>
//         <div className='flex items-center justify-between w-full text-white'>
//             <h1 className='text-2xl'>All-in-One <br /> Dashboard</h1>
//             <p className='w-70 text-lg'>Monitor clients, jobs, payments, and tasks at a glance.</p>
//         </div>
//         </div>
//         <div className='w-full    rounded-3xl flex items-center justify-between gap-8 px-2'>
//             <div className='w-1/2 flex justify-end flex-col  p-7  h-74 rounded-2xl  bg-[url("/images/col12.png")] bg-cover'>
//              <h1 className='text-2xl'>Seamless Team  <br /> Management</h1>
//              </div>
//             <div className='w-1/2  h-74 rounded-2xl flex justify-end flex-col  p-7  bg-[url("/images/col13.png")] bg-cover'>
//              <h1 className='text-2xl'>Automated Quotes <br /> & Invoices</h1> </div>
//         </div>

//         </div>

//         <div className=' w-2/6 h-[70vh] flex flex-col gap-2 justify-between '>
//         <div className='w-full flex justify-end flex-col  p-7  h-[50vh] rounded-3xl  bg-[url("/images/col21.png")] bg-cover'>
//   <h1 className='text-2xl'>Client Portal & <br /> Communication</h1>
//         </div>
//          <div className='relative w-full h-[25vh] flex justify-end flex-col p-7  bg-black rounded-3xl'>
//           <BsArrowUpRightCircle className='w-8 h-8 text-white absolute top-6 right-6' />
//   <h1 className='text-2xl'>Boost Your  <br /> Studio Now</h1>
//         </div>

//         </div>

//     </div>

//    </div>
//   );
// }
'use client';

import { BsArrowUpRightCircle } from "react-icons/bs";

export default function FeaturesGrid() {
  return (
    <div className='h-full mt-20 p-3 text-white'>
      <div className='flex flex-col lg:flex-row w-full h-full gap-6 lg:gap-10'>

        {/* Left Section */}
        <div className='w-full lg:w-[63%] h-auto lg:h-[70vh] flex flex-col justify-between p-1 gap-4 lg:gap-0'>
          {/* Top Large Card */}
          <div className='w-full mb-4 h-64 sm:h-80 lg:h-80 flex justify-end flex-col p-7 rounded-3xl bg-[url("/images/col11.png")] bg-cover'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between w-full text-white gap-2'>
              <h1 className='text-2xl'>All-in-One <br /> Dashboard</h1>
              <p className='w-full sm:w-70 text-lg'>Monitor clients, jobs, payments, and tasks at a glance.</p>
            </div>
          </div>

          {/* Bottom Two Cards */}
          <div className='w-full flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-8 px-0 lg:px-2'>
            <div className='w-full sm:w-1/2 h-60 lg:h-74 flex justify-end flex-col p-5 lg:p-7 rounded-2xl bg-[url("/images/col12.png")] bg-cover'>
              <h1 className='text-2xl'>Seamless Team <br /> Management</h1>
            </div>
            <div className='w-full sm:w-1/2 h-60 lg:h-74 flex justify-end flex-col p-5 lg:p-7 rounded-2xl bg-[url("/images/col13.png")] bg-cover'>
              <h1 className='text-2xl'>Automated Quotes <br /> & Invoices</h1>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className='w-full lg:w-2/6 h-auto lg:h-[70vh] flex flex-col gap-4'>
          <div className='w-full h-48 sm:h-60 lg:h-[50vh] flex justify-end flex-col p-5 lg:p-7 rounded-3xl bg-[url("/images/col21.png")] bg-cover'>
            <h1 className='text-2xl'>Client Portal & <br /> Communication</h1>
          </div>
          <div className='relative w-full h-36 sm:h-44 lg:h-[25vh] flex justify-end flex-col p-5 lg:p-7 bg-black rounded-3xl'>
            <BsArrowUpRightCircle className='w-8 h-8 text-white absolute top-4 sm:top-6 right-4 sm:right-6' />
            <h1 className='text-2xl'>Boost Your <br /> Studio Now</h1>
          </div>
        </div>

      </div>
    </div>
  );
}
