"use client";
import React, { useEffect } from "react";
import {
  IconBrandLinkedin,
  IconBrandX,
  IconBrandGithub,
  IconMail,
  IconRss,
} from "@tabler/icons-react";
import Link from "next/link";
import { animate, motion } from "framer-motion";
import Stack from "./Stack";
import { Notification } from "./Notification";

export default function Footer({ lang }: { lang: string }) {
  useEffect(() => {
    if (localStorage.getItem("visited") == "true") return;
    setTimeout(() => {
      new Notification().props({
        title: "This site uses cookies",
        description:
          "By navigating on this site, you're accepting the usage of cookies",
        type: "info",
        seconds: 5,
      });
    }, 1000);
    localStorage.setItem("visited", "true");
  }, []);

  return (
    <div
      id="footer_container"
      className={` w-screen md:min-h-[12rem] bg-black shadow-[rgba(0,_0,_0,_0.25)_0px_-25px_50px_-12px] mt-auto flex flex-col md:flex-row md:gap-0 gap-6 md:justify-between  px-12 py-8 sm:items-start items-center`}
    >
      <div className="flex flex-col md:self-end items-center sm:items-start">
        {" "}
        <div className="flex gap-1 flex-col items-center sm:items-start ">
          <p>{lang === "en-US" ? "Contact me" : "Contactame"}</p>
          <div className="flex gap-2">
            <Link
              aria-label={
                lang === "en-US"
                  ? "RSS feed for Nico Horn's blog"
                  : "Feed RSS del blog de Nico Horn"
              }
              target="_blank"
              href="https://nicohorn.com/rss/feed.xml"
            >
              <IconRss
                className="hover:stroke-yellow-300 transition-all duration-75"
                width={30}
                height={30}
              />
            </Link>
            <Link
              aria-label={
                lang === "en-US"
                  ? "LinkedIn link to Nico Horn's profile"
                  : "Link al perfil de LinkedIn de Nico Horn"
              }
              target="_blank"
              href="https://www.linkedin.com/in/nicol%C3%A1s-horn-7578741b4/"
            >
              <IconBrandLinkedin
                className="hover:stroke-yellow-300 transition-all duration-75"
                width={30}
                height={30}
              />
            </Link>
            <Link
              aria-label={
                lang === "en-US"
                  ? "Twitter link to Nico Horn's profile"
                  : "Link al perfil de Twitter de Nico Horn"
              }
              target="_blank"
              href="https://twitter.com/NicoTheEngineer"
            >
              <IconBrandX
                className="hover:stroke-yellow-300 transition-all duration-75"
                width={30}
                height={30}
              />
            </Link>
            <Link
              aria-label={
                lang === "en-US"
                  ? "Github link to Nico Horn's profile"
                  : "Link al perfil de Github de Nico Horn"
              }
              target="_blank"
              href="https://github.com/nicohorn/nicohorn_webpage"
            >
              <IconBrandGithub
                className="hover:stroke-yellow-300 transition-all duration-75"
                width={30}
                height={30}
              />
            </Link>
            <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
              <p
                id="tooltip_email"
                className="absolute translate-y-6 px-2 hidden md:block translate-x-4 rounded-sm bg-zinc-700  opacity-0"
              >
                {lang === "en-US"
                  ? "Click to copy email address"
                  : "Click para copiar la dirección de correo electrónico"}
              </p>
              <motion.p
                onMouseOver={() => {
                  animate("#tooltip_email", { opacity: 1 }, { delay: 0.5 });
                }}
                onMouseLeave={() => {
                  animate("#tooltip_email", { opacity: 0 }, { delay: 0.2 });
                }}
                className="cursor-pointer hover:underline"
                onClick={() => {
                  navigator.clipboard.writeText("contact@nicohorn.com");
                  alert(
                    lang === "en-US"
                      ? "Copied! contact@nicohorn.com"
                      : "Copiado! contact@nicohorn.com"
                  );
                }}
                id="nico-email"
              >
                <IconMail
                  className="hover:stroke-yellow-300 transition-all duration-75"
                  width={30}
                  height={30}
                />
              </motion.p>
            </div>
          </div>

          <div className="text-lg font-normal flex gap-1">
            {lang === "en-US" ? "Website by Nico Horn" : "Web por Nico Horn"}
            <p className="font-semibold">{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
      <Stack lang={lang} />
    </div>
  );
}
