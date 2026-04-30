import React, { useState } from 'react'
import { BiRightArrowAlt } from 'react-icons/bi';
import SettingToggle from "./SettingToggle"
import useSettings  from "./SettingsHook"
const workflowConfig = [
  {
    key: "autoLeadToJob",
    label: "Auto Correct Lead → Job when Quote is Accepted",
  },
  {
    key: "anotherSetting",
    label: "Another Setting",
  },
  {
    key: "thirdSetting",
    label: "Third Setting",
  },
];
const WorkflowSettings = () => {
    const {settings, toggleSetting} = useSettings({
  autoLeadToJob: false,
  anotherSetting: false,
  thirdSetting: false,
});


  return (
    <div className='w-full border border-[#E0E0E2] bg-white p-6 rounded-2xl'>
        <h1 className='text-xl mb-7'>Workflow Settings</h1>
        <div className='w-full space-y-7  p-4'>
       {workflowConfig.map((item:any)=>(
<SettingToggle
key={item.key}
  label={item.label}
  value={settings[item.key]}
  onChange={() => toggleSetting(item.key)}
      />
       )) }


      

               <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-0'>
                <h3 className='text-lg mb-2 sm:mb-0'>First Day of the Week </h3>
                <select name="" id="" className='bg-[#F4F4F5] border-gray-300 w-full sm:min-w-[200px] sm:w-auto border-1 rounded-md px-4 py-2'>
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
