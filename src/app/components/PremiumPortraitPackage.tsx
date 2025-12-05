// components/PremiumPortraitPackage.tsx
import { CiFileOn } from "react-icons/ci";
import { MdDragIndicator } from "react-icons/md";
import { PiPencilSimple } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";

type PremiumPortraitPackageProps = {
  id: number|string;
  title: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
  amount?: number;
  taxLabel?: string;
  handleRecommended: (id: any) => void;
};

export default function PremiumPortraitPackage({
  id,
  title,
  price,
  description,
  features,
  recommended = false,
  amount,
  taxLabel = "No Tax",
  handleRecommended
}: PremiumPortraitPackageProps) {
  return (
    <div className="w-[400px] shrink-0 font-sans">

      <div className={`bg-white rounded-md shadow-sm border px-1 ${recommended? "border-2 border-[#01B0E9]":" border-gray-100"}`}>
        {/* Header */}
        <div className="p-3 border-gray-200 relative">
          <div className="flex justify-between items-center">
   
              <span className={`absolute -top-4 left-3 bg-white text-black text-xs font-medium px-4 py-1.5 rounded-lg border ${recommended? "border-2 border-[#01B0E9]":"border-gray-300"}  `} onClick={()=>handleRecommended(id)}>
                RECOMMENDED
              </span>
          

            <div className="w-full flex items-center justify-between bg-gray-100 p-0.5 mt-2">
              <MdDragIndicator className="w-6 h-6 text-gray-800" />

              <div className="flex justify-center sm:justify-end w-full items-center space-x-3 sm:gap-0">
                <button
                  className="p-2 rounded-full bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                  title="Edit"
                >
                  <PiPencilSimple className="w-5 h-5 text-gray-500" />
                </button>

                <button
                  className="p-2 rounded-full bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                  title="Download"
                >
                  <CiFileOn className="w-5 h-5 text-gray-500" />
                </button>

                <div className="relative">
                  <button
                    className="p-2 rounded-full bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    title="More actions"
                  >
                    <SlOptions className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-2 text-left">
          <h2 className="text-xl text-[#01B0E9] inter font-medium">{title}</h2>

          <div className="text-left mb-2">
            <span className="text-2xl font-semibold text-gray-900">
              ${price.toFixed(2)}
            </span>
          </div>

          <hr className="text-gray-200" />

          <p className="text-left text-black text-MD mt-2 leading-6">
            {description}
          </p>

          <ul className="my-5">
            {features.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-black text-md leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          {/* Price Breakdown */}
          <div className="mt-12 p-2 bg-[#E5F7FD]">
            <div className="flex justify-between text-md">
              <span className="text-black">Amount</span>
              <span className="font-semibold text-gray-900">
                ${(amount ?? price).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-md mt-2">
              <span className="text-black">Tax</span>
              <span className="text-gray-500">{taxLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
