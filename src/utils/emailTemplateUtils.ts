/**
 * Utilities for Email Template management
 */

/**
 * Checks if a template name already exists for the user (case-insensitive)
 */
export const isDuplicateTemplateName = (
  newName: string,
  existingTemplates: { name: string; id: string }[],
  currentTemplateId?: string
): boolean => {
  const normalizedNewName = newName.trim().toLowerCase();
  
  return existingTemplates.some(t => {
    const existingName = (t.name || "").trim().toLowerCase();
    return existingName === normalizedNewName && t.id !== currentTemplateId;
  });
};

/**
 * Logic for inserting a variable into a textarea at the cursor position
 */
export const getVariableInsertion = (
  currentBody: string,
  selectionStart: number,
  selectionEnd: number
) => {
  const textBefore = currentBody.substring(0, selectionStart);
  const textAfter = currentBody.substring(selectionEnd);

  // Prevent nesting: if already inside {{ }}, just return current
  if (textBefore.endsWith("{{") && textAfter.startsWith("}}")) {
    return {
      newBody: currentBody,
      newCursorPos: selectionStart,
      shouldInsert: false
    };
  }

  // Smart spacing
  let prefix = "";
  if (selectionStart > 0 && !textBefore.endsWith(" ")) {
    prefix = " ";
  }

  let suffix = "";
  if (selectionEnd < currentBody.length && !textAfter.startsWith(" ")) {
    suffix = " ";
  }

  const variable = `${prefix}{{}}${suffix}`;
  const newBody = textBefore + variable + textAfter;
  const newCursorPos = selectionStart + prefix.length + 2;

  return {
    newBody,
    newCursorPos,
    shouldInsert: true
  };
};
