"use client";
import { TagsToSpanish } from "@/utils/dictionaries/Tags";
import { blog_tags } from "@prisma/client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";

export default function SearchSidebar({
  lang,
  tags,
}: {
  lang: string;
  tags: blog_tags[];
}) {
  const path = usePathname();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState(-1);

  console.log({ ...searchParams });
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="fixed right-[2rem] text-right px-4 xl:flex flex-col gap-4 hidden ">
      {tags.map((tag, idx) => {
        return (
          <Link
            className={`${
              (selected === idx || searchParams.get("tag") === tag.name) &&
              "text-yellow-400 underline"
            } "hover:underline hover:text-yellow-400 transition"`}
            href={`${path}?${createQueryString("tag", tag.name)}`}
            key={idx}
            onClick={() => {
              setSelected(idx);
              console.log(createQueryString("tag", tag.name));
            }}
          >
            {lang === "en-US"
              ? tag.name
              : TagsToSpanish[tag.name]
              ? TagsToSpanish[tag.name]
              : tag.name}
          </Link>
        );
      })}
    </div>
  );
}
