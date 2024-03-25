import React from "react";
import CodeEditor from "./components/CodeEditor";
import Title from "@/components/Title";

export default function Page({ params }: { params: { lang: string } }) {
  return (
    <main className="main-y main-x flex flex-col gap-5">
      <Title size="lg" title="Playground" />
      <CodeEditor lang={params.lang} />
    </main>
  );
}
