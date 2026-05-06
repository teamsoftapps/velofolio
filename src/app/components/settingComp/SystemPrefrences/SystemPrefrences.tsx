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
  <div className="cards pb-3 px-5 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
      <GeneralSettings />
      <JobsPayment />
      </div>
  <div className="cards pb-3 px-5 w-full mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <WorkflowSettings />
      <FileAutomation />
      </div>
       <div className='w-full flex flex-col sm:flex-row justify-center items-center mt-10 gap-4 sm:gap-2'>
                <button className="bg-[var(--primary-color)] cursor-pointer text-white px-8 py-2 rounded-full w-full sm:w-auto">Save Branding</button>
                <button className="bg-[#F4F4F5] cursor-pointer text-black px-8 py-2 rounded-full border-[#c3c3c7] border w-full sm:w-auto">Reset to Default</button>
                </div>
    </div>
  )
}

export default SystemPrefrences
