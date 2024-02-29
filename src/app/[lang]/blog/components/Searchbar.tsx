import React from "react";
import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Searchbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const path = usePathname();
  return (
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
  );
}
