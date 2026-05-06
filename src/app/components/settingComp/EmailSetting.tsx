// app/email-settings/page.tsx  (or your component file)
'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
// Required for font size
import FontSize from '@tiptap/extension-font-size';

import { RichTextToolbar } from './ToolBar';

const EmailSetting = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['paragraph'] }),
      FontFamily,
      TextStyle,
      Color,
      FontSize.configure({
        types: ['textStyle'], // required
      }),
      ListItem,
      BulletList,
      OrderedList,
    ],
    content: `
      <p><strong>Lumière Studios</strong></p>
      <p>Wedding Films & Photography</p>
      <p style="color: #ca8a04;"><a href="https://www.lumierestudios.com">www.lumierestudios.com</a></p>
    `,
    immediatelyRender: false, // Fixes Next.js SSR error
    editorProps: {
      attributes: {
        class: 'prose max-w-full focus:outline-none min-h-40 p-4 border border-gray-300 rounded-b-lg',
        contenteditable: 'true'
        , spellcheck: 'false',
      },
    },
  });

  if (!editor) {
    return (
      <div className="p-4 border border-gray-300 rounded-b-lg min-h-40 bg-gray-50">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="max-w-3xl  p-8">
      <h1 className="text-2xl  mb-8">Email Settings</h1>

      <form className="space-y-7">
        {/* All your original inputs — unchanged */}
        <div>
          <label className="block text-sm font-medium mb-2">Sender Name (From)</label>
          <input
            type="text"
            defaultValue={"Velofolio"}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sender Email Address (Reply to)</label>
          <input
            type="text"
            placeholder="hello@lumierestudios.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Reply-To Email</label>
          <input
            type="text"
            placeholder="support@lumierestudios.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* FULL RICH TEXT SIGNATURE EDITOR */}
        <div>
          <label className="block text-sm font-medium mb-2">Footer Signature</label>

          <RichTextToolbar editor={editor} />

          {/* Editor Area */}
          <EditorContent
            editor={editor}
            className="
    focus:outline-none min-h-40 border border-gray-300 rounded-b-lg p-4
    [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1
    [&_ol]:list-decimal [&_ol]:pl-5
  "
          />

        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={() => {
            console.log('Signature HTML:', editor.getHTML());
            alert('Signature saved! Check console.');
          }}
          className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-full font-medium hover:bg-[#0198c7] transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EmailSetting;
