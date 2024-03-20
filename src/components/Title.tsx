"use client";
import React from "react";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "600", subsets: ["cyrillic"] });

export default function Title({
  title,
  anim = true,
}: {
  title: string;
  anim?: boolean;
}) {
  return (
    <motion.h1
      initial={anim ? { opacity: 0, x: -5 } : {}}
      animate={anim ? { opacity: 1, x: 0 } : {}}
      className={`${montserrat.className} text-5xl md:text-9xl`}
    >
      {title}
    </motion.h1>
  );
}
