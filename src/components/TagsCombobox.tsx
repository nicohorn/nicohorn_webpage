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
    }) || tags[0],
  );
  const [query, setQuery] = useState("");
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const filteredTags =
    query === ""
      ? tags
      : tags.filter((tag) =>
          tag.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="text-lg text-white">
        {lang === "en-US" ? "Search by tag" : "Buscar por tag"}
      </p>
      <>
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <div className="border-accent relative w-full cursor-default overflow-hidden rounded text-left  shadow-md sm:text-sm">
              <Combobox.Input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push(
                      `/${lang}/blog?${createQueryString("tag", selected.name)}`,
                    );
                  }
                }}
                className="bg-background w-full  border-none py-2 pl-3 pr-10 text-sm leading-5 text-white  focus:ring-0"
                displayValue={(tag: blog_tags) => tag.name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="border-accent absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="text-neutral h-5 w-5"
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
              <Combobox.Options className="bg-background combobox-container absolute z-[52] ml-0 mt-1  max-h-60 w-full overflow-auto rounded py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                          active ? "bg-accent" : "text-white"
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
                                  tag.name,
                                )}`,
                              );
                            }
                          }}
                          href={`/${lang}/blog?${createQueryString(
                            "tag",
                            tag.name,
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
                                active ? "text-white" : "text-neutral"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
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
            <IconTrash className="text-neutral transition active:scale-[95%]" />
          </Link>
        </span>
      </>
    </div>
  );
}
