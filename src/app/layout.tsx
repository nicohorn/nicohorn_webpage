/* eslint-disable react/no-unescaped-entities */
import HorizontalNavbar from "@/components/HorizontalNavbar";
import "./globals.css";
import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Hero from "@/components/Hero";
import { links } from "./Links";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const oswald = Oswald({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Nico Horn",
  description:
    "Welcome to my personal webpage, I'm Nico Horn, full stack developer, systems engineer and educator.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html className="bg-black text-white overflow-x-hidden" lang="en">
      <body className={oswald.className + " bg-black mx-12 my-8 rounded-lg"}>
        <HorizontalNavbar session={session!} links={links} />
        <Hero
          title={"Nico Horn"}
          description="ingeniero, desarrollador y docente"
        />
        {JSON.stringify(session)}
        {children}
      </body>
    </html>
  );
}
