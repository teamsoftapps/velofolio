import React, { useState } from 'react';
import AddButton from '../AddButton';
import { ChevronDown } from 'lucide-react';
import { SlOptionsVertical } from 'react-icons/sl';
import EmailTemplateModal from './EmailTemplateModal';

const EmailTemplates = () => {
  // Mock data — replace with your actual templates later
  const templates = [
    { id: 1, name: 'Welcome Email' },
    { id: 2, name: 'Password Reset' },
    { id: 3, name: 'Newsletter #12' },
    { id: 4, name: 'Order Confirmation' },
    { id: 5, name: 'Default' },
  ];
const [templateModal, setTemplateModal] = useState(false);
  return (
    <div className=" bg-gray-50 p-6">
      <div className=" rounded-xl bg-white shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row items-center justify-between border-b border-gray-200 px-6 py-5">
          <h1 className="text-2xl font-semibold text-gray-900">Email Templates</h1>
         <div className='sm:w-40 w-full'> <AddButton title="Add New" setOpenForm={() => {}} /></div>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                <th className="w-full px-6 py-4">
                  <div className="flex items-center gap-1">
                    Name
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </th>
                <th className="w-20 px-6 py-4 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {templates.map((template) => (
                <tr
                  key={template.id}
                  onClick={()=>setTemplateModal(true)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 text-lg font-semibold text-gray-900">
                    {template.name}
                    {template.name === 'Default' && (
                      <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                        Default
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Options for: ${template.name}`);
                      }}
                      className="rounded-full cursor-pointer p-2 hover:bg-gray-200 transition-colors"
                    >
                      <SlOptionsVertical className="h-5 w-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {templates.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No templates found. Create your first one!
            </div>
          )}
        </div>
      </div>
      {templateModal && <EmailTemplateModal isOpen={templateModal} onClose={() => setTemplateModal(false)} />}
    </div>
  );
};

export default EmailTemplates;