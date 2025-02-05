/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import Title from "@/components/Title";
import Image from "next/image";
import { animate, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BlogEntryWithTags } from "@/repositories/blog_entry";
import { TagsToSpanish } from "@/utils/dictionaries/Tags";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconCopy,
} from "@tabler/icons-react";
import Sidebar from "./Sidebar";

export default function Landing({
  lang,
  latest_blog_entries,
}: {
  lang: string;
  latest_blog_entries: BlogEntryWithTags[];
}) {
  const images = [
    "https://images.unsplash.com/photo-1711139274733-9aa07e413d18?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1708461901625-4fb5aa1e9265?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1711058968007-a4386478129e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [selectedImage, setSelectedImage] = useState(0);
  const [sidebar, setSidebar] = useState(false);

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
          id="landing_image"
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
          className="flex-grow cursor-pointer rounded object-cover shadow-[rgba(0,_0,_0,_0.32)_0px_3px_8px]"
          alt="Profile picture of Nico Horn"
          src={image}
        ></Image>
      );
    });
  };
  const langIsEnglish = lang === "en-US";
  const path = usePathname();
  const [hoverLink, setHoverLink] = useState(path);
  const [linkBgOpacity, setLinkBgOpacity] = useState(0);
  const [linkDimensions, setLinkDimensions] = useState({
    height: 0,
    width: 0,
    offsetLeft: 0,
    offsetTop: 0,
  });

  // Update dimensions when hoverLink changes
  useEffect(() => {
    const updateDimensions = () => {
      const element = document.getElementById(`link_${hoverLink}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        setLinkDimensions({
          height: rect.height,
          width: rect.width,
          offsetLeft: element.offsetLeft,
          offsetTop: element.offsetTop,
        });
      }
    };

    updateDimensions();

    // Add resize listener to update dimensions when window size changes
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [hoverLink]);

  return (
    <main className="main-y main-x w-[90vw] text-white md:w-[700px]">
      <Title
        size="md"
        title={langIsEnglish ? "Hi, I'm Nico!" : "¡Hola!, soy Nico."}
      />
      <div className="flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 font-[500]"
        >
          <div
            onMouseLeave={() => {
              setTimeout(() => {
                setLinkBgOpacity(0);
              }, 75);
            }}
            className="relative flex flex-col flex-wrap gap-5"
          >
            <div
              className="pointer-events-none absolute -z-10 hidden rounded bg-secondary py-3 duration-150 lg:block"
              style={{
                opacity: linkBgOpacity,
                height: linkDimensions.height,
                width: linkDimensions.width,
                transform: `translateX(${linkDimensions.offsetLeft}px) translateY(${linkDimensions.offsetTop}px)`,
              }}
            ></div>
            <div>
              {langIsEnglish
                ? "I'm a systems engineer and professor, welcome to my website! 😁 This is my online place, here you can: "
                : "Soy ingeniero en sistemas y profesor, bienvenido/a a mi página 😁 Este es mi espacio online, acá podés:"}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                onMouseOver={() => {
                  setLinkBgOpacity(1);
                  setHoverLink("blog");
                }}
                id={`link_blog`}
                className="w-fit rounded border-b border-accent  px-1  pt-[6px] transition   hover:border-secondary hover:text-neutral  active:text-accent"
                href={`/${lang}/blog`}
              >
                {langIsEnglish
                  ? "▪️ Visit my blog 📝"
                  : "▪️ Visitar mi blog 📝"}
              </Link>
              <p className="text-sm">
                {langIsEnglish
                  ? "where I share thoughts and educational content."
                  : "donde comparto pensamientos y contenido educativo."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                onMouseOver={() => {
                  setLinkBgOpacity(1);
                  setHoverLink("about_me");
                }}
                id={`link_about_me`}
                className="w-fit rounded border-b border-accent  px-1  pt-[6px]  transition   hover:border-secondary hover:text-neutral
                    active:text-accent"
                href={`/${lang}/about_me`}
              >
                {langIsEnglish
                  ? "▪️ Know more about me and my work 💡"
                  : "▪️ Conocer más sobre mí y mi trabajo 💡"}
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                onMouseOver={() => {
                  setLinkBgOpacity(1);
                  setHoverLink("mailto");
                }}
                id={`link_mailto`}
                className="w-fit rounded border-b border-accent  px-1  pt-[6px]  transition   hover:border-secondary hover:text-neutral
                    active:text-accent"
                href="mailto:contact@nicohorn.com"
              >
                {langIsEnglish
                  ? "▪️ Contact me through my email ✉️"
                  : "▪️ Contactarme a través de mi email ✉️"}
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
                className="p-1 hover:text-neutral active:scale-95 active:text-accent"
                id="link_copy_email"
                aria-label={lang === "en-US" ? "Copy email" : "Copiar email"}
              >
                <IconCopy />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  console.log(sidebar);
                  if (sidebar) {
                    animate("#sidebar", { x: "100%" });
                    setTimeout(() => {
                      setSidebar(false);
                    }, 500);
                    return;
                  } else {
                    setSidebar(true);
                    return;
                  }
                }}
                onMouseOver={() => {
                  setLinkBgOpacity(1);
                  setHoverLink("cool_stuff");
                }}
                id={`link_cool_stuff`}
                className="w-fit rounded border-b border-accent  px-1  pt-[6px]  transition   hover:border-secondary hover:text-neutral
                active:text-accent"
              >
                {langIsEnglish
                  ? "▪️ Checkout cool stuff I'm doing 👽"
                  : "▪️ Conocer las cosas copadas que estoy haciendo 👽"}
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <h1>{langIsEnglish ? "My socials" : "Mis redes"}</h1>
              <Link
                onMouseOver={() => {
                  setLinkBgOpacity(1);
                  setHoverLink("linkedin");
                }}
                target="_blank"
                id={`link_linkedin`}
                className="w-fit p-1   text-neutral"
                href="https://www.linkedin.com/in/nicol%C3%A1s-horn-7578741b4/"
              >
                <IconBrandLinkedin />
              </Link>
              <Link
                onMouseOver={() => {
                  setLinkBgOpacity(1);
                  setHoverLink("twitter");
                }}
                target="_blank"
                id={`link_twitter`}
                className="w-fit p-1   text-neutral"
                href={`/${lang}/about_me`}
              >
                <IconBrandX />
              </Link>
              <Link
                onMouseOver={() => {
                  setLinkBgOpacity(1);
                  setHoverLink("github");
                }}
                target="_blank"
                id={`link_github`}
                className="w-fit p-1  text-neutral"
                href="https://github.com/nicohorn"
              >
                <IconBrandGithub />
              </Link>
              <Link
                onMouseOver={() => {
                  setLinkBgOpacity(1);
                  setHoverLink("instagram");
                }}
                target="_blank"
                id={`link_instagram`}
                className="w-fit p-1  text-neutral"
                href="https://www.instagram.com/nic0horn/"
              >
                <IconBrandInstagram />
              </Link>
            </div>
          </div>
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
            <Title
              size="sm"
              title={
                lang === "en-US"
                  ? "Latest entries on my blog"
                  : "Últimas entradas en mi blog"
              }
            />
            {latest_blog_entries?.map((entry) => {
              return (
                <Link
                  prefetch
                  key={entry.id}
                  href={`/${lang}/blog/${entry.id}`}
                >
                  <div className="my-2 flex justify-between gap-2 border-b  border-accent py-3  transition hover:text-neutral  active:text-accent hover:active:text-accent">
                    <h1 className="text-lg">{entry.title}</h1>
                    <p className="flex flex-wrap justify-end gap-2">
                      {entry.tags.map((t) => {
                        return (
                          <span
                            className="h-fit rounded bg-accent px-1  text-xs"
                            key={t.blog_tag_id}
                          >
                            {lang === "en-US"
                              ? t.blog_tag.name
                              : TagsToSpanish[t.blog_tag.name]}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </Link>
              );
            })}
          </motion.div>
          {sidebar && (
            <Sidebar
              setSidebar={setSidebar}
              title={lang === "en-US" ? "Cool stuff" : "Cosas copadas"}
            >
              <div className="rounded bg-background p-4 shadow-md">
                {lang === "en-US"
                  ? "Still building this part 🛠️ I'm currently diving deep into C (again) and the fundamentals of computer architecture, so I'm a bit busy."
                  : "Esta sección está en construcción todavía 🛠️ Estoy adentrándome mucho en C y los fundamentos de la arquitectura de computadoras últimamente así que ando bastante ocupado."}
                <br /> <br />
                {lang === "en-US"
                  ? "This section will contain:"
                  : "En esta sección vas a encontrar:"}
                <ul>
                  <li>
                    {lang === "en-US"
                      ? "Projects or parts of my projects."
                      : "Proyectos o partes de mis proyectos."}
                  </li>
                  <li>{lang === "en-US" ? "UI libraries." : "Librerías UI"}</li>
                  <li>
                    {lang === "en-US" ? "Case studies." : "Casos de estudio."}
                  </li>
                  <li>
                    {lang === "en-US"
                      ? "Riddles and quizes."
                      : "Acertijos y cuestionarios."}
                  </li>
                </ul>
              </div>
            </Sidebar>
          )}
        </div>
      </div>
    </main>
  );
}
