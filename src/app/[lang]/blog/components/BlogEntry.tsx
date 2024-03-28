/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import TipTapContent from "../components/TipTapContent";
import { IconCalendar, IconEdit, IconRss } from "@tabler/icons-react";
import { BlogEntryWithTags } from "@/repositories/blog_entry";
import { animate, useMotionValueEvent, useScroll, motion } from "framer-motion";
import { Roboto_Slab } from "next/font/google";
const roboto_slab = Roboto_Slab({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic"],
});

import {
  IconCircleArrowUpFilled,
  IconTextSize,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react";
import Link from "next/link";
import { users } from "@prisma/client";

export default function BlogEntry({
  user,
  lang,
  blog_entry,
}: {
  user: users;
  lang: string;
  blog_entry: BlogEntryWithTags;
}) {
  const { scrollY, scrollYProgress } = useScroll();

  const [blog_hero_height_in_px, setBlogHeroHeight] = useState(0);

  const [textSize, setTextSize] = useState(1);

  const textSizes: { [key: number]: string } = {
    0: "text-sm",
    1: "text-lg",
    2: "text-xl",
    3: "text-2xl",
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    animate(
      "#top_top_button",
      { opacity: latest > 200 ? 1 : 0 },
      { duration: 0.1 },
    );
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    animate("#progress_bar", { scaleX: latest });
  });

  useEffect(() => {
    window.scroll(0, 1);

    const scrollListener = () =>
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          document.getElementById("blog_title")?.classList.remove("text-6xl");
          document.getElementById("blog_title")?.classList.add("text-2xl");
          document.getElementById("blog_created_at")?.classList.add("text-sm");
        } else {
          document.getElementById("blog_title")?.classList.remove("text-2xl");
          document.getElementById("blog_title")?.classList.add("text-6xl");
          document
            .getElementById("blog_created_at")
            ?.classList.remove("text-sm");
        }
      });

    scrollListener();
    document.getElementById("top_top_button")?.classList.add("lg:block");

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  useEffect(() => {
    setBlogHeroHeight(
      document.getElementById("blog_hero")?.getBoundingClientRect().height!,
    );
  });

  return (
    <main
      style={{
        marginTop: blog_hero_height_in_px,
      }}
      id="blog_entry_component"
      className="mx-auto flex w-[90%] flex-col gap-4 px-3 pb-12 text-white lg:w-[60%] lg:text-xl xl:w-[60%] 2xl:w-[45%]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="progress_bar"
        className="bg-accent fixed bottom-0 left-0 z-50 h-2 w-screen origin-left"
      ></motion.div>
      <button
        className="hidden"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        id="top_top_button"
      >
        <IconCircleArrowUpFilled
          width={50}
          height={50}
          className="fixed bottom-28 right-0 z-50 mb-28 mr-20 lg:mr-28"
        />
      </button>
      <div className="bg-background fixed left-1/2 top-0 z-[50] mt-5 w-[90%] -translate-x-1/2   rounded-b bg-cover bg-center shadow-lg lg:w-[60%] 2xl:w-[45%]">
        <div
          id="blog_hero"
          className={
            "mx-auto flex flex-col gap-2  p-5 " + roboto_slab.className
          }
        >
          <h1
            id="blog_title"
            className="text-neutral pb-1 text-left text-6xl font-extrabold transition"
          >
            {blog_entry?.title}
          </h1>
          <div
            id="blog_date"
            className="flex items-center justify-between gap-2 font-thin"
          >
            <div id="blog_created_at" className="flex items-center gap-2">
              <IconCalendar />
              {lang === "en-US" ? "Date posted: " : "Fecha de publicación: "}
              {blog_entry?.created_at.toLocaleDateString()}
            </div>
            <Link target="_blank" href="https://nicohorn.com/rss/feed.xml">
              <IconRss />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 ">
          <p>{blog_entry?.description}</p>
        </div>
      </div>
      <div
        id="cover_background_image"
        style={{
          backgroundImage: `url("${blog_entry?.cover_image}")`,
        }}
        className="z-10 h-[30vh] rounded bg-zinc-500 bg-cover bg-center shadow-md"
      ></div>

      <div className={`relative leading-relaxed ${textSizes[textSize]}`}>
        {user?.role === "admin" && (
          <Link
            className="flex items-center gap-2 opacity-75 transition hover:opacity-100"
            href={`/${lang}/dashboard/blog_entry/${blog_entry.id}`}
          >
            {lang === "en-US" ? "Edit blog entry" : "Editar entrada de blog"}{" "}
            <IconEdit />
          </Link>
        )}
        <div className="my-6 flex items-center gap-3 ">
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
          <IconTextSize className="h-8 w-8" />
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
