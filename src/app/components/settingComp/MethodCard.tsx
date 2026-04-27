
import Image from "next/image";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";

interface Method {
  id: number;
  brand: string;
  image: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
 
}

interface Props {
  method: Method;
  toggleMethod: (id: number) => void;
  deleteMethod: (id: number) => void;
}

const MethodCard: React.FC<Props> = ({ method, toggleMethod, deleteMethod }) => {
  return (
    <div className="border border-gray-300 rounded-md bg-[#F4F4F5] w-full p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
      
      {/* Left: Card Info */}
      <div className="flex items-center gap-4">
        <Image
          src={method.image}
          alt={method.brand}
          width={50}
          height={50}
          className="object-contain"
        />
        <div className="truncate">
          <p className="text-base sm:text-lg truncate">
            {method.brand} ending in <span>{method.last4}</span>
          </p>
          <p className="text-sm text-[#818181] truncate">
            Exp. date <span>{method.expiry}</span>
          </p>
        </div>
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-3 sm:gap-2 justify-end flex-wrap">
        {method.isDefault ? (
          <button className="rounded-full px-3 py-1 bg-[#01B0E9] text-white text-sm sm:text-base whitespace-nowrap">
            Default
          </button>
        ) : (
          <button onClick={()=>toggleMethod(method.id)} className="rounded-full px-3 py-1 border border-[#01B0E9] text-[#01B0E9] text-sm sm:text-base whitespace-nowrap cursor-pointer">
            Set Default
          </button>
        )}
        <BsFillTrashFill 
          onClick={() => deleteMethod(method.id)} 
          className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500 transition" 
        />
      </div>
    </div>
  );
};

export default MethodCard;
