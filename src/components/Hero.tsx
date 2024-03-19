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

  return (
    <motion.div
      id="hero_component"
      whileTap={{ scale: 0.995 }}
      initial={{
        originX: 0,
        originY: 0,
        scale: 1,
      }}
      animate={{ scale: 1 }}
      className={" flex-col pr-2 hover:cursor-pointer  w-fit flex -mt-4"}
    >
      <motion.h1 className=" md:text-8xl text-2xl uppercase">
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
              whileHover={{ color: "yellow", scale: 1.2, rotate: 10 }}
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
