"use client";
import Script from "next/script";

/* eslint-disable @next/next/no-img-element */
export default function Page({}) {
  return (
    <main className="bg-black w-full flex justify-center flex-col items-center">
      <div className="place-self-end shadow-lg">
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
    </main>
  );
}
