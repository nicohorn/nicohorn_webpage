"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Title({
  title,
  anim = true,
  size,
}: {
  title: string;
  anim?: boolean;
  size: "lg" | "md" | "sm";
}) {
  const sizes: { [key: string]: string } = {
    lg: "md:text-7xl lg:text-9xl",
    md: "md:text-6xl lg:text-7xl",
    sm: "md:text-4xl lg:text-5xl",
  };
  return (
    <motion.h1
      initial={anim ? { opacity: 0, x: -12 } : {}}
      animate={anim ? { opacity: 1, x: -7 } : {}}
      className={`${sizes[size]} lg:text-9xl" bg-gradient-to-br from-white to-yellow-200 bg-clip-text pb-2 text-5xl
      font-bold text-transparent md:text-7xl`}
    >
      {title}
    </motion.h1>
  );
}
