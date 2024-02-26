"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import { blog_entries } from "@prisma/client";
import { Prisma } from "@prisma/client";

type BlogEntryWithTags = Prisma.blog_entriesGetPayload<{
  include: {
    tags: {
      include: {
        blog_tag: true;
      };
    };
  };
}>;

export default function BlogCard({
  blog_entry,
  colSpan,
  key,
}: {
  blog_entry: BlogEntryWithTags;
  colSpan?: boolean;
  key: string | number;
}) {
  const router = useRouter();

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: -10, backgroundSize: "100%" }}
      transition={{ delay: Math.random() * 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        backgroundSize: "102%",
        transition: {
          duration: 0.1,
          delay: 0,
        },
      }}
      viewport={{ once: true }}
      onClick={() => {
        router.push(`/blog/${blog_entry.id}`);
      }}
      style={{ backgroundImage: `url("${blog_entry.cover_image}")` }}
      className={`p-6 bg-zinc-900 transition group flex flex-col gap-2 cursor-pointer bg-cover bg-center
        ${colSpan && "col-span-2"}
           
        `}
    >
      <div className="flex justify-between">
        <h2 className="border-b border-transparent shadow-md group-hover:border-white text-2xl py-2 px-4 transition bg-black/60 ">
          {blog_entry.title}
        </h2>
        <p className="text-right text-white/60 group-hover:text-white transition drop-shadow-md">
          {blog_entry.created_at.toLocaleDateString()}
        </p>
      </div>

      <p className="text-md mb-3 drop-shadow-md px-4 py-2">
        {blog_entry.description}
      </p>
      <div className="flex gap-3 flex-wrap">
        {blog_entry.tags.map(({ blog_tag }, idx) => {
          return (
            <h3
              key={idx}
              className="px-2 pb-1 text-black bg-yellow-400 rounded-xl opacity-60 group-hover:opacity-100 transition"
            >
              {blog_tag.name}
            </h3>
          );
        })}
      </div>

      <p className="text-sm text-white/60 text-right group-hover:text-white transition drop-shadow-md">
        {blog_entry.author_name}
      </p>
    </motion.div>
  );
}
