'use client';

import React from 'react';
import Image from 'next/image';
import { AiOutlineSearch as Search, AiOutlineClose as X } from 'react-icons/ai';

export default function ChangeMembersModal({setTeamModal}:any) {
  return (
    <div className="bg-transparent flex items-start justify-start z-[2000]">
      {/* Modal Box */}
      <div className=" left-[370px] bg-white rounded-lg shadow-xl w-full max-w-md">
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
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search members"
              className="w-full pl-3 pr-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
            />
            <Search className="absolute right-3 top-1 w-6 h-6 text-gray-900" />
          </div>
        </div>

        {/* Card Members */}
        <div className="px-4 pb-3">
          <p className="text-sm font-medium text-gray-700 mb-1">Card members</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-1 hover:bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <Image
                  src="/teampic1.png"
                  alt="Gary Thomson"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-gray-900">Gary Thomson</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between p-1 hover:bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <Image
                  src="/teampic2.png"
                  alt="Sofia Richard"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-gray-900">Sofia Richard</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Board Members */}
        <div className="px-4 pb-2">
          <p className="text-sm font-medium text-gray-700 mb-2">Board members</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-1 hover:bg-gray-50 rounded cursor-pointer">
              <Image
                src="/teampic2.png"
                alt="Tom Parker"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm text-gray-900">Tom Parker</span>
            </div>

            <div className="flex items-center space-x-3 p-1 hover:bg-gray-50 rounded cursor-pointer">
              <Image
                src="/teampic3.png"
                alt="Daniel Walker"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm text-gray-900">Daniel Walker</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
