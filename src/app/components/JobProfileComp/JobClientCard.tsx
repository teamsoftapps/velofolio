import {
  Phone,
  MapPin,
  MoreVertical,
  Briefcase,
  MoreHorizontal,
} from "lucide-react";
import { RiTeamFill } from "react-icons/ri";
import JobCard from "./JobCard";
import ClientCard from "./ClientCard";
import { useState } from "react";

export default function ClientJobSidebar({data}:any) {
  const [clientOptionOpen, setClientOptionOpen] = useState(false);
  return (
    <div
      className="
        w-full 
        bg-white 
        rounded-2xl 
        border border-gray-200 
        p-2 sm:p-5 
        space-y-4
        flex-shrink-0
        lg:w-[340px] 
        xl:w-[420px]
        inter
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between relative inter">
        <h1 className="text-lg sm:text-xl text-black flex gap-2 items-center font-semibold">
          <RiTeamFill className="w-5 h-5 text-black" /> Client
        </h1>

        <MoreHorizontal onClick={()=>setClientOptionOpen(!clientOptionOpen)} className="text-black cursor-pointer" />
       { clientOptionOpen && <div className="absolute top-7 pr-14 shadow-md rounded-xl right-0 bg-white p-4 text-black flex flex-col border-1 border-gray-300">
           <button>View Client</button>
          <button>Edit Client</button>
          <button className="text-[#F7631C]">Delete Client</button>
        </div>}
      </div>

      {/* CLIENT CARD */}
      <div className="overflow-x-auto">
        <ClientCard data={data.client} />
      </div>

      {/* JOB CARD */}
      <div className="overflow-x-auto">
        <JobCard data={data.jobDetails}/>
      </div>
    </div>
  );
}
