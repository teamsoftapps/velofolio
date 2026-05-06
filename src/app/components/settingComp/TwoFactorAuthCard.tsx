// "use client";

// import { useState } from "react";

// export default function TwoFactorAuthCard({setIsOpenTFAModal,setDisable2FAModal,openDisable2FAModal}:any) {
//   const [is2FAEnabled, setIs2FAEnabled] = useState(false);

//   return (
//     <div className="w-full lg:w-1/2 shrink-0">

//       {/* Card */}
//       <div className="bg-white rounded-2xl  p-5 sm:p-6 border border-[#D4D4D8]">
//         <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">
//           Two-Factor Authentication (2FA)
//         </h2>

//         {/* Toggle Row */}
//         <div className="bg-[#F4F4F5] rounded-xl border border-[#D4D4D8] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <span className="text-sm font-medium text-gray-900">
//             Enable Two-Step Verification
//           </span>

//           <div className="flex items-center justify-between sm:justify-end gap-3">
//             <span className="text-xs sm:text-sm text-gray-500">
//               {is2FAEnabled ? "ENABLED" : "DISABLED"}
//             </span>

//             {/* Toggle */}
//             <button
//               onClick={() => {
//                 if(is2FAEnabled){
//                    setDisable2FAModal(true)  
                
//                   }
//                   else if(!openDisable2FAModal && is2FAEnabled){
//                     setIs2FAEnabled(false)
//                       setDisable2FAModal(true)  

//                   }
//                 else{
//                   setIs2FAEnabled(true)
//                    setIsOpenTFAModal(true)

//                 }
                
//                 }}
//               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                 is2FAEnabled ? "bg-blue-600" : "bg-gray-300"
//               }`}
//             >
//               <span
//                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                   is2FAEnabled ? "translate-x-6" : "translate-x-1"
//                 }`}
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
     
//     </div>
//   );
// }
"use client";

import { X } from "lucide-react";

export default function TwoFactorAuthCard({
  setIsOpenTFAModal,
  setDisable2FAModal,
  openDisable2FAModal,
  is2FAEnabled,
  setIs2FAEnabled,
  setOpenDeleteModal,
  setOpenDownloadModal,
}: any) {
  return (
    <div className="w-full lg:w-1/2 shrink-0">
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D4D4D8]">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">
          Two-Factor Authentication (2FA)
        </h2>

        <div className="bg-[#F4F4F5] rounded-xl border border-[#D4D4D8] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-sm font-medium text-gray-900">
            Enable Two-Step Verification
          </span>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs sm:text-sm text-gray-500">
              {is2FAEnabled ? "ENABLED" : "DISABLED"}
            </span>

            <button
              onClick={() => {
                if (is2FAEnabled) {
                  // Open disable modal
                  setDisable2FAModal(true);
                } else {
                  // Open enable modal
                  setIsOpenTFAModal(true);
                }
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                is2FAEnabled ? "bg-[var(--primary-color)]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  is2FAEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
       <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-12 justify-center w-full">
        <button 
          onClick={() => setOpenDeleteModal(true)}
          className="w-full sm:w-auto px-5 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition cursor-pointer"
        >
          Delete My Account
        </button>

        <button 
          onClick={() => setOpenDownloadModal(true)}
          className="w-full sm:w-auto px-5 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition cursor-pointer"
        >
          Download My Data
        </button>
      </div>
    </div>
  );
}
