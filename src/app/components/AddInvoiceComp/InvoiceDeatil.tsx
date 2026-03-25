import React from "react";

export default function InvoiceDetailsForm({ type = "Invoice", generatedId = "N/A", issueDate = "", onDateChange }: any) {
  return (
    <div className="w-full lg:w-[29%] flex-shrink-0 text-gray-700">
      <div className="space-y-6">
        {/* ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {type} ID
          </label>
          <input
            type="text"
            value={generatedId}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed font-medium"
          />
        </div>

        {/* Issue Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={issueDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => onDateChange?.(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            />
          </div>
        </div>

        {/* PO Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PO Number
          </label>
          <input
            type="text"
            placeholder="-"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}