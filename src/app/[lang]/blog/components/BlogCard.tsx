/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback } from "react";
import { motion } from "framer-motion";

import { IconCalendar } from "@tabler/icons-react";
import { Merriweather } from "next/font/google";
import { BlogEntryWithTags } from "@/repositories/blog_entry";
import { TagsToSpanish } from "@/utils/dictionaries/Tags";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
});

export default function BlogCard({
  blog_entry,
  colSpan,
  idx,
}: {
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
    [searchParams]
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
      className={`shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] border border-black hover:border-zinc-700 bg-gradient-to-r from-zinc-800/30 to-black/60 transition group flex flex-col cursor-pointer relative`}
    >
      <div className="flex md:flex-row flex-col justify-between">
        <div className=" card flex-grow flex-wrap">
          <div className="py-3 px-4 w-full border-b border-zinc-700 shadow-lg">
            <h1 className="text-5xl font-extrabold w-fit text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-500">
              {blog_entry.title}
            </h1>
          </div>

          <p className={`${merriweather.className} px-4 py-5`}>
            {blog_entry.description}
          </p>
          <div className="flex gap-1 px-4 py-3 flex-wrap">
            {"Tags: "}
            {blog_entry.tags.map(({ blog_tag }) => {
              return (
                <span
                  className="font-extrabold bg-black px-2 text-zinc-400 text-xs py-1 rounded-full border border-zinc-700"
                  key={blog_tag.name}
                  onClick={() => {
                    router.push(
                      `${path}?${createQueryString("tag", blog_tag.name)}`
                    );
                  }}
                >
                  {blog_tag.name}
                </span>
              );
            })}
          </div>
        </div>
        <img
          alt={`Cover image for blog entry ${blog_entry.title}`}
          className="object-cover object-center md:w-52 "
          src={blog_entry.cover_image}
        ></img>
      </div>
    </motion.div>
  );
}
