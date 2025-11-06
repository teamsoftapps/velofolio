'use client';

import React, { useState } from 'react';
import { MdClose, MdCheck } from 'react-icons/md';
import navigation, { usePathname } from 'next/navigation';
export interface  SortOption {
  id: string;
  label: string;
  value: string;
  direction: 'asc' | 'desc';
}

interface SortState {
  value: string;
  direction: 'asc' | 'desc';
}
const sortOptions: SortOption[] = [
  { id: 'name-asc', label: 'Client Name (A-Z)', value: 'name', direction: 'asc' },
  { id: 'name-desc', label: 'Client Name (Z-A)', value: 'name', direction: 'desc' },
  { id: 'event-newest', label: 'Event Date (Newest)', value: 'eventDate', direction: 'desc' },
  { id: 'event-oldest', label: 'Event Date (Oldest)', value: 'eventDate', direction: 'asc' },
  { id: 'added-newest', label: 'Added Date (Newest)', value: 'leadCreated', direction: 'desc' },
  { id: 'added-oldest', label: 'Added Date (Oldest)', value: 'leadCreated', direction: 'asc' },
  { id: 'payment-earliest', label: 'Payment Due (Earliest)', value: 'paymentDue', direction: 'asc' },
  { id: 'payment-latest', label: 'Payment Due (Latest)', value: 'paymentDue', direction: 'desc' },
];

export default function SortModal({ 
  isOpen, 
  onClose,
  currentSort,
  onSortChange ,
  sortBy,
  setSortBy
}: { 
  isOpen: boolean; 
  onClose: () => void;
  currentSort: string;
onSortChange: (option: SortOption) => void;
  setSortBy: React.Dispatch<React.SetStateAction<SortState>>;
  sortBy: SortState
}) {
  const [selected, setSelected] = useState(currentSort);
  const pathname=usePathname();

const handleApply = (option: SortOption) => {
  setSelected(option.id);
onSortChange(option);
  setSortBy({ value: option.value, direction: option.direction }); 
  onClose();
};

  if (!isOpen) return null;

  return (
    <>
    
      <div className="fixed inset-0  bg-opacity-50 z-40" onClick={onClose} />

   
      <div className={`absolute ${pathname=="/production"?"-right-40 top-10 sm:right-2":"top-10 right-2"} flex items-center justify-center z-50 p-2`}>
        <div className="bg-white rounded-xl shadow-xl w-60 max-w-md max-h-screen overflow-y-auto">
         
       

          {/* Options List */}
          <div className="p-6">
            <div className="space-y-1">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={()=>handleApply(option)}
                  className={`w-full flex items-center justify-between p-1 rounded-lg text-left transition-all ${
                    selected === option.id
                      ? 'text-gray-900 font-semibold'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-sm">{option.label}</span>
                  {selected === option.id && (
                    <MdCheck className="w-5 h-5 text-gray-900" />
                  )}
                </button>
              ))}
            </div>
          </div>

        
       
        </div>
      </div>
    </>
  );
}