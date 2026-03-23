"use client";

import { useMemo, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  name: string;
  label: string;
  initialValue?: string;
  placeholder?: string;
};

export function RichTextField({
  name,
  label,
  initialValue = "",
  placeholder = "Write content...",
}: Props) {
  const [value, setValue] = useState(initialValue);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialValue,
    editorProps: {
      attributes: {
        class:
          "min-h-44 rounded-b-xl border border-slate-900/20 border-t-0 bg-white px-3 py-3 text-sm text-slate-950 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
  });

  const toolbarButtons = useMemo(
    () => [
      {
        label: "B",
        active: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "I",
        active: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "H2",
        active: editor?.isActive("heading", { level: 2 }),
        onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        label: "H3",
        active: editor?.isActive("heading", { level: 3 }),
        onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      },
      {
        label: "List",
        active: editor?.isActive("bulletList"),
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
      },
      {
        label: "Num",
        active: editor?.isActive("orderedList"),
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      },
      {
        label: "Quote",
        active: editor?.isActive("blockquote"),
        onClick: () => editor?.chain().focus().toggleBlockquote().run(),
      },
      {
        label: "Undo",
        active: false,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        active: false,
        onClick: () => editor?.chain().focus().redo().run(),
      },
    ],
    [editor],
  );

  return (
    <div className="space-y-2 sm:col-span-2">
      <label className="text-sm font-medium text-slate-950">{label}</label>
      <div className="rounded-xl border border-slate-900/20 bg-slate-50/60 p-2">
        <div className="flex flex-wrap gap-2 rounded-xl border border-slate-900/20 bg-white p-2">
          {toolbarButtons.map((button) => (
            <button
              key={button.label}
              type="button"
              onClick={button.onClick}
              className={`rounded-md border px-2 py-1 text-xs font-medium transition ${
                button.active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-900/20 bg-white text-slate-900"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>

        <EditorContent editor={editor} />
      </div>

      <input type="hidden" name={name} value={value} />
      <p className="text-xs text-slate-900/70">
        Tip: use headings and lists to keep product description clean and readable.
      </p>
    </div>
  );
}
