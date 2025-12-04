// components/PremiumPortraitPackage.tsx
import { Package, Edit3, Image, Usb } from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { MdDragIndicator } from "react-icons/md";
import { PiPencilSimple } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";

export default function PremiumPortraitPackage() {
  return (
    <div className="w-full max-w-sm  font-sans">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 ">
        {/* Header */}
        <div className=" px-6 py-6  border-gray-200 relative">
          <div className="flex justify-between items-center ">
            <span className=" absolute -top-4 left-3 bg-white text-gray-600 text-xs font-medium px-4 py-1.5 rounded-lg border border-gray-300">
              RECOMMENDED
            </span>
            <div className="w-full flex items-center justify-between bg-gray-100 p-1
            ">
                <MdDragIndicator className="w-6 h-6 text-gray-800"/>
             <div className="flex justify-center sm:justify-end w-full items-center space-x-3  sm:gap-0">
                    <button
                      className="p-2 rounded-full bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                      title="Edit"
                      aria-label="Edit invoice"
                    >
                    <PiPencilSimple className="w-5 h-5 text-gray-500"/>
                    </button>
          
                    <button
                      className="p-2 rounded-full bg-white  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                      title="Download"
                      aria-label={`Download`}
                    >
                 <CiFileOn className="w-5 h-5 text-gray-500"/>
                    </button>
          
                    {/* Dropdown Menu */}
                    <div className="relative">
                      <button
                       
                        className="p-2 rounded-full bg-white  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                        title="More actions"
                        aria-label="More actions"
                      >
                      <SlOptions className="w-5 h-5 text-gray-500"/>
                      </button>
          
                    
                    </div>
                  </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 text-left">
          <h2 className="text-xl font-bold text-[#01B0E9] inter ">
            Premium Portrait Package
          </h2>

          <div className="text-left mt-3">
            <span className="text-2xl font-black text-gray-900">$1999.00</span>
          </div>
<hr className="text-gray-200"/>
          <p className="text-left text-gray-600 text-sm mt-2 leading-6">
            A deluxe package created for families wanting timeless wall art and keepsake prints.
          </p>

          <ul className="mt-2 space-y-3.5">
            {[
              "1.5-hour outdoor or studio session",
              "All best photos (40+ fully edited)",
              '2x Medium 16" x 24" canvases',
              '10x 5" x 7" premium matte prints',
              "Custom USB with all images",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-0.5">
            
                <span className="text-gray-700 text-sm leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          {/* Price Breakdown */}
          <div className="mt-2 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold text-gray-900">$1999.00</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-500">No Tax</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}