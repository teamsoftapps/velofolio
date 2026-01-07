import React from 'react'
import GeneralSettings from './GeneralSettings'
import JobsPayment from './Jobs&PaymentDefault'
import WorkflowSettings from './WorkflowSetting'
import FileAutomation from './FileAutomation'

const SystemPrefrences = () => {
  return (
        <div className='w-full h-full text-black pb-16'>
      <div className="header w-full my-10 px-5">
        <h1 className='text-xl'>System Prefrences</h1>
        <p className='mt-3 text-md text-[#71717A]'>Set Default Behaviors for Jobs,Payments,Workflows and automation to match how you work .</p>
      </div>
  <div className="cards pb-3 px-5 w-full flex lg:flex-row flex-col items-center sm:items-start justify-between gap-8">
      <GeneralSettings />
      <JobsPayment />
      </div>
  <div className="cards pb-3 px-5 w-full mt-10 flex lg:flex-row flex-col items-center sm:items-start justify-between gap-8">
      <WorkflowSettings />
      <FileAutomation />
      </div>
       <div className='w-full flex justify-center items-center mt-10'>
                <button className="bg-[#01B0E9] cursor-pointer text-white px-4 py-2 rounded-full mr-2">Save Branding</button>
                <button className="bg-[#F4F4F5] cursor-pointer text-black px-4 py-2 rounded-full border-[#c3c3c7] border-1">Reset to Default</button>
                </div>
    </div>
  )
}

export default SystemPrefrences
