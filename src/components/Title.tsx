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
      initial={anim ? { opacity: 0, x: -5 } : {}}
      animate={anim ? { opacity: 1, x: 0 } : {}}
      className="text-6xl"
    >
      {title}
    </motion.h1>
  );
}
