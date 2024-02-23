"use client";

import Title from "@/components/Title";
import React from "react";
import { Editor } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextEditor from "../components/TextEditor";

export default function Page() {
  new Editor({
    element: document.querySelector(".element")!,
    extensions: [Document, Paragraph, Text],
    content: "<p>Example Text</p>",
    autofocus: true,
    editable: true,
    injectCSS: false,
  });

  return (
    <main className="flex flex-col gap-4">
      <Title title="Entrada de blog" />
      <TextEditor />
    </main>
  );
}
