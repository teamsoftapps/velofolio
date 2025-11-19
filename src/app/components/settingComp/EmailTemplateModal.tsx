"use client";

import React from "react";
import { X, PenLine } from "lucide-react";

interface EditEmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template?: {
    name: string;
    subject: string;
    body: string;
  };
}

export default function EmailTemplateModal({
  isOpen,
  onClose,
  template = {
    name: "Booking Confirmation",
    subject: "Your booking with {{client_name}} is confirmed!",
    body: `Hi {{client_name}},
Your booking for {{event_date}} is confirmed.
We're excited to work with you!`,
  },
}: EditEmailTemplateModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 text-black"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Email Template
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                defaultValue={template.name}
                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                defaultValue={template.subject}
                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Body
              </label>

              <textarea
                defaultValue={template.body}
                className="w-full text-black min-h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />

              {/* Info Banner */}
              <div className="mt-3 flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-sm">
                <PenLine className="w-4 h-4" />
                <span>Email signature from Settings will appear under this message.</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-5 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 text-black py-2.5 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button className="px-8 py-2.5 bg-[#00C2FF] text-white rounded-full font-medium hover:bg-[#00a8e0] transition shadow-md">
              Save Template
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
