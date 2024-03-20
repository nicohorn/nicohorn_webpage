/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Script from "next/script";

export default function Page({}) {
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
  const description = `[ingeniero en sistemas, desarrollador full stack, docente universitario]`;

  return (
    <main className=" w-full flex justify-center flex-col items-center gap-3">
      <h1 className="text-5xl">Nicolás Horn</h1>
      <p className="font-thin text-xl whitespace-pre-wrap">{description}</p>
      <div className=" relative w-[20rem] min-h-[40vh]">
        <Image
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(800, 800)
          )}`}
          layout="fill"
          className="rounded-2xl border object-cover"
          alt="Profile picture of Nico Horn"
          src="https://images.unsplash.com/photo-1708461901625-4fb5aa1e9265?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ></Image>
      </div>
      <a href="mailto:contact@nicohorn.com">contact@nicohorn.com</a>

      {/* <div className="place-self-end shadow-lg">
        <a
          className="twitter-timeline"
          data-width="350"
          data-height="500"
          data-theme="dark"
          href="https://twitter.com/NicoTheEngineer?ref_src=twsrc%5Etfw"
        >
          Tweets by NicoTheEngineer
        </a>
      </div>

      <Script async src="https://platform.twitter.com/widgets.js" />
      <iframe
        className="w-full aspect-video bg-white"
        src="https://fastidious-lamington-ed3fd8.netlify.app/"
      ></iframe> */}
    </main>
  );
}
