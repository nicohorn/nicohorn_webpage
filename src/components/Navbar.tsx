/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { IconArrowDown, IconArrowUp, IconMenu2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { dictLinksToEnglish } from "@/app/Links";
import Hero from "./Hero";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], display: "swap" });

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
  const navbarHeight = 352; //in pixels

  useEffect(() => {
    /**Close sidebar when clicking outside */

    const handleMouseOutsideNavbar = () => console.log("Handle click outside");
    document.body.addEventListener("click", (e) => {
      if (
        e.target !== document.getElementById("sign_in_button") &&
        e.target !== document.getElementById("nav_container") &&
        e.target !== document.getElementById("nav_container_button")
      ) {
        animate(
          "#nav_container",
          { y: -navbarHeight },
          { duration: 0.5, type: "spring", bounce: 0.2 }
        );
        setOpen(false);
      } else {
        return;
      }
    });

    const handleEscapeKeyNavbar = () =>
      document.body.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          animate(
            "#nav_container",
            { y: -navbarHeight },
            { duration: 0.5, type: "spring", bounce: 0.2 }
          );
          setOpen(false);
        } else {
          return;
        }
      });
    handleMouseOutsideNavbar();
    handleEscapeKeyNavbar();

    return () => {
      document.removeEventListener("click", handleMouseOutsideNavbar);
      document.removeEventListener("keydown", handleEscapeKeyNavbar);
    };
  }, [open]);

  const [hoverLink, setHoverLink] = useState(path);

  return (
    <motion.div
      initial={{ y: !open ? -navbarHeight : 0 }}
      animate={open ? { y: 0 } : { y: -navbarHeight }}
      id="nav_container"
      className="fixed top-0  left-0 w-screen h-96 bg-black/90 z-[90] flex items-center shadow-lg "
    >
      <div className="md:px-12 px-6 flex md:flex-row flex-col gap-2 absolute items-start mb-[32px]">
        <Hero
          title={"Nico Horn"}
          description={
            lang === "en-US"
              ? "engineer, developer and educator"
              : "ingeniero, desarrollador y docente"
          }
        />

        <div className="md:flex-row flex-col flex md:gap-8  md:ml-10 relative flex-wrap">
          <div
            className="absolute -left-2 -top-2 bottom-0 pointer-events-none bg-yellow-400 z-0 transition-transform duration-150 hidden md:block border-yellow-400 "
            style={{
              height:
                document
                  .getElementById(`link_id_${hoverLink}`)
                  ?.getBoundingClientRect().height! + 20,
              width:
                document
                  .getElementById(`link_id_${hoverLink}`)
                  ?.getBoundingClientRect().width! + 20,
              transform: `translateX(${
                document.getElementById(`link_id_${hoverLink}`)?.offsetLeft
              }px) translateY(${
                document.getElementById(`link_id_${hoverLink}`)?.offsetTop
              }px)`,
            }}
          ></div>
          {links.map((link) => {
            return (
              <Link
                onMouseOver={() => {
                  setHoverLink(link.link);
                  console.log("path", path);

                  console.log("lang + link = path", `/${lang + link.link}`);
                }}
                id={`link_id_${link.link}`}
                key={link.title}
                href={`/${lang}${link.link}`}
                className={`z-10  w-fit md:text-5xl py-1 md:py-0 text-3xl uppercase  ${
                  link.link === hoverLink && "md:text-black "
                } transition ${
                  path === `/${lang + link.link}`
                    ? "font-bold border-b border-b-yellow-400"
                    : "font-thin"
                }`}
              >
                {lang == "en-US" ? dictLinksToEnglish[link.title] : link.title}
              </Link>
            );
          })}
          {session ? (
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              onMouseOver={() => {
                setHoverLink("logout");
              }}
              id="link_id_logout"
              className={`${
                hoverLink === "logout" && "md:text-black"
              } z-10  w-fit text-xl py-1 md:py-0 uppercase transition`}
            >
              {lang === "en-US" ? "Log out" : "Cerrar sesión"}
            </button>
          ) : (
            <button
              onClick={() => {
                signIn("google");
              }}
              onMouseOver={() => {
                setHoverLink("signin");
              }}
              id="link_id_signin"
              className={`${
                hoverLink === "signin" && "md:text-black"
              } z-10  w-fit text-xl py-1 md:py-0 uppercase transition`}
            >
              {lang === "en-US" ? "Sign in" : "Iniciar sesión"}
            </button>
          )}
        </div>
      </div>
      <button
        id="nav_container_button"
        onClick={() => {
          setOpen(!open);
        }}
        aria-label={
          lang === "en-US" ? "Close navbar" : "Cerrar barra de navegación"
        }
        className="w-full absolute bottom-0 py-1 bg-gradient-to-r from-yellow-800/80
        to-red-950/80 via-pink-800/80 active:bg-yellow-500 animate-gradient transition"
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