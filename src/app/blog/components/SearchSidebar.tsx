"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";

export default function SearchSidebar() {
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="fixed right-[5rem] top-24 text-right px-4 flex flex-col gap-4">
      <div className="flex gap-6">
        <label htmlFor="search_input">Buscar por título</label>{" "}
        <input
          id="search_input"
          onKeyDown={(e) => {
            const newUrl = new URL(path as string, "http://localhost:3000");
            if (e.key == "Enter") {
              newUrl.searchParams.set("search", inputRef.current?.value!);
              router.push(newUrl.href);
            }
          }}
          ref={inputRef}
          className="text-black px-2"
        />
      </div>
      <a className="hover:underline hover:text-yellow-400 transition" href="#">
        tag
      </a>
      <a className="hover:underline hover:text-yellow-400 transition" href="#">
        dev
      </a>
      <a className="hover:underline hover:text-yellow-400 transition" href="#">
        enterprise
      </a>
      <a className="hover:underline hover:text-yellow-400 transition" href="#">
        gigs
      </a>
      <a className="hover:underline hover:text-yellow-400 transition" href="#">
        for fun
      </a>
    </div>
  );
}
