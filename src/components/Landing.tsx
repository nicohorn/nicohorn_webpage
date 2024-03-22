/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import Title from "@/components/Title";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { BlogEntryWithTags } from "@/repositories/blog_entry";
export default function Landing({
  lang,
  latest_blog_entries,
}: {
  lang: string;
  latest_blog_entries: BlogEntryWithTags[];
}) {
  const images = [
    "https://scontent-eze1-1.xx.fbcdn.net/v/t39.30808-6/292958230_10209333234045073_9217687885836746361_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGUY8VnGOB9GTCuu6KaJYkNupO4-4YEv2m6k7j7hgS_aWwBjaOSWoOeKvRmoenj7NY&_nc_ohc=snRsaM4BtSMAX-HzXaT&_nc_ht=scontent-eze1-1.xx&oh=00_AfC5a768EFzPH0Tz_jgeIe2uAuvC176Ik8SfdVtdj6gipQ&oe=66024FC6",
    "https://images.unsplash.com/photo-1708461901625-4fb5aa1e9265?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1625241189662-2980453ebffc?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://scontent-eze1-1.xx.fbcdn.net/v/t39.30808-6/322938186_516788973777185_6854656873251529764_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHdjQJOSP6RW9k13PJ-p_cU5cHe0mXLuaLlwd7SZcu5om5yiXOqf6gfJVOI9YkHfQU&_nc_ohc=0ZLrCzRMTpIAX-vwv2z&_nc_ht=scontent-eze1-1.xx&oh=00_AfC_9giEBUFbffOGSu-hb2xLcCjXm8iB0uWDlGRfz_XSkw&oe=6601988B",
  ];

  const [selectedImage, setSelectedImage] = useState(0);

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

  const path = usePathname();
  const [hoverLink, setHoverLink] = useState(path);
  const [linkBgOpacity, setLinkBgOpacity] = useState(0);
  return (
    <main className="min-h-[100vh]">
      <div className="flex flex-wrap items-end gap-4">
        <Title title="Nico Horn" />
        <div className="flex -translate-y-5 flex-col">
          <motion.div
            initial={{ x: -10, y: -3, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-semibold"
          >
            {lang === "en-US" ? description["en"] : description["es"]}
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {lang === "en-US"
            ? `Buckle up and get ready for a wild ride into the mind of a passionate
          programmer who's redefining what it means to be a modern-day
          Renaissance man. With coding skills that would make Silicon Valley's
          finest green with envy and an insatiable thirst for knowledge that
          spans everything from the intricacies of machine learning to the art
          of latte art, Nico Horn is here to shake up your world one line of
          code (or one shot of espresso) at a time. I wrote this with AI because
          I already made the whole about me section and have a whole blog so
          this is just me having some fun.`
            : `Agarrate fuerte que vamos a un viaje de locos en la mente de un programador apasionado que está redefiniendo lo que significa ser un renacentista de los modernos. Con habilidades de programacion que van a dejar dados vuelta hasta a los cracks de Silicon Valley y una sed insaciable de conocimiento que abarca desde los detalles más finos del machine learning hasta el arte del latte art, Nico Horn vino a sacudirte el mundo línea por línea de código (o shot de espresso tras shot de espresso). Esto lo escribí con IA porque ya hice toda la sección "acerca de mí" y tengo un blog entero, así que esto es solo para divertirme un poco.`}
          <div
            onMouseLeave={() => {
              setTimeout(() => {
                setLinkBgOpacity(0);
              }, 75);
            }}
            className="relative mt-5 flex flex-col gap-2 md:flex-row md:gap-6"
          >
            <div
              className="pointer-events-none absolute -z-10 hidden border-yellow-400 bg-yellow-600 duration-150 lg:block"
              style={{
                opacity: linkBgOpacity,
                height: document
                  ?.getElementById(`link_${hoverLink}`)
                  ?.getBoundingClientRect().height!,
                width: document
                  ?.getElementById(`link_${hoverLink}`)
                  ?.getBoundingClientRect().width!,
                transform: `translateX(${
                  document.getElementById(`link_${hoverLink}`)?.offsetLeft
                }px) translateY(${
                  document.getElementById(`link_${hoverLink}`)?.offsetTop
                }px)`,
              }}
            ></div>

            <Link
              onMouseOver={() => {
                setLinkBgOpacity(1);
                setHoverLink("about_me");
              }}
              id={`link_about_me`}
              href={`/${lang}/about_me`}
              className={`z-10 w-fit py-1 text-2xl uppercase transition delay-75 duration-150 lg:py-0 ${
                path === `/${lang}/about_me`
                  ? "border-b border-b-yellow-400 font-bold"
                  : " font-semibold"
              }`}
            >
              {lang == "en-US" ? "More about me" : "Más acerca de mí"}
            </Link>
            <Link
              onMouseOver={() => {
                setLinkBgOpacity(1);
                setHoverLink("blog");
              }}
              id={`link_blog`}
              href={`/${lang}/blog`}
              className={`z-10 w-fit py-1 text-2xl uppercase transition delay-75 duration-150 lg:py-0 ${
                path === `/${lang}/blog`
                  ? "border-b border-b-yellow-400 font-bold"
                  : " font-semibold"
              }`}
            >
              Blog
            </Link>
            <Link
              onMouseOver={() => {
                setLinkBgOpacity(1);
                setHoverLink("cool_stuff");
              }}
              id={`link_cool_stuff`}
              href={`/${lang}/cool_stuff`}
              className={`z-10 w-fit py-1 text-2xl uppercase transition delay-75 duration-150 lg:py-0 ${
                path === `/${lang}/blog`
                  ? "border-b border-b-yellow-400 font-bold"
                  : " font-semibold"
              }`}
            >
              {lang == "en-US" ? "Cool stuff" : "Cosas copadas"}
            </Link>
          </div>
        </motion.p>
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-5 md:flex-row">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative min-h-[40vh] min-w-[20rem]"
            >
              <Image
                onClick={() => {
                  selectedImage == images.length - 1
                    ? setSelectedImage(0)
                    : setSelectedImage(selectedImage + 1);
                }}
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(800, 800),
                )}`}
                layout="fill"
                className="flex-grow cursor-pointer rounded-lg object-cover lg:min-h-[500px]"
                alt="Profile picture of Nico Horn"
                src={images[selectedImage]}
              ></Image>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="shadow-lg"
            >
              <a
                aria-label="Tweets By Nico Horn link"
                className="twitter-timeline"
                data-width="350"
                data-height="500"
                data-theme="dark"
                href="https://twitter.com/NicoTheEngineer?ref_src=twsrc%5Etfw"
              >
                <div className="flex min-h-[500px] min-w-[350px] animate-pulse items-center justify-center rounded-xl border border-white/30 bg-black/70">
                  <span className="h-5 w-5 animate-spin rounded-full border-b"></span>
                </div>
              </a>
            </motion.div>
          </div>

          <Script async src="https://platform.twitter.com/widgets.js" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex-grow"
          >
            <h1 className="font-bold uppercase">
              {lang === "en-US"
                ? "Latest entries on my blog"
                : "Últimas entradas en mi blog"}
            </h1>
            {latest_blog_entries?.map((entry) => {
              return (
                <Link key={entry.id} href={`/${lang}/blog/${entry.id}`}>
                  <p className="my-2 flex justify-between gap-2 border-b border-zinc-800 py-1 transition hover:border-b-yellow-300">
                    {entry.title}
                    <p className="flex flex-wrap justify-end gap-2">
                      {entry.tags.map((t) => {
                        return (
                          <span
                            className="rounded-full bg-zinc-900 px-2 py-1 text-xs"
                            key={t.blog_tag_id}
                          >
                            {t.blog_tag.name}
                          </span>
                        );
                      })}
                    </p>
                  </p>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

/* 
      <iframe
        className="w-full aspect-video bg-white"
        src="https://fastidious-lamington-ed3fd8.netlify.app/"
      ></iframe> */
