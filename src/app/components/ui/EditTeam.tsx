'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineSearch as Search, AiOutlineClose as X } from 'react-icons/ai';

const allBoardMembers = [
  { name: 'Gary Thomson', img: '/teampic1.png' },
  { name: 'Sofia Richard', img: '/teampic2.png' },
  { name: 'Tom Parker', img: '/teampic2.png' },
  { name: 'Daniel Walker', img: '/teampic3.png' },
  { name: 'Sarah Johnson', img: '/teampic1.png' },
  { name: 'Mike Chen', img: '/teampic2.png' },
  { name: 'Anna David', img: '/teampic3.png' },
];

export default function ChangeMembersModal({setTeamModal, currentMembers = [], onUpdateMembers}: any) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = (name: string) => {
    if (onUpdateMembers) {
      onUpdateMembers([...currentMembers, name]);
    }
  };

  const handleRemove = (name: string) => {
    if (onUpdateMembers) {
      onUpdateMembers(currentMembers.filter((m: string) => m !== name));
    }
  };

  const lowerSearch = searchTerm.toLowerCase();
  
  const cardMembers = allBoardMembers.filter(m => 
    currentMembers.includes(m.name) && 
    m.name.toLowerCase().includes(lowerSearch)
  );

  const availableMembers = allBoardMembers.filter(m => 
    !currentMembers.includes(m.name) && 
    m.name.toLowerCase().includes(lowerSearch)
  );

  return (
    <div className="bg-transparent flex items-start justify-start z-[2000]">
       <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setTeamModal(false)} />
      {/* Modal Box */}
      <div className="relative left-[370px] bg-white rounded-lg shadow-xl w-full max-w-md z-50 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-center items-center p-2 border-b border-gray-200">
          <div className="w-60 text-center">
            <h2 className="text-lg font-semibold text-gray-900 text-center">
              Change Members
            </h2>
          </div>
          <button className="text-gray-400 hover:text-gray-600 cursor-pointer" onClick={()=>setTeamModal(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-white">
          <div className="relative">
            <input
              type="text"
              placeholder="Search members"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 text-black pr-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
            />
            <Search className="absolute right-3 top-1 w-6 h-6 text-gray-900" />
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto w-full px-4 pb-4 bg-white scrollbar-thin scrollbar-thumb-gray-200">
          {/* Card Members */}
          {cardMembers.length > 0 && (
            <div className="pb-3 w-full">
              <p className="text-sm font-medium text-gray-700 mb-1">Card members</p>
              <div className="space-y-2 w-full">
                {cardMembers.map(member => (
                  <div key={member.name} className="flex items-center justify-between p-1 hover:bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={member.img}
                        alt={member.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-900">{member.name}</span>
                    </div>
                    <button onClick={() => handleRemove(member.name)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Board Members (Available) */}
          {availableMembers.length > 0 && (
            <div className="pb-2 w-full">
              <p className="text-sm font-medium text-gray-700 mb-2">Board members</p>
              <div className="space-y-2 w-full">
                {availableMembers.map(member => (
                  <div 
                    key={member.name} 
                    onClick={() => handleAdd(member.name)}
                    className="flex items-center space-x-3 p-1 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                  >
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-900">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
