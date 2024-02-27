"use client";

import React from "react";
import TipTapContent from "../components/TipTapContent";
import { IconCalendar } from "@tabler/icons-react";
import { BlogEntryWithTags } from "@/repositories/blog_entry";

export default function BlogEntry({
  blog_entry,
}: {
  blog_entry: BlogEntryWithTags;
}) {
  return (
    <main className="md:-mt-10 -mt-10 flex flex-col 2xl:w-[45%] xl:w-[70%] w-[100%] mx-auto gap-4 text-xl">
      <div
        style={{
          backgroundImage: `url("${blog_entry?.cover_image}")`,
        }}
        className="bg-zinc-500 -z-10 h-[30vh] fixed left-[50%] rounded-b-xl -translate-x-[50%] top-0 xl:w-[80vw] w-screen 2xl:w-[60vw] bg-cover bg-center"
      ></div>
      <div className="bg-black/60 -z-10 h-[30vh] fixed left-[50%] rounded-b-xl -translate-x-[50%] top-0 xl:w-[80vw]  w-screen 2xl:w-[60vw] bg-cover bg-center">
        {" "}
        <div className="flex p-5">
          <p className="ml-auto flex gap-2 items-center">
            <IconCalendar />
            {blog_entry?.created_at.toLocaleDateString()}
          </p>
        </div>
      </div>
      <h1 className="text-5xl drop-shadow-[0px_0px_3px_rgba(0,0,0,1)] text-center">
        {blog_entry?.title}
      </h1>
      <div className="flex flex-col gap-2 bg-zinc-950 p-6 mt-12">
        <p>{blog_entry?.description}</p>
      </div>
      <div className={`my-20  pt-5`}>
        <TipTapContent blog_entry_content={blog_entry?.content!} />
      </div>
    </main>
  );
}
