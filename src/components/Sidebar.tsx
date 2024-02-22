/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { animate, motion } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

export default function HorizontalNavbar({
  links,
  session,
}: {
  links: { title: string; link: string }[];
  session?: Session;
}) {
  const [open, setOpen] = useState(false);

  //These buttons <loginButton and logoutButton> aren't meant to be reusable components, but since they're conditionally called (if there's an active session), it's easier to manage them having them defined as functions inside this component.
  const loginButton = () => {
    return (
      <Disclosure>
        <Disclosure.Button
          as={motion.button}
          transition={{ duration: 1 }}
          whileHover={{ backgroundColor: "white", color: "black" }}
          className="border-l  w-full text-left"
        >
          <motion.p
            className="px-7 py-5"
            whileTap={{ scale: 0.97 }}
            whileHover={{ x: 5 }}
          >
            Iniciar sesión
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
          <Disclosure.Panel className="border-l text-lg">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                signIn("google");
              }}
              className=" px-9 py-6"
            >
              Iniciar sesión con Google
            </motion.button>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    );
  };

  const logoutButton = () => {
    return (
      <motion.span
        className="border-l"
        transition={{ duration: 1 }}
        whileHover={{ backgroundColor: "white", color: "black" }}
      >
        <motion.div
          className="px-7 py-5 text-left flex gap-3 items-center justify-between text-2xl"
          onClick={() => {
            setTimeout(() => {
              setOpen(false);
              animate(
                "#nav_container",
                { x: -320 - 48 + 32 },
                { duration: 0.5, type: "spring", bounce: 0.2 }
              );
            }, 250);
            signOut({ callbackUrl: "/" });
          }}
          whileTap={{ scale: 0.97 }}
          whileHover={{ x: 5 }}
        >
          <button className="text-left"> Hola {session?.user!.name}!</button>

          <img
            alt="Profile picture"
            className="rounded-full w-12"
            src={session?.user?.image!}
          ></img>
        </motion.div>
      </motion.span>
    );
  };

  return (
    <motion.div
      initial={open ? { x: 0, opacity: 1 } : { x: -340 - 48 + 32 }}
      animate={{ x: -320 - 48 + 32 }}
      transition={{ delay: 0.5, duration: 0.5, bounce: 0.4, type: "spring" }}
      id="nav_container"
      className="flex fixed z-50 drop-shadow-lg"
    >
      <motion.div className="flex flex-col text-4xl w-72 bg-black/90">
        {links.map((link, idx) => {
          return (
            <motion.span
              className="border-l"
              key={idx}
              transition={{ duration: 1 }}
              whileHover={{ backgroundColor: "white", color: "black" }}
            >
              <Link className="font-thin" href={link.link}>
                <motion.p
                  className="px-7 py-5"
                  onClick={() => {
                    setTimeout(() => {
                      setOpen(false);
                      animate(
                        "#nav_container",
                        { x: -320 - 48 + 32 },
                        { duration: 0.5, type: "spring", bounce: 0.2 }
                      );
                    }, 250);
                  }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ x: 5 }}
                >
                  {link.title}
                </motion.p>
              </Link>
            </motion.span>
          );
        })}
        {!session ? loginButton() : logoutButton()}
      </motion.div>
      <motion.button
        initial={{ opacity: 0.95 }}
        whileHover={{ opacity: 1 }}
        whileTap={{ opacity: 0.5 }}
        onClick={() => {
          setOpen(!open);
          open
            ? animate(
                "#nav_container",
                { x: -320 - 48 + 32 },
                { duration: 0.5, type: "spring", bounce: 0.2 }
              )
            : animate(
                "#nav_container",
                { x: 0 },
                { duration: 0.5, type: "spring", bounce: 0.2 }
              );
        }}
        className="bg-yellow-300 w-5 flex items-center justify-center text-lg text-black "
      >
        {open ? "<" : ">"}
      </motion.button>
    </motion.div>
  );
}