"use client";

import React, { useEffect, useState } from "react";
import TipTapContent from "../components/TipTapContent";
import { IconCalendar } from "@tabler/icons-react";
import { BlogEntryWithTags } from "@/repositories/blog_entry";
import {
  animate,
  useMotionValueEvent,
  useScroll,
  motion,
  delay,
} from "framer-motion";

import {
  IconCircleArrowUpFilled,
  IconTextSize,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react";

export default function BlogEntry({
  blog_entry,
}: {
  blog_entry: BlogEntryWithTags;
}) {
  const { scrollY, scrollYProgress } = useScroll();

  const [textSize, setTextSize] = useState(1);

  const textSizes: { [key: number]: string } = {
    0: "text-sm",
    1: "text-lg",
    2: "text-xl",
    3: "text-2xl",
  };

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
    animate("#progress_bar", { scaleX: latest }, { duration: 0.1 });
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);

    animate(
      "#top_top_button",
      { opacity: latest > 200 ? 1 : 0 },
      { duration: 0.1 }
    );
  });

  return (
    <main className="-mt-36 text-justify  my-20 flex flex-col 2xl:w-[45%] xl:w-[60%] lg:w-[70%] w-[100%] mx-auto gap-4 lg:text-xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="progress_bar"
        className="h-2 w-screen origin-left bg-zinc-500 fixed bottom-0 left-0 z-50"
      ></motion.div>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        id="top_top_button"
      >
        <IconCircleArrowUpFilled
          width={50}
          height={50}
          className="fixed bottom-28 right-20 mb-28 mr-8 lg:mr-40 z-50"
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
        <div className="mx-auto md:w-[85%] w-[70%]">
          <h1 className="text-5xl drop-shadow-[0px_0px_3px_rgba(0,0,0,1)]">
            {blog_entry?.title}
          </h1>
          <div className="flex flex-col gap-2 ">
            <p>{blog_entry?.description}</p>
          </div>
        </div>
      </div>

      <div
        className={`mt-[18rem] leading-relaxed relative ${textSizes[textSize]}`}
      >
        <div className="flex my-6 items-center gap-3 ">
          <button
            className="opacity-40 hover:opacity-100 active:scale-90"
            aria-label="Decrease text size"
            onClick={() => {
              if (textSize > 0) setTextSize(textSize - 1);
              else if (textSize == 0) setTextSize(0);
            }}
          >
            <IconMinus />
          </button>
          <IconTextSize className="w-8 h-8" />
          <button
            className="opacity-40 hover:opacity-100 active:scale-90"
            aria-label="Increase text size"
            onClick={() => {
              if (textSize < 3) setTextSize(textSize + 1);
              else if (textSize == 3) setTextSize(3);
            }}
          >
            <IconPlus />
          </button>
        </div>
        <TipTapContent blog_entry_content={blog_entry?.content!} />
      </div>
    </main>
  );
}
