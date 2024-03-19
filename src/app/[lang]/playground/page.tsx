import React from "react";
import CodeEditor from "./components/CodeEditor";
import Title from "@/components/Title";

export default function Page({ params }: { params: { lang: string } }) {
  return (
    <main className="flex flex-col gap-5">
      <Title title="Playground" />
      <CodeEditor lang={params.lang} />
    </main>
  );
}
