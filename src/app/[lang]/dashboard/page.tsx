import Link from "next/link";
import React, { useState } from "react";

export default function Page({ params }: { params: { lang: string } }) {
  return (
    <main>
      <span className="px-2 py-1 bg-white text-black hover:bg-zinc-200 transition">
        <Link href={`/${params.lang}/dashboard/new_entry`}>
          {params.lang === "en-US" ? "New blog entry" : "Nueva entrada de blog"}
        </Link>
      </span>
    </main>
  );
}
