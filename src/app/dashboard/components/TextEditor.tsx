import BulletList from "@tiptap/extension-bullet-list";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import {
  EditorProvider,
  JSONContent,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useRef, useState } from "react";
import { supabase } from "@/supabase";

export default function TextEditor({
  setContent,
}: {
  setContent: React.Dispatch<JSONContent>;
}) {
  const [contentSet, setContentSet] = useState(false);

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    Image.configure({}),
    StarterKit.configure({
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ];

  const MenuBar = () => {
    const { editor } = useCurrentEditor();

    const text_editor_image = useRef<HTMLInputElement>(null);

    if (!editor) {
      return null;
    }

    return (
      <div className="flex gap-3 flex-wrap border-b border-zinc-600 pb-3 mb-3">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={
            editor.isActive("code")
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph")
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          h1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          h2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          h3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 })
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          h4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 })
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          h5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 })
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          h6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock")
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "bg-white text-black rounded-sm px-1 border"
              : "text-white rounded-sm px-1 border"
          }
        >
          blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          👈🏻
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          👉🏻
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#FF7254").run()}
          className={"rounded-sm px-1"}
        >
          🟥
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#EFF743").run()}
          className={"rounded-sm px-1"}
        >
          🟨
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#40EFEF").run()}
          className={"rounded-sm px-1"}
        >
          🟦
        </button>
        <label
          htmlFor="text_editor_image"
          className={"text-white rounded-sm px-1 cursor-pointer"}
        >
          🖼️
        </label>
        <input
          onChange={async () => {
            //Image file from the input.
            const image = text_editor_image.current?.files![0];
            console.log(image);

            //Now upload it to the storage bucket from supabase.
            const { data, error } = await supabase.storage
              .from("nicohorn_website")
              .upload(`blog_images/${image?.name}`, image!, {
                cacheControl: "3600",
                upsert: false,
              });

            const imageSrc =
              process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL! + data?.path;

            editor
              .chain()
              .focus()
              .setImage({
                src: imageSrc,
                alt: "blog image",
              })
              .run();
          }}
          ref={text_editor_image}
          id="text_editor_image"
          className="hidden"
          type="file"
          accept="image/png, image/gif, image/jpeg"
        />
        <button
          onClick={() => {
            setContentSet(!contentSet);
            contentSet ? setContent({}) : setContent(editor.getJSON());
          }}
          className={`
            ${
              !contentSet
                ? " bg-zinc-900 px-2 hover:bg-zinc-800"
                : " bg-green-700 px-2 hover:bg-green-800"
            } mx-auto transition rounded-sm active:scale-[99%]`}
        >
          {contentSet ? "content set ✅" : "set content"}
        </button>
      </div>
    );
  };

  return (
    <div className="border border-zinc-600 p-3">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={`<div><h1>Hello World!</h1></br></br><div>`}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      />
    </div>
  );
}
