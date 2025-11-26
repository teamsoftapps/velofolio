import { PlusIcon } from 'lucide-react'
import React from 'react'
import { LuNetwork } from 'react-icons/lu'
import TimeLine from './TimeLine'


const WorkflowSteps = () => {
  return (
            <div className='w-full  text-black h-full mt-9'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
            <LuNetwork size={28} /> 
            <h1 className='text-xl'>Workflow</h1>
          </div>
          <button className='bg-[#01B0E9] w-9 text-white h-9 rounded-full flex items-center justify-center'><PlusIcon size={28} /></button>
          </div>
    <TimeLine />








        </div>
  )
}

export default WorkflowSteps