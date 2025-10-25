import React, { useState } from 'react';
import { FaPlus, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEdit, MdClose } from 'react-icons/md';
import Image from 'next/image';
import {FaChevronDown} from 'react-icons/fa';
import { HiMenuAlt2 } from "react-icons/hi";
import { GrAttachment } from "react-icons/gr";
import { SlOptions } from "react-icons/sl";
import { CiImageOn } from "react-icons/ci";



const PreWeddingModal: React.FC = ({setModal,Modal}:any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-tansparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
    
        <div className="flex flex-col mt-3 items-center">
          <div className="w-full md:full relative">
            <div className='w-full flex items-center  justify-between absolute  top-2 px-3'> <span className="py-2 bg-white px-4  text-black text-xs font-semibold  rounded">
                PENDING
              </span>
              <div className=' flex items-center gap-3'>
   <button
          onClick={() => setIsOpen(false)}
          className=" text-gray-800 hover:text-gray-700 w-10 h-10 bg-white rounded-full text-center flex items-center justify-center"
        >
         <CiImageOn size={24}  className='font-semibold'/>
        </button>
               
   <button
          onClick={() => setModal(false)}
          className=" text-gray-800 hover:text-gray-700 w-10 h-10 bg-white rounded-full text-center flex items-center justify-center"
        >
          <MdClose size={24} />
        </button>
              </div>
               
              </div>
            <img
              src="/images/prodCardImg.png"
              alt="Pre-Wedding Shoot"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="w-full  md:pl-6 mt-4 md:mt-0">
            <div className="flex justify-between items-center py-6">
              <h2 className="text-xl font-bold">Pre-Wedding Shoot - Sarah & John</h2>
             
            </div>
            <div className='flex items-start gap-2 p-0'>
            <div className='left w-1/2 '>
            <div className="flex space-x-4 mt-2">
              <button className="flex items-center text-black hover:text-gray-700 border-1 p-2 px-4 border-gray-300 cursor-pointer">
                <FaPlus className="mr-1" /> Add
              </button>
              <button className="flex items-center text-black hover:text-gray-700 border-1 p-2 px-4 border-gray-300 cursor-pointer">
                <FaMapMarkerAlt className="mr-1" /> Location
              </button>
            </div>
            <div className="mt-4 flex items-center gap-9">
              <div className="flex  flex-col  w-2/12">
                <div className="text-gray-600 mr-5">Members</div>
                <div className="flex -gap-10 items-center">
                <Image src="/teampic3.png" alt="Client" width={40} height={40} />
                 <Image src="/teampic3.png" alt="Client" width={40} height={40} />
                  <button className="w-8 h-8 px-2 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className="mt-2  p-3">
                <div className="text-gray-600">Client</div>
              <Image src="/teampic3.png" alt="Client" width={40} height={40} />
              </div>
              <div className="mt-2">
                <div className="text-gray-600">Due Date</div>
                <button
        className="flex items-center justify-between w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors focus:outline-none"
        onClick={() => {
          // Focus the hidden input when button is clicked
          document.getElementById('hidden-datetime-input')?.focus();
        }}
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
            <div className="mt-4 ">
              <div className="flex items-center justify-between">
                <div className='flex'>
                 <button className="text-black">
                  <HiMenuAlt2 className='w-8 h-8'/>
                </button>
                <h2 className="text-gray-600 text-lg">Description</h2>
                </div>
           <button className='bg-gray-200 p-1 px-4 text-sm'>Edit</button>
              </div>
              <p className="mt-1 text-gray-700">
                Footage received from the videographer. Editor to create a 3-minute highlight reel and full-length film by the deadline. Color correction and music selection in progress.
              </p>
            </div>
            <div className="mt-4">
                <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <GrAttachment  className='w-6 h-6'/>

              <h1 className="text-gray-600 text-lg">Attachment</h1>
                </div>
              <button className='bg-gray-300 p-1 px-4 text-sm'>Add</button>
              </div>
              <p className='mt-3'>File</p>
              <div className="flex items-center mt-1">
                <img
                  src="/images/prodCardImg.png"
                  alt="Attachment"
                  className="w-28 h-16 object-cover rounded"
                />
                <div className="ml-2">
                  <h1 className="text-gray-600 text-lg">wedding.jpg</h1>
                  <h3 className="text-gray-500 text-sm">Added Nov 1, 2025, 5:59 PM</h3>
                </div>
                <button className="ml-auto text-black bg-gray-200">
                 <SlOptions className='w-8 h-6' />

                </button>
              </div>
            </div>
          </div>
                 <div className="mt-6 p-4 bg-gray-100 w-1/2 rounded-lg h-[450px] ">
          <h3 className="text-lg font-semibold">Comments & Activity</h3>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Write a comment"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-start">
              <img
                src="/teampic1.png"
                alt="Sarah Johnson"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <h1 className="text-gray-700"><b>Sarah Johnson</b> moved this card from <b>PENDING</b> to <b>IN PROGRESS</b></h1>
                <h3 className=" text-lg text-blue-600">Nov 2, 2025, 12:59 PM</h3>
              </div>
            </div>
            <div className="flex items-start">
             <img
                src="/teampic1.png"
                alt="Sarah Johnson"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                    <h2 className="text-gray-700"><b>Sarah Johnson</b> moved this card from <b>PENDING</b> to <b>IN PROGRESS</b></h2>
                <h3 className=" text-lg text-blue-600">Nov 2, 2025, 12:59 PM</h3>
              </div>
            </div>
          </div>
        </div>
        </div>
        
        </div>
 
        </div>
      </div>
    </div>
  );
};

export default PreWeddingModal;