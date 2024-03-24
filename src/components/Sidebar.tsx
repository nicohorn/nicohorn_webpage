import React from "react";
import { motion } from "framer-motion";
import Title from "./Title";

export default function Sidebar({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "10%" }}
      id="sidebar"
      className="bg-primary fixed right-0 top-0 z-[80] h-screen w-[40vw] px-10 py-14"
    >
      <Title size="md" title={title} />
      {children}
    </motion.div>
  );
}
