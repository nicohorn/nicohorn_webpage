"use client";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Courier_Prime } from "next/font/google";

const courier_prime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});

export default function TipTapContent({
  blog_entry_content,
}: {
  blog_entry_content: string;
}) {
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
        keepAttributes: false,
      },
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ];

  return (
    <div className={courier_prime.className}>
      <EditorProvider
        editable={false}
        extensions={extensions}
        content={blog_entry_content}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      />
    </div>
  );
}
