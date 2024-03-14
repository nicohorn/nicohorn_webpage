/* eslint-disable react/no-unescaped-entities */
import VerticalNavbar from "@/components/Sidebar";
import "./../globals.css";
import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Hero from "@/components/Hero";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { users } from "@prisma/client";
import { guest_links, links } from "../Links";
import Footer from "@/components/Footer";

const oswald = Oswald({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Nico Horn ",
  description:
    "Welcome to my personal webpage, I'm Nico Horn, full stack developer, systems engineer and educator.",
  other: {
    "og:image": "/ms-icon-144x144.png",
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
      className=" bg-black pattern-graph-yellow-900/30 bg-fixed text-white overflow-x-hidden h-screen "
      lang={`${params.lang}`}
    >
      <body
        className={
          oswald.className + "  z-0 relative scroll-smooth h-full flex flex-col"
        }
      >
        <div id="notifications_container" className="relative" />;
        <div className="mx-12 my-16 md:my-8">
          <VerticalNavbar
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
        </div>
        <Footer lang={params.lang} />
      </body>
    </html>
  );
}
