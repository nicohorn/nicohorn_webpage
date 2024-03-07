"use client";
import React from "react";
import { motion } from "framer-motion";

import { IconCalendar } from "@tabler/icons-react";
import { Merriweather } from "next/font/google";
import { BlogEntryWithTags } from "@/repositories/blog_entry";
import { TagsToSpanish } from "@/utils/dictionaries/Tags";

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
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: -10, backgroundSize: "100%" }}
      transition={{ delay: Math.random() * 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        backgroundSize: "101%",
        transition: {
          duration: 0.1,
          delay: 0,
        },
      }}
      viewport={{ once: true }}
      style={{ backgroundImage: `url("${blog_entry.cover_image}")` }}
      //Latest two entries show up with more height
      className={`shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] p-6 bg-zinc-900 transition group flex flex-col cursor-pointer bg-cover bg-center relative  ${
        idx === 1 || idx === 0 ? "min-h-[40vh]" : ""
      }
        ${colSpan && "col-span-2"}
           
        `}
    >
      <div className="group-hover:bg-black/50 bg-black/20 transition absolute w-full h-full left-0 top-0"></div>
      <p className="flex gap-2 text-white/80 group-hover:text-white transition drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]">
        <IconCalendar />
        {blog_entry.created_at.toLocaleDateString()}
      </p>
      <h2 className="border-b w-fit mt-2 border-transparent hover:drop-shadow-none group-hover:bg-black/0 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] group-hover:border-white text-3xl py-3 px-6 transition bg-black/50 text-white group-hover:text-[#FFFFFF]">
        {blog_entry.title}
      </h2>

      <p
        className={`${merriweather.className} text-md mb-3 px-1 my-4 group-hover:text-[#FFFFFF] transition drop-shadow-[2px_2px_4px_rgba(0,0,0,1)]`}
      >
        {blog_entry.description}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <div className="flex gap-2 flex-wrap w-fit py-4 pr-4">
          {blog_entry.tags.map(({ blog_tag }, idx) => {
            return (
              <h3
                key={idx}
                className="px-3 pt-[1px] pb-[3px] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] text-sm text-white bg-black rounded-xl opacity-60 group-hover:opacity-100 transition self-end"
              >
                {TagsToSpanish[blog_tag.name]
                  ? TagsToSpanish[blog_tag.name]
                  : blog_tag.name}
              </h3>
            );
          })}
        </div>

        <p className="text-sm text-white/80 text-right whitespace-nowrap group-hover:text-white transition drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)] self-end">
          {blog_entry.author_name}
        </p>
      </div>
    </motion.div>
  );
}
