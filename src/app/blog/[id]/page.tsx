import { getBlogEntryById } from "@/repositories/blog_entry";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import TipTapContent from "../components/TipTapContent";

export default async function Page({ params }: { params: { id: string } }) {
  const blog_entry = await getBlogEntryById(params.id);

  return (
    <main className="-mt-20">
      <TipTapContent blog_entry_content={blog_entry?.content!} />
    </main>
  );
}
