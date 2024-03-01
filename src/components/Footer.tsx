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

export default function Footer({ lang }: { lang: string }) {
  const router = useRouter();
  return (
    <div
      className={` w-screen  min-h-[12rem] bg-zinc-950 text-white/[85%] mt-auto flex flex-col items-start px-12 py-8`}
    >
      <div className="text-lg font-bold">
        {lang === "en-US"
          ? "Website made by Nico Horn"
          : "Web creada por Nico Horn"}
        {" - " + new Date().getFullYear()}
      </div>
      <div className="flex gap-1 flex-col">
        <p>
          {lang === "en-US"
            ? "Contact me through my socials"
            : "Contactame a través de mis redes"}
        </p>
        <div className="flex gap-2">
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/nicol%C3%A1s-horn-7578741b4/"
          >
            <IconBrandLinkedin width={30} height={30} />
          </Link>
          <Link target="_blank" href="https://twitter.com/NicoTheEngineer">
            <IconBrandX width={30} height={30} />
          </Link>
          <Link
            target="_blank"
            href="https://github.com/nicohorn/nicohorn_webpage"
          >
            <IconBrandGithub width={30} height={30} />
          </Link>
        </div>
        <div className="flex items-center gap-2 ">
          <p
            id="tooltip_email"
            className="absolute translate-y-8 px-2 translate-x-4 rounded-sm bg-zinc-700  opacity-0"
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
            className="px-2 border opacity-30 hover:opacity-100"
            type="button"
            onClick={() => router.push("mailto:contact@nicohorn.com")}
          >
            {lang === "en-US" ? "Click here" : "Click acá"}
          </button>
        </div>
      </div>
    </div>
  );
}
