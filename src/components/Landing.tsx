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
import { TagsToSpanish } from "@/utils/dictionaries/Tags";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconCopy,
} from "@tabler/icons-react";
export default function Landing({
  lang,
  latest_blog_entries,
}: {
  lang: string;
  latest_blog_entries: BlogEntryWithTags[];
}) {
  const images = [
    "https://images.unsplash.com/photo-1711139274733-9aa07e413d18?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://scontent-eze1-1.xx.fbcdn.net/v/t39.30808-6/292958230_10209333234045073_9217687885836746361_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGUY8VnGOB9GTCuu6KaJYkNupO4-4YEv2m6k7j7hgS_aWwBjaOSWoOeKvRmoenj7NY&_nc_ohc=snRsaM4BtSMAX-HzXaT&_nc_ht=scontent-eze1-1.xx&oh=00_AfC5a768EFzPH0Tz_jgeIe2uAuvC176Ik8SfdVtdj6gipQ&oe=66024FC6",
    "https://images.unsplash.com/photo-1708461901625-4fb5aa1e9265?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1711058968007-a4386478129e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  const ImagesComponent = () => {
    return images.map((image, idx) => {
      return (
        <Image
          key={idx}
          onClick={() => {
            selectedImage == images.length - 1
              ? setSelectedImage(0)
              : setSelectedImage(selectedImage + 1);
          }}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(800, 800),
          )}`}
          layout="fill"
          className=" flex-grow cursor-pointer rounded-lg object-cover"
          alt="Profile picture of Nico Horn"
          src={image}
        ></Image>
      );
    });
  };
  const path = usePathname();
  const [hoverLink, setHoverLink] = useState(path);
  const [linkBgOpacity, setLinkBgOpacity] = useState(0);
  return (
    <main className="main-y mx-auto flex w-[90vw] flex-col items-center md:w-[700px]">
      <div className="flex flex-col ">
        <Title size="md" title="Hi, I'm Nico!" />
        <div className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg font-[500]"
          >
            {lang === "en-US" ? (
              <div
                onMouseLeave={() => {
                  setTimeout(() => {
                    setLinkBgOpacity(0);
                  }, 75);
                }}
                className="relative flex flex-col flex-wrap gap-2 text-[1rem]"
              >
                <div
                  className="pointer-events-none absolute -z-10 hidden rounded-lg  bg-yellow-900 duration-150 lg:block"
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
                <div>
                  <span className="mr-1 text-3xl font-bold">I'm</span>a systems
                  engineer and professor, welcome to my website! 😁This is my
                  online place, here you can:
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  <Link
                    onMouseOver={() => {
                      setLinkBgOpacity(1);
                      setHoverLink("blog");
                    }}
                    id={`link_blog`}
                    className="w-fit rounded-lg border border-yellow-600/50 px-1 transition hover:border-yellow-600"
                    href={`/${lang}/blog`}
                  >
                    Visit my blog 📝
                  </Link>
                  <p className="text-sm">
                    where I share thoughts and educational content.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  <Link
                    onMouseOver={() => {
                      setLinkBgOpacity(1);
                      setHoverLink("about_me");
                    }}
                    id={`link_about_me`}
                    className="w-fit rounded-lg border border-yellow-600/50 px-1 transition
                    hover:border-yellow-600"
                    href={`/${lang}/about_me`}
                  >
                    Know more about me and my work 💡
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  <Link
                    onMouseOver={() => {
                      setLinkBgOpacity(1);
                      setHoverLink("mailto");
                    }}
                    id={`link_mailto`}
                    className="w-fit rounded-lg border border-yellow-600/50 px-1 transition
                    hover:border-yellow-600"
                    href="mailto:contact@nicohorn.com"
                  >
                    Contact me through my email ✉️
                  </Link>
                  <p id="nico_email" className="text-sm">
                    contact@nicohorn.com
                  </p>
                  <button
                    onMouseOver={() => {
                      setLinkBgOpacity(1);
                      setHoverLink("copy_email");
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText("contact@nicohorn.com");
                      lang === "en-US"
                        ? alert("Copied email!")
                        : alert("¡Email copiado!");
                    }}
                    className="p-1 active:scale-95"
                    id="link_copy_email"
                    aria-label={
                      lang === "en-US" ? "Copy email" : "Copiar email"
                    }
                  >
                    <IconCopy />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  <Link
                    onMouseOver={() => {
                      setLinkBgOpacity(1);
                      setHoverLink("cool_stuff");
                    }}
                    id={`link_cool_stuff`}
                    className="w-fit rounded-lg border border-yellow-600/50 px-1 transition
                    hover:border-yellow-600"
                    href={`/${lang}/cool_stuff`}
                  >
                    Checkout cool stuff I'm doing 👽
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  <p>Checkout my socials 📱</p>
                  <Link
                    onMouseOver={() => {
                      setLinkBgOpacity(1);
                      setHoverLink("linkedin");
                    }}
                    target="_blank"
                    id={`link_linkedin`}
                    className="w-fit rounded-lg  p-1 text-yellow-100"
                    href="https://www.linkedin.com/in/nicol%C3%A1s-horn-7578741b4/"
                  >
                    <IconBrandLinkedin />
                  </Link>
                  <Link
                    onMouseOver={() => {
                      setLinkBgOpacity(1);
                      setHoverLink("twitter");
                    }}
                    id={`link_twitter`}
                    className="w-fit rounded-lg  p-1 text-yellow-100"
                    href={`/${lang}/about_me`}
                  >
                    <IconBrandX />
                  </Link>
                  <Link
                    onMouseOver={() => {
                      setLinkBgOpacity(1);
                      setHoverLink("github");
                    }}
                    id={`link_github`}
                    className="w-fit rounded-lg p-1 text-yellow-100"
                    href="https://github.com/nicohorn"
                  >
                    <IconBrandGithub />
                  </Link>
                  <Link
                    onMouseOver={() => {
                      setLinkBgOpacity(1);
                      setHoverLink("instagram");
                    }}
                    id={`link_instagram`}
                    className="w-fit rounded-lg p-1 text-yellow-100"
                    href="https://www.instagram.com/nic0horn/"
                  >
                    <IconBrandInstagram />
                  </Link>
                </div>
              </div>
            ) : (
              <p>
                Agarrate fuerte que vamos a un viaje de locos en la mente de un
                programador apasionado que está redefiniendo lo que significa
                ser un renacentista de los modernos. Con habilidades de
                programacion que van a dejar dados vuelta hasta a los cracks de
                Silicon Valley y una sed insaciable de conocimiento que abarca
                desde los detalles más finos del machine learning hasta el arte
                del latte art, Nico Horn vino a sacudirte el mundo línea por
                línea de código (o shot de espresso tras shot de espresso). Esto
                lo escribí con IA porque ya hice toda la sección 'acerca de mí'
                y tengo un blog entero, así que esto es solo para divertirme un
                poco.
              </p>
            )}
          </motion.div>
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative h-[450px]  max-w-[400px]"
          >
            {ImagesComponent()[selectedImage]}
          </motion.div>
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex-grow"
            >
              <h1 className="w-fit bg-gradient-to-r from-yellow-100 to-yellow-200 bg-clip-text font-extrabold uppercase text-transparent ">
                {lang === "en-US"
                  ? "Latest entries on my blog"
                  : "Últimas entradas en mi blog"}
              </h1>
              {latest_blog_entries?.map((entry) => {
                return (
                  <Link
                    prefetch
                    key={entry.id}
                    href={`/${lang}/blog/${entry.id}`}
                  >
                    <p className="my-2 flex justify-between gap-2 border-b border-zinc-800 py-1 transition hover:border-b-yellow-300">
                      {entry.title}
                      <p className="flex flex-wrap justify-end gap-2">
                        {entry.tags.map((t) => {
                          return (
                            <span
                              className="rounded-full bg-zinc-900 px-2 py-1 text-xs"
                              key={t.blog_tag_id}
                            >
                              {lang === "en-US"
                                ? t.blog_tag.name
                                : TagsToSpanish[t.blog_tag.name]}
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
      </div>
    </main>
  );
}
