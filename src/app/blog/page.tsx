import Title from "@/components/Title";
import React, { useRef } from "react";
import BlogCard from "./components/BlogCard";
import SearchSidebar from "./components/SearchSidebar";
import { getAllBlogEntriesWithTags } from "@/repositories/blog_entry";

export default async function Page() {
  const blog_entries = await getAllBlogEntriesWithTags();

  return (
    <main className="-mt-20">
      <Title title="Últimas entradas" />
      <div className="flex my-4">
        <div className="grid xl:grid-cols-2 gap-10 w-[75%] grid-cols-1">
          {blog_entries!.map((entry, idx) => {
            console.log(idx);
            return <BlogCard blog_entry={entry} key={idx} idx={idx} />;
          })}
        </div>
        <SearchSidebar />
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
