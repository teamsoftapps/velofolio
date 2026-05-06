/** @format */

'use client';

import React, { useState } from 'react';
import RouteGuard from '@/app/components/layouts/RouteGuard';
import Link from 'next/link';
import { FiSearch, FiChevronRight } from 'react-icons/fi';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const helpTopics = [
    { title: "Getting Started", description: "Learn how to set up your account and start your first job." },
    { title: "Job Management", description: "How to track productions, leads, and client interactions." },
    { title: "Invoicing & Payments", description: "Setup Stripe, create invoices, and manage your finances." },
    { title: "Team Collaboration", description: "Invite team members and manage role-based permissions." },
    { title: "System Settings", description: "Customize your brand identity and application preferences." }
  ];

  return (
    <RouteGuard allowedRoles={['superadmin']}>
      <div className='min-h-screen w-full bg-white pb-24'>
        <div className='w-full lg:w-[94%] xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8 pt-9'>
          
          <div className="flex flex-col mb-10">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Help Center</h1>
            <nav className="flex text-sm text-[#8c8c8c] mt-1 gap-2">
              <Link href="/dashboard" className="hover:text-black transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="text-gray-400">Help</span>
            </nav>
          </div>

          <div className="space-y-8">
            {/* Search Card */}
            <div className="bg-[#F4F4F5] border border-[#D4D4D8] rounded-3xl p-8 sm:p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How can we help you today?</h2>
              <p className="text-gray-500 mb-8 max-w-lg mx-auto">Search our knowledge base for quick answers to common questions about Velofolio.</p>
              
              <div className="max-w-2xl mx-auto relative">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search articles, guides, and tutorials..."
                  className="w-full pl-16 pr-8 py-4 bg-white border border-[#D4D4D8] rounded-2xl text-gray-900 focus:outline-none focus:border-[#01B0E9] transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpTopics.map((topic, index) => (
                <button key={index} className="bg-white border border-[#D4D4D8] p-8 rounded-3xl text-left hover:border-[#01B0E9] hover:shadow-md transition-all group">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center justify-between">
                    {topic.title}
                    <FiChevronRight className="text-gray-300 group-hover:text-[#01B0E9] group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{topic.description}</p>
                </button>
              ))}
            </div>

            {/* Contact Card */}
            <div className="bg-white border border-[#D4D4D8] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Still need support?</h3>
                <p className="text-gray-500">Our support team is available 24/7 to help you with any technical issues.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
                  Contact Support
                </button>
                <button className="flex-1 md:flex-none px-8 py-4 border border-gray-300 text-gray-900 rounded-full font-bold hover:bg-gray-50 transition-colors">
                  Live Chat
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </RouteGuard>
  );
}
