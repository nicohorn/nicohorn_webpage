import Title from "@/components/Title";
import React, { useRef } from "react";
import BlogCard from "./components/BlogCard";
import { getAllBlogEntriesWithTags } from "@/repositories/blog_entry";
import Link from "next/link";
import { getTags } from "@/repositories/blog_tag";
import ComboboxComponent from "@/components/TagsCombobox";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string };
  params: { lang: string };
}) {
  const blog_entries = await getAllBlogEntriesWithTags(
    searchParams.tag,
    params.lang
  );
  const tags = await getTags();

  if (!blog_entries) return null;
  if (blog_entries!.length < 1)
    return (
      <div className=" text-5xl">
        <div className="flex flex-col gap-2">
          <ComboboxComponent tags={tags!} lang={params.lang} />
        </div>
        {params.lang === "en-US"
          ? "No blog entries found 😔"
          : "No se encontraron entradas 😔"}
      </div>
    );

  return (
    <main className="flex flex-col gap-5">
      <Title title="Blog" />
      <div className="flex flex-col gap-2">
        <ComboboxComponent tags={tags!} lang={params.lang} />
      </div>
      <div className="flex my-4 w-full xl:w-[60%]">
        <div className="flex flex-col gap-5">
          {blog_entries.map((entry, idx) => {
            return (
              <Link
                key={idx}
                prefetch
                scroll={false}
                href={`/${params.lang}/blog/${entry.id}`}
              >
                <BlogCard blog_entry={entry} idx={idx} />
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

/* 
Blog entry must have

-title
-short_description
-content/text
-cover_image
-tags
-publication_date
-edited_date
-author

-likes???
-comments?

*/
