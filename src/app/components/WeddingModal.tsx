// import React, { useState } from 'react';
// import { FaPlus, FaMapMarkerAlt } from 'react-icons/fa';
// import { MdEdit, MdClose } from 'react-icons/md';
// import Image from 'next/image';
// import {FaChevronDown} from 'react-icons/fa';
// import { HiMenuAlt2 } from "react-icons/hi";
// import { GrAttachment } from "react-icons/gr";
// import { SlOptions } from "react-icons/sl";
// import { CiImageOn } from "react-icons/ci";



// const PreWeddingModal: React.FC = ({setModal,Modal}:any) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="fixed inset-0 bg-tansparent bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
    
//         <div className="flex flex-col mt-3 items-center">
//           <div className="w-full md:full relative">
//             <div className='w-full flex items-center  justify-between absolute  top-2 px-3'> <span className="py-2 bg-white px-4  text-black text-xs font-semibold  rounded">
//                 PENDING
//               </span>
//               <div className=' flex items-center gap-3'>
//    <button
//           onClick={() => setIsOpen(false)}
//           className=" text-gray-800 hover:text-gray-700 w-10 h-10 bg-white rounded-full text-center flex items-center justify-center"
//         >
//          <CiImageOn size={24}  className='font-semibold'/>
//         </button>
               
//    <button
//           onClick={() => setModal(false)}
//           className=" text-gray-800 hover:text-gray-700 w-10 h-10 bg-white rounded-full text-center flex items-center justify-center"
//         >
//           <MdClose size={24} />
//         </button>
//               </div>
               
//               </div>
//             <img
//               src="/images/prodCardImg.png"
//               alt="Pre-Wedding Shoot"
//               className="w-full h-48 object-cover rounded-lg"
//             />
//           </div>
//           <div className="w-full  md:pl-6 mt-4 md:mt-0">
//             <div className="flex justify-between items-center py-6">
//               <h2 className="text-xl font-bold">Pre-Wedding Shoot - Sarah & John</h2>
             
//             </div>
//             <div className='flex items-start gap-2 p-0'>
//             <div className='left w-1/2 '>
//             <div className="flex space-x-4 mt-2">
//               <button className="flex items-center text-black hover:text-gray-700 border-1 p-2 px-4 border-gray-300 cursor-pointer">
//                 <FaPlus className="mr-1" /> Add
//               </button>
//               <button className="flex items-center text-black hover:text-gray-700 border-1 p-2 px-4 border-gray-300 cursor-pointer">
//                 <FaMapMarkerAlt className="mr-1" /> Location
//               </button>
//             </div>
//             <div className="mt-4 flex items-center gap-9">
//               <div className="flex  flex-col  w-2/12">
//                 <div className="text-gray-600 mr-5">Members</div>
//                 <div className="flex -gap-10 items-center">
//                 <Image src="/teampic3.png" alt="Client" width={40} height={40} />
//                  <Image src="/teampic3.png" alt="Client" width={40} height={40} />
//                   <button className="w-8 h-8 px-2 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
//                     <FaPlus />
//                   </button>
//                 </div>
//               </div>
//               <div className="mt-2  p-3">
//                 <div className="text-gray-600">Client</div>
//               <Image src="/teampic3.png" alt="Client" width={40} height={40} />
//               </div>
//               <div className="mt-2">
//                 <div className="text-gray-600">Due Date</div>
//                 <button
//         className="flex items-center justify-between w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors focus:outline-none"
//         onClick={() => {
//           // Focus the hidden input when button is clicked
//           document.getElementById('hidden-datetime-input')?.focus();
//         }}
//       >
//         <span className="text-sm">
//           {new Date('2023-08-01T12:00:00').toLocaleString('en-US', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//           })}
//         </span>
//         <FaChevronDown className="ml-2 text-gray-500" />
//       </button>
//               </div>
//             </div>
//             <div className="mt-4 ">
//               <div className="flex items-center justify-between">
//                 <div className='flex'>
//                  <button className="text-black">
//                   <HiMenuAlt2 className='w-8 h-8'/>
//                 </button>
//                 <h2 className="text-gray-600 text-lg">Description</h2>
//                 </div>
//            <button className='bg-gray-200 p-1 px-4 text-sm'>Edit</button>
//               </div>
//               <p className="mt-1 text-gray-700">
//                 Footage received from the videographer. Editor to create a 3-minute highlight reel and full-length film by the deadline. Color correction and music selection in progress.
//               </p>
//             </div>
//             <div className="mt-4">
//                 <div className='flex items-center justify-between'>
//                 <div className='flex items-center gap-2'>
//                     <GrAttachment  className='w-6 h-6'/>

//               <h1 className="text-gray-600 text-lg">Attachment</h1>
//                 </div>
//               <button className='bg-gray-300 p-1 px-4 text-sm'>Add</button>
//               </div>
//               <p className='mt-3'>File</p>
//               <div className="flex items-center mt-1">
//                 <img
//                   src="/images/prodCardImg.png"
//                   alt="Attachment"
//                   className="w-28 h-16 object-cover rounded"
//                 />
//                 <div className="ml-2">
//                   <h1 className="text-gray-600 text-lg">wedding.jpg</h1>
//                   <h3 className="text-gray-500 text-sm">Added Nov 1, 2025, 5:59 PM</h3>
//                 </div>
//                 <button className="ml-auto text-black bg-gray-200">
//                  <SlOptions className='w-8 h-6' />

//                 </button>
//               </div>
//             </div>
//           </div>
//                  <div className="mt-6 p-4 bg-gray-100 w-1/2 rounded-lg h-[450px] ">
//           <h3 className="text-lg font-semibold">Comments & Activity</h3>
//           <div className="mt-2">
//             <input
//               type="text"
//               placeholder="Write a comment"
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div className="mt-4 space-y-2">
//             <div className="flex items-start">
//               <img
//                 src="/teampic1.png"
//                 alt="Sarah Johnson"
//                 className="w-10 h-10 rounded-full mr-2"
//               />
//               <div>
//                 <h1 className="text-gray-700"><b>Sarah Johnson</b> moved this card from <b>PENDING</b> to <b>IN PROGRESS</b></h1>
//                 <h3 className=" text-md text-[#00A4DD]">Nov 2, 2025, 12:59 PM</h3>
//               </div>
//             </div>
//             <div className="flex items-start">
//              <img
//                 src="/teampic1.png"
//                 alt="Sarah Johnson"
//                 className="w-10 h-10 rounded-full mr-2"
//               />
//               <div>
//                     <h2 className="text-gray-700"><b>Sarah Johnson</b> moved this card from <b>PENDING</b> to <b>IN PROGRESS</b></h2>
//                 <h3 className=" text-md text-[#00A4DD]">Nov 2, 2025, 12:59 PM</h3>
//               </div>
//             </div>
//           </div>
//         </div>
//         </div>
        
//         </div>
 
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreWeddingModal;
import React, { useState } from 'react';
import { FaPlus, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { HiMenuAlt2 } from "react-icons/hi";
import { GrAttachment } from "react-icons/gr";
import { SlOptions } from "react-icons/sl";
import { CiImageOn } from "react-icons/ci";
import Image from 'next/image';

const PreWeddingModal: React.FC = ({ setModal, Modal }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-0 rounded-lg bg-transparent bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto mt-10">
      <div className="bg-white rounded-xl w-[95%] sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 p-4 sm:p-6 relative my-10 lg:pt-5  h-full overflow-y-auto mt-10 xl:h-auto">
        {/* Header Image Section */}
        <div className="w-full relative   ">
          <div className="absolute top-2 left-2 right-2 flex justify-between items-center px-2 sm:px-3">
            <span className="py-1 sm:py-2 bg-white px-3 sm:px-4 text-black text-xs sm:text-sm font-semibold rounded">
              PENDING
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-gray-700 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
              >
                <CiImageOn size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => setModal(false)}
                className="text-gray-800 hover:text-gray-700 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
              >
                <MdClose size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
          <img
            src="/images/prodCardImg.png"
            alt="Pre-Wedding Shoot"
            className="w-full h-40 sm:h-52 md:h-60 lg:h-64 object-cover rounded-lg"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row mt-4 gap-6">
          {/* Left Side: Details */}
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 lg:border-0">
              <h2 className="text-lg sm:text-xl font-bold text-black">
                Pre-Wedding Shoot - Sarah & John
              </h2>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="flex items-center text-black border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
                <FaPlus className="mr-2" /> Add
              </button>
              <button className="flex items-center text-black border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
                <FaMapMarkerAlt className="mr-2" /> Location
              </button>
            </div>

            {/* Members, Client, Due Date */}
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-6">
              {/* Members */}
              <div className="flex flex-col">
                <div className="text-gray-600 text-sm">Members</div>
                <div className="flex items-center mt-1 space-x-2">
                  <Image src="/teampic3.png" alt="Member" width={36} height={36} className="rounded-full" />
                  <Image src="/teampic3.png" alt="Member" width={36} height={36} className="rounded-full" />
                  <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* Client */}
              <div className="flex flex-col">
                <div className="text-gray-600 text-sm">Client</div>
                <Image src="/teampic3.png" alt="Client" width={36} height={36} className="rounded-full mt-1" />
              </div>

              {/* Due Date */}
              <div className="flex flex-col w-full sm:w-auto">
                <div className="text-gray-600 text-sm">Due Date</div>
                <button
                  className="flex items-center justify-between w-full sm:w-48 px-1 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors mt-1"
                  onClick={() => document.getElementById('hidden-datetime-input')?.focus()}
                >
                  <span className="text-sm">
                    {new Date('2023-08-01T12:00:00').toLocaleString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <FaChevronDown className="ml-2 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HiMenuAlt2 className="text-gray-600 w-6 h-6" />
                  <h2 className="text-gray-900 font-semibold text-lg">Description</h2>
                </div>
                <button className="text-gray-900 bg-gray-200 px-4 py-1 text-sm  rounded cursor-pointer">Edit</button>
              </div>
              <p className="mt-2 text-gray-700 text-sm sm:text-base">
                Footage received from the videographer. Editor to create a 3-minute highlight reel and full-length film by the deadline. Color correction and music selection in progress.
              </p>
            </div>

            {/* Attachment */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GrAttachment className="text-gray-600 w-5 h-5" />
                  <h1 className="text-gray-600 font-semibold text-lg">Attachment</h1>
                </div>
                <button className="bg-gray-300 px-4 py-1 text-sm rounded text-gray-900 cursor-pointer">Add</button>
              </div>
              <div className="mt-3 flex items-center flex-wrap lg:flex-nowrap gap-3">
                <img
                  src="/images/prodCardImg.png"
                  alt="Attachment"
                  className="w-28 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-[150px]">
                  <h1 className="text-gray-700 font-medium text-sm sm:text-base">wedding.jpg</h1>
                  <h3 className="text-gray-500 text-xs sm:text-sm">Added Nov 1, 2025, 5:59 PM</h3>
                </div>
                <button className="text-black bg-gray-200 p-2 rounded cursor-pointer">
                  <SlOptions className="w-5 h-5 " />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Comments & Activity */}
          <div className="w-full lg:w-1/2 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-black">Comments & Activity</h3>
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full mt-2 p-2 text-gray-600 rounded text-sm sm:text-base bg-white border-0 outline-0"
            />
            <div className="mt-4 space-y-4 max-h-[300px] overflow-y-auto">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <img
                    src="/teampic1.png"
                    alt="Sarah Johnson"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-gray-700 text-sm sm:text-base">
                      <b>Sarah Johnson</b> moved this card from <b>PENDING</b> to <b>IN PROGRESS</b>
                    </p>
                    <h3 className="text-xs sm:text-sm text-[#00A4DD]">Nov 2, 2025, 12:59 PM</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreWeddingModal;
