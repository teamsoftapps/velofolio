import AddButton from "./AddButton";
import { FaEllipsisH } from "react-icons/fa";
const RecentLeads = () => {
  const leadsData = [
    {
      date: "2 Sep 2025",
      title: "Demo Portrait Lead",
      status: "NEW LEAD",
      task: "Initial Inquiry...",
      circleColor: "bg-green-400",
    },
  ];

  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[20px] sm:text-[22px] lg:text-[24px] text-black">
          Most Recent Leads
        </h2>
        <AddButton onClick={() => console.log("Add New Lead")} />
      </div>
      <div className="grid grid-cols-4 gap-2 mb-2 font-medium bg-gray-100 py-2 px-2 rounded text-black">
        <span>Lead Created</span>
        <span>Lead Name</span>
        <span>Main Status</span>
        <span>Next Task</span>
      </div>
      <div>
        {leadsData.map((lead, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-2 py-2 border-b border-gray-300 px-2 items-center"
          >
            <span className="text-[14px] sm:text-[16px] lg:text-[17px] text-black">
              {lead.date}
            </span>
            <span className="text-[14px] sm:text-[16px] lg:text-[17px] text-black">
              {lead.title}
            </span>
            <span className="bg-[#D9F99D] text-black font-medium text-[14px] sm:text-[15px] lg:text-[16px] px-2 py-1 w-[100px] h-[28px] flex items-center justify-center rounded-full">
              {lead.status}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[14px] sm:text-[15px] lg:text-[16px] text-black px-2 py-1">
                {lead.task}
              </span>
              <FaEllipsisH className="text-[14px] sm:text-[15px] lg:text-[16px] text-black cursor-pointer rotate-90" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// const RecentLeads = () => {
//   const leadsData = [
//     {
//       date: "2 Sep 2025",
//       title: "Demo Portrait Lead",
//       status: "NEW LEAD",
//       task: "Initial Inquiry...",
//       circleColor: "bg-green-400",
//     },
//   ];

//   return (
//     <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full md:w-1/2 ml-0 md:ml-2 h-[500px] overflow-y-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-medium text-[22px] md:text-[24px] text-black">
//           Most Recent Leads
//         </h2>
//         <AddButton onClick={() => console.log("Add New Lead")} />
//       </div>
//       <div className="grid grid-cols-4 gap-2 mb-2  font-medium bg-gray-100 py-2 px-2 rounded text-black">
//         <span>Lead Created</span>
//         <span>Lead Name</span>
//         <span>Main Status</span>
//         <span>Next Task</span>
//       </div>
//       <div>
//         {leadsData.map((lead, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-4 gap-2 py-2 border-b border-gray-300 px-2 items-center"
//           >
//             <span className="text-[14px] sm:text-[16px] md:text-[17px] text-black">
//               {lead.date}
//             </span>
//             <span className="text-[14px] sm:text-[16px] md:text-[17px] text-black">
//               {lead.title}
//             </span>
//             <span className="bg-[#D9F99D] text-black font-medium text-[14px] sm:text-[15px] md:text-[16px] px-2 py-1 w-[100px] h-[28px] flex items-center justify-center rounded-full">
//               {lead.status}
//             </span>
//             <div className="flex items-center justify-between">
//               <span className="text-[14px] sm:text-[15px] md:text-[16px] text-black px-2 py-1">
//                 {lead.task}
//               </span>
//               <FaEllipsisH className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-500 cursor-pointer rotate-90" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default RecentLeads;
