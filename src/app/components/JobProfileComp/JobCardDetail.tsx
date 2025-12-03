import React from 'react'

const JobCardDetail = ({data}:any) => {
  return (
             <div className="space-y-2 text-sm inter">
            <div className="flex justify-between">
              <span className="text-gray-600">Job Type</span>
              <span className="font-medium text-gray-900">{data?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="font-semibold text-emerald-600">{data?.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shoot Date & Hours</span>
              <span className="font-medium text-gray-900">{data?.shootDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location</span>
              <span className="font-medium text-gray-900">{data?.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lead Source</span>
              <span className="font-medium text-gray-900">{data?.leadSource}</span>
            </div>
          </div>
  )
}

export default JobCardDetail