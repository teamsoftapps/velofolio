import React from 'react'
import ReportSettings from './ReportPrefrencesOptions'
import AddButton from '@/app/components/ui/AddButton'

const ReportingPrefrences = () => {
  return (
    <div className=" ml-4 rounded-2xl p-2  w-full lg:max-w-lg  ">
                      <h1 className="text-xl font-semibold text-gray-900 mb-6">Reporting Prefrences</h1>
                      <ReportSettings />
                     <button className="flex items-center cursor-pointer text-white  sm:mt-10 bg-[var(--primary-color)] rounded-4xl p-2 px-4 mt-3">
                   Save Prefrences
                     </button>


    </div>
  )
}

export default ReportingPrefrences
