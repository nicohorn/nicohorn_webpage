"use client";
import React, { useEffect } from "react";
import { animate, motion } from "framer-motion";
import { IconBug, IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { createRoot } from "react-dom/client";

type NotificationType = {
  type: "success" | "info" | "error";
  title?: string;
  description?: string;
  seconds: number;
};

const styles = {
  success: {
    style: "py-1 px-2 bg-green-900 mb-3",
    icon: <IconCheck />,
  },
  info: {
    style: "py-1 px-2  bg-sky-950 mb-3",
    icon: <IconInfoCircle />,
  },
  error: {
    style: "py-1 px-2 bg-red-900 mb-3",
    icon: <IconBug />,
  },
};

export class Notification {
  props(props: NotificationType) {
    const root = createRoot(
      document.getElementById("notifications_container")!
    );

    if (document.getElementById("notification")) return;

    root.render(<NotificationComponent {...props} />);
    setTimeout(() => {
      root.unmount();
    }, props.seconds * 100000 + 200);
  }
}

function NotificationComponent({
  type,
  title,
  description,
  seconds,
}: NotificationType) {
  useEffect(() => {
    let timer = setTimeout(() => {
      animate("#notification", { opacity: 0, x: 200 });
    }, seconds * 1000);

    return () => {
      clearTimeout(timer);
      document.getElementById("notification")?.remove();
    };
  }, [seconds]);

  return (
    <motion.div
      id="notification"
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed md:w-96 z-[100] w-screen  md:right-10 right-0 bottom-0 md:bottom-10 py-2 px-5 bg-zinc-900 shadow-lg  max-h-[80vh]"
    >
      <div className="flex justify-between items-center flex-grow max-h-full overflow-hidden relative">
        <h1 className="mb-2">{title}</h1>
        <span>{styles[type].icon}</span>
      </div>
      <h3
        className={`${styles[type].style} whitespace-pre-wrap overflow-y-auto max-h-[70vh]`}
      >
        {description}
      </h3>
    </motion.div>
  );
}
