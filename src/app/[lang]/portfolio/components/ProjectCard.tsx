"use client";
import { projects } from "@prisma/client";
import React from "react";

export default function ProjectCard({ title }: { title: string }) {
  return (
    <div className="absolute flex cursor-pointer flex-col gap-3 rounded-lg px-7 py-3 text-white shadow-md active:border-opacity-70 md:min-h-[30rem] md:min-w-[40rem]">
      <h1>{title}</h1>
      <p>asd</p>
    </div>
  );
}
