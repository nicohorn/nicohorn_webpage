"use client";
import { projects } from "@prisma/client";
import React from "react";

export default function ProjectCard({ project }: { project: projects }) {
  const handleOnMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };
  return (
    <div
      onMouseMove={(e) => {
        handleOnMouseMove(e);
      }}
      className="flex flex-col gap-3 md:min-w-[40rem] card px-7 py-3 md:min-h-[30rem] cursor-pointer border rounded-lg bg-black border-white border-opacity-20 active:border-opacity-70 absolute shadow-md"
      key={project.id}
    >
      <h1>{project.project_name}</h1>
      <p>{project.description}</p>
    </div>
  );
}
