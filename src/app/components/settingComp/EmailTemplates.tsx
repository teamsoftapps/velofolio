import React, { useState, useEffect } from 'react';
import AddButton from '@/app/components/ui/AddButton';
import { ChevronDown } from 'lucide-react';
import { SlOptionsVertical } from 'react-icons/sl';
import EmailTemplateModal from './EmailTemplateModal';
import DeleteModal from '@/app/components/forms/DeleteModal';
import { auth } from '@/config/firebase';
import { getEmailTemplates, EmailTemplateData, deleteEmailTemplate } from '@/firebase_Routes/routes';
import { toast } from 'react-toastify';

const EmailTemplates = () => {
  const [templates, setTemplates] = useState<(EmailTemplateData & { id: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTemplates = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setIsLoading(true);
    const { templates: fetchedTemplates, error } = await getEmailTemplates(user.uid);
    if (error) {
      toast.error('Failed to load email templates');
    } else {
      setTemplates(fetchedTemplates as (EmailTemplateData & { id: string })[]);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    // We can observe auth state to fetch when user is ready
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchTemplates();
      } else {
        setTemplates([]);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const [templateModal, setTemplateModal] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  
  const [deleteModal, setDeleteModal] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setTemplateToDelete(id);
    setDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    const user = auth.currentUser;
    if (!user || !templateToDelete) return;

    setIsDeleting(true);
    const { success, error } = await deleteEmailTemplate(user.uid, templateToDelete);
    if (success) {
      toast.success("Template deleted successfully");
      fetchTemplates();
    } else {
      toast.error(error || "Failed to delete template");
    }
    setIsDeleting(false);
    setDeleteModal(false);
    setTemplateToDelete(null);
  };
  return (
    <div className=" bg-gray-50 p-6">
      <div className=" rounded-xl bg-white shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row items-center justify-between border-b border-gray-200 px-6 py-5">
          <h1 className="text-2xl font-semibold text-gray-900">Email Templates</h1>
          <div className='sm:w-40 w-full'> <AddButton title="Add New" setOpenForm={() => {
            setIsAddMode(true);
            setSelectedTemplate(null);
            setTemplateModal(true);
          }} /></div>
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
                  onClick={() => {
                    setIsAddMode(false);
                    setSelectedTemplate(template);
                    setTemplateModal(true);
                  }}
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
                      onClick={(e) => handleDeleteClick(e, template.id)}
                      className="rounded-full cursor-pointer p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                      title="Delete Template"
                    >
                      <SlOptionsVertical className="h-5 w-5" />
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
      {templateModal && (
        <EmailTemplateModal
          isOpen={templateModal}
          onClose={() => setTemplateModal(false)}
          template={selectedTemplate}
          isAddMode={isAddMode}
          onSuccess={fetchTemplates}
          existingTemplates={templates}
        />
      )}
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Email Template"
        message="Are you sure you want to delete this email template? This action cannot be undone."
        confirmClassName="bg-[#00C2FF] hover:bg-[#00a8e0]"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default EmailTemplates;