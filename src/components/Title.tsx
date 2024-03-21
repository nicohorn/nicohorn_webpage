"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Title({
  title,
  anim = true,
}: {
  title: string;
  anim?: boolean;
}) {
  return (
    <motion.h1
      initial={anim ? { opacity: 0, x: -12 } : {}}
      animate={anim ? { opacity: 1, x: -7 } : {}}
      className="bg-gradient-to-br from-white to-yellow-200 bg-clip-text pb-2 text-5xl font-bold
      text-transparent md:text-7xl lg:text-9xl"
    >
      {title}
    </motion.h1>
  );
}
