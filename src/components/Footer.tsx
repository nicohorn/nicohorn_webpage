"use client";
import React from "react";
import {
  IconBrandLinkedin,
  IconBrandX,
  IconBrandGithub,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { animate, motion } from "framer-motion";
import Stack from "./Stack";

export default function Footer({ lang }: { lang: string }) {
  const router = useRouter();
  return (
    <div
      className={` w-screen  md:min-h-[12rem] bg-zinc-950 text-white/[85%] mt-auto flex flex-col md:flex-row md:gap-0 gap-6 md:justify-between  px-12 py-8 sm:items-start items-center`}
    >
      <div className="flex flex-col md:self-end items-center sm:items-start">
        {" "}
        <div className="text-lg font-bold">
          {lang === "en-US"
            ? "Website made by Nico Horn"
            : "Web creada por Nico Horn"}
          {" - " + new Date().getFullYear()}
        </div>
        <div className="flex gap-1 flex-col items-center sm:items-start">
          <p>
            {lang === "en-US"
              ? "Contact me through my socials"
              : "Contactame a través de mis redes"}
          </p>
          <div className="flex gap-2">
            <Link
              aria-label={
                lang === "en-US"
                  ? "LinkedIn link to Nico Horn's profile"
                  : "Link al perfil de LinkedIn de Nico Horn"
              }
              target="_blank"
              href="https://www.linkedin.com/in/nicol%C3%A1s-horn-7578741b4/"
            >
              <IconBrandLinkedin width={30} height={30} />
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
              <IconBrandX width={30} height={30} />
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
              <IconBrandGithub width={30} height={30} />
            </Link>
          </div>
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
              {lang === "en-US"
                ? "Email me: contact@nicohorn.com"
                : "Enviame un email: contact@nicohorn.com"}
            </motion.p>
            <button
              aria-label={
                lang === "en-US"
                  ? "Button to send an email to Nico Horn"
                  : "Botón para enviar un email Nico Horn"
              }
              className="px-2 border opacity-30 hover:opacity-100"
              type="button"
              onClick={() => router.push("mailto:contact@nicohorn.com")}
            >
              {lang === "en-US" ? "Click here" : "Click acá"}
            </button>
          </div>
        </div>
      </div>
      <Stack />
    </div>
  );
}
