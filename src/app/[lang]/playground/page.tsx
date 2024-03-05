import React from "react";
import CodeEditor from "./components/CodeEditor";

export default function Page({ params }: { params: { lang: string } }) {
  return <CodeEditor lang={params.lang} />;
}
