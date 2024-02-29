"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Hero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  //The important thing about UX is that the user needs feedback when it interacts with something. Sometimes these interactions or feedback can be too much, so it's important to find the balance. Animations, in my opinion, should serve only one purpose: give the user clues about what he can do. Static components (or whole websites) don't offer such clues. But the opposite is also undesirable, too much animations (intro animations, exit animations, etc) make a website hard to navigate (especially when you control the flow of the user interaction through scroll triggered animations, those tend to suck) or simply annoying animations that take too much time to finish. It's ok to leave "easter eggs" and stuff we wanna show off, but the main thing is that the user is king, he and only he should figure out how to navigate the website.

  const pathname = usePathname();

  if (pathname.includes("/landing")) return null;
  if (pathname.includes("/dashboard")) return null;
  return (
    <motion.div
      whileTap={
        !pathname.includes("about_me") ? { scale: 0.495 } : { scale: 0.995 }
      }
      initial={{
        originX: 0,
        originY: 0,
        scale: pathname.includes("/blog") ? 0.5 : 1,
      }}
      animate={pathname.includes("/blog") ? { scale: 0.5 } : { scale: 1 }}
      className={
        pathname.split("/").length > 3 && pathname.includes("/blog")
          ? "opacity-0"
          : "flex flex-col pr-2 hover:cursor-pointer mb-8 w-fit"
      }
    >
      <motion.h1 className=" md:text-8xl text-5xl -ml-1">
        <Link href={`/${pathname.split("/")[1]}/about_me`}>{title}</Link>
      </motion.h1>
      <motion.div
        className=" font-thin flex text-xl "
        initial="hidden"
        animate="visible"
      >
        {description.split("").map((char, idx) => {
          return (
            <motion.span
              whileHover={{ color: "yellow" }}
              transition={{ duration: 0.3 }}
              key={idx}
            >
              {char == " " ? <p>&nbsp;</p> : <p>{char}</p>}
            </motion.span>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
