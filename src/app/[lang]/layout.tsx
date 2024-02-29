/* eslint-disable react/no-unescaped-entities */
import HorizontalNavbar from "@/components/Sidebar";
import "./../globals.css";
import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Hero from "@/components/Hero";
import { getServerSession } from "next-auth";
import { authOptions } from "./../api/auth/[...nextauth]/route";
import { users } from "@prisma/client";
import { guest_links, links } from "./../Links";

const oswald = Oswald({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Nico Horn ",
  description:
    "Welcome to my personal webpage, I'm Nico Horn, full stack developer, systems engineer and educator.",
  other: {
    "og:image": "/../ms-icon-144x144.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as users;

  return (
    <html
      className="bg-black text-white overflow-x-hidden"
      lang={`${params.lang}`}
    >
      <body
        className={
          oswald.className +
          " bg-black mx-12 my-16 md:my-8 rounded-lg z-0 relative scroll-smooth"
        }
      >
        <HorizontalNavbar
          lang={params.lang}
          session={session!}
          links={user ? links[user.role] : guest_links}
        />
        <Hero
          title={"Nico Horn"}
          description={
            params.lang === "en-US"
              ? "engineer, developer and educator"
              : "ingeniero, desarrollador y docente"
          }
        />
        {children}
      </body>
    </html>
  );
}
