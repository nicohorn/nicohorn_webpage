/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { animate, motion } from "framer-motion";
import Title from "./Title";

export default function Sidebar({
  children,
  title,
  closeSidebar,
}: {
  children: React.ReactNode;
  title: string;
  closeSidebar: Function;
}) {
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target !== document.getElementById("sidebar")) {
        animate("#sidebar", { x: "100%" });
        setTimeout(() => {
          closeSidebar();
        }, 500);
      }
    });
  }, []);
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      id="sidebar"
      className="bg-primary fixed right-0 top-0 z-[80] h-screen w-[40vw] p-10"
    >
      <Title size="md" title={title} />
      {children}
    </motion.div>
  );
}
