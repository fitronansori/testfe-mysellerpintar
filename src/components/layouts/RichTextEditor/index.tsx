"use client";

import { Toggle } from "@/components/ui/toggle";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
  ];

  return (
    <div className="p-4 border-b rounded-t-[12px] bg-white space-x-2 z-50">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      CharacterCount.configure({
        wordCounter: (text) =>
          text.split(/\s+/).filter((word) => word !== "").length,
      }),
    ],
    content: `
    <p>Type a content...</p>
    `,
    editorProps: {
      attributes: {
        class:
          "h-[500px] p-4 rounded-b-[12px] bg-slate-50 prose prose-sm sm:prose lg:prose-lg",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <Card className="p-0 gap-0 rounded-[12px]">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <div className="bg-white py-6 px-4 rounded-b-[12px] border-t">
        {editor.storage.characterCount.words()} Words
      </div>
    </Card>
  );
};

export default Tiptap;
