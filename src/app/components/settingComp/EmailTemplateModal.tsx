import React from "react";
import { X, PenLine } from "lucide-react";
import { useEmailTemplateEditor } from "./useEmailTemplateEditor";

interface EditEmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAddMode?: boolean;
  template?: {
    id?: string;
    name: string;
    subject: string;
    body: string;
  } | any;
  onSuccess?: () => void;
  existingTemplates?: { name: string; id: string }[];
}

export default function EmailTemplateModal(props: EditEmailTemplateModalProps) {
  const { isOpen, onClose, isAddMode } = props;
  
  const {
    name,
    setName,
    subject,
    setSubject,
    body,
    setBody,
    isLoading,
    textareaRef,
    handleSubmit,
    handleInsertVariable
  } = useEmailTemplateEditor(props);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 text-black" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between px-6 pt-5  ">
            <h2 className="text-xl font-semibold text-gray-900">
              {isAddMode ? "Add Email Template" : "Edit Email Template"}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          <div className="px-6 py-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Welcome Email"
                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Welcome {{client_name}}"
                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <label className="block text-sm font-medium text-gray-700">Message Body</label>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleInsertVariable}
                    className="flex items-center gap-1 text-[12px] font-medium bg-gray-100 hover:bg-[#00C2FF] hover:text-white hover:border-[#00C2FF] text-gray-700 px-3 py-1.5 rounded-md transition border border-gray-200 cursor-pointer shadow-sm"
                    title="Insert empty variable brackets"
                  >
                    Insert Variable {"{{ }}"}
                  </button>
                </div>
              </div>
              <textarea
                ref={textareaRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Type your email template here... Feel free to use variables like {{client_name}}!"
                className="w-full text-black min-h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <div className="mt-3 flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-sm">
                <PenLine className="w-4 h-4" />
                <span>Email signature from Settings will appear under this message.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-5  bg-gray-50">
            <button onClick={onClose} className="px-6 text-black py-2.5 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-2.5 bg-[#00C2FF] text-white rounded-full font-medium hover:bg-[#00a8e0] transition shadow-md disabled:bg-gray-400"
            >
              {isLoading ? "Saving..." : "Save Template"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
