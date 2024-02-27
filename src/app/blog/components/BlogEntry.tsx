"use client";

import React, { useEffect, useState } from "react";
import TipTapContent from "../components/TipTapContent";
import { IconCalendar } from "@tabler/icons-react";
import { BlogEntryWithTags } from "@/repositories/blog_entry";
import { animate, useMotionValueEvent, useScroll } from "framer-motion";
import { IconCircleArrowUpFilled } from "@tabler/icons-react";

export default function BlogEntry({
  blog_entry,
}: {
  blog_entry: BlogEntryWithTags;
}) {
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);
    animate("#blog_date", { opacity: latest > 100 ? 0 : 1 }, { duration: 0.1 });
    animate(
      "#cover_background_image",
      { opacity: latest > 100 ? 0 : 1 },
      { duration: 0.1 }
    );
    animate(
      "#cover_background_opacity",
      { opacity: latest > 100 ? 0 : 1 },
      { duration: 0.1 }
    );
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest);

    animate("#progress_bar", { scaleX: latest }, { duration: 0.1 });
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);

    animate(
      "#top_top_button",
      { opacity: latest > 100 ? 1 : 0 },
      { duration: 0.1 }
    );
  });

  return (
    <main className="md:-mt-10 -mt-10 flex flex-col 2xl:w-[45%] xl:w-[60%] lg:w-[70%] w-[100%] mx-auto gap-4 text-xl">
      <div
        id="progress_bar"
        className="h-2 w-screen origin-left bg-zinc-500 fixed bottom-0 left-0 z-50"
      ></div>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        id="top_top_button"
      >
        <IconCircleArrowUpFilled
          width={50}
          height={50}
          className="fixed bottom-0 right-0 mb-20 mr-16 lg:mr-40 z-50"
        />
      </button>
      <div
        id="cover_background_image"
        style={{
          backgroundImage: `url("${blog_entry?.cover_image}")`,
        }}
        className="bg-zinc-500 -z-10 h-[30vh] fixed left-[50%] rounded-b-xl -translate-x-[50%] top-0 xl:w-[80vw] w-screen 2xl:w-[60vw] bg-cover bg-center"
      ></div>
      <div
        id="cover_background_opacity"
        className="bg-black/60 -z-10 h-[30vh] fixed left-[50%] rounded-b-xl -translate-x-[50%] top-0 xl:w-[80vw]  w-screen 2xl:w-[60vw] bg-cover bg-center"
      >
        {" "}
        <div className="flex p-5">
          <p id="blog_date" className="ml-auto flex gap-2 items-center">
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
