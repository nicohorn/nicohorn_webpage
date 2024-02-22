"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.995 }}
      className="flex flex-col w-fit pr-2 hover:cursor-pointer mb-12"
    >
      <motion.h1 className=" md:text-8xl text-5xl -ml-1">
        <Link href="/about_me">{title}</Link>
      </motion.h1>
      <motion.div
        className=" font-thin flex text-xl "
        initial="hidden"
        animate="visible"
      >
        {description.split("").map((char, idx) => {
          return (
            <motion.span
              whileHover={{ color: "yellow" }}
              transition={{ duration: 0.3 }}
              key={idx}
            >
              {char == " " ? <p>&nbsp;</p> : <p>{char}</p>}
            </motion.span>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
