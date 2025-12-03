import { Mail, Phone, MapPin, MoreVertical, Users } from "lucide-react";
import { LiaCitySolid } from "react-icons/lia";

import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";

const ClientCard = ({ data }: any) => {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded-xl border border-gray-300 overflow-hidden inter p-4">
      <div className="p-6 bg-[#E5F7FD] rounded-xl">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
          <div className="flex items-center gap-4 ">
            {/* Show image like your original logic */}
         
               <img
                src={data?.image || "/ClientProfileImage.png"}
                alt={data?.name}
                className="w-20 h-20 rounded-full object-cover shadow-lg"
              />
          
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {data?.name || "Sarah Johnson"}
              </h2>
              <p className="text-md text-black bg-[#FEBE2A] text-center rounded-full w-24 max:w-content">
                {data?.status || "New Lead"}
              </p>
            </div>
          </div>

          <MoreVertical className="w-5 h-5 text-gray-700 cursor-pointer" />
        </div>

        {/* Email */}
        <div className="flex items-center gap-4  mb-4">
          <div className="w-10 h-10 aspect-square sm:w-10 sm:h-10 bg-[#01B0E9] rounded-full flex items-center  justify-center shadow-md">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Email</p>
            <p className="text-sm text-gray-700">
              {data?.email || "sarahjohnson@gmail.com"}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4  mb-4">
          <div className="w-10 h-10 aspect-square sm:w-10 sm:h-10 bg-[#01B0E9] rounded-full flex items-center  justify-center shadow-md">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Phone</p>
            <p className="text-sm text-gray-700">
              {data?.phone || "+1 (514) 550-3281"}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center gap-4   mb-4">
          <div className="w-10 h-10 aspect-square sm:w-10 sm:h-10 bg-[#01B0E9] rounded-full flex items-center  justify-center shadow-md">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Address</p>
            <p className="text-sm text-gray-700">
              {data?.address || "225 Cherry Street #24, New York, NY"}
            </p>
          </div>
        </div>
              <div className="flex items-center gap-4   mb-4">
          <div className="w-10 h-10 aspect-square sm:w-10 sm:h-10 bg-[#01B0E9] rounded-full flex items-center  justify-center shadow-md">
            <LiaCitySolid className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">City</p>
            <p className="text-sm text-gray-700">
              {data?.address || "225 Cherry Street #24, New York, NY"}
            </p>
          </div>
        </div>
              <div className="flex items-center gap-4   mb-4">
          <Image src="/countryIcon.svg" alt="Country" width={40} height={40} />
           <div>
            <p className="text-sm font-semibold text-gray-800">Country</p>
            <p className="text-sm text-gray-700">
              {data?.address || "225 Cherry Street #24, New York, NY"}
            </p>
          </div>
        </div>

        

      </div>
    </div>
  );
};

export default ClientCard;
