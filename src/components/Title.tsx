"use client";
import React from "react";
import { motion } from "framer-motion";
import { Roboto_Slab } from "next/font/google";
const roboto_slab = Roboto_Slab({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic"],
});

export default function Title({
  title,
  anim = true,
  size,
  id = `id_${title}`,
}: {
  title: string;
  anim?: boolean;
  size: "lg" | "md" | "sm" | "xs";
  id?: string;
}) {
  const sizes: { [key: string]: string } = {
    lg: "md:text-7xl lg:text-9xl",
    md: "md:text-6xl lg:text-7xl",
    sm: "md:text-4xl lg:text-5xl",
    xs: "md:text-2xl lg:text-2xl",
  };
  return (
    <motion.h1
      id={id}
      initial={anim ? { opacity: 0, x: -7 } : {}}
      animate={anim ? { opacity: 1, x: 0 } : {}}
      className={`${sizes[size]} ${roboto_slab.className} " text-neutral drop-shadow-md ${size !== "xs" && "pb-3"} 
      font-extrabold`}
    >
      {title}
    </motion.h1>
  );
}
