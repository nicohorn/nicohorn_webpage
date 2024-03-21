/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import Title from "@/components/Title";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconCopy } from "@tabler/icons-react";
import { useState } from "react";
export default function Page({ params }: { params: { lang: string } }) {
  const [email, setEmail] = useState("contact@nicohorn.com");
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
    <main className="w-full flex flex-col">
      <div className="flex gap-4 items-end flex-wrap ">
        <Title title="Nico Horn" />
        <div className="flex flex-col gap-2 -translate-y-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="  transition-all font-[500] text-lg flex items-center-translate-y-5  bg-zinc-800 shadow-md w-fit"
          >
            <a
              id="landing_page_email"
              className="hover:bg-zinc-700 px-2 transition py-1"
              href="mailto:contact@nicohorn.com"
            >
              {email}
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(email);
                document
                  .getElementById("landing_page_email")
                  ?.classList.remove("bg-zinc-800");
                document
                  .getElementById("landing_page_email")
                  ?.classList.add("bg-green-800");
                setEmail(
                  params.lang === "en-US"
                    ? "Copied email to clipboard!"
                    : "Email copiado al portapapeles!"
                );

                setTimeout(() => {
                  setEmail("contact@nicohorn.com");
                  document
                    .getElementById("landing_page_email")
                    ?.classList.remove("bg-green-800");
                  document
                    .getElementById("landing_page_email")
                    ?.classList.add("bg-zinc-800");
                }, 2000);
              }}
              className="hover:bg-zinc-700  px-3 py-[6px]"
              aria-label={
                params.lang === "en-US"
                  ? "Copy email button"
                  : "Botón para copiar email"
              }
            >
              <IconCopy />
            </button>
          </motion.div>
          <motion.div
            initial={{ x: -10, y: -3, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-semibold"
          >
            {params.lang === "en-US" ? description["en"] : description["es"]}
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {params.lang === "en-US"
            ? `Buckle up and get ready for a wild ride into the mind of a passionate
          programmer who's redefining what it means to be a modern-day
          Renaissance man. With coding skills that would make Silicon Valley's
          finest green with envy and an insatiable thirst for knowledge that
          spans everything from the intricacies of machine learning to the art
          of latte art, Nico Horn is here to shake up your world one line of
          code (or one shot of espresso) at a time.I wrote this with AI because
          I already made the whole about me section and have a whole blog so
          this is just me having some fun.`
            : `Agarrate fuerte que vamos a un viaje de locos en la mente de un programador apasionado que está redefiniendo lo que significa ser un renacentista de los modernos. Con habilidades de programacion que van a dejar dados vuelta hasta a los cracks de Silicon Valley y una sed insaciable de conocimiento que abarca desde los detalles más finos del machine learning hasta el arte del latte art, Nico Horn vino a sacudirte el mundo línea por línea de código (o shot de espresso tras shot de espresso). Esto lo escribí con IA porque ya hice toda la sección "acerca de mí" y tengo un blog entero, así que esto es solo para divertirme un poco.`}
        </motion.p>
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
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
