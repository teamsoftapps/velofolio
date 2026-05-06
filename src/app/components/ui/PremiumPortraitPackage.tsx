import React, { useState } from 'react';
import { CiFileOn } from "react-icons/ci";
import { MdDragIndicator } from "react-icons/md";
import { PiPencilSimple, PiTrashLight, PiCopyLight } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type PremiumPortraitPackageProps = {
  id: number | string;
  title: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
  amount?: number;
  taxLabel?: string;
  handleRecommended: (id: any) => void;
  onDelete?: (id: any) => void;
  onEdit?: (id: any) => void;
  onDuplicate?: (id: any) => void;
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
  handleRecommended,
  onDelete,
  onEdit,
  onDuplicate
}: PremiumPortraitPackageProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: id });
  const [showOptions, setShowOptions] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="w-[400px] shrink-0 font-sans">

      <div className={`bg-white rounded-md shadow-sm border px-1 ${recommended ? "border-2 border-[var(--primary-color)]" : " border-gray-100"}`}>
        {/* Header */}
        <div className="p-3 border-gray-200 relative">
          <div className="flex justify-between items-center">

            <span className={`absolute -top-4 left-3 bg-white text-black text-xs font-medium px-4 py-1.5 rounded-lg border ${recommended ? "border-2 border-[var(--primary-color)]" : "border-gray-300"} cursor-pointer`} onClick={() => handleRecommended(id)}>
              RECOMMENDED
            </span>


            <div className="w-full flex items-center justify-between bg-gray-100 p-2 mt-2 rounded-lg">
              <MdDragIndicator
                {...attributes}
                {...listeners}
                className="w-6 h-6 text-gray-400 cursor-grab active:cursor-grabbing hover:text-gray-600 transition-colors"
              />

              <div className="flex justify-center sm:justify-end items-center gap-3">
                {onEdit && (
                  <button
                    onClick={() => onEdit(id)}
                    className="p-2.5 rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 focus:outline-none"
                    title="Edit"
                  >
                    <PiPencilSimple className="w-5 h-5 text-gray-600" />
                  </button>
                )}

                {onDuplicate && (
                  <button
                    onClick={() => onDuplicate(id)}
                    className="p-2.5 rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 focus:outline-none"
                    title="Duplicate"
                  >
                    <PiCopyLight className="w-5 h-5 text-gray-600" />
                  </button>
                )}

                {onDelete && (
                  <button
                    onClick={() => onDelete(id)}
                    className="p-2.5 rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 focus:outline-none"
                    title="Delete"
                  >
                    <PiTrashLight className="w-5 h-5 text-red-500" />
                  </button>
                )}

                <div className="relative">
                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="p-2.5 rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 focus:outline-none"
                    title="More actions"
                  >
                    <SlOptions className="w-5 h-5 text-gray-600" />
                  </button>

                  {showOptions && (
                    <>
                      <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowOptions(false)} />
                      <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors text-left">
                          <CiFileOn className="w-4 h-4 text-gray-500" />
                          <span>Download</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-2 text-left">
          <h2 className="text-xl text-[var(--primary-color)] inter font-medium">{title}</h2>

          <div className="text-left mb-2">
            <span className="text-2xl font-semibold text-gray-900">
              ${price.toFixed(2)}
            </span>
          </div>

          <hr className="text-gray-200" />

          {/* Render description safely if it contains HTML */}
          <div
            className="text-left text-black text-sm mt-2 leading-6 overflow-hidden custom-html-content"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <ul className="my-5">
            {features && features.map((item, i) => (
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
