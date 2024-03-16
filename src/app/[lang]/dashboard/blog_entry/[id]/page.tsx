import { BlogEntryWithTags, getBlogEntryById } from "@/repositories/blog_entry";
import React from "react";
import BlogEntryForm from "../components/BlogEntryForm";
import { getTags } from "@/repositories/blog_tag";
//EDIT BLOG ENTRY
export default async function Page({
  params,
}: {
  params: { id: string; lang: string };
}) {
  const blog_entry = (await getBlogEntryById(params.id)) as BlogEntryWithTags;
  const tags = await getTags();

  return (
    <main>
      <BlogEntryForm blog_entry={blog_entry} tags={tags!} lang={params.lang} />
    </main>
  );
}
