import Title from "@/components/Title";
import React, { useRef } from "react";
import BlogCard from "./components/BlogCard";
import SearchSidebar from "./components/SearchSidebar";
import { getAllBlogEntriesWithTags } from "@/repositories/blog_entry";
import Link from "next/link";
import { IconLayoutRows, IconLayoutColumns } from "@tabler/icons-react";
import { getTags } from "@/repositories/blog_tag";
import { headers as reqHeaders } from "next/headers";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string };
  params: { lang: string };
}) {
  const blog_entries = await getAllBlogEntriesWithTags(searchParams.tag);
  const tags = await getTags();

  const headers = reqHeaders() as any;

  if (!blog_entries) return null;

  return (
    <main className="xl:-mt-20 -mt-12">
      <SearchSidebar lang={params.lang} tags={tags!} />

      <div className="flex gap-2 items-end">
        <Title
          title={params.lang === "en-US" ? "Last entries" : "Últimas entradas"}
        />
        <Link
          className="ml-3"
          aria-label="Display blog cards in columns"
          href={`/${params.lang}/blog?display=cols`}
        >
          <IconLayoutColumns />
        </Link>
        <Link
          href={`/${params.lang}/blog?display=rows`}
          aria-label="Display blog cards in rows"
        >
          <IconLayoutRows />
        </Link>
      </div>
      <div className="flex my-4 w-full xl:w-[80%]">
        <div
          className={` 
            ${
              searchParams.display === "cols" || !searchParams.display
                ? "grid xl:grid-cols-2 gap-10  grid-cols-1"
                : "grid gap-10  grid-cols-1"
            }
           transition ${
             !searchParams && "grid xl:grid-cols-2 gap-10  grid-cols-1"
           }`}
        >
          {blog_entries.map((entry, idx) => {
            return (
              <Link
                key={idx}
                prefetch
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
