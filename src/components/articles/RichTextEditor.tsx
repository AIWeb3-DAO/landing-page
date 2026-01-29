"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import React from 'react';
import {
    Bold, Italic, List, ListOrdered, Quote, Undo, Redo,
    Heading1, Heading2, Image as ImageIcon, Link as LinkIcon
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    return (
        <div className="flex flex-wrap gap-2 p-2 border-b border-white/10 bg-white/5 sticky top-0 z-10 backdrop-blur-md">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-white/10 ${editor.isActive('bold') ? 'bg-primary text-black' : 'text-white/60'}`}
                title="Bold"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-white/10 ${editor.isActive('italic') ? 'bg-primary text-black' : 'text-white/60'}`}
                title="Italic"
            >
                <Italic className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 1 }) ? 'bg-primary text-black' : 'text-white/60'}`}
                title="H1"
            >
                <Heading1 className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-black' : 'text-white/60'}`}
                title="H2"
            >
                <Heading2 className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-white/10 ${editor.isActive('bulletList') ? 'bg-primary text-black' : 'text-white/60'}`}
                title="Bullet List"
            >
                <List className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-white/10 ${editor.isActive('orderedList') ? 'bg-primary text-black' : 'text-white/60'}`}
                title="Ordered List"
            >
                <ListOrdered className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-white/10 ${editor.isActive('blockquote') ? 'bg-primary text-black' : 'text-white/60'}`}
                title="Blockquote"
            >
                <Quote className="w-4 h-4" />
            </button>
            <button
                onClick={setLink}
                className={`p-2 rounded hover:bg-white/10 ${editor.isActive('link') ? 'bg-primary text-black' : 'text-white/60'}`}
                title="Add Link"
            >
                <LinkIcon className="w-4 h-4" />
            </button>
            <button
                onClick={addImage}
                className={`p-2 rounded hover:bg-white/10 text-white/60`}
                title="Add Image"
            >
                <ImageIcon className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-white/10 mx-1 self-center" />
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded hover:bg-white/10 text-white/60"
                title="Undo"
            >
                <Undo className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded hover:bg-white/10 text-white/60"
                title="Redo"
            >
                <Redo className="w-4 h-4" />
            </button>
        </div>
    );
};

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none min-h-[400px] p-4 focus:outline-none',
            },
        },
    });

    return (
        <div className="w-full border border-white/10 rounded-xl overflow-hidden bg-white/5 focus-within:border-primary/50 transition-all">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
