"use client";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import { EditorProvider, JSONContent, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useRef, useState } from "react";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function TipTapContent({
  blog_entry_content,
}: {
  blog_entry_content: string;
}) {
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] } as any),
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

  return (
    <div className={montserrat.className}>
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
