import Link from "next/link";
import React, { useState } from "react";
import { headers as reqHeaders } from "next/headers";

export default function Page() {
  const headers = reqHeaders() as any;
  return (
    <main>
      <span className="px-2 py-1 bg-white text-black hover:bg-zinc-200 transition">
        <Link
          href={`/${
            headers.headers["Accept-Language"].split(",")[0]
          }/dashboard/new_entry`}
        >
          Nueva entrada de blog
        </Link>
      </span>
    </main>
  );
}
