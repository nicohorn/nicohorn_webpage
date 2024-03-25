/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import Title from "./Title";
import { IconInfoCircle } from "@tabler/icons-react";
import { SiNextdotjs } from "react-icons/si";
import { RiSupabaseLine } from "react-icons/ri";

export default function Stack({ lang }: { lang: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  const dark_color_palette: { [key: string]: string } = {
    black: "#0D0D0D",
    background: "#191919",
    primary: "#151328",
    secondary: "#1F2544",
    accent: "#9E3333",
    neutral: "#F4DFC8",
    white: "#D9ECF2",
  };

  const light_color_palette: { [key: string]: string } = {
    black: "#D9ECF2",
    background: "#F4DFC8",
    primary: "#E7D9C9",
    secondary: "#C9C2B8",
    accent: "#B28E7B",
    neutral: "#5C5957",
    white: "#0D0D0D",
  };

  const [color_palette, setColorPalette] = useState<{ [key: string]: string }>(
    dark_color_palette,
  );

  useEffect(() => {
    if (document.documentElement.classList.contains("theme-dark")) {
      setColorPalette(dark_color_palette);
    } else {
      setColorPalette(light_color_palette);
    }
  }, []);

  const Modal = ({ children }: { children: React.ReactNode }) => {
    if (modalOpen)
      return (
        <motion.div
          onClick={(e) => {
            if (e.target !== document.getElementById("stack_modal")) return;
            animate("#stack_modal_content", { scale: 0.8 });
            animate("#stack_modal", { opacity: 0 });
            setTimeout(() => {
              setModalOpen(false);
            }, 300);
          }}
          id="stack_modal"
          tabIndex={0}
          onKeyUpCapture={(e) => {
            if (e.key === "Escape") {
              animate("#stack_modal_content", { scale: 0.8 });
              animate("#stack_modal", { opacity: 0 });
              setTimeout(() => {
                setModalOpen(false);
              }, 300);
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-neutral fixed left-0 top-0 z-[99] flex h-screen w-screen items-center justify-center bg-black/80"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            id="stack_modal_content"
            className=" bg-primary absolute rounded px-8 py-6 md:top-[30%]"
          >
            {children}
          </motion.div>
        </motion.div>
      );
    else {
      return null;
    }
  };
  return (
    <>
      <div className=" w-fit">
        <div
          onClick={() => {
            setModalOpen(true);
            //.focus() is to make the Esc key work.
            setTimeout(() => {
              document.getElementById("stack_modal")?.focus();
            }, 100);
          }}
          className="border-accent hover:border-neutral flex cursor-pointer items-baseline gap-2 border-b text-white transition "
        >
          <p className="flex items-center gap-2 py-1 text-xs">
            {" "}
            <IconInfoCircle width={15} height={15} />
            {lang === "en-US" ? "Site info" : "Información del sitio"}
          </p>
        </div>
        <Modal>
          <div className="flex flex-col">
            <Title
              title={lang === "en-US" ? "Site info" : "Información del sitio"}
              size="md"
            />
            <div className="flex flex-col gap-3 lg:flex-row">
              <div>
                Framework:{" "}
                <img
                  className="h-8"
                  src="/nextjs-white.png"
                  alt="Next logo"
                ></img>
              </div>
              <div>
                Database/Storage:{" "}
                <img
                  className="h-6 drop-shadow"
                  alt="Supabase logo"
                  src="/supabase-logo-wordmark--dark.png"
                ></img>
              </div>
              <div>
                Authentication:{" "}
                <span className="flex gap-2 text-[#FFFFFF] drop-shadow">
                  <img
                    className="h-6  drop-shadow"
                    alt="NextAuth logo"
                    src="/nextauthlogo.png"
                  ></img>
                  NextAuth.js
                </span>
              </div>
              <div>
                ORM:{" "}
                <img
                  className="h-6 drop-shadow"
                  alt="Prisma logo"
                  src="https://prismalens.vercel.app/header/logo-white.svg"
                ></img>
              </div>
            </div>
          </div>
          <div className="mt-4">
            {lang === "en-US" ? "Color palette" : "Paleta de colores"}
            <div className="flex flex-wrap gap-2">
              {Object.keys(color_palette).map((color) => {
                return (
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(color_palette[color]);
                      lang === "en-US"
                        ? alert(`Copied color! ${color_palette[color]}`)
                        : alert(`Color copiado! ${color_palette[color]}`);
                    }}
                    id={`button_id_${color}`}
                    className={`w-36 bg-${color} flex flex-grow rounded capitalize shadow-lg`}
                    key={color}
                  >
                    <span className="flex-grow rounded py-1 mix-blend-difference">
                      {color}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-white">
              {lang === "en-US"
                ? "Click on color to copy the hex code. Colors in light theme are inverted."
                : "Click en el color para copiar el código hexadecimal. Los colores del light theme están invertidos"}
            </p>
            <h3 className="mt-2">
              {lang === "en-US"
                ? "©️ Designed and built by Nico Horn"
                : "©️ Diseñado e implementado por Nico Horn"}
            </h3>
          </div>
        </Modal>
      </div>
    </>
  );
}
