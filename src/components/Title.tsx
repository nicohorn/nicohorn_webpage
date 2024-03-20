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
      className="text-5xl md:text-7xl lg:text-9xl bg-gradient-to-br bg-clip-text text-transparent from-white
      to-yellow-200 pb-2 font-bold "
    >
      {title}
    </motion.h1>
  );
}
