import React, { useState } from 'react'
import { BiRightArrowAlt } from 'react-icons/bi';

const WorkflowSettings = () => {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  return (
    <div className='lg:w-3xl w-full border border-[#E0E0E2] bg-white p-6 rounded-2xl'>
        <h1 className='text-xl mb-7'>Workflow Settings</h1>
        <div className='w-full space-y-7  p-4'>
            <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between min-w-[200px] border-1 rounded-md px-4 py-2'>
                <h3  className='flex items-center gap-3 '>Auto Correct Lead <BiRightArrowAlt  className='w-5 h-5'/> Job when Quote is Accepted</h3>
                  <button
              onClick={() => {
                setIs2FAEnabled(!is2FAEnabled);
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                is2FAEnabled ? "bg-[#01B0E9]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  is2FAEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            </div>
                        <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between min-w-[200px] border-1 rounded-md px-4 py-2'>
                <h3  className='flex items-center gap-3 '>Auto Correct Lead <BiRightArrowAlt  className='w-5 h-5'/> Job when Quote is Accepted</h3>
                  <button
              onClick={() => {
                setIs2FAEnabled(!is2FAEnabled);
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                is2FAEnabled ? "bg-[#01B0E9]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  is2FAEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            </div>

                        <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between min-w-[200px] border-1 rounded-md px-4 py-2'>
                <h3  className='flex items-center gap-3 '>Auto Correct Lead <BiRightArrowAlt  className='w-5 h-5'/> Job when Quote is Accepted</h3>
                  <button
              onClick={() => {
                setIs2FAEnabled(!is2FAEnabled);
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                is2FAEnabled ? "bg-[#01B0E9]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  is2FAEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            </div>


      

               <div className='flex items-center justify-between w-full'>
                <h3 className='text-lg'>First Day of the Week </h3>
                <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                    <option value="english">Monday</option>
                    <option value="english">Sunday</option>
                    <option value="english">Teusday</option>
                </select>
            </div>
        </div>
      
    </div>
  )
}

export default WorkflowSettings
