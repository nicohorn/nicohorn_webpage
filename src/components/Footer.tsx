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
          "By navigating on this site, you're accepting the usage of cookies.",
        type: "info",
        seconds: 5,
      });
    }, 1000);
    localStorage.setItem("visited", "true");
  }, []);

  return (
    <div
      id="footer_container"
      className={` bg-primary mt-auto flex w-screen flex-col bg-opacity-40 px-6 py-8 shadow-[rgba(0,_0,_0,_0.25)_0px_-25px_50px_-12px] md:min-h-[8rem] md:justify-between md:gap-0 md:px-12`}
    >
      <div className="flex flex-col">
        {" "}
        <div className="flex flex-col items-start gap-1 sm:flex-row  ">
          <div className="flex gap-2">
            <Link
              className="origin-top-left cursor-pointer transition hover:shadow-md"
              aria-label={
                lang === "en-US"
                  ? "RSS feed for Nico Horn's blog"
                  : "Feed RSS del blog de Nico Horn"
              }
              target="_blank"
              href="https://nicohorn.com/rss/feed.xml"
            >
              <IconRss
                className="hover:stroke-neutral transition-all duration-75"
                width={20}
                height={20}
              />
            </Link>
            <Link
              className="origin-top-left cursor-pointer transition hover:shadow-md"
              aria-label={
                lang === "en-US"
                  ? "LinkedIn link to Nico Horn's profile"
                  : "Link al perfil de LinkedIn de Nico Horn"
              }
              target="_blank"
              href="https://www.linkedin.com/in/nicol%C3%A1s-horn-7578741b4/"
            >
              <IconBrandLinkedin
                className="hover:stroke-neutral transition-all duration-75"
                width={21}
                height={21}
              />
            </Link>
            <Link
              className="origin-top-left cursor-pointer transition hover:shadow-md"
              aria-label={
                lang === "en-US"
                  ? "Twitter link to Nico Horn's profile"
                  : "Link al perfil de Twitter de Nico Horn"
              }
              target="_blank"
              href="https://twitter.com/NicoTheEngineer"
            >
              <IconBrandX
                className="hover:stroke-neutral transition-all duration-75"
                width={20}
                height={20}
              />
            </Link>
            <Link
              className="origin-top-left cursor-pointer transition hover:shadow-md"
              aria-label={
                lang === "en-US"
                  ? "Github link to Nico Horn's profile"
                  : "Link al perfil de Github de Nico Horn"
              }
              target="_blank"
              href="https://github.com/nicohorn/nicohorn_webpage"
            >
              <IconBrandGithub
                className="hover:stroke-neutral transition-all duration-75"
                width={20}
                height={20}
              />
            </Link>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <p
                id="tooltip_email"
                className="absolute hidden translate-x-4 translate-y-6 rounded-sm bg-zinc-700 px-2 opacity-0  md:block"
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
                className="origin-top-left cursor-pointer transition hover:shadow-md"
                onClick={() => {
                  navigator.clipboard.writeText("contact@nicohorn.com");
                  alert(
                    lang === "en-US"
                      ? "Copied! contact@nicohorn.com"
                      : "Copiado! contact@nicohorn.com",
                  );
                }}
                id="nico-email"
              >
                <IconMail
                  className="hover:stroke-neutral transition-all duration-75"
                  width={20}
                  height={20}
                />
              </motion.p>
            </div>
          </div>
          <div className="text-md text-neutral flex gap-1 font-thin sm:ml-2 sm:self-end">
            <p className="font-extrabold">{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
      <Stack lang={lang} />
    </div>
  );
}
