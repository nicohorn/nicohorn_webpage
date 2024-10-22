/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { animate, motion } from "framer-motion";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { IconArrowUp, IconMenu2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { dictLinksToEnglish } from "@/app/Links";
import Hero from "./Hero";
import { Roboto_Slab } from "next/font/google";

const roboto_slab = Roboto_Slab({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic"],
});

interface LinkDimensions {
  height: number;
  width: number;
  offsetLeft: number;
  offsetTop: number;
}

export default function Navbar({
  lang,
  links,
  session,
}: {
  lang?: string;
  links: { title: string; link: string }[];
  session?: Session;
}) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const navbarHeight = 468; //in pixels
  const [hoverLink, setHoverLink] = useState(path);
  const [linkBgOpacity, setLinkBgOpacity] = useState(0);
  const [linkDimensions, setLinkDimensions] = useState<LinkDimensions>({
    height: 0,
    width: 0,
    offsetLeft: 0,
    offsetTop: 0,
  });

  // Combined refs for both links and buttons
  const elementRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const updateLinkDimensions = (elementId: string) => {
      const element = elementRefs.current[elementId];
      if (element) {
        const rect = element.getBoundingClientRect();
        setLinkDimensions({
          height: rect.height + 20,
          width: rect.width + 20,
          offsetLeft: element.offsetLeft,
          offsetTop: element.offsetTop,
        });
      }
    };

    // Update dimensions when hover element changes
    if (hoverLink) {
      updateLinkDimensions(`link_id_${hoverLink}`);
    }
  }, [hoverLink]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.id !== "sign_in_button" &&
        target.id !== "nav_container" &&
        target.id !== "nav_container_button"
      ) {
        animate(
          "#nav_container",
          { y: -navbarHeight },
          { duration: 0.5, type: "spring", bounce: 0.2 },
        );
        setOpen(false);
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        animate(
          "#nav_container",
          { y: -navbarHeight },
          { duration: 0.5, type: "spring", bounce: 0.2 },
        );
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [navbarHeight]);

  const commonHoverStyles = "z-10 w-fit transition delay-75 duration-150";
  const linkStyles = `${commonHoverStyles} py-1 text-3xl md:text-4xl lg:py-0 lg:text-6xl xl:text-7xl`;
  const buttonStyles = `${commonHoverStyles} py-1 text-lg md:text-xl lg:py-0 lg:text-3xl xl:text-4xl font-thin`;

  return (
    <motion.div
      initial={{ y: !open ? -navbarHeight : 0 }}
      animate={open ? { y: 0 } : { y: -navbarHeight }}
      id="nav_container"
      className={
        "fixed left-0 top-0 z-[90] flex h-[500px] w-screen items-center bg-background text-white shadow-lg " +
        roboto_slab.className
      }
    >
      <div className="absolute mb-[32px] flex flex-col items-start gap-2 px-6 lg:flex-row lg:px-12">
        <Hero
          lang={lang!}
          title="Nico Horn"
          description={
            lang === "en-US"
              ? "engineer, developer and educator"
              : "ingeniero, desarrollador y docente"
          }
        />

        <div
          onMouseLeave={() => {
            setTimeout(() => {
              setLinkBgOpacity(0);
            }, 75);
          }}
          className="relative flex flex-col flex-wrap lg:ml-10 lg:flex-row lg:gap-14"
        >
          <div
            className="pointer-events-none absolute -left-2 -top-2 bottom-0 z-0 hidden rounded bg-accent duration-150 lg:block"
            style={{
              opacity: linkBgOpacity,
              height: linkDimensions.height,
              width: linkDimensions.width,
              transform: `translateX(${linkDimensions.offsetLeft}px) translateY(${linkDimensions.offsetTop}px)`,
            }}
          />
          {links.map((link) => (
            <Link
              ref={(el) => (elementRefs.current[`link_id_${link.link}`] = el)}
              onMouseOver={() => {
                setLinkBgOpacity(1);
                setHoverLink(link.link);
              }}
              id={`link_id_${link.link}`}
              key={link.title}
              href={`/${lang}${link.link}`}
              className={`${linkStyles} ${
                path === `/${lang + link.link}`
                  ? "border-b border-b-accent font-bold"
                  : "font-thin"
              }`}
            >
              {lang == "en-US" ? dictLinksToEnglish[link.title] : link.title}
            </Link>
          ))}
          {session ? (
            <button
              ref={(el) => (elementRefs.current["link_id_logout"] = el)}
              onClick={() => signOut({ callbackUrl: "/" })}
              onMouseOver={() => {
                setLinkBgOpacity(1);
                setHoverLink("logout");
              }}
              id="link_id_logout"
              className={buttonStyles}
            >
              {lang === "en-US" ? "Log out" : "Cerrar sesión"}
            </button>
          ) : (
            <button
              ref={(el) => (elementRefs.current["link_id_signin"] = el)}
              onClick={() => signIn("google")}
              onMouseOver={() => {
                setLinkBgOpacity(1);
                setHoverLink("signin");
              }}
              id="link_id_signin"
              className={buttonStyles}
            >
              {lang === "en-US" ? "Sign in" : "Iniciar sesión"}
            </button>
          )}
        </div>
      </div>
      <button
        id="nav_container_button"
        onClick={() => setOpen(!open)}
        aria-label={
          lang === "en-US" ? "Close navbar" : "Cerrar barra de navegación"
        }
        className="absolute bottom-0 w-full bg-primary py-1 transition active:bg-accent"
      >
        {open ? (
          <IconArrowUp className="mx-auto" />
        ) : (
          <IconMenu2 className="mx-auto" />
        )}
      </button>
    </motion.div>
  );
}
