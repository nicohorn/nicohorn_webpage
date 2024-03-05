"use client";
import React, { useEffect } from "react";
import { animate, motion } from "framer-motion";
import { IconBug, IconCheck, IconInfoCircle } from "@tabler/icons-react";

const styles = {
  success: {
    style: "py-1 px-2 bg-green-900 ",
    icon: <IconCheck />,
  },
  info: {
    style: "py-1 px-2  bg-sky-950 ",
    icon: <IconInfoCircle />,
  },
  error: {
    style: "py-1 px-2 bg-red-900 ",
    icon: <IconBug />,
  },
};

export default function NotificationComponent({
  type,
  title,
  description,
  seconds,
}: {
  type: "success" | "info" | "error";
  title?: string;
  description?: string;
  seconds: number;
}) {
  useEffect(() => {
    let timer = setTimeout(() => {
      animate("#notification_container", { opacity: 0, x: 200 });
    }, seconds * 1000);

    return () => {
      clearTimeout(timer);
      document.getElementById("notification_container")?.remove();
    };
  }, [seconds]);

  return (
    <motion.div
      id="notification_container"
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed w-96 h-32 z-[100]  right-10 bottom-10 py-2 px-5 bg-zinc-900 shadow-lg "
    >
      <div className="flex justify-between items-center">
        <h1 className="mb-2">{title}</h1>
        <span>{styles[type].icon}</span>
      </div>
      <h3 className={styles[type].style}>{description}</h3>
    </motion.div>
  );
}
