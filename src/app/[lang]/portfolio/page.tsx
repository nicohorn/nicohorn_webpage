import { getAllProjects } from "@/repositories/project";
import React from "react";
import ProjectCard from "./components/ProjectCard";

export default async function Page() {
  const projects = await getAllProjects();

  return (
    <main className=" w-screen md:fixed md:left-0 ">
      <div className="flex gap-4 overflow-scroll no-scrollbar relative py-4 md:px-12 flex-col md:flex-row">
        {projects?.map((p) => {
          return (
            <>
              <ProjectCard project={p} key={p.id} />{" "}
              <ProjectCard project={p} key={p.id} />
              <ProjectCard project={p} key={p.id} />
            </>
          );
        })}
      </div>
    </main>
  );
}
