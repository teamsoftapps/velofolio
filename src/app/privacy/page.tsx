/** @format */

'use client';

import React from 'react';
import RouteGuard from '@/app/components/layouts/RouteGuard';
import Link from 'next/link';
import { printPrivacyPolicy } from '@/utils/policyPrinter';

export default function PrivacyPage() {
  const lastUpdated = "May 20, 2024";

  const sections = [
    {
      title: "1. Data We Collect",
      content: "We collect information you provide directly to us when you create an account, create or modify your profile, set preferences, or make any purchases through the Services. This includes information about your clients, jobs, and financial data required for CRM functionality."
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, such as to process transactions, send you technical notices, updates, security alerts, and support and administrative messages."
    },
    {
      title: "3. Data Security and Protection",
      content: "We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. We use industry-standard encryption for data at rest and in transit."
    },
    {
      title: "4. Your Rights and Choices",
      content: "You have the right to access, update, and delete your personal information at any time. You can also export your data in a portable format from your account settings."
    },
    {
      title: "5. Third-Party Sharing",
      content: "We do not sell your personal data. We only share information with third-party service providers (like payment processors) that are essential to the functionality of the CRM, under strict confidentiality agreements."
    }
  ];

  return (
    <RouteGuard allowedRoles={['superadmin']}>
      <div className='min-h-screen w-full bg-white pb-24'>
        <div className='w-full lg:w-[94%] xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8 pt-9'>
          
          <div className="flex flex-col mb-10">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
            <nav className="flex text-sm text-[#8c8c8c] mt-1 gap-2">
              <Link href="/dashboard" className="hover:text-black transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="text-gray-400">Privacy</span>
            </nav>
          </div>

          <div className="bg-white border border-[#D4D4D8] rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="max-w-none prose prose-slate">
              <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
                <p className="text-gray-500 font-medium">Last Updated: {lastUpdated}</p>
                <button 
                  onClick={() => printPrivacyPolicy(lastUpdated, sections)}
                  className="text-[#01B0E9] font-semibold hover:underline"
                >
                  Download as PDF
                </button>
              </div>

              <div className="space-y-12">
                <p className="text-gray-600 text-lg leading-relaxed">
                  At Velofolio, your privacy is our top priority. This document outlines how we collect, use, and protect your data to ensure a secure and transparent experience on our platform.
                </p>

                {sections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}

                <div className="mt-16 pt-10 border-t border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Our Privacy Team</h2>
                  <p className="text-gray-600 mb-6">
                    If you have any questions regarding this policy or your data, please contact our legal department.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                      Email Privacy Team
                    </button>
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors">
                      Help Center
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </RouteGuard>
  );
}
