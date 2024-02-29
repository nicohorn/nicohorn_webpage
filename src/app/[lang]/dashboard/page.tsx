import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  return (
    <main>
      <span className="px-2 py-1 bg-white text-black hover:bg-zinc-200 transition">
        <Link href="/dashboard/new_entry">Nueva entrada de blog</Link>
      </span>
    </main>
  );
}
