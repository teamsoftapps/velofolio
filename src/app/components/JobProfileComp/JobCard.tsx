import { Briefcase, MoreHorizontal } from 'lucide-react'
import React from 'react'
import JobCardDetail from './JobCardDetail'

const JobCard = ({data}:any) => {
  return (
      <div className='inter' >
        <div className="p-1 inter">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 inter">
              <Briefcase className="w-5 h-5 text-gray-600" />
              Job Details
            </h3>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreHorizontal size={24}  className="black"/>
            </button>
          </div>
<div className="bg-[#F4F4F5] p-4 rounded-lg">
          {/* Job Title */}
          <h4 className="text-xl font-bold text-gray-900 mb-6">{data?.title}</h4>

          {/* Details */}
<JobCardDetail data={data} />

          {/* Assigned Team */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Assigned Team</span>
              <div className="flex -space-x-3">
                <img
                  src="/teampic1.png"
                  alt="Team"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow"
                />
                <img
                  src="/teampic2.png"
                  alt="Team"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow"
                />
                <img
                  src="/teampic3.png"
                  alt="Team"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow"
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  )
}

export default JobCard