"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll } from "framer-motion";

export default function BlogCard({
  colSpan,
  key,
}: {
  colSpan?: boolean;
  key: string | number;
}) {
  const router = useRouter();

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: -10 }}
      transition={{ delay: Math.random() * 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => {
        router.push(`/blog/${Math.random() * 58}`);
      }}
      className={
        colSpan
          ? "p-6 bg-zinc-900 hover:bg-zinc-950 transition group flex flex-col gap-2 cursor-pointer col-span-2"
          : "p-6 bg-zinc-900  hover:bg-zinc-950  transition group flex flex-col gap-2 cursor-pointer"
      }
    >
      <div className="flex justify-between">
        <h2 className="border-b border-white/50 group-hover:border-white text-xl pb-2 transition">
          Blog entry title
        </h2>
        <p className="text-right text-white/60">
          {new Date().toLocaleDateString()}
        </p>
      </div>

      <p className="text-sm mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
        repellat impedit. Itaque sequi iusto neque ea placeat, atque obcaecati
        fuga possimus? Similique excepturi consequatur voluptates ipsam quo
        provident iusto quasi!
      </p>
      <div className="flex gap-3 flex-wrap">
        <h3 className="px-2 pb-1 text-black bg-yellow-400 rounded-xl opacity-60 group-hover:opacity-100 transition">
          tag
        </h3>
        <h3 className="px-2 pb-1  text-black bg-yellow-400 rounded-xl opacity-60 group-hover:opacity-100 transition">
          dev
        </h3>
        <h3 className="px-2 pb-1 text-black bg-yellow-400 rounded-xl opacity-60 group-hover:opacity-100 transition">
          enterprise
        </h3>
        <h3 className="px-2 pb-1 text-black bg-yellow-400 rounded-xl opacity-60 group-hover:opacity-100 transition">
          gigs
        </h3>
        <h3 className="px-2 pb-1 text-black bg-yellow-400 rounded-xl opacity-60 group-hover:opacity-100 transition">
          for fun
        </h3>
      </div>

      <p className="text-sm text-white/60 text-right">Nico Horn</p>
    </motion.div>
  );
}
