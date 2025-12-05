// components/RichTextEditor.tsx
'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import {TextStyle} from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontSize from '@tiptap/extension-font-size';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { RichTextToolbar } from '../components/settingComp/ToolBar';

interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  label?: string;
  minHeight?: string;
  disabled?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content = '',
  onChange,
  placeholder = 'Type your text here...',
  label = 'Content',
  minHeight = 'min-h-40',
  disabled = false,
}) => {
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
        types: ['textStyle'],
      }),
      ListItem,
      BulletList,
      OrderedList,
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `prose max-w-full focus:outline-none ${minHeight} p-4 border border-gray-300 rounded-b-lg`,
        contenteditable: 'true',
        spellcheck: 'false',
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getText());
      }
    },
  });

  if (!editor) {
    return (
      <div className="p-4 border border-gray-300 rounded-b-lg bg-gray-50">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-3">
      {label && (
        <label className="block text-md font-medium text-black ">
          {label}
        </label>
      )}
      <div className="space-y-2">
        <RichTextToolbar editor={editor} />
        <EditorContent
          editor={editor}
          className={`
            w-full border border-gray-300 rounded-b-lg p-4
            [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1
            [&_ol]:list-decimal [&_ol]:pl-5
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
        />
      </div>
    </div>
  );
};