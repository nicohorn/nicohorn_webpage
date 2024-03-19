/* eslint-disable react/no-unescaped-entities */
import "./../globals.css";
import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { getServerSession } from "next-auth";
import { users } from "@prisma/client";
import { guest_links, links } from "../Links";
import Footer from "@/components/Footer";
import { authOptions } from "@/utils/authOptions";
import LanguagesListbox from "@/components/LanguagesListbox";
import Navbar from "@/components/Navbar";
import Script from "next/script";

const oswald = Oswald({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Nico Horn ",
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
      className={` ${oswald.className} bg-black pattern-graph-yellow-900/30 bg-fixed text-white overflow-x-hidden h-screen mt-5`}
      lang={`${params.lang}`}
    >
      <body className={"z-0 relative scroll-smooth h-full flex flex-col"}>
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
        <div className="mx-12 my-16 md:my-8">{children}</div>

        <Footer lang={params.lang} />

        <Script
          id="gtm_script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `<!-- Google tag (gtag.js) -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-5FJK8CL5W8"></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-5FJK8CL5W8');
            </script>`,
          }}
        />
      </body>
    </html>
  );
}
