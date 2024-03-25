import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/supabase";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

import {
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconCode,
  IconArrowBack,
  IconArrowForwardUp,
  IconPhoto,
} from "@tabler/icons-react";

export default function TextEditor({
  setContent,
  imageSrcs,
  setImageSrcs,
  content,
}: {
  setContent: React.Dispatch<string>;
  imageSrcs: string[];
  setImageSrcs: React.Dispatch<string[]>;
  content?: string;
}) {
  const [contentSet, setContentSet] = useState(false);

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] } as any),
    Link.configure({ linkOnPaste: true }),
    Image.configure({
      HTMLAttributes: {
        class: "tiptap_image",
      },
    }),
    CodeBlockLowlight.configure({
      lowlight: createLowlight(common),
    }),
    StarterKit.configure({
      codeBlock: false,
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
      <div className="border-secondary sticky top-8 z-50 mb-3 flex w-full flex-wrap gap-3 border-b bg-black p-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          <IconBold />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          <IconItalic />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          <IconStrikethrough />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCode().run();
          }}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={
            editor.isActive("code")
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          <IconCode />
        </button>
        <button
          className="opacity-60 transition hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().unsetAllMarks().run();
          }}
        >
          clear marks
        </button>
        <button
          className="opacity-60 transition hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().clearNodes().run();
          }}
        >
          clear nodes
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setParagraph().run();
          }}
          className={
            editor.isActive("paragraph")
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          paragraph
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 })
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          h1
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          h2
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 })
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          h3
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className={
            editor.isActive("heading", { level: 4 })
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          h4
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          bullet list
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          ordered list
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={
            editor.isActive("codeBlock")
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          code block
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "rounded-sm border bg-white px-1 text-black"
              : "rounded-sm border px-1 text-white opacity-60 transition hover:opacity-100"
          }
        >
          blockquote
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setHorizontalRule().run();
          }}
        >
          horizontal rule
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setHardBreak().run();
          }}
        >
          hard break
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <IconArrowBack />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <IconArrowForwardUp />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setColor("#FF7254").run();
          }}
          className={"rounded-sm px-1"}
        >
          🟥
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setColor("#EFF743").run();
          }}
          className={"rounded-sm px-1"}
        >
          🟨
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setColor("#40EFEF").run();
          }}
          className={"rounded-sm px-1"}
        >
          🟦
        </button>
        <label
          onClick={(e) => {
            editor.getJSON().content?.map((node) => {
              if (node.type === "image") {
              }
            });
          }}
          htmlFor="text_editor_image"
          className={"cursor-pointer rounded-sm px-1 text-white"}
        >
          <IconPhoto />
        </label>
        <input
          onChange={async () => {
            //Image file from the input.
            const image = text_editor_image.current?.files![0];

            //Now upload it to the storage bucket from supabase.
            const { data, error } = await supabase.storage
              .from("nicohorn_website")
              .upload(`blog_images/${image?.name}`, image!, {
                cacheControl: "3600",
                upsert: false,
              });

            const imageSrc =
              process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL! + data?.path;

            if (data) setImageSrcs([...imageSrcs, imageSrc]);
            else console.log(error);

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
          onClick={(e) => {
            e.preventDefault();
            setContentSet(!contentSet);
            contentSet ? setContent("") : setContent(editor.getHTML());
            if (!contentSet)
              document
                .getElementById("publish_entry_buton")
                ?.classList.remove("text-zinc-500", "pointer-events-none");
            else
              document
                .getElementById("publish_entry_buton")
                ?.classList.add("text-zinc-500", "pointer-events-none");
          }}
          className={`
            ${
              !contentSet
                ? " bg-background hover:bg-accent px-2"
                : " bg-green-700 px-2 hover:bg-green-800"
            } mx-auto rounded-sm text-white transition active:scale-[99%]`}
        >
          {contentSet ? "content set ✅" : "set content"}
        </button>
      </div>
    );
  };

  return (
    <div
      className={`border-secondary rounded border p-4 ${montserrat.className} `}
    >
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      />
    </div>
  );
}
