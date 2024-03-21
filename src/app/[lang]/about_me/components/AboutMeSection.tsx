/* eslint-disable react/no-unescaped-entities */
"use client";
import { animate, motion } from "framer-motion";
import React from "react";
import { Merriweather } from "next/font/google";
import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1708461901625-4fb5aa1e9265?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Picture of Nico Horn",
  },
  {
    src: "https://images.unsplash.com/photo-1708462799602-5f3eeaa95184?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Golden Retriever dog named Zeus",
  },
  {
    src: "https://images.unsplash.com/photo-1708463007233-c39714475c4b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Nico Horn's Macbook Air with VSCode open and a coffee at a cafe",
  },
  {
    src: "https://images.unsplash.com/photo-1633024290360-2befa796a6e5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Wedding picture taken with a drone by Nico Horn",
  },
  {
    src: "https://images.unsplash.com/photo-1619922804338-b8e6d2ae7b62?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Picture of Nico Horn working as a barista",
  },
];

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
});

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

export default function AboutMeSection({ lang }: { lang: string }) {
  const Content = ({ lang }: { lang: string }) => {
    return (
      <div className={`${merriweather.className} lg:max-w-[60vw]`}>
        <p className="text-[1.05rem] leading-relaxed mt-2 font-semibold">
          <span
            className="border-b border-yellow-500/50 cursor-pointer hover:border-yellow-500 hover:bg-yellow-400 hover:text-black transition"
            onMouseMove={(e) => {
              const width = document.body.clientWidth;
              const cX = e.clientX;
              const cY = e.clientY;
              const cHeight = e.currentTarget.getBoundingClientRect().height;
              const cWidth = e.currentTarget.getBoundingClientRect().width;
              setTimeout(() => {
                document.getElementById("image0")?.classList.remove("hidden");
              }, 100);

              animate(
                "#image0",
                {
                  x: cX + cWidth < width ? cX - 100 : cX - 300,
                  y: cY - 250,
                  scale: 1.03,
                  borderColor: "yellow",
                  opacity: 1,
                },
                { duration: 0 }
              );
            }}
            onMouseLeave={() => {
              animate(
                "#image0",
                { scale: 1, borderColor: "black", opacity: 0 },
                { delay: 0.1 }
              );

              setTimeout(() => {
                document.getElementById("image0")?.classList.add("hidden");
              }, 100);
            }}
          >
            {" "}
            {lang === "en-US"
              ? "Hello! I'm Nicolas Horn"
              : "Me llamo Nicolás Horn"}
          </span>
          {lang === "en-US"
            ? ", I'm a Systems Engineer graduate (similar to a CS degree), born in Buenos Aires, I'm 26 years old. I"
            : ", soy ingeniero en sistemas, nací en Buenos Aires, tengo 26 años, y"}{" "}
          <span
            className="border-b border-yellow-500/50  cursor-pointer hover:border-yellow-500  hover:bg-yellow-400 hover:text-black transition"
            onMouseMove={(e) => {
              const width = document.body.clientWidth;
              const cX = e.clientX;
              const cY = e.clientY;
              const cWidth = e.currentTarget.getBoundingClientRect().width;
              setTimeout(() => {
                document.getElementById("image1")?.classList.remove("hidden");
              }, 100);
              animate(
                "#image1",
                {
                  x: cX + cWidth < width ? cX - 100 : cX - 300,
                  y: cY - 250,
                  scale: 1.03,
                  borderColor: "yellow",
                  opacity: 1,
                },
                { duration: 0 }
              );
            }}
            onMouseLeave={() => {
              animate(
                "#image1",
                { scale: 1, borderColor: "black", opacity: 0 },
                { delay: 0.1 }
              );

              setTimeout(() => {
                document.getElementById("image1")?.classList.add("hidden");
              }, 100);
            }}
          >
            {lang === "en-US"
              ? " have a dog named Zeus."
              : "un perro que se llama Zeus."}
          </span>{" "}
          {lang === "en-US"
            ? " I'm currently specializing in computer networks and machine learning."
            : "Actualmente estoy especializándome en redes de telecomunicaciones y machine learning.  "}{" "}
          <span
            className="border-b border-yellow-500/50  cursor-pointer hover:border-yellow-500  hover:bg-yellow-400 hover:text-black transition"
            onMouseMove={(e) => {
              const width = document.body.clientWidth;
              const cX = e.clientX;
              const cY = e.clientY;
              const cWidth = e.currentTarget.getBoundingClientRect().width;
              setTimeout(() => {
                document.getElementById("image2")?.classList.remove("hidden");
              }, 100);
              animate(
                "#image2",
                {
                  x: cX + cWidth < width ? cX - 100 : cX - 300,
                  y: cY - 250,
                  scale: 1.03,
                  borderColor: "yellow",
                  opacity: 1,
                },
                { duration: 0 }
              );
            }}
            onMouseLeave={() => {
              animate(
                "#image2",
                { scale: 1, borderColor: "black", opacity: 0 },
                { delay: 0.1 }
              );

              setTimeout(() => {
                document.getElementById("image2")?.classList.add("hidden");
              }, 100);
            }}
          >
            {lang === "en-US"
              ? " I've been a sofware engineer for quite a while now"
              : "Hace varios años que me dedico al desarrollo de software"}
          </span>
          {lang === "en-US"
            ? ", but I also worked as a"
            : ", pero también trabajé como"}{" "}
          <span
            className="border-b border-yellow-500/50  cursor-pointer hover:border-yellow-500  hover:bg-yellow-400 hover:text-black transition"
            onMouseMove={(e) => {
              const width = document.body.clientWidth;
              const cX = e.clientX;
              const cY = e.clientY;
              const cWidth = e.currentTarget.getBoundingClientRect().width;

              setTimeout(() => {
                document.getElementById("image3")?.classList.remove("hidden");
              }, 100);
              animate(
                "#image3",
                {
                  x: cX + cWidth < width ? cX - 100 : cX - 300,
                  y: cY - 250,
                  scale: 1.03,
                  borderColor: "yellow",
                  opacity: 1,
                },
                { duration: 0 }
              );
            }}
            onMouseLeave={() => {
              animate(
                "#image3",
                { scale: 1, borderColor: "black", opacity: 0 },
                { delay: 0.1 }
              );

              setTimeout(() => {
                document.getElementById("image3")?.classList.add("hidden");
              }, 100);
            }}
          >
            {lang === "en-US"
              ? "wedding photographer, video editor"
              : "fotógrafo, editor de videos"}
          </span>
          <span
            className="border-b border-yellow-500/50  cursor-pointer hover:border-yellow-500 hover:bg-yellow-400 hover:text-black transition"
            onMouseMove={(e) => {
              const width = document.body.clientWidth;
              const cX = e.clientX;
              const cY = e.clientY;
              const cWidth = e.currentTarget.getBoundingClientRect().width;

              setTimeout(() => {
                document.getElementById("image4")?.classList.remove("hidden");
              }, 100);
              animate(
                "#image4",
                {
                  x: cX + cWidth < width ? cX - 100 : cX - 300,
                  y: cY - 250,
                  scale: 1.03,
                  borderColor: "yellow",
                  opacity: 1,
                },
                { duration: 0 }
              );
            }}
            onMouseLeave={() => {
              animate(
                "#image4",
                { scale: 1, borderColor: "black", opacity: 0 },
                { delay: 0.1 }
              );

              setTimeout(() => {
                document.getElementById("image4")?.classList.add("hidden");
              }, 100);
            }}
          >
            {lang === "en-US"
              ? ", barista and restaurant manager."
              : ", barista y gerente de restaurante."}{" "}
          </span>
          {lang === "en-US"
            ? "As a hobby, I got into game developing recently."
            : "Como hobbie, estoy empezando a desarrollar videojuegos."}
        </p>
      </div>
    );
  };
  return (
    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
      <Content lang={lang} />
      <div id="image_container" className="fixed z-50">
        {images.map((image, idx) => {
          return (
            <motion.div
              id={`image${idx}`}
              initial={{ opacity: 0, borderColor: "black" }}
              animate={{ opacity: 1 }}
              whileHover={{
                borderColor: "yellow",
              }}
              key={idx}
              className=" w-[20rem] min-h-[50vh] object-cover border border-black relative hidden"
            >
              <Image
                style={{ objectFit: "cover" }}
                className="pointer-events-none"
                layout="fill"
                alt={image.alt}
                src={image.src}
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(800, 800)
                )}`}
              ></Image>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/*My moat is that I have no preference. I will work on anything you throw at me. I will crunch numbers. I will machine parts. I will write code. I will read papers. I will make frontend interfaces

I might not be the best at the job but I will do it*/
