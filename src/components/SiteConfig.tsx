"use client";
import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLanguage, IconSun } from "@tabler/icons-react";

export default function SiteConfig({
  currentLang,
  languages,
}: {
  currentLang: string;
  languages: {
    language: string;
    title: string;
  }[];
}) {
  const [selected, setSelected] = useState(
    languages.find((lang) => lang.language === currentLang) || languages[0],
  );

  const path = usePathname();

  const pathWithLanguage = () => {
    let changedLang;
    if (currentLang === "en-US") changedLang = "es-AR";
    else changedLang = "en-US";
    const pathArray = path.split("/");
    pathArray[1] = changedLang;
    return {
      path: pathArray.join("/"),
      title:
        currentLang === "en-US"
          ? "Cambiar a español"
          : "Change language to english",
    };
  };

  return (
    <div
      className={
        path.includes("blog") &&
        !path.includes("entry") &&
        path.split("/").length > 3
          ? "hidden"
          : "fixed left-1/2 top-4 z-[51] mt-[32px] flex w-[91vw] -translate-x-1/2 items-center gap-2 sm:left-full sm:w-fit sm:-translate-x-[110%]"
      }
    >
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative  w-full">
          <Listbox.Button className="relative w-full cursor-default rounded bg-background py-2 pl-3 pr-10 text-left text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 sm:text-sm">
            <div className="flex items-center gap-2">
              <IconLanguage />
              <span className="block truncate ">{selected.title}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-neutral"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute ml-0 mt-1 max-h-60 w-full overflow-auto  rounded bg-background py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {languages.map((lang, langIdx) => (
                <Link key={langIdx} href={pathWithLanguage().path}>
                  <Listbox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 focus-visible:ring-white/75 ${
                        active ? "bg-accent" : "text-white"
                      }`
                    }
                    value={lang}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {lang.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral ">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                </Link>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <button
        onClick={() => {
          document.documentElement.classList.add("rotate");

          setTimeout(() => {
            if (document.documentElement.classList.contains("theme-dark")) {
              localStorage.setItem("site-theme", "theme-light");
              document.documentElement.setAttribute(
                "data-theme",
                "theme-light",
              );
              document.documentElement.classList.replace(
                "theme-dark",
                "theme-light",
              );
            } else {
              localStorage.setItem("site-theme", "theme-dark");
              document.documentElement.setAttribute("data-theme", "theme-dark");
              document.documentElement.classList.replace(
                "theme-light",
                "theme-dark",
              );
            }
            console.log(document.documentElement.getAttribute("data-theme"));
          }, 500); // Change this value to match the animation duration

          setTimeout(() => {
            document.documentElement.classList.remove("rotate");
          }, 1000); // Change this value to match the animation duration
        }}
        className="rounded-full bg-background p-2 text-white shadow-md active:scale-90"
        aria-label={
          currentLang === "en-US" ? "Theme switcher" : "Cambiador de tema"
        }
      >
        <IconSun />
      </button>
    </div>
  );
}
