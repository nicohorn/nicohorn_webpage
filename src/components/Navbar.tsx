/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { IconArrowUp, IconMenu2 } from "@tabler/icons-react";
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
  const navbarHeight = 468; //in pixels

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
  const [linkBgOpacity, setLinkBgOpacity] = useState(0);

  return (
    <motion.div
      initial={{ y: !open ? -navbarHeight : 0 }}
      animate={open ? { y: 0 } : { y: -navbarHeight }}
      id="nav_container"
      className="fixed top-0  left-0 w-screen h-[500px] bg-black/90 z-[90] flex items-center shadow-lg "
    >
      <div className="lg:px-12 px-6 flex lg:flex-row flex-col gap-2 absolute items-start mb-[32px]">
        <Hero
          lang={lang!}
          title={"Nico Horn"}
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
          className="lg:flex-row flex-col flex lg:gap-8  lg:ml-10 relative flex-wrap"
        >
          <div
            className="absolute -left-2 -top-2 bottom-0 pointer-events-none bg-yellow-600 z-0 duration-150 hidden lg:block border-yellow-400"
            style={{
              opacity: linkBgOpacity,
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
                  setLinkBgOpacity(1);
                  setHoverLink(link.link);
                }}
                id={`link_id_${link.link}`}
                key={link.title}
                href={`/${lang}${link.link}`}
                className={`z-10  w-fit lg:text-5xl duration-150 py-1 delay-75 lg:py-0 text-3xl uppercase   transition ${
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
                setLinkBgOpacity(1);

                setHoverLink("logout");
              }}
              id="link_id_logout"
              className={`
              } z-10  w-fit text-xl py-1 lg:py-0 uppercase transition duration-150 delay-75`}
            >
              {lang === "en-US" ? "Log out" : "Cerrar sesión"}
            </button>
          ) : (
            <button
              onClick={() => {
                signIn("google");
              }}
              onMouseOver={() => {
                setLinkBgOpacity(1);

                setHoverLink("signin");
              }}
              id="link_id_signin"
              className={`z-10  w-fit text-xl py-1 lg:py-0 uppercase transition duration-150 delay-75`}
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
