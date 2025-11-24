import { Briefcase, MoreHorizontal } from 'lucide-react'
import React from 'react'

const JobCard = ({data}:any) => {
  return (
      <div >
        <div className="p-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-600" />
              Job Details
            </h3>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreHorizontal size={24}  className="black"/>
            </button>
          </div>
<div className="bg-[#F4F4F5] p-4 rounded-lg">
          {/* Job Title */}
          <h4 className="text-xl font-bold text-gray-900 mb-6">{data.title}</h4>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Job Type</span>
              <span className="font-medium text-gray-900">{data.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="font-semibold text-emerald-600">{data.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shoot Date & Hours</span>
              <span className="font-medium text-gray-900">{data.shootDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location</span>
              <span className="font-medium text-gray-900">{data.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lead Source</span>
              <span className="font-medium text-gray-900">{data.leadSource}</span>
            </div>
          </div>

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