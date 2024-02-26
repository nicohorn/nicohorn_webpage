"use client";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, generateHTML, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/starter-kit";
import Bold from "@tiptap/starter-kit";
import Document from "@tiptap/starter-kit";
import Text from "@tiptap/starter-kit";
import React from "react";

export default function TipTapContent({
  blog_entry_content,
}: {
  blog_entry_content: string;
}) {
  const content_to_json = JSON.parse(blog_entry_content);
  const output = generateHTML(content_to_json, [
    Document,
    Paragraph,
    Text,
    Bold,
    Image,
    // other extensions …
  ]);
  const editor = useEditor({});
  return (
    <EditorContent content={blog_entry_content} editor={editor}></EditorContent>
  );
}
