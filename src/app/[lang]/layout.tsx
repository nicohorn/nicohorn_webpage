/* eslint-disable react/no-unescaped-entities */
import "./../globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { users } from "@prisma/client";
import { guest_links, links } from "../Links";
import Footer from "@/components/Footer";
import { authOptions } from "@/utils/authOptions";
import LanguagesListbox from "@/components/SiteConfig";
import Navbar from "@/components/Navbar";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Courier_Prime } from "next/font/google";
import { Press_Start_2P } from "next/font/google";

const courier_prime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});
const press_start = Press_Start_2P({
  weight: ["400"],
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Nico Horn",
  description:
    "Welcome to my personal webpage, I'm Nico Horn, full stack developer, systems engineer and educator.",
  openGraph: {
    images:
      "https://images.unsplash.com/photo-1708461901625-4fb5aa1e9265?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  keywords: [
    "developer, engineer, educator, teacher, professor, nico, horn, nico horn, software, full stack, ingeniero, desarrollador, profesor, docente, universidad, university, cs graduate, computer science, networking",
  ],
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
      data-theme="theme-dark"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1646488438698-2d5f8bd732e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
      className={`${courier_prime.className} selection:bg-accent theme-dark mt-5 h-screen overflow-x-hidden bg-cover bg-fixed bg-center selection:text-white`}
      lang={`${params.lang}`}
    >
      <body
        className={
          "relative z-0 flex min-h-screen min-w-[100vw] flex-col scroll-smooth bg-black"
        }
      >
        <Navbar
          lang={params.lang}
          session={session!}
          links={user ? links[user.role] : guest_links}
        />

        <div id="notifications_container" className="relative" />
        <LanguagesListbox
          languages={[
            {
              title: "Español 🇦🇷",
              language: "es-AR",
            },
            {
              title: "English 🇺🇸",
              language: "en-US",
            },
          ]}
          currentLang={params.lang!}
        />
        {children}

        <Footer lang={params.lang} />
        <GoogleAnalytics gaId="G-5FJK8CL5W8" />
      </body>
    </html>
  );
}
