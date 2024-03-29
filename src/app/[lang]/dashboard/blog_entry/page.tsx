import React from "react";
import BlogEntryForm from "./components/BlogEntryForm";
import { getTags } from "@/repositories/blog_tag";

export default async function Page({ params }: { params: { lang: string } }) {
  const tags = await getTags();

  return (
    <main className="main-x main-y">
      <BlogEntryForm lang={params.lang} tags={tags!} />
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
-node?

-likes???
-comments?

*/
