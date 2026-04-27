import React from "react";
import { Mail, Phone, MapPin, Trash2, Edit2, Camera, Globe, Building2, ChevronDown } from "lucide-react";
import Image from "next/image";

const ClientProfileCard = ({ data, onEditClick, onDeleteClick }: any) => {
  return (
    <div className="w-full bg-white rounded-[16px] border border-gray-200 p-8 overflow-hidden flex flex-col gap-4 h-fit shrink-0">
      {/* Top Header Section */}
      <div className="flex items-start justify-between border-b border-gray-200 pb-5 flex-wrap">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden border border-gray-50">
              <Image
                src={data?.avatar || "/teampic1.png"}
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 bg-black rounded-full border-2 border-white flex items-center justify-center cursor-pointer shadow-sm">
              <Camera className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[18px] font-semibold text-gray-950 leading-tight">
              {data?.name || "Sarah Johnson"}
            </h2>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F4F6] text-gray-700 text-[13px] font-medium w-fit cursor-pointer hover:bg-gray-200 transition-colors">
              <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
              {data?.status || "Active"}
              <ChevronDown className="w-4 h-4 ml-1 opacity-60" />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onDeleteClick}
            className="w-11 h-11 rounded-full bg-[#FEF2F2] text-[#EF4444] hover:bg-[#FEE2E2] transition-colors flex items-center justify-center"
          >
            <Trash2 className="w-[18px] h-[18px]" />
          </button>
          <button
            onClick={onEditClick}
            className="w-11 h-11 rounded-full bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] transition-colors flex items-center justify-center"
          >
            <Edit2 className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* <div className="h-[1px] w-full bg-gray-50 " /> */}

      {/* Info Sections */}
      <div className="space-y-5 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center border border-transparent flex-shrink-0">
            <Mail className="w-[20px] h-[20px] text-gray-900 opacity-80" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-[13px] text-gray-400 font-medium tracking-tight mb-0.5">Email</p>
            <p className="text-[15px] text-gray-900 font-medium truncate">{data?.email || "sarahjohnson@gmail.com"}</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center border border-transparent flex-shrink-0">
            <Phone className="w-[20px] h-[20px] text-gray-900 opacity-80" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-[13px] text-gray-400 font-medium tracking-tight mb-0.5">Phone</p>
            <p className="text-[15px] text-gray-900 font-medium truncate">{data?.phone || "+1(514) 550-3281"}</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center border border-transparent flex-shrink-0">
            <MapPin className="w-[20px] h-[20px] text-gray-900 opacity-80" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-[13px] text-gray-400 font-medium tracking-tight mb-0.5">Street Address</p>
            <p className="text-[15px] text-gray-900 font-medium truncate">{data?.address || "225 Cherry Street #24, New York, NY"}</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center border border-transparent flex-shrink-0">
            <Building2 className="w-[20px] h-[20px] text-gray-900 opacity-80" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-[13px] text-gray-400 font-medium tracking-tight mb-0.5">City</p>
            <p className="text-[15px] text-gray-900 font-medium truncate">{data?.city || "New York"}</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center border border-transparent flex-shrink-0">
            <Globe className="w-[20px] h-[20px] text-gray-900 opacity-80" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-[13px] text-gray-400 font-medium tracking-tight mb-0.5">Country</p>
            <p className="text-[15px] text-gray-900 font-medium truncate">{data?.country || "USA"}</p>
          </div>
        </div>
      </div>

      {/* <div className="h-[1px] w-full bg-gray-50" /> */}

      {/* Notes Section */}
      <div >
        <h3 className="text-[20px] font-bold text-gray-900 mb-4">Notes</h3>
        <p className="text-[15px] text-gray-950 leading-[1.8] font-medium opacity-90">
          {data?.notes || "During our initial consultation, Sarah mentioned that she prefers a pastel color theme for the wedding and wants extra focus on candid shots. She also requested a highlight reel for social media, in addition to the full video package. Need to confirm the exact start time for the reception."}
        </p>
      </div>
    </div>
  );
};

export default ClientProfileCard;
