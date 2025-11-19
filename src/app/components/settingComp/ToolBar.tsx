'use client';

import React from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Link2Off,
  List,
  ListOrdered,
  AlignLeft,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

interface RichTextToolbarProps {
  editor: Editor | null;
}

export const RichTextToolbar = ({ editor }: RichTextToolbarProps) => {
  if (!editor) return null;

//   // Ensure FontSize extension is loaded
//   const hasFontSize = editor.extensionManager.extensions.some(
//     (ext) => ext.name === 'fontSize'
//   );

//   if (!hasFontSize) return null;

  // Force re-render on editor updates
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    const handler = () => forceUpdate();
    editor.on('update', handler);
    editor.on('selectionUpdate', handler);
    return () => {
      editor.off('update', handler);
      editor.off('selectionUpdate', handler);
    };
  }, [editor]);

  // Safe font + size
  const fontAttr = editor.getAttributes('textStyle').fontFamily;
  const sizeAttr = editor.getAttributes('textStyle').fontSize;

  const currentFont = typeof fontAttr === 'string' ? fontAttr : '';
  const currentSize = typeof sizeAttr === 'string' ? sizeAttr : '14px';

  const fontDisplay = currentFont || 'Sans Serif';
  const sizeDisplay = currentSize.replace('px', '');

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-100 border border-gray-300 rounded-t-lg select-none">
      {/* Bold / Italic / Underline */}
      <div className="bg-white rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 border-r border-gray-200 hover:bg-gray-200 transition ${
            editor.isActive('bold') ? 'bg-gray-300' : ''
          }`}
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 border-r border-gray-200 hover:bg-gray-200 transition ${
            editor.isActive('italic') ? 'bg-gray-300' : ''
          }`}
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 hover:bg-gray-200 transition ${
            editor.isActive('underline') ? 'bg-gray-300' : ''
          }`}
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'color';
          input.value = editor.getAttributes('textStyle').color || '#000000';
          input.onchange = (e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run();
          input.click();
        }}
        className="p-1 px-3 bg-white shadow-md cursor-pointer rounded hover:bg-gray-200 relative"
      >
        <span className="text-lg font-bold">A</span>
        <div className="absolute inset-x-2 bottom-1 h-1 rounded" style={{ backgroundColor: editor.getAttributes('textStyle').color || '#000' }} />
      </button>

      {/* Link */}
      <button
        type="button"
        onClick={() => {
          const url = prompt('Enter URL:');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className={`p-2 rounded hover:bg-gray-200 transition ${
          editor.isActive('link') ? 'bg-gray-300' : ''
        }`}
      >
        <LinkIcon className="w-4 h-4" />
      </button>

      {editor.isActive('link') && (
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="p-2 rounded hover:bg-gray-200 transition"
        >
          <Link2Off className="w-4 h-4" />
        </button>
      )}

      {/* Lists */}
      <div className="bg-white rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 hover:bg-gray-200 transition ${
            editor.isActive('bulletList') ? 'bg-gray-300' : ''
          }`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 hover:bg-gray-200 transition ${
            editor.isActive('orderedList') ? 'bg-gray-300' : ''
          }`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
      </div>

      {/* Alignment */}
      <div className="bg-white rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 hover:bg-gray-200 transition ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''
          }`}
        >
          <AlignLeft className="w-4 h-4" />
        </button>
      </div>

      {/* FONT FAMILY */}
      <div className="relative">
        <select
          value={currentFont}
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        >
          <option value="">Sans Serif</option>
          <option value="Inter">Inter</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="cursive">Cursive</option>
        </select>

        <div className="flex items-center justify-between min-w-36 px-4 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition">
          <span className="text-sm font-medium truncate">{fontDisplay}</span>
          <div className="flex flex-col">
   <ChevronUp className="w-4 h-4 text-gray-600 -mb-1" />
            <ChevronDown className="w-4 h-4 text-gray-600 -mt-1" />
          </div>
        </div>
      </div>

      {/* FONT SIZE */}
<div className="relative">
  {/* Invisible real <select> – sends "12px", "20px", etc. to TipTap */}
  <select
    value={currentSize}
    onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
  >
    <option value="12px">Small</option>
    <option value="14px">Normal</option>
    <option value="16px">Large</option>
    <option value="20px">Huge</option>
  </select>

  {/* Visible part – shows human-readable label */}
  <div className="flex items-center justify-between w-28 px-4 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition">
    <span className="text-sm font-medium">
      {currentSize === "12px" && "Small"}
      {currentSize === "14px" && "Normal"}
      {currentSize === "16px" && "Large"}
      {currentSize === "20px" && "Huge"}
      {!["12px", "14px", "16px", "20px"].includes(currentSize) && "Normal"}
    </span>
    <div className="flex flex-col">
      <ChevronUp className="w-4 h-4 text-gray-600 -mb-1" />
      <ChevronDown className="w-4 h-4 text-gray-600 -mt-1" />
    </div>
  </div>
</div>

      {/* <div className="w-px h-6 bg-gray-400 mx-2" /> */}

      
    </div>
  );
};
