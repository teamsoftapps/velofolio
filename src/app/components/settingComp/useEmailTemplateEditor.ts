import { useState, useEffect, useRef } from "react";
import { auth } from "@/config/firebase";
import { addEmailTemplate, updateEmailTemplate } from "@/firebase_Routes/routes";
import { toast } from "react-toastify";
import { isDuplicateTemplateName, getVariableInsertion } from "@/utils/emailTemplateUtils";

interface UseEmailTemplateEditorProps {
  isOpen: boolean;
  isAddMode?: boolean;
  template?: any;
  existingTemplates?: { name: string; id: string }[];
  onSuccess?: () => void;
  onClose: () => void;
}

export const useEmailTemplateEditor = ({
  isOpen,
  isAddMode,
  template,
  existingTemplates = [],
  onSuccess,
  onClose
}: UseEmailTemplateEditorProps) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync state with template prop
  useEffect(() => {
    if (isOpen) {
      if (isAddMode || !template) {
        setName("");
        setSubject("");
        setBody("");
      } else {
        setName(template.name || "");
        setSubject(template.subject || "");
        setBody(template.body || "");
      }
    }
  }, [isOpen, isAddMode, template]);

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Authentication required. Please log in again.");
      return;
    }

    if (!name.trim() || !subject.trim() || !body.trim()) {
      toast.error("Please provide a name, subject, and message body.");
      return;
    }

    if (isDuplicateTemplateName(name, existingTemplates, template?.id)) {
      toast.error(`A template named "${name.trim()}" already exists.`);
      return;
    }

    setIsLoading(true);
    try {
      const payload = { name: name.trim(), subject: subject.trim(), body: body.trim() };
      
      const result = isAddMode || !template?.id
        ? await addEmailTemplate(user.uid, payload)
        : await updateEmailTemplate(user.uid, template.id, payload);

      if (result.error) {
        toast.error(`Failed to save template: ${result.error}`);
      } else {
        toast.success(isAddMode ? "Template created!" : "Changes saved!");
        onSuccess?.();
        onClose();
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred while saving. Please try again.");
      console.error("Email Template Save Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInsertVariable = () => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setBody(prev => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + "{{}}");
      return;
    }

    const { newBody, newCursorPos, shouldInsert } = getVariableInsertion(
      body,
      textarea.selectionStart,
      textarea.selectionEnd
    );

    if (shouldInsert) {
      setBody(newBody);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = newCursorPos;
        textarea.focus();
      }, 0);
    } else {
      textarea.focus();
    }
  };

  return {
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
  };
};
