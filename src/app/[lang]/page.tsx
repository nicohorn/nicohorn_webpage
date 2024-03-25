import Landing from "@/components/Landing";
import { getLatest3BlogEntries } from "@/repositories/blog_entry";
import React from "react";

export default async function Page({ params }: { params: { lang: string } }) {
  const latest_blog_entries = await getLatest3BlogEntries(params.lang);

  return (
    <Landing latest_blog_entries={latest_blog_entries!} lang={params.lang} />
  );
}
