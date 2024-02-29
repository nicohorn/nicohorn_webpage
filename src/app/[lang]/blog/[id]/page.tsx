import { BlogEntryWithTags, getBlogEntryById } from "@/repositories/blog_entry";
import React from "react";

import type { Metadata } from "next";
import BlogEntry from "../components/BlogEntry";

export default async function Page({
  params,
}: {
  params: { id: string; lang: string };
}) {
  const blog_entry = (await getBlogEntryById(params.id)) as BlogEntryWithTags;

  return <BlogEntry blog_entry={blog_entry} />;
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog_entry = await getBlogEntryById(params.id);

  return {
    title: blog_entry?.title,
    description: blog_entry?.description,
    authors: { name: blog_entry?.author_name },
  };
}
