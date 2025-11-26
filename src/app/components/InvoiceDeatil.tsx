import React from "react";

export default function InvoiceDetailsForm() {
  return (
    <div className="w-full lg:w-[29%] flex-shrink-0 text-gray-700">
      <div className="space-y-6">
        {/* Invoice ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Invoice ID
          </label>
          <input
            type="text"
            value="20251126-01"
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Issue Date – Native Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Date
          </label>
          <div className="relative">
            <input
              type="date"
              defaultValue="2025-11-26"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            />
            {/* Calendar Icon (just visual, not clickable) */}

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