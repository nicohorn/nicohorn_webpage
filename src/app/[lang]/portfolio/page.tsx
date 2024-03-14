import { getAllProjects } from "@/repositories/project";
import React from "react";
import ProjectCard from "./components/ProjectCard";

export default async function Page() {
  const projects = await getAllProjects();

  return (
    <main className="p-5 bg-black cards flex gap-4 absolute overflow-auto">
      {projects?.map((p) => {
        return (
          <>
            <ProjectCard project={p} key={p.id} />{" "}
            <ProjectCard project={p} key={p.id} />
            <ProjectCard project={p} key={p.id} />
          </>
        );
      })}
    </main>
  );
}
