"use client";
import { animate, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Merriweather } from "next/font/google";

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

export default function AboutMeSection() {
  const [delay500ms, setDelay500ms] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDelay500ms(true);
    }, 500);
  }, []);

  return (
    <motion.div
      className={"mt-4"}
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className={merriweather.className}>
        <p className="font-thin text-[1.05rem] leading-relaxed mt-2">
          <span
            className="border-b border-yellow-500/50 cursor-pointer hover:border-yellow-500  transition"
            onMouseEnter={() => {
              animate("#image0", { scale: 1.03, borderColor: "yellow" });
            }}
            onMouseLeave={() => {
              animate("#image0", { scale: 1, borderColor: "black" });
            }}
          >
            {" "}
            Me llamo Nicolás Horn
          </span>
          , soy ingeniero en sistemas, nací en Buenos Aires, tengo 26 años, y{" "}
          <span
            className="border-b border-yellow-500/50  cursor-pointer hover:border-yellow-500  transition"
            onMouseEnter={() => {
              animate("#image1", { scale: 1.03, borderColor: "yellow" });
            }}
            onMouseLeave={() => {
              animate("#image1", { scale: 1, borderColor: "black" });
            }}
          >
            un perro que se llama Zeus.
          </span>{" "}
          Actualmente estoy especializándome en redes de telecomunicaciones y
          machine learning.{" "}
          <span
            className="border-b border-yellow-500/50  cursor-pointer hover:border-yellow-500  transition"
            onMouseEnter={() => {
              animate("#image2", { scale: 1.03, borderColor: "yellow" });
            }}
            onMouseLeave={() => {
              animate("#image2", { scale: 1, borderColor: "black" });
            }}
          >
            <br />
            Hace varios años que me dedico al desarrollo de software
          </span>
          , pero también trabajé como{" "}
          <span
            className="border-b border-yellow-500/50  cursor-pointer hover:border-yellow-500  transition"
            onMouseEnter={() => {
              animate("#image3", { scale: 1.03, borderColor: "yellow" });
            }}
            onMouseLeave={() => {
              animate("#image3", { scale: 1, borderColor: "black" });
            }}
          >
            fotógrafo, editor de videos
          </span>
          <span
            className="border-b border-yellow-500/50  cursor-pointer hover:border-yellow-500 transition"
            onMouseEnter={() => {
              animate("#image4", { scale: 1.03, borderColor: "yellow" });
            }}
            onMouseLeave={() => {
              animate("#image4", { scale: 1, borderColor: "black" });
            }}
          >
            , barista y gerente de restaurante.{" "}
          </span>
          Como hobbie, estoy empezando a desarrollar videojuegos.
        </p>
      </div>
      <div className=" flex mt-4 flex-wrap gap-2 ">
        {images.map((image, idx) => {
          return (
            <motion.img
              drag
              dragConstraints={{
                left: -50,
                right: 50,
                top: -50,
                bottom: 50,
              }}
              dragSnapToOrigin
              initial={{ opacity: 0, borderColor: "black" }}
              animate={{ opacity: 1 }}
              transition={
                delay500ms ? { delay: 0 } : { delay: Math.random() * 0.25 }
              }
              whileHover={{
                borderColor: "yellow",
              }}
              whileTap={{ scale: 1.3, borderColor: "yellow" }}
              id={`image${idx}`}
              className="md:w-[21rem] object-cover  border"
              alt={image.alt}
              src={image.src}
              key={idx}
            ></motion.img>
          );
        })}
      </div>
    </motion.div>
  );
}

/*My moat is that I have no preference. I will work on anything you throw at me. I will crunch numbers. I will machine parts. I will write code. I will read papers. I will make frontend interfaces

I might not be the best at the job but I will do it*/
