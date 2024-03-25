/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { animate, motion } from "framer-motion";
import Title from "./Title";
import { IconX } from "@tabler/icons-react";

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
      className="bg-primary fixed right-0 top-0 z-[80] h-screen w-full flex-col p-10 md:w-[40vw]"
    >
      <Title size="md" title={title} />
      <button
        aria-label="Close sidebar"
        onClick={() => {
          animate("#sidebar", { x: "100%" });
          setTimeout(() => {
            closeSidebar();
          }, 500);
        }}
        className="bg-background absolute right-10 top-12 rounded-full p-2 text-xl shadow-md active:scale-90"
      >
        <IconX />
      </button>
      {children}
    </motion.div>
  );
}
