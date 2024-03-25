import Title from "@/components/Title";
import Link from "next/link";
import React, { useState } from "react";

export default function Page({ params }: { params: { lang: string } }) {
  return (
    <main className="main-y main-x">
      <Title size="md" title="Dashboard" />
      <span className="bg-white px-2 py-1 text-black transition hover:bg-zinc-200">
        <Link href={`/${params.lang}/dashboard/blog_entry`}>
          {params.lang === "en-US" ? "New blog entry" : "Nueva entrada de blog"}
        </Link>
      </span>
    </main>
  );
}
