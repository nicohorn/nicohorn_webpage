import { BlogEntryWithTags, getBlogEntryById } from "@/repositories/blog_entry";
import React from "react";
import type { Metadata } from "next";
import BlogEntry from "../components/BlogEntry";
import { getServerSession } from "next-auth";
import { users } from "@prisma/client";
import { authOptions } from "@/utils/authOptions";

export default async function Page({
  params,
}: {
  params: { id: string; lang: string };
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as users;
  const blog_entry = (await getBlogEntryById(params.id)) as BlogEntryWithTags;

  return <BlogEntry user={user} lang={params.lang} blog_entry={blog_entry} />;
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
    authors: { name: blog_entry?.author_name, url: "https://nicohorn.com" },
    openGraph: {
      images: blog_entry?.cover_image,
    },
    keywords: blog_entry?.tags.map((t) => {
      return t.blog_tag.name;
    }),
  };
}
