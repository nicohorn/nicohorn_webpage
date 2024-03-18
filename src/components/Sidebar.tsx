/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { IconArrowBadgeLeft, IconArrowBadgeRight } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { dictLinksToEnglish } from "@/app/Links";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

export default function VerticalNavbar({
  lang,
  links,
  session,
}: {
  lang?: string;
  links: { title: string; link: string }[];
  session?: Session;
}) {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  //These buttons <loginButton and logoutButton> aren't meant to be reusable components, but since they're conditionally called (if there's an active session), it's easier to manage them having them defined as functions inside this component.
  const loginButton = () => {
    return (
      <Disclosure>
        <Disclosure.Button
          as={motion.button}
          transition={{ duration: 1 }}
          whileHover={{ backgroundColor: "white", color: "black" }}
          className=" w-full text-left"
        >
          <motion.p
            id="sign_in_button"
            className=" py-5 px-12"
            whileTap={{ scale: 0.97 }}
            whileHover={{ x: 5 }}
          >
            {lang === "en-US" ? "Sign in" : "Iniciar sesión"}
          </motion.p>
        </Disclosure.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel className="text-lg hover:bg-white hover:text-black">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ x: 5 }}
              onClick={() => {
                signIn("google");
              }}
              className="px-14 py-6 flex gap-2 items-center hover:bg-white hover:text-black"
            >
              {lang === "en-US" ? "Sign in with Google" : "Iniciar sesión con"}
              <IconBrandGoogleFilled />
            </motion.button>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    );
  };

  const logoutButton = () => {
    return (
      <motion.span
        transition={{ duration: 1 }}
        whileHover={{ backgroundColor: "white", color: "black" }}
      >
        <motion.div
          className="px-12 py-5 cursor-pointer text-left flex gap-3 items-center justify-between text-2xl"
          onClick={() => {
            setTimeout(() => {
              setOpen(false);
              animate(
                "#nav_container",
                { x: -320 - 48 + 32 },
                { duration: 0.5, type: "spring", bounce: 0.2 }
              );
              animate(
                "#nav_container",
                { zIndex: 0 },
                { duration: 0.5, type: "spring", bounce: 0.2 }
              );
            }, 250);
            signOut({ callbackUrl: "/" });
          }}
          whileTap={{ scale: 0.97 }}
          whileHover={{ x: 5 }}
        >
          <button className="text-left">
            {" "}
            {lang === "en-US" ? "Log out" : "Cerrar sesión"}
          </button>

          <img
            referrerPolicy="no-referrer"
            alt="Profile picture"
            className="rounded-full w-12"
            src={session?.user?.image!}
          ></img>
        </motion.div>
      </motion.span>
    );
  };

  /**Close sidebar when clicking outside */
  const handleMouseOutsideSidebar = () =>
    document.body.addEventListener("click", (e) => {
      if (
        e.target !== document.getElementById("sign_in_button") &&
        e.target !== document.getElementById("nav_container") &&
        e.target !== document.getElementById("nav_container_button")
      ) {
        setOpen(false);
        animate(
          "#nav_container",
          { x: -368 + 32 },
          { duration: 0.5, type: "spring", bounce: 0.2 }
        );
      } else {
        return;
      }
    });

  useEffect(() => {
    handleMouseOutsideSidebar();
    return document.removeEventListener("click", handleMouseOutsideSidebar);
  }, []);

  if (path.split("/").length < 3) return null;

  return (
    <>
      <motion.div
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            animate(
              "#nav_container",
              { x: -368 + 32 },
              { duration: 0.5, type: "spring", bounce: 0.2 }
            );
          }
        }}
        initial={open ? { x: 0, opacity: 1 } : { x: -368 + 32 }}
        animate={{ x: -368 + 32 }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          bounce: 0.4,
          type: "spring",
        }}
        id="nav_container"
        className="flex drop-shadow-lg fixed z-[51]"
      >
        <motion.div className="flex flex-col text-4xl w-72  bg-zinc-950/95">
          {links.map((link, idx) => {
            return (
              <motion.span
                key={idx}
                transition={{ duration: 1 }}
                whileHover={{ backgroundColor: "white", color: "black" }}
              >
                <Link
                  className="font-thin"
                  href={`/${lang}${link.link}`}
                  scroll={false}
                >
                  <motion.p
                    className="px-12 py-5"
                    onClick={() => {
                      setTimeout(() => {
                        setOpen(false);
                        animate(
                          "#nav_container",
                          { x: -368 + 32 },
                          { duration: 0.5, type: "spring", bounce: 0.2 }
                        );
                      }, 250);
                    }}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ x: 5 }}
                  >
                    {lang == "en-US"
                      ? dictLinksToEnglish[link.title]
                      : link.title}
                  </motion.p>
                </Link>
              </motion.span>
            );
          })}
          {!session ? loginButton() : logoutButton()}
        </motion.div>
        <motion.button
          id="nav_container_button"
          initial={{ opacity: 0.95 }}
          whileHover={{ opacity: 1 }}
          whileTap={{ opacity: 0.5 }}
          onClick={() => {
            setOpen(!open);
            open
              ? animate(
                  "#nav_container",
                  { x: -368 + 32 },
                  { duration: 0.5, type: "spring", bounce: 0.2 }
                )
              : animate(
                  "#nav_container",
                  { x: -48 },
                  { duration: 0.5, type: "spring", bounce: 0.2 }
                );
          }}
          aria-label={open ? "Sidebar close button" : "Sidebar open button"}
          className="bg-yellow-300 w-5 flex items-center justify-center text-lg text-black "
        >
          {!open ? <IconArrowBadgeRight /> : <IconArrowBadgeLeft />}
        </motion.button>
      </motion.div>
    </>
  );
}
