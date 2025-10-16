// import AddButton from "./AddButton";

// const UpcomingShoots = () => {
//   const shootsData = [
//     {
//       date: "10 Oct 2025",
//       time: "5 PM",
//       title: "Demo Portrait Lead",
//       type: "Lead",
//       task: "Main Shoot",
//     },
//     {
//       date: "15 Sep 2026",
//       time: "All Day",
//       title: "Demo Wedding Job",
//       type: "Job",
//       task: "Main Shoot",
//     },
//   ];

//   return (
//     <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-1/2 sm:w-full md:w-1/2 mr-2">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-medium text-black">
//           Upcoming Shoots & Appointments
//         </h2>
//         <AddButton onClick={() => console.log("Add New Shoot")} />
//       </div>
//       <div>
//         {shootsData.map((shoot, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between py-2 border-b"
//           >
//             <div>
//               <span className="font-light text-1xl mr-10 text-black">
//                 {shoot.date}
//               </span>
//               <span className="text-gray-500 mx-2">{shoot.time}</span>
//               <span className="text-blue-500">{shoot.title}</span>
//             </div>
//             <div className="flex space-x-2">
//               <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full">
//                 {shoot.type}
//               </span>
//               <span className="text-gray-600">{shoot.task}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default UpcomingShoots;

// import AddButton from "./AddButton";

// const UpcomingShoots = () => {
//   const shootsData = [
//     {
//       date: "10 Oct 2025",
//       time: "5 PM",
//       title: "Demo Portrait Lead",
//       type: "Lead",
//       task: "Main Shoot",
//       circleColor: "bg-orange-400", // Orange circle for 10 Oct 2025
//     },
//     {
//       date: "15 Sep 2026",
//       time: "All Day",
//       title: "Demo Wedding Job",
//       type: "Job",
//       task: "Main Shoot",
//       circleColor: "bg-pink-400",
//     },
//   ];

//   return (
//     <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-1/2 sm:w-full md:w-1/2 mr-2">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-medium text-[22px] text-black">
//           Upcoming Shoots & Appointments
//         </h2>
//         <AddButton onClick={() => console.log("Add New Shoot")} />
//       </div>
//       <div>
//         {shootsData.map((shoot, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between py-3 border-b border-gray-300 "
//           >
//             <div className="flex items-center">
//               <span className="font-light text-[17px] mr-4 text-black">
//                 {shoot.date}
//               </span>
//               <span
//                 className={`w-3 h-3 ${shoot.circleColor} rounded-full mr-2`}
//               ></span>
//               <span className=" text-[17px] text-black">{shoot.time}</span>
//               <span className="ml-2 text-[17px] text-black">{shoot.title}</span>
//             </div>
//             <div className="flex space-x-2">
//               <span className="bg-[#FFF1F2] border border-[#FB7185] text-black text-[16px] px-2 py-1 rounded w-[53px] h-[28px] flex items-center justify-center">
//                 {shoot.type}
//               </span>
//               <span className=" border border-[#D4D4D8] w-auto text-black text-[16px] px-2 py-1 rounded  h-[28px] flex items-center justify-center">
//                 {shoot.task}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default UpcomingShoots;

import AddButton from "./AddButton";

const UpcomingShoots = () => {
  const shootsData = [
    {
      date: "10 Oct 2025",
      time: "5 PM",
      title: "Demo Portrait Lead",
      type: "Lead",
      task: "Main Shoot",
      circleColor: "bg-orange-400",
    },
    {
      date: "15 Sep 2026",
      time: "All Day",
      title: "Demo Wedding Job",
      type: "Job",
      task: "Main Shoot",
      circleColor: "bg-pink-400",
    },
  ];

  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[20px] sm:text-[22px] lg:text-[24px] text-black">
          Upcoming Shoots & Appointments
        </h2>
        <AddButton onClick={() => console.log("Add New Shoot")} />
      </div>
      <div>
        {shootsData.map((shoot, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-300"
          >
            <div className="flex items-center">
              <span className="font-light text-[14px] sm:text-[16px] lg:text-[17px] mr-2 sm:mr-4 text-black">
                {shoot.date}
              </span>
              <span
                className={`w-2 sm:w-3 h-2 sm:h-3 ${shoot.circleColor} rounded-full mr-1 sm:mr-2`}
              ></span>
              <span className="text-[14px] sm:text-[16px] lg:text-[17px] text-black">
                {shoot.time}
              </span>
              <span className="ml-1 sm:ml-2 text-[14px] sm:text-[16px] lg:text-[17px] text-black">
                {shoot.title}
              </span>
            </div>
            <div className="flex space-x-1 sm:space-x-2">
              <span className="bg-[#FFF1F2] border border-[#FB7185] text-black text-[14px] sm:text-[15px] lg:text-[16px] px-1 sm:px-2 py-0.5 sm:py-1 rounded w-[40px] sm:w-[53px] h-[24px] sm:h-[28px] flex items-center justify-center">
                {shoot.type}
              </span>
              <span className="border border-[#D4D4D8] text-black text-[14px] sm:text-[15px] lg:text-[16px] px-1 sm:px-2 py-0.5 sm:py-1 rounded w-auto h-[24px] sm:h-[28px] flex items-center justify-center">
                {shoot.task}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// const UpcomingShoots = () => {
//   const shootsData = [
//     {
//       date: "10 Oct 2025",
//       time: "5 PM",
//       title: "Demo Portrait Lead",
//       type: "Lead",
//       task: "Main Shoot",
//       circleColor: "bg-orange-400",
//     },
//     {
//       date: "15 Sep 2026",
//       time: "All Day",
//       title: "Demo Wedding Job",
//       type: "Job",
//       task: "Main Shoot",
//       circleColor: "bg-pink-400",
//     },
//   ];

//   return (
//     <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full md:w-1/2 mr-0 md:mr-2 h-[500px]  overflow-y-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-medium text-[22px] md:text-[24px] text-black">
//           Upcoming Shoots & Appointments
//         </h2>
//         <AddButton onClick={() => console.log("Add New Shoot")} />
//       </div>
//       <div>
//         {shootsData.map((shoot, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between py-3 border-b border-gray-300"
//           >
//             <div className="flex items-center">
//               <span className="font-light text-[14px] sm:text-[16px]  lg:text-[17px] mr-2 sm:mr-4 text-black">
//                 {shoot.date}
//               </span>
//               <span
//                 className={`w-2 sm:w-3 h-2 sm:h-3 ${shoot.circleColor} rounded-full mr-1 sm:mr-2`}
//               ></span>
//               <span className="text-[14px] sm:text-[16px] md:text-[14px] lg:text-[17px] text-black">
//                 {shoot.time}
//               </span>
//               <span className="ml-1 sm:ml-2 text-[14px] sm:text-[16px] md:text-[14px] lg:text-[17px] text-black">
//                 {shoot.title}
//               </span>
//             </div>
//             <div className="flex space-x-1 sm:space-x-2">
//               <span className="bg-[#FFF1F2] border border-[#FB7185] text-black text-[14px] sm:text-[15px] md:text-[14px] lg:text-[16px] px-1 sm:px-2 py-0.5 sm:py-1 rounded w-[40px] sm:w-[53px] h-[24px] sm:h-[28px] flex items-center justify-center">
//                 {shoot.type}
//               </span>
//               <span className="border border-[#D4D4D8] text-black text-[14px] sm:text-[15px] md:text-[14px] lg:text-[16px] px-1 sm:px-2 py-0.5 sm:py-1 rounded w-auto h-[24px] sm:h-[28px] flex items-center justify-center">
//                 {shoot.task}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
export default UpcomingShoots;
