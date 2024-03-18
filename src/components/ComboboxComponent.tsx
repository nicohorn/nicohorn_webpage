/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { blog_tags } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { TagsToSpanish } from "@/utils/dictionaries/Tags";
import { IconTrash } from "@tabler/icons-react";

export default function ComboboxComponent({
  tags,
  lang,
}: {
  tags: blog_tags[];
  lang: string;
}) {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState(
    tags.find((tag) => {
      return tag.name === searchParams.get("tag");
    }) || tags[0]
  );
  const [query, setQuery] = useState("");
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const filteredTags =
    query === ""
      ? tags
      : tags.filter((tag) =>
          tag.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="flex gap-2 items-center">
      <p className="text-lg">
        {lang === "en-US" ? "Search by tag" : "Buscar por tag"}
      </p>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden  bg-black text-left shadow-md  sm:text-sm">
            <Combobox.Input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(
                    `/${lang}/blog?${createQueryString("tag", selected.name)}`
                  );
                }
              }}
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-white bg-zinc-700  focus:ring-0"
              displayValue={(tag: blog_tags) => tag.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto  bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm ml-0 z-[52]">
              {filteredTags.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-white">
                  {lang === "en-US" ? "Nothing found 😔" : "Nada che 😔"}
                </div>
              ) : (
                filteredTags.map((tag) => (
                  <Combobox.Option
                    key={tag.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-black" : "text-white"
                      }`
                    }
                    value={tag}
                  >
                    {({ selected, active }) => (
                      <Link
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            router.push(
                              `/${lang}/blog?${createQueryString(
                                "tag",
                                tag.name
                              )}`
                            );
                          }
                        }}
                        href={`/${lang}/blog?${createQueryString(
                          "tag",
                          tag.name
                        )}`}
                      >
                        <span
                          tabIndex={0}
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {lang === "en-US"
                            ? tag.name
                            : TagsToSpanish[tag.name]
                            ? TagsToSpanish[tag.name]
                            : tag.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </Link>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <span>
        <Link
          aria-label={
            lang === "en-US"
              ? "Delete query parameters"
              : "Eliminar parámetros de búsqueda"
          }
          href={`/${lang}/blog`}
        >
          <IconTrash />
        </Link>
      </span>
    </div>
  );
}
