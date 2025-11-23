"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { slugify } from "@/lib/utils";
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontSize } from '@tiptap/extension-font-size';
import { Extension } from '@tiptap/core';
import { Suggestion } from '@tiptap/suggestion';

// Import highlighting languages
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import php from 'highlight.js/lib/languages/php';
import sql from 'highlight.js/lib/languages/sql';
import json from 'highlight.js/lib/languages/json';

// Create lowlight instance
const lowlight = createLowlight();

// Register languages with lowlight
lowlight.register({ javascript, typescript, css, python, java, php, sql, json });

// Slash Commands Extension
const SlashCommands = Extension.create({
  name: 'slashCommands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}

function ToolbarButton({ onClick, isActive, disabled, children, title }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${isActive ? 'bg-blue-100 border-blue-400' : 'bg-white'
        }`}
    >
      {children}
    </button>
  );
}

type NotionEditorProps = {
  editId?: string | null;
  onClose?: () => void;
  onSaved?: (post: { id: string; title: string; slug: string; published: boolean }) => void;
};

export default function NotionEditor({ editId, onClose, onSaved }: NotionEditorProps = {}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [submitting, setSubmitting] = useState<"idle" | "save" | "publish">("idle");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });

  // Slash commands data
  const slashCommands = [
    { title: 'Heading 1', description: 'Large section heading', command: () => editor?.chain().focus().toggleHeading({ level: 1 }).run() },
    { title: 'Heading 2', description: 'Medium section heading', command: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
    { title: 'Heading 3', description: 'Small section heading', command: () => editor?.chain().focus().toggleHeading({ level: 3 }).run() },
    { title: 'Bullet List', description: 'Create a simple bullet list', command: () => editor?.chain().focus().toggleBulletList().run() },
    { title: 'Numbered List', description: 'Create a list with numbering', command: () => editor?.chain().focus().toggleOrderedList().run() },
    { title: 'Task List', description: 'Track tasks with todo list', command: () => editor?.chain().focus().toggleTaskList().run() },
    { title: 'Quote', description: 'Capture a quote', command: () => editor?.chain().focus().toggleBlockquote().run() },
    { title: 'Code Block', description: 'Capture a code snippet', command: () => editor?.chain().focus().toggleCodeBlock().run() },
    { title: 'Table', description: 'Insert a table', command: () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
    { title: 'Divider', description: 'Visually divide sections', command: () => editor?.chain().focus().setHorizontalRule().run() },
  ];

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false, // We'll use CodeBlockLowlight instead
        heading: {
          HTMLAttributes: {
            class: 'heading',
          },
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      Color,
      FontSize,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your post... Type "/" for commands',
      }),
      Typography,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-gray-100 rounded-md p-4 font-mono text-sm',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse border border-gray-300',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border border-gray-300',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 bg-gray-100 font-semibold p-2',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2',
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'not-prose',
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: 'flex items-start gap-2',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-yellow-200',
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'my-4 border-gray-300',
        },
      }),
      SlashCommands.configure({
        suggestion: {
          items: ({ query }: { query: string }) => {
            return slashCommands.filter(item =>
              item.title.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 10);
          },
          render: () => {
            let component: any;
            let popup: any;

            return {
              onStart: (props: any) => {
                component = {
                  selectedIndex: 0,
                  selectItem: (index: number) => {
                    const item = props.items[index];
                    if (item) {
                      props.command({ command: item.command });
                    }
                  },
                };

                if (!props.clientRect) {
                  return;
                }

                popup = document.createElement('div');
                popup.className = 'slash-menu absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-2 min-w-64';
                popup.style.left = props.clientRect().left + 'px';
                popup.style.top = props.clientRect().bottom + 'px';

                document.body.appendChild(popup);

                const renderItems = () => {
                  popup.innerHTML = props.items.map((item: any, index: number) =>
                    `<div class="slash-item p-2 rounded hover:bg-gray-100 cursor-pointer ${index === component.selectedIndex ? 'bg-blue-50' : ''
                    }">
                      <div class="font-medium text-sm">${item.title}</div>
                      <div class="text-xs text-gray-500">${item.description}</div>
                    </div>`
                  ).join('');

                  const items = popup.querySelectorAll('.slash-item');
                  items.forEach((item: any, index: number) => {
                    item.addEventListener('click', () => {
                      component.selectItem(index);
                    });
                  });
                };

                renderItems();

                const onKeyDown = (event: KeyboardEvent) => {
                  if (event.key === 'ArrowUp') {
                    component.selectedIndex = ((component.selectedIndex + props.items.length - 1) % props.items.length);
                    renderItems();
                    return true;
                  }

                  if (event.key === 'ArrowDown') {
                    component.selectedIndex = ((component.selectedIndex + 1) % props.items.length);
                    renderItems();
                    return true;
                  }

                  if (event.key === 'Enter') {
                    component.selectItem(component.selectedIndex);
                    return true;
                  }

                  return false;
                };

                document.addEventListener('keydown', onKeyDown);
                popup.onKeyDown = onKeyDown;
              },

              onUpdate(props: any) {
                if (!popup) return;

                if (props.clientRect) {
                  popup.style.left = props.clientRect().left + 'px';
                  popup.style.top = props.clientRect().bottom + 'px';
                }

                const renderItems = () => {
                  popup.innerHTML = props.items.map((item: any, index: number) =>
                    `<div class="slash-item p-2 rounded hover:bg-gray-100 cursor-pointer ${index === component.selectedIndex ? 'bg-blue-50' : ''
                    }">
                      <div class="font-medium text-sm">${item.title}</div>
                      <div class="text-xs text-gray-500">${item.description}</div>
                    </div>`
                  ).join('');

                  const items = popup.querySelectorAll('.slash-item');
                  items.forEach((item: any, index: number) => {
                    item.addEventListener('click', () => {
                      component.selectItem(index);
                    });
                  });
                };

                renderItems();
              },

              onKeyDown(props: any) {
                if (props.event.key === 'Escape') {
                  if (popup) {
                    document.body.removeChild(popup);
                    popup = null;
                  }
                  return true;
                }

                return popup?.onKeyDown?.(props.event);
              },

              onExit() {
                if (popup) {
                  document.body.removeChild(popup);
                  popup = null;
                }
              },
            };
          },
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-compact max-w-none focus:outline-none min-h-[400px] p-4 editor-content',
      },
    },
  });

  const onTitleChange = (v: string) => {
    setTitle(v);
    if (!slugTouched) {
      setSlug(slugify(v));
    }
  };

  const editorContent = editor?.getHTML() || '';

  const isValid = useMemo(() => {
    return title.trim().length >= 3 &&
      editorContent.length > 0 &&
      editorContent !== '<p></p>' &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  }, [title, slug, editorContent]);

  const uploadImage = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Upload failed');
      }

      const { url } = await response.json();
      return url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }, []);

  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && editor) {
        try {
          setMessage('Uploading image...');
          const url = await uploadImage(file);
          editor.chain().focus().setImage({ src: url }).run();
          setMessage('Image uploaded successfully!');
          setTimeout(() => setMessage(null), 3000);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
          setError(errorMessage);
          setTimeout(() => setError(null), 5000);
        }
      }
    };
    input.click();
  }, [editor, uploadImage]);

  const addLink = useCallback(() => {
    const url = window.prompt('Enter URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const submit = useCallback(
    async (publish: boolean) => {
      if (!editor) return;

      console.log('Submit called with publish:', publish);
      console.log('Session:', session);
      console.log('Is valid:', title.trim().length >= 3 &&
        editorContent.length > 0 &&
        editorContent !== '<p></p>' &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug));

      setSubmitting(publish ? "publish" : "save");
      setError(null);
      setMessage(null);

      try {
        const content = editor.getHTML();
        console.log('Content to submit:', content);

        const payload = {
          title: title.trim(),
          description: description.trim() || null,
          slug: slug.trim(),
          content,
          contentType: 'html',
          published: publish,
        };
        console.log('Payload:', payload);

        let res: Response;
        if (editId) {
          res = await fetch(`/api/posts/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }

        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers);

        if (res.status === 409) {
          setError("Slug already exists. Please change the slug.");
          setSubmitting("idle");
          return;
        }

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          console.log('Error response body:', body);
          setError(body?.error || "Failed to save post");
          setSubmitting("idle");
          return;
        }

        const data = (await res.json()) as { id: string; slug: string };
        console.log('Success response:', data);

        const saved = { id: data.id, title: title.trim(), slug: data.slug, published: publish };
        // Notify parent for optimistic UI
        onSaved && onSaved(saved);

        if (publish) {
          router.replace(`/blogs/${data.slug}`);
          return;
        }

        setMessage("Draft saved.");
      } catch (e) {
        console.error('Submit error:', e);
        setError("Network error. Please try again.");
      } finally {
        setSubmitting("idle");
      }
    },
    [title, description, slug, editor, router, editorContent, session, editId, onSaved]
  );

  // Load post if editId provided
  useEffect(() => {
    if (!editId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/posts/${editId}`);
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled) return;
        const post = json.post;
        setTitle(post.title || "");
        setDescription(post.description || "");
        setSlug(post.slug || "");
        if (editor && post.content) {
          editor.commands.setContent(post.content);
        }
      } catch (e) {
        console.error("Failed to load post for editing", e);
      }
    })();
    return () => { cancelled = true; };
  }, [editId, editor]);

  // Check authentication after all hooks
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session || (session.user as any)?.role !== "ADMIN") {
    router.push(`/signin?callbackUrl=${encodeURIComponent("/write")}`);
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex items-center justify-center py-20">
            <span className="text-gray-600">Redirecting to login...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!editor) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading editor...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-6">Write</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Brief description for the blog listing page (optional)"
              rows={3}
              maxLength={300}
            />
            <p className="text-xs text-gray-500 mt-1">This will be shown in the blog listing page. Max 300 characters.</p>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="slug">Slug</label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value.toLowerCase());
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="auto-generated-from-title"
            />
            <p className="text-xs text-gray-500 mt-1">Lowercase letters, numbers, and hyphens only.</p>
          </div>
        </div>

        {/* Sticky Toolbar */}
        <div className="sticky top-0 z-10 border border-gray-300 rounded-t-md p-3 bg-gray-50 flex flex-wrap gap-1 shadow-sm">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            ↶ Undo
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            ↷ Redo
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <strong>B</strong>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <em>I</em>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline"
          >
            <u>U</u>
          </ToolbarButton>

          {/* Background Highlight Color Dropdown */}
          <div className="relative inline-block">
            <select
              className="p-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Background Color"
              value={editor.getAttributes('highlight').color || ''}
              onChange={e => {
                const color = e.target.value;
                if (color) {
                  editor.chain().focus().toggleHighlight({ color }).run();
                } else {
                  editor.chain().focus().unsetHighlight().run();
                }
              }}
              style={{ minWidth: 40 }}
            >
              <option value="">Highlight</option>
              <option value="#fef08a" style={{ backgroundColor: '#fef08a' }}>Yellow</option>
              <option value="#fed7d7" style={{ backgroundColor: '#fed7d7' }}>Light Red</option>
              <option value="#fecaca" style={{ backgroundColor: '#fecaca' }}>Red</option>
              <option value="#fed7aa" style={{ backgroundColor: '#fed7aa' }}>Orange</option>
              <option value="#d1fae5" style={{ backgroundColor: '#d1fae5' }}>Green</option>
              <option value="#dbeafe" style={{ backgroundColor: '#dbeafe' }}>Blue</option>
              <option value="#e0e7ff" style={{ backgroundColor: '#e0e7ff' }}>Indigo</option>
              <option value="#f3e8ff" style={{ backgroundColor: '#f3e8ff' }}>Purple</option>
              <option value="#fce7f3" style={{ backgroundColor: '#fce7f3' }}>Pink</option>
              <option value="#f3f4f6" style={{ backgroundColor: '#f3f4f6' }}>Gray</option>
              <option value="#f0fdfa" style={{ backgroundColor: '#f0fdfa' }}>Teal</option>
              <option value="#ecfdf5" style={{ backgroundColor: '#ecfdf5' }}>Emerald</option>
            </select>
          </div>

          <div className="w-px h-8 bg-gray-300 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            H1
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            H2
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            H3
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            • List
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            1. List
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            isActive={editor.isActive('taskList')}
            title="Task List"
          >
            ☑ Task
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Quote"
          >
            &quot; Quote
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            title="Code Block"
          >
            &lt;/&gt; Code
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 mx-1" />

          <ToolbarButton
            onClick={addLink}
            isActive={editor.isActive('link')}
            title="Add Link"
          >
            🔗 Link
          </ToolbarButton>

          <ToolbarButton
            onClick={handleImageUpload}
            title="Upload Image"
          >
            🖼️ Image
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            title="Insert Table"
          >
            📊 Table
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            ➖ Divider
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            ⬅️
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            ↔️
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            ➡️
          </ToolbarButton>

          <div className="w-px h-8 bg-gray-300 mx-1" />

          <ToolbarButton
            onClick={() => {
              const currentSize = editor.getAttributes('textStyle').fontSize || '16px';
              const currentValue = parseInt(currentSize);
              const newSize = Math.min(currentValue + 2, 32);
              editor.chain().focus().setFontSize(`${newSize}px`).run();
            }}
            title="Increase Font Size"
          >
            A+
          </ToolbarButton>

          <ToolbarButton
            onClick={() => {
              const currentSize = editor.getAttributes('textStyle').fontSize || '16px';
              const currentValue = parseInt(currentSize);
              const newSize = Math.max(currentValue - 2, 10);
              editor.chain().focus().setFontSize(`${newSize}px`).run();
            }}
            title="Decrease Font Size"
          >
            A-
          </ToolbarButton>

          {/* Text Color Dropdown */}
          <div className="relative inline-block">
            <select
              className="p-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Text Color"
              value={editor.getAttributes('textStyle').color || ''}
              onChange={e => {
                const color = e.target.value;
                if (color) {
                  editor.chain().focus().setColor(color).run();
                } else {
                  editor.chain().focus().unsetColor().run();
                }
              }}
              style={{ minWidth: 40 }}
            >
              <option value="">Text Color</option>
              <option value="#000000" style={{ color: '#000000' }}>Black</option>
              <option value="#e11d48" style={{ color: '#e11d48' }}>Red</option>
              <option value="#f59e42" style={{ color: '#f59e42' }}>Orange</option>
              <option value="#eab308" style={{ color: '#eab308' }}>Yellow</option>
              <option value="#22c55e" style={{ color: '#22c55e' }}>Green</option>
              <option value="#0ea5e9" style={{ color: '#0ea5e9' }}>Sky Blue</option>
              <option value="#2563eb" style={{ color: '#2563eb' }}>Blue</option>
              <option value="#6366f1" style={{ color: '#6366f1' }}>Indigo</option>
              <option value="#a21caf" style={{ color: '#a21caf' }}>Purple</option>
              <option value="#be185d" style={{ color: '#be185d' }}>Pink</option>
              <option value="#6b7280" style={{ color: '#6b7280' }}>Gray</option>
              <option value="#fbbf24" style={{ color: '#fbbf24' }}>Amber</option>
              <option value="#14b8a6" style={{ color: '#14b8a6' }}>Teal</option>
              <option value="#b91c1c" style={{ color: '#b91c1c' }}>Dark Red</option>
              <option value="#f1f5f9" style={{ color: '#f1f5f9' }}>Light Gray</option>
            </select>
          </div>
        </div>

        {/* Editor */}
        <div className="border border-gray-300 border-t-0 rounded-b-md">
          <EditorContent editor={editor} />
        </div>

        {error ? <p className="text-sm text-red-600 mt-4" role="alert">{error}</p> : null}
        {message ? <p className="text-sm text-green-700 mt-4">{message}</p> : null}

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => submit(false)}
            disabled={!isValid || submitting !== "idle"}
            className="rounded-md bg-gray-900 text-white px-4 py-2 hover:bg-gray-800 disabled:opacity-60"
          >
            {submitting === "save" ? "Saving..." : "Save draft"}
          </button>
          <button
            onClick={() => submit(true)}
            disabled={!isValid || submitting !== "idle"}
            className="rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting === "publish" ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
