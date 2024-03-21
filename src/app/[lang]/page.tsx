/* eslint-disable @next/next/no-img-element */
"use client";
import Title from "@/components/Title";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconCopy } from "@tabler/icons-react";
export default function Page({ params }: { params: { lang: string } }) {
  const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  const description = {
    en: "[systems engineer, full stack developer, professor]",
    es: "[ingeniero en sistemas, desarrollador full stack, docente universitario]",
  };

  return (
    <main className=" w-full flex flex-col gap-3">
      <Title title="Nico Horn" />

      <motion.div
        id="landing_page_email"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className=" hover:bg-zinc-700 transition-all text-xl flex gap-2 items-center -translate-y-5 px-3 py-1 bg-zinc-800 shadow-md w-fit rounded-lg "
      >
        <a href="mailto:contact@nicohorn.com"> contact@nicohorn.com</a>
        <IconCopy />
      </motion.div>

      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg font-semibold"
      >
        {params.lang === "en-US" ? description["en"] : description["es"]}
      </motion.div>
      <div>
        {" "}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className=" relative w-[20rem] min-h-[40vh]"
        >
          <Image
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(800, 800)
            )}`}
            layout="fill"
            className="object-cover"
            alt="Profile picture of Nico Horn"
            src="https://images.unsplash.com/photo-1708461901625-4fb5aa1e9265?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ></Image>
        </motion.div>{" "}
      </div>
    </main>
  );
}

/* <div className="place-self-end shadow-lg">
        <a
          className="twitter-timeline"
          data-width="350"
          data-height="500"
          data-theme="dark"
          href="https://twitter.com/NicoTheEngineer?ref_src=twsrc%5Etfw"
        >
          Tweets by NicoTheEngineer
        </a>
      </div>

      <Script async src="https://platform.twitter.com/widgets.js" />
      <iframe
        className="w-full aspect-video bg-white"
        src="https://fastidious-lamington-ed3fd8.netlify.app/"
      ></iframe> */
