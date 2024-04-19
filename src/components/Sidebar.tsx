/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { animate, motion } from "framer-motion";
import Title from "./Title";
import { IconX } from "@tabler/icons-react";

export default function Sidebar({
  children,
  title,
  setSidebar,
}: {
  children: React.ReactNode;
  title: string;
  setSidebar: Function;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        animate("#sidebar", { x: "100%" });
        setTimeout(() => {
          setSidebar(false);
        }, 100);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <motion.div
      ref={sidebarRef}
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      id="sidebar"
      className="fixed right-0 top-0 z-[80] h-screen w-full flex-col bg-primary p-10 md:w-[40vw]"
    >
      <Title size="md" title={title} />
      <button
        aria-label="Close sidebar"
        onClick={() => {
          animate("#sidebar", { x: "100%" });
        }}
        className="absolute right-10 top-12 rounded-full bg-background p-2 text-xl shadow-md active:scale-90"
      >
        <IconX />
      </button>
      {children}
    </motion.div>
  );
}
