"use client";
import { TagsToSpanish } from "@/utils/dictionaries/Tags";
import { blog_tags } from "@prisma/client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

export default function SearchSidebar({ tags }: { tags: blog_tags[] }) {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

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
    <div className="fixed right-[5rem] text-right px-4 xl:flex flex-col gap-4 hidden ">
      {tags.map((tag, idx) => {
        return (
          <Link
            className={`${
              searchParams.get("tag") === tag.name &&
              "text-yellow-400 underline"
            } "hover:underline hover:text-yellow-400 transition"`}
            href={`${path}?${createQueryString("tag", tag.name)}`}
            key={idx}
            onClick={() => {
              console.log(createQueryString("tag", tag.name));
            }}
          >
            {TagsToSpanish[tag.name] ? TagsToSpanish[tag.name] : tag.name}
          </Link>
        );
      })}
    </div>
  );
}
