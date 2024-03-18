import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function ListboxComponent({
  current,
  options,
  setSelected,
}: {
  current: { title: string; value: string };
  options: {
    title: string;
    value: string;
  }[];
  setSelected: React.Dispatch<
    React.SetStateAction<{
      title: string;
      value: string;
    }>
  >;
}) {
  return (
    <>
      <Listbox
        value={current}
        onChange={(value) => {
          setSelected(value);
        }}
      >
        <div className="relative mt-1 w-40 z-50">
          <Listbox.Button className="relative w-full cursor-default  bg-zinc-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ">
            <div className="flex gap-2 items-center">
              <span className="block truncate ">
                {current.title ||
                  options.find((e) => {
                    return e.value === (current as unknown as string);
                  })?.title}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto  bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm ml-0">
              {options.map((op, opIdx) => (
                <Listbox.Option
                  key={opIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-white"
                    }`
                  }
                  value={op.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {op.title}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 ">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}
