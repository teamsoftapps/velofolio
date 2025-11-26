import { MapPin, MoreVertical, Phone } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'


const ClientCard = ({data}:any) => {
  const pathname = usePathname();
  return (
      <div className="bg-[#E5F7FD] rounded-xl border border-gray-200  overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-b-[#C1EBFA]">
            <div className="flex items-center gap-4">
             {pathname === '/jobProfile' && <img
                src={data.image}
                alt="Sarah Johnson"
                className="w-20 h-20 rounded-full object-cover shadow-lg"
              />}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
                <p className="text-sm text-gray-600">{data.email}</p>
              </div>
            </div>
       
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center shadow-md">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Phone</p>
              <p className="text-sm text-gray-700">{data.phone}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center shadow-md">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Address</p>
              <p className="text-sm text-gray-700">{data.address}</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ClientCard