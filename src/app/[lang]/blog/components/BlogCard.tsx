/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Merriweather } from "next/font/google";
import { BlogEntryWithTags } from "@/repositories/blog_entry";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconClock } from "@tabler/icons-react";
import { TagsToSpanish } from "@/utils/dictionaries/Tags";
import Image from "next/image";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
const description = {
  en: "[systems engineer, full stack developer, professor]",
  es: "[ingeniero en sistemas, desarrollador full stack, docente universitario]",
};

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
});

export const readTimeEstimates = {
  "1 min": { min: 0, max: 1000 },
  "2 min": { min: 1001, max: 2000 },
  "5 min": { min: 2001, max: 5000 },
  "10 + min": { min: 5001, max: Infinity },
};

export function estimateReadTime(blogContent: string) {
  const characterCount = blogContent.replace(/<\/?[^>]+(>|$)/g, "").length;

  for (const [readTime, { min, max }] of Object.entries(readTimeEstimates)) {
    if (characterCount >= min && characterCount <= max) {
      return readTime;
    }
  }

  return null;
}

export default function BlogCard({
  lang,
  blog_entry,
  idx,
}: {
  lang: string;
  blog_entry: BlogEntryWithTags;
  colSpan?: boolean;
  idx: number;
}) {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleOnMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: -10 }}
      transition={{ delay: Math.random() * 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={(e) => {
        handleOnMouseMove(e);
      }}
      //Latest two entries show up with more height
      className="group relative flex h-full min-h-[300px] cursor-pointer border border-black bg-gradient-to-r from-zinc-800/30 to-black/60 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] transition hover:border-zinc-700 lg:w-[30vw]"
    >
      <div className="card group flex-grow flex-wrap">
        <div className="w-full border-b border-zinc-700 px-4 py-3 shadow-lg">
          <p className="absolute z-40 flex w-fit -translate-x-2 -translate-y-6 items-center gap-2 rounded-lg bg-zinc-900 px-2 text-sm font-semibold shadow-lg">
            {estimateReadTime(blog_entry.content)}{" "}
            <IconClock className="h-4 w-4" />
          </p>
          <h1 className="w-fit bg-gradient-to-br from-yellow-50 to-yellow-100 bg-clip-text py-1 text-xl font-extrabold text-transparent md:text-xl">
            {blog_entry.title}
          </h1>
        </div>

        <p className={`${merriweather.className} px-4 py-5`}>
          {blog_entry.description}
        </p>
        <div className="flex flex-wrap items-end gap-1 px-4 py-3 transition lg:opacity-30 lg:group-hover:opacity-100">
          {"Tags: "}
          {blog_entry.tags.map(({ blog_tag }) => {
            return (
              <span
                className="rounded-full border border-zinc-700 bg-black px-2 py-1 text-xs font-extrabold text-zinc-400"
                key={blog_tag.name}
                onClick={() => {
                  router.push(
                    `${path}?${createQueryString("tag", blog_tag.name)}`,
                  );
                }}
              >
                {lang === "en-US"
                  ? blog_tag.name
                  : TagsToSpanish[blog_tag.name]}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
